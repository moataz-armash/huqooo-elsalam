import { SERVICE_SLUGS } from "./services/services-data";
import { siteUrl } from "./site";
import { LOCALES, localePath } from "./i18n";
import { getPostIndex } from "@/lib/strapi";

// Strapi reads degrade to an empty result instead of throwing, so a render that
// happens while Strapi is unset or down still succeeds - it just produces an
// empty blog, a sitemap with no posts, or a 404 for a post that exists. When
// STRAPI_URL is missing, lib/strapi.js returns before making any fetch, so that
// render registers no revalidation at all and Next caches it as fully static:
// stale-while-revalidate was a year. This caps every such mistake at a minute.
export const revalidate = 60;

const abs = (locale, path) => `${siteUrl}${localePath(locale, path)}`;

// Every static page exists at the same path in both languages, so its
// alternates can be derived. Blog posts cannot: each language has its own slug,
// so their alternates come from Strapi's localizations and are omitted when an
// article has not been translated.
const staticAlternates = (path) => ({
  languages: Object.fromEntries([
    ...LOCALES.map((locale) => [locale, abs(locale, path)]),
    ["x-default", abs("ar", path)],
  ]),
});

export default async function sitemap() {
  const lastModified = new Date();
  const indexes = Object.fromEntries(
    await Promise.all(LOCALES.map(async (locale) => [locale, await getPostIndex(locale)])),
  );

  const staticPages = [
    { path: "/", changeFrequency: "monthly", priority: 1 },
    { path: "/services", changeFrequency: "monthly", priority: 0.9 },
    ...SERVICE_SLUGS.map((slug) => ({
      path: `/services/${slug}`, changeFrequency: "monthly", priority: 0.8,
    })),
    { path: "/quote", changeFrequency: "monthly", priority: 0.8 },
    { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
  ];

  const entries = [];

  for (const locale of LOCALES) {
    for (const page of staticPages) {
      entries.push({
        url: abs(locale, page.path),
        lastModified,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: staticAlternates(page.path),
      });
    }

    for (const post of indexes[locale]) {
      const languages = { [locale]: abs(locale, `/blog/${post.slug}`) };
      for (const translation of post.translations || []) {
        languages[translation.locale] = abs(translation.locale, `/blog/${translation.slug}`);
      }
      if (languages.ar) languages["x-default"] = languages.ar;
      entries.push({
        url: abs(locale, `/blog/${post.slug}`),
        lastModified: post.updatedAt ? new Date(post.updatedAt) : lastModified,
        changeFrequency: "yearly",
        priority: 0.6,
        // Only annotate when a counterpart actually exists.
        alternates: Object.keys(languages).length > 1 ? { languages } : undefined,
      });
    }
  }

  return entries;
}
