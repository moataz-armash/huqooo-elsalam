#!/usr/bin/env node
/**
 * Strapi content-type probe. Portable to any Strapi v4/v5 project.
 *
 * Answers the one question the browser cannot: when a section renders its
 * fallback copy instead of CMS content, WHY. Four causes look identical from
 * the front end and need four different fixes:
 *
 *   ok         entries exist and the public role can read them
 *   empty      content type is public but has no entries -> add content
 *   forbidden  entries may exist; public find/findOne is OFF -> Strapi
 *              Settings > Roles > Public
 *   404        no such content type in this Strapi -> create it, or delete
 *              the fetcher calling it
 *
 * Content types are discovered from server/src/api/<name>/content-types/
 * <name>/schema.json, which is Strapi's own layout — so this works on any
 * Strapi repo without configuration. Pass --api <url> for a Strapi that lives
 * elsewhere.
 *
 * Usage (from the repo root, or anywhere with --server):
 *   node .claude/skills/strapi-cms/probe.mjs
 *   node .claude/skills/strapi-cms/probe.mjs --api https://api.example.com
 *   node .claude/skills/strapi-cms/probe.mjs --locales ar,en --server ./server
 *
 * Never exits non-zero on CMS state: a locked endpoint is a fact about the
 * CMS, not a regression in the repo. Exit 2 means the probe itself could not
 * run.
 */

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const RESET = "\x1b[0m";
const c = {
  ok: (s) => `\x1b[32m${s}${RESET}`,
  bad: (s) => `\x1b[31m${s}${RESET}`,
  warn: (s) => `\x1b[33m${s}${RESET}`,
  dim: (s) => `\x1b[2m${s}${RESET}`,
  head: (s) => `\x1b[1m${s}${RESET}`,
};

/* ── args ──────────────────────────────────────────────────────────────── */

const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
};

const SERVER = arg("server", "server");
const LOCALES = arg("locales", "ar,en").split(",").map((l) => l.trim());

/** The API base. Explicit flag wins; otherwise read the frontend's env file,
 *  because that is the URL the site actually talks to. */
function resolveApi() {
  const explicit = arg("api", null);
  if (explicit) return explicit.replace(/\/+$/, "");
  if (process.env.NEXT_PUBLIC_STRAPI_URL) return process.env.NEXT_PUBLIC_STRAPI_URL;

  for (const file of ["client/.env.local", ".env.local", "client/.env.production"]) {
    if (!existsSync(file)) continue;
    const line = readFileSync(file, "utf8")
      .split(/\r?\n/)
      .find((l) => /^\s*NEXT_PUBLIC_STRAPI_URL\s*=/.test(l));
    if (line) {
      return line.slice(line.indexOf("=") + 1).trim().replace(/^["']|["']$/g, "").replace(/\/+$/, "");
    }
  }
  return "http://localhost:1337";
}

const API = resolveApi();

/* ── discovery ─────────────────────────────────────────────────────────── */

/**
 * Every content type this Strapi defines, with the facts that decide how it
 * must be written to. Read from schema.json rather than from the running
 * admin, so it works offline and describes the code, not a snapshot.
 */
function discoverTypes() {
  const apiDir = join(SERVER, "src", "api");
  if (!existsSync(apiDir)) {
    console.error(c.bad(`no Strapi at ${apiDir} — pass --server <path>`));
    process.exit(2);
  }

  const types = [];
  for (const name of readdirSync(apiDir)) {
    const ctDir = join(apiDir, name, "content-types");
    if (!existsSync(ctDir)) continue;
    for (const ct of readdirSync(ctDir)) {
      const file = join(ctDir, ct, "schema.json");
      if (!existsSync(file)) continue;
      let schema;
      try {
        schema = JSON.parse(readFileSync(file, "utf8"));
      } catch {
        console.warn(c.warn(`  unparseable schema: ${file}`));
        continue;
      }
      const info = schema.info || {};
      /* Single types are served at their SINGULAR name, collections at their
         plural. Guessing wrong is a 404 that looks like a missing content
         type — Strapi records the kind, so read it rather than guess. */
      const single = schema.kind === "singleType";
      types.push({
        name: info.singularName || ct,
        path: `/api/${single ? info.singularName : info.pluralName}`,
        single,
        localized: Boolean(schema.pluginOptions?.i18n?.localized),
        draft: schema.options?.draftAndPublish !== false,
      });
    }
  }
  return types.sort((a, b) => a.path.localeCompare(b.path));
}

/* ── probe ─────────────────────────────────────────────────────────────── */

async function probe(type, locale) {
  const url = `${API}${type.path}?locale=${locale}`;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(20000) });
    if (!res.ok) {
      return { state: res.status === 403 ? "forbidden" : `http ${res.status}` };
    }
    const data = (await res.json())?.data;
    if (Array.isArray(data)) {
      return { state: data.length ? "ok" : "empty", n: data.length };
    }
    return { state: data && Object.keys(data).length ? "ok" : "empty" };
  } catch (error) {
    return { state: `unreachable (${error.name})` };
  }
}

const types = discoverTypes();
console.log(c.head(`\nStrapi  ${API}`));
console.log(
  c.dim(`${types.length} content types in ${SERVER}/src/api, locales: ${LOCALES.join(", ")}\n`),
);

const width = Math.max(...types.map((t) => t.path.length));
const counts = { ok: 0, empty: 0, broken: 0 };

for (const type of types) {
  const cells = [];
  for (const locale of LOCALES) {
    const { state, n } = await probe(type, locale);
    if (state === "ok") counts.ok++;
    else if (state === "empty") counts.empty++;
    else counts.broken++;

    const text = state === "ok" ? `ok${n === undefined ? "" : ` ${n}`}` : state;
    const colour =
      state === "ok" ? c.ok : state === "empty" ? c.warn : c.bad;
    /* Pad the plain text: padEnd counts the invisible colour escapes. */
    cells.push(`${locale} ${colour(text)}${" ".repeat(Math.max(1, 12 - text.length))}`);
  }
  const flags = [
    type.single ? "single" : null,
    type.localized ? null : c.warn("not-localized"),
  ]
    .filter(Boolean)
    .join(" ");
  console.log(`  ${type.path.padEnd(width)}  ${cells.join("")}${c.dim(flags)}`);
}

console.log(
  `\n  ${c.ok(`${counts.ok} live`)}  ${c.warn(`${counts.empty} empty`)}  ` +
    `${c.bad(`${counts.broken} failing`)}` +
    c.dim(`  (of ${types.length * LOCALES.length} type/locale pairs)`),
);
console.log(
  c.dim("  empty and failing both render as fallback copy on the site.\n"),
);

/* The write path, which is where an automation gets it wrong. Both of these
   are silent: the POST returns 200 and the entry never appears publicly. */
const draftTypes = types.filter((t) => t.draft);
const localizedTypes = types.filter((t) => t.localized);
if (draftTypes.length || localizedTypes.length) {
  console.log(c.head("  Writing to this Strapi (Zapier, scripts, imports)"));
  if (draftTypes.length) {
    console.log(
      c.dim(`  ${draftTypes.length}/${types.length} types have draftAndPublish ON — a POST without`),
    );
    console.log(c.dim("  publishedAt creates a DRAFT that the public API never returns."));
  }
  if (localizedTypes.length) {
    console.log(
      c.dim(`  ${localizedTypes.length}/${types.length} types are localized — a POST without`),
    );
    console.log(
      c.dim(`  locale lands in the default locale only; the other stays empty.\n`),
    );
  }
}
