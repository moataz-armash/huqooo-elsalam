import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";
import SiteShell from "@/components/SiteShell";
import { getPost, getPosts, translationSlug } from "@/lib/strapi";
import { formatDate } from "@/lib/format";
import { siteName, siteUrl, whatsappLink } from "@/app/site";
import { config, languageAlternates, localePath, otherLocale } from "@/app/i18n";
import { ui, ENQUIRY_WHATSAPP } from "@/app/content/ui";

// The two language versions of an article have different slugs, so the
// counterpart URL cannot be derived from this one - it has to come from
// Strapi's localizations. When an article has not been translated yet, no
// alternate is emitted at all, which is correct: telling Google a translation
// exists when it does not is worse than saying nothing.
function alternatesFor(locale, post) {
  const path = (loc, slug) => localePath(loc, `/blog/${slug}`);
  const other = otherLocale(locale);
  const otherSlug = translationSlug(post, other);
  const self = path(locale, post.slug);
  if (!otherSlug) return { canonical: post.seo.canonical || self };
  return {
    canonical: post.seo.canonical || self,
    languages: languageAlternates({
      ar: locale === "ar" ? self : path("ar", otherSlug),
      en: locale === "en" ? self : path("en", otherSlug),
    }),
  };
}

export async function blogPostMetadata(locale, slug) {
  const post = await getPost(locale, slug);
  if (!post) return {};
  const { ogLocale } = config(locale);
  const brand = ui(locale).brandName;
  const url = localePath(locale, `/blog/${post.slug}`);
  const title = post.seo.metaTitle || post.title;
  const description = post.seo.metaDescription || post.description;
  const image = post.seo.ogImage;
  return {
    title,
    description,
    keywords: post.seo.keywords ? post.seo.keywords.split(",").map((k) => k.trim()) : undefined,
    alternates: alternatesFor(locale, post),
    robots: post.seo.noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "article",
      locale: ogLocale,
      url,
      siteName: brand,
      title: post.seo.ogTitle || title,
      description: post.seo.ogDescription || description,
      publishedTime: post.publishedDate || undefined,
      images: image ? [{ url: image, alt: post.image?.alt || post.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.seo.ogTitle || title,
      description: post.seo.ogDescription || description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function BlogPostPage({ locale, slug }) {
  const post = await getPost(locale, slug);
  if (!post) notFound();

  const t = ui(locale);
  const { arrowForward } = config(locale);
  const to = (path) => localePath(locale, path);
  const { posts } = await getPosts(locale, { pageSize: 4 });
  const related = posts.filter((item) => item.slug !== post.slug).slice(0, 3);
  const pageUrl = `${siteUrl}${to(`/blog/${post.slug}`)}`;
  const meta = [formatDate(post.publishedDate, locale), post.author, post.readingTime ? t.readingTime(post.readingTime) : null]
    .filter(Boolean)
    .join(" · ");

  // The language switch goes to this article's counterpart when one exists,
  // and otherwise falls back to the other language's blog index rather than a
  // URL that would 404.
  const other = otherLocale(locale);
  const otherSlug = translationSlug(post, other);
  const switchHref = otherSlug ? localePath(other, `/blog/${otherSlug}`) : localePath(other, "/blog");

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      image: post.image?.url ? [post.image.url] : undefined,
      datePublished: post.publishedDate || undefined,
      dateModified: post.updatedAt || post.publishedDate || undefined,
      inLanguage: locale,
      mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
      author: post.author ? { "@type": "Person", name: post.author } : { "@id": `${siteUrl}/#business` },
      publisher: { "@id": `${siteUrl}/#business` },
      articleSection: post.category || undefined,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: t.home, item: `${siteUrl}${to("/")}` },
        { "@type": "ListItem", position: 2, name: t.blog, item: `${siteUrl}${to("/blog")}` },
        { "@type": "ListItem", position: 3, name: post.title, item: pageUrl },
      ],
    },
  ];

  // Content comes from the client's own Strapi, written by their automation.
  const html = marked.parse(post.content || "", { gfm: true, breaks: true });

  return (
    <SiteShell locale={locale} whatsappUrl={whatsappLink(ENQUIRY_WHATSAPP[locale])} switchHref={switchHref}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="article-hero">
        <div className="container article-heading">
          <Link className="article-back" href={to("/blog")}>{config(locale).arrowBack} {t.backToBlog}</Link>
          {post.category ? <p className="eyebrow eyebrow-light">{post.category}</p> : null}
          <h1>{post.title}</h1>
          <p>{post.description}</p>
          {meta ? <p className="article-meta">{meta}</p> : null}
        </div>
      </section>

      {post.image ? (
        <div className="container article-cover">
          <Image
            src={post.image.url}
            alt={post.image.alt || post.title}
            width={post.image.width}
            height={post.image.height}
            priority
            sizes="(max-width: 900px) 100vw, 1100px"
          />
        </div>
      ) : null}

      <div className="container article-layout">
        <article className="article-content" dangerouslySetInnerHTML={{ __html: html }} />
        <aside className="article-aside">
          <span>{t.articleAsideTitle}</span>
          <p>{t.articleAsideText}</p>
          <Link href={to("/quote")}>{t.requestQuote} <span aria-hidden="true">{arrowForward}</span></Link>
        </aside>
      </div>

      {related.length > 0 ? (
        <section className="section latest-blog">
          <div className="container">
            <div className="section-heading compact">
              <div>
                <p className="eyebrow">{t.alsoRead}</p>
                <h2>{t.otherArticles}</h2>
              </div>
              <Link className="text-link" href={to("/blog")}>{t.allArticles} <span aria-hidden="true">{arrowForward}</span></Link>
            </div>
            <div className="blog-grid">
              {related.map((item) => (
                <article className="blog-card" key={item.slug}>
                  <Link className="blog-card-media" href={to(`/blog/${item.slug}`)} aria-label={item.title}>
                    {item.image ? (
                      <Image src={item.image.url} alt={item.image.alt || item.title} fill sizes="(max-width: 900px) 50vw, 33vw" />
                    ) : null}
                  </Link>
                  <div className="blog-card-body">
                    <p className="blog-card-meta">{formatDate(item.publishedDate, locale)}</p>
                    <h3><Link href={to(`/blog/${item.slug}`)}>{item.title}</Link></h3>
                    <Link className="blog-card-link" href={to(`/blog/${item.slug}`)}>{t.readArticle} <span aria-hidden="true">{arrowForward}</span></Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </SiteShell>
  );
}
