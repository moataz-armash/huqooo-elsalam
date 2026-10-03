import { SERVICES } from "./services/services-data";
import { siteUrl } from "./site";
import { getPostIndex } from "@/lib/strapi";

// Strapi reads degrade to an empty result instead of throwing, so a render that
// happens while Strapi is unset or down still succeeds - it just produces an
// empty blog, a sitemap with no posts, or a 404 for a post that exists. When
// STRAPI_URL is missing, lib/strapi.js returns before making any fetch, so that
// render registers no revalidation at all and Next caches it as fully static:
// stale-while-revalidate was a year. This caps every such mistake at a minute.
export const revalidate = 60;

export default async function sitemap() {
  const lastModified = new Date();
  const posts = await getPostIndex();

  return [
    { url: `${siteUrl}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/services`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    ...SERVICES.map((service) => ({
      url: `${siteUrl}/services/${service.slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    })),
    { url: `${siteUrl}/quote`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/blog`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt ? new Date(post.updatedAt) : lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    })),
  ];
}
