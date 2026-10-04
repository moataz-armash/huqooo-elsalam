import BlogPostPage, { blogPostMetadata } from "@/components/pages/BlogPostPage";
import { getPostIndex } from "@/lib/strapi";

// Strapi reads degrade to an empty result instead of throwing, so a render that
// happens while Strapi is unset or down still succeeds - it just produces an
// empty blog, a sitemap with no posts, or a 404 for a post that exists. When
// STRAPI_URL is missing, lib/strapi.js returns before making any fetch, so that
// render registers no revalidation at all and Next caches it as fully static:
// stale-while-revalidate was a year. This caps every such mistake at a minute.
export const revalidate = 60;

// Posts added after a deploy render on demand instead of 404ing, so an
// automation can publish without triggering a rebuild.
export const dynamicParams = true;

export async function generateStaticParams() {
  const index = await getPostIndex("en");
  return index.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return blogPostMetadata("en", slug);
}

export default async function Page({ params }) {
  const { slug } = await params;
  return <BlogPostPage locale="en" slug={slug} />;
}
