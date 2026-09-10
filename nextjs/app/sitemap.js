import { siteUrl } from "./site";

export default function sitemap() {
  const lastModified = new Date();
  return [
    { url: `${siteUrl}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/quote`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  ];
}
