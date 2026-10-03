# Strapi for the حقول السلام blog

The site reads blog posts from Strapi. Everything else on the site is static
and does not depend on it — if Strapi is down, unset or empty, the blog shows
its "مقالات جديدة قريباً" state and nothing else breaks.

This folder holds the **content types only**, not a Strapi app. The schemas are
the same four types used on diva_dent, copied unchanged, plus the router,
controller and service for each.

## 1. Create the Strapi project

Anywhere you can host Node (a VPS, or Strapi Cloud):

```bash
npx create-strapi-app@latest huqool-cms --quickstart
```

Then copy these in and restart:

```bash
cp -r strapi/src/api/* huqool-cms/src/api/
```

**Copy the whole `api` folder, not just the schemas.** Strapi 5 does not
generate the router, controller and service from `schema.json` on its own —
verified on this project, where all four endpoints returned 404 until they were
added. They are included here, one small file each, identical to what the admin
panel generates.

## 2. Settings that make or break it

**Internationalization** — install the i18n plugin and add `ar` as the
**default** locale. The site always requests `locale=ar`.

**Public read permissions** — Settings → Roles → **Public** → tick `find` and
`findOne` for `blog-post`, `author`, `blog-category`, `blog-tag`.
Without this every request returns 403 and the blog looks empty.

**API token for writing** — Settings → API Tokens → create one with `create`
permission on `blog-post`. This is what Zapier uses. Read permissions are
separate from this token.

**Port and public URL** — this server already runs another Strapi on 1337
(api.divadentclinics.com), so this one uses **1340**. In the Strapi `.env` set
`PORT=1340` and `URL=https://api.hqolalsalam.com`, and make `config/server`
read it (`url: env('URL', 'http://localhost:1340')`); without it the admin
panel redirects incorrectly from behind nginx.

## 3. Point the site at it

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

## 4. Check it before blaming the website

```bash
node strapi/probe.mjs --server strapi --api https://your-strapi-host --locales ar
```

Empty, forbidden and 404 all look identical in a browser — every one renders
the fallback. Only this tells them apart:

| Output | Meaning | Fix |
|---|---|---|
| `ok N` | Working | — |
| `empty` | Public, but no entries | Add a post |
| `forbidden` | find/findOne is off | Step 2 above |
| `http 404` | Type not in the running Strapi | The schemas were never copied in, or Strapi wasn't restarted |

## 5. Writing posts from Zapier

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

## 6. Running it locally on Windows

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

## 7. Why there is no database to copy

Public read permissions, the `ar` locale and the four blog categories are
created by `src/index.js` on every boot, so they travel with a `git pull`
instead of living only in a database. Posts come from Zapier. Nothing in the
local SQLite file needs to reach the server — copying a database over a running
one is a one-time move that silently destroys content the second time it is
done.
