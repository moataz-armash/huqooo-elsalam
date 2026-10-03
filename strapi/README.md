# Strapi for the حقول السلام blog

The site reads blog posts from Strapi. Everything else on the site is static
and does not depend on it — if Strapi is down, unset or empty, the blog shows
its "مقالات جديدة قريباً" state and nothing else breaks.

This folder is the **whole Strapi app**, not just the schemas. It is deployed
from this repo like the site is: a push touching `strapi/**` runs
`.github/workflows/deploy-cms.yml`, which calls `/var/www/huqool/update-cms.sh`
on the server to pull, `npm ci`, build and restart pm2.

## 1. Where it runs

| | |
|---|---|
| Server path | `/var/www/huqool/strapi` |
| Port | **1340** — 1337 is taken by api.divadentclinics.com |
| Public URL | `https://api.hqolalsalam.com` (nginx → `127.0.0.1:1340`) |
| pm2 process | `huqool-cms`, interpreter `/opt/node22/bin/node` |
| Node | 22, at `/opt/node22`. The system node is v20 and must stay v20 |
| Database | PostgreSQL, `DATABASE_*` in `.env`. See below |

`.env` and `public/uploads` live only on the server. They are gitignored, so a
deploy never touches them — but it also means nothing backs them up.

### Why PostgreSQL and not SQLite

It started on SQLite only because that is `create-strapi-app`'s default, not
because anything about this workload called for it. At this traffic SQLite
would most likely have held up fine, but two things made it the wrong long-term
home for content:

- **The file sat at `.tmp/data.db`.** That is Strapi's default, and it is a
  directory whose name invites deletion — by a cleanup script, by a `rm -rf
  .tmp` during debugging, or by someone assuming it is scratch space. The whole
  blog lived in a file named "temporary".
- **There was no backup story.** Copying a live SQLite file while Strapi is
  writing can produce a corrupt copy, so "just back up the file" is not
  actually safe without using the backup API. `pg_dump` on a timer is routine.

Smaller reasons: SQLite locks the whole database on write, so a Zapier POST or
a media upload can collide with an ISR revalidation and surface `SQLITE_BUSY`;
and it rules out ever running Strapi in pm2 cluster mode.

Both drivers are installed, so the client is purely an `.env` choice. Nothing
in this repo writes raw SQL — `src/index.js` goes through the documents and
query APIs — so the two are interchangeable. Local development may stay on
SQLite for convenience; set `DATABASE_CLIENT=sqlite` and `DATABASE_FILENAME`.

Switching is cheap only while the database is empty: the locale, permissions
and categories are recreated by `src/index.js` on boot, so an empty instance
rebuilds itself and there is nothing to migrate. Once articles exist it becomes
a real data migration, with a `pg_dump`/restore and downtime.

## 2. What configures itself, and what does not

**Automatic.** `src/index.js` runs on every boot and creates the `ar` locale,
makes it the default, grants the Public role `find`/`findOne` on all four types,
and seeds the four blog categories. It is additive and never edits an existing
record, so it is safe against an instance holding real content. This is
deliberate: these would otherwise live only in the database, so a fresh instance
would return 403 on everything and the blog would show its fallback with no
clue why. Look for two `[bootstrap]` lines in the boot log.

**The router, controller and service are committed for each type.** Strapi 5
does not generate them from `schema.json` — verified here, where all four
endpoints returned 404 until they were added.

**Still manual, once.** Two things cannot be code:

- **The admin account.** First-run registration at
  `https://api.hqolalsalam.com/admin`. Until it exists you cannot add articles.
- **The API token for Zapier.** Settings → API Tokens → one with `create` on
  `blog-post`. Read permissions are separate from this token. Note that
  changing `API_TOKEN_SALT` in `.env` invalidates every existing token.

## 3. Backups

PostgreSQL 16 on this box is shared with three other apps (`divadent_strapi`,
`cms_reviewup`, `flowra`). This app has its own database and role, both named
`huqool_cms`, owner of that database only, reachable on 127.0.0.1 only. The
password is in `.env` and in the backup archive — nowhere else.

