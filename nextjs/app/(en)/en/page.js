import HomePage, { homeMetadata } from "@/components/pages/HomePage";

// Strapi reads degrade to an empty result instead of throwing, so a render that
// happens while Strapi is unset or down still succeeds - it just produces an
// empty blog, a sitemap with no posts, or a 404 for a post that exists. When
// STRAPI_URL is missing, lib/strapi.js returns before making any fetch, so that
// render registers no revalidation at all and Next caches it as fully static:
// stale-while-revalidate was a year. This caps every such mistake at a minute.
export const revalidate = 60;

export const metadata = homeMetadata("en");

export default function Page() {
  return <HomePage locale="en" />;
}
