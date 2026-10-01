import { SERVICES } from "./services/services-data";
import { siteUrl } from "./site";
import { getPostIndex } from "@/lib/strapi";

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
