// Clear Next's incremental cache before building.
//
// `next build` deliberately preserves .next/cache - it holds the build and
// fetch caches, which is normally what you want. It also holds the ISR cache,
// and an entry there outlives a deploy. That turned a transient failure into a
// permanent one: a post page rendered while STRAPI_URL was unset got cached as
// a 404, and stayed a 404 through several rebuilds, while those same builds
// were writing a correct prerendered copy of that very page. The sitemap, built
// from the same data in the same build, listed the post the whole time.
//
// Only .next/cache is removed, never .next itself: the previous build is still
// serving traffic while this one runs, and it needs .next/server to stay put.
//
// Reusable build cache is worth a few seconds. A wrong page served
// indefinitely, with no error anywhere to explain it, costs considerably more.
import { rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectDir = dirname(dirname(fileURLToPath(import.meta.url)));
const cacheDir = join(projectDir, ".next", "cache");

try {
  rmSync(cacheDir, { recursive: true, force: true });
  console.log(`[build] cleared ${cacheDir}`);
} catch (error) {
  // A missing or unreadable cache must never fail the build.
  console.warn(`[build] could not clear ${cacheDir}: ${error.message}`);
}