| | |
|---|---|
| Script | `/opt/huqool-backup.sh` |
| Schedule | daily 03:45, `/etc/cron.d/huqool-backup` |
| Destination | `/opt/huqool-backups`, mode 700, files 600 |
| Retention | 14 days, pruned by age |
| Log | `/var/log/huqool-backup.log` |

Each run writes `db-<date>.sql.gz` (a `pg_dump`) and `files-<date>.tar.gz`
containing the three things that exist nowhere else and are not in git:

- `strapi/public/uploads/` — every article image
- `strapi/.env` — including the database password and the six secrets
- `nextjs/.env.production` — holds `STRAPI_URL`, whose absence silently breaks
  every blog image (see section 4)

`CONNECT` on this database is revoked from `PUBLIC` and granted only to
`huqool_cms`, so the other apps' roles cannot open a connection to it. The
reverse is not true and deliberately so — see the note at the end of this
section.

### Restoring, and the one step that will bite you

The dump has been restored into a throwaway database and verified: 49 tables,
the four categories present, ownership intact, zero manual steps needed.

**On a rebuilt box, create the role before restoring.** The dump contains
`OWNER TO huqool_cms` statements, so without the role every ownership line
errors out:

```sql
CREATE ROLE huqool_cms LOGIN PASSWORD '<from the backup archive>';
CREATE DATABASE huqool_cms OWNER huqool_cms;
```

The password is inside `files-<date>.tar.gz` at `strapi/.env`, which is why
that archive matters as much as the SQL dump. Restoring the database without it
gives you the content but not a working app.

### Still outstanding

**The dumps sit on the same disk as the data.** A disk or provider failure
loses the site, the database and every backup together. The plan is Backblaze
B2 via `rclone` — free at this size, and a different company from both the VPS
host and the Google account, so no single compromise takes everything.

**Retention should be tiered.** 14 days of dailies only protects against
accidents you notice quickly. It does not protect against corruption spotted
two months later, and articles are not regenerable. At ~34 KB a dump, keeping
daily for 14 days, weekly for 8 weeks and monthly forever costs well under a
megabyte a year.

### Rolling back to SQLite

Left in place deliberately: `strapi/.tmp/data.db`, `strapi/.env.sqlite-backup`
and `/var/www/huqool-cms.old`. Swapping the `.env` back and restarting reverts
it. Note this loses anything written since the switch, so it is only an
escape hatch for the days right after it, not a long-term option.

### Why the other databases were left alone

Every role on this box can still open a connection to the other three
databases, read no data, and see table and role names via the system catalogs.
That is Postgres's default `CONNECT` grant to `PUBLIC` and it predates this
app. It was left in place on purpose: all four databases belong to the same
owner, so there is no third party for metadata to leak to, and `cms_reviewup`
is owned by `postgres` while the app connects as `reviewup_user` — a bare
revoke there would break a live site for no real gain.

**Revisit this if the box ever hosts a project belonging to someone else.**
Then the calculation changes completely, and the fix is a revoke from `PUBLIC`
plus an explicit grant per connecting role — identified from a day or two of
`log_connections`, not from a short sample of `pg_stat_activity`, which misses
anything that connects on a schedule.

## 4. Point the site at it

The site is self-hosted, so this is a file on the server, not a Vercel setting.
Create `/var/www/huqool/nextjs/.env.production` containing:

```
STRAPI_URL=https://api.hqolalsalam.com
```

No trailing slash. It is gitignored, so `git pull` will not remove it. Then
rebuild with `/var/www/huqool/update.sh`.
It is needed at build time as well as runtime: it configures the allowed image
host and is read when the blog pages are pre-rendered. After that, new posts
appear within about a minute without a rebuild.

## 5. Check it before blaming the website

```bash
node strapi/probe.mjs --server strapi --api https://your-strapi-host --locales ar
```

Empty, forbidden and 404 all look identical in a browser — every one renders
the fallback. Only this tells them apart:

