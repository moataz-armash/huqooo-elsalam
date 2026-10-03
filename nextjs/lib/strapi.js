// Strapi client for the blog.
//
// Rules that are silent when broken, so they are enforced here once:
//   - every read sends `locale`; omitting it returns the default locale
//     regardless of the page language,
//   - `populate` is never comma-separated (that returns nothing, silently) —
//     only the indexed form works,
//   - a slug lookup must send `locale` alongside filters[slug][$eq], because
//     slugs are localized.
//
// Every fetch degrades to an empty result rather than throwing, so the blog
// shows its "coming soon" state when Strapi is unset, down or still empty.
const STRAPI_URL = (process.env.STRAPI_URL || "").replace(/\/$/, "");
const LOCALE = "ar";
const REVALIDATE = 60;

export const strapiConfigured = Boolean(STRAPI_URL);

// Strapi v4 nests fields under `attributes`; v5 returns them flat. Accept both
// so the site keeps working across a Strapi upgrade.
const flat = (node) => {
  const entry = node?.data !== undefined ? node.data : node;
  if (!entry || typeof entry !== "object") return null;
  const item = Array.isArray(entry) ? entry[0] : entry;
  if (!item) return null;
  return item.attributes ? { id: item.id, ...item.attributes } : item;
};

const media = (node) => {
  const file = flat(node);
  if (!file?.url) return null;
  return {
    url: file.url.startsWith("http") ? file.url : `${STRAPI_URL}${file.url}`,
    alt: file.alternativeText || "",
    width: file.width || 1200,
    height: file.height || 630,
  };
};

const POPULATE = {
  "populate[featuredImage][fields][0]": "url",
  "populate[featuredImage][fields][1]": "alternativeText",
  "populate[featuredImage][fields][2]": "width",
  "populate[featuredImage][fields][3]": "height",
  "populate[seoOgImage][fields][0]": "url",
  "populate[category][fields][0]": "name",
  "populate[author][fields][0]": "name",
};

async function strapiGet(path, params) {
  if (!STRAPI_URL) return null;
  const query = new URLSearchParams({ locale: LOCALE, ...params });
  try {
    const res = await fetch(`${STRAPI_URL}/api/${path}?${query}`, {
      next: { revalidate: REVALIDATE },
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) {
      console.error(`[strapi] ${path} -> ${res.status}`);
      return null;
    }
    return await res.json();
  } catch (error) {
    console.error(`[strapi] ${path} failed:`, error.message);
    return null;
  }
}

function normalizePost(entry) {
  const post = flat(entry);
  if (!post?.slug) return null;
  const image = media(post.featuredImage);
  return {
    slug: post.slug,
    title: post.title || "",
    description: post.description || "",
    content: post.content || "",
    publishedDate: post.publishedDate || post.publishedAt || null,
    updatedAt: post.updatedAt || post.publishedAt || null,
    readingTime: post.readingTime || null,
    image,
    category: flat(post.category)?.name || null,
    author: flat(post.author)?.name || null,
    seo: {
      metaTitle: post.seoMetaTitle || null,
      metaDescription: post.seoMetaDescription || null,
      keywords: post.seoKeywords || null,
      canonical: post.seoCanonicalUrl || null,
      ogTitle: post.seoOgTitle || null,
      ogDescription: post.seoOgDescription || null,
      ogImage: media(post.seoOgImage)?.url || image?.url || null,
      noIndex: Boolean(post.seoNoIndex) || String(post.seoRobotsMeta || "").includes("noindex"),
    },
  };
}

export async function getPosts({ page = 1, pageSize = 12 } = {}) {
  const json = await strapiGet("blog-posts", {
    "sort[0]": "publishedDate:desc",
    "pagination[page]": String(page),
    "pagination[pageSize]": String(pageSize),
    ...POPULATE,
  });
  const posts = (json?.data || []).map(normalizePost).filter(Boolean);
  const meta = json?.meta?.pagination || { page, pageCount: posts.length ? 1 : 0, total: posts.length };
  return { posts, pageCount: meta.pageCount || 0, total: meta.total || posts.length };
}

// A slug lookup has to survive the route param arriving either decoded
// ("افضل-اشجار") or still percent-encoded ("%D8%A7%D9%81..."), which varies for
// non-ASCII segments. Encoding an already-encoded slug yields %25D8%25A7..., a
// value Strapi matches nothing against, and the post 404s while the blog index
// and the sitemap - which never touch a route param - keep working.
function slugVariants(slug) {
  const variants = [slug];
  try {
    const decoded = decodeURIComponent(slug);
    if (decoded !== slug) variants.push(decoded);
  } catch {
    // A slug containing a stray % is not valid encoding; the raw form is all
    // there is to try.
  }
  return variants;
}

export async function getPost(slug) {
  for (const candidate of slugVariants(slug)) {
    const json = await strapiGet("blog-posts", {
      "filters[slug][$eq]": candidate,
      "pagination[pageSize]": "1",
      ...POPULATE,
    });
    const entry = (json?.data || [])[0];
    if (entry) return normalizePost(entry);
  }
  return null;
}

// Used by generateStaticParams and the sitemap. Returns [] when Strapi is
// unavailable so a build never fails because the CMS is down.
export async function getPostIndex() {
  const json = await strapiGet("blog-posts", {
    "fields[0]": "slug",
    "fields[1]": "updatedAt",
    "fields[2]": "publishedDate",
    "sort[0]": "publishedDate:desc",
    "pagination[pageSize]": "200",
  });
  return (json?.data || [])
    .map((entry) => {
      const post = flat(entry);
      return post?.slug ? { slug: post.slug, updatedAt: post.updatedAt || post.publishedDate || null } : null;
    })
    .filter(Boolean);
}