| Output | Meaning | Fix |
|---|---|---|
| `ok N` | Working | — |
| `empty` | Public, but no entries | Add a post |
| `forbidden` | find/findOne is off | The bootstrap didn't run - check the boot log for its two `[bootstrap]` lines |
| `http 404` | Type not in the running Strapi | pm2 is running from the wrong directory, or Strapi wasn't restarted |

If you check by hand with `curl`, **pass `-g`**:

```bash
curl -g -s -o /dev/null -w '%{http_code}' 'https://api.hqolalsalam.com/api/blog-posts?locale=ar&pagination[pageSize]=1'
```

Without `-g`, curl reads the `[ ]` in `pagination[pageSize]` as a glob, refuses
the URL and prints nothing at all — which reads exactly like the server being
down. This bit both the CI workflow and the server's update script.

## 6. Writing posts from Zapier

Create the post with `POST https://your-strapi-host/api/blog-posts`, header
`Authorization: Bearer <API token>`, body:

```json
{
  "data": {
    "title": "عنوان المقال",
    "slug": "unique-slug-per-post",
    "description": "وصف قصير يظهر في بطاقة المقال ونتائج البحث",
    "content": "# عنوان\n\nنص المقال بصيغة Markdown.",
    "publishedDate": "2026-10-01",
    "locale": "ar",
    "publishedAt": "2026-10-01T09:00:00.000Z"
  }
}
```

**Two fields are silently fatal if missing.** The POST returns success either
way and the post never appears on the site:

- **`publishedAt`** — the type uses draft/publish. Without it the entry is a
  **draft**, and the public API never returns drafts. This is the number-one
  cause of "Zapier ran, nothing appeared".
- **`locale`** — without it the entry lands in the default locale only.

Also note:

- **`slug` must be unique and is best kept in Latin letters.** It becomes the
  URL: `/blog/<slug>`. Arabic works but produces long encoded URLs when shared.
- **`featuredImage` is required by the schema.** Either upload an image through
  the admin, relax that field, or have Zapier upload to `/api/upload` first and
  send the returned id.
- `scheduledDate` exists on the type but **no code reads it**. Zapier controls
  timing by choosing when to POST.

### SEO fields worth filling

`seoMetaTitle` (≤60 chars), `seoMetaDescription` (≤160), `seoKeywords`,
`seoOgTitle`, `seoOgDescription`, `seoOgImage`. The site falls back to the
post's title and description when they are empty, so posts are never broken —
but filling them is what makes the post compete in search results.

Set `seoNoIndex` to keep a post out of Google while still publishing it.

## 7. Running it locally on Windows

The admin build uses `@swc/core`, which refuses to unpack its native binary into
a cache folder when any ancestor's DACL grants full control to a broad SID. The
AppContainer ACE on `%LOCALAPPDATA%` is inherited across the whole user profile,
so every default location is rejected and the only visible error is the useless
`Failed to load native binding`. The real message appears with:

```bash
node -e "process.dlopen({exports:{}},require.resolve('@swc/core-win32-x64-msvc/swc.win32-x64-msvc.node'))"
```

Fix it by pointing the cache at a folder with inheritance switched off:

```powershell
New-Item -ItemType Directory C:\swc-cache
icacls C:\swc-cache /inheritance:r
icacls C:\swc-cache /grant:r "$($env:USERNAME):(OI)(CI)F" "SYSTEM:(OI)(CI)F" "Administrators:(OI)(CI)F"
```

then add `SWC_NATIVE_BINDING_CACHE=C:\swc-cache` to `strapi/.env`. Strapi loads
`.env` before the admin build starts, so no shell variable is needed. The file
is gitignored, so this never reaches the Linux server, which is unaffected.

## 8. Why there is no database to copy

Public read permissions, the `ar` locale and the four blog categories are
created by `src/index.js` on every boot, so they travel with a `git pull`
instead of living only in a database. Posts come from Zapier. Nothing in the
local SQLite file needs to reach the server — copying a database over a running
one is a one-time move that silently destroys content the second time it is
done.
