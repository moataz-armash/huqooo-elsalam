import Image from "next/image";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { getPosts } from "@/lib/strapi";
import { formatDate } from "@/lib/format";
import { siteName, siteUrl, whatsappLink } from "@/app/site";
import { config, localePath, otherLocale, sharedPathAlternates } from "@/app/i18n";
import { pages } from "@/app/content/pages";
import { ui, ENQUIRY_WHATSAPP } from "@/app/content/ui";
import { HeadingText } from "./HeadingText";

export function blogMetadata(locale) {
  const c = pages(locale).blog;
  const { ogLocale } = config(locale);
  const brand = ui(locale).brandName;
  const url = localePath(locale, "/blog");
  return {
    title: c.title,
    description: c.description,
    alternates: { canonical: url, languages: sharedPathAlternates("/blog") },
    openGraph: {
      type: "website", locale: ogLocale, url, siteName: brand,
      title: `${c.title} | ${brand}`,
      description: c.description,
      images: [{ url: "/images/nursery-care-v2.webp", width: 1024, height: 1536, alt: c.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${c.title} | ${brand}`,
      description: c.description,
      images: ["/images/nursery-care-v2.webp"],
    },
  };
}

export default async function BlogIndexPage({ locale }) {
  const c = pages(locale).blog;
  const t = ui(locale);
  const { arrowForward } = config(locale);
  const to = (path) => localePath(locale, path);
  const { posts } = await getPosts(locale, { pageSize: 24 });

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t.home, item: `${siteUrl}${to("/")}` },
      { "@type": "ListItem", position: 2, name: c.title, item: `${siteUrl}${to("/blog")}` },
    ],
  };

  return (
    <SiteShell locale={locale} whatsappUrl={whatsappLink(ENQUIRY_WHATSAPP[locale])} switchHref={localePath(otherLocale(locale), "/blog")}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <section className="blog-hero">
        <div className="container">
          <nav className="quote-crumbs" aria-label={t.breadcrumbAria}>
            <Link href={to("/")}>{t.home}</Link><span aria-hidden="true">/</span>
            <span aria-current="page">{c.title}</span>
          </nav>
          <p className="eyebrow eyebrow-light">{c.eyebrow}</p>
          <h1><HeadingText value={c.heading} /></h1>
          <p>{c.description}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {posts.length > 0 ? (
            <div className="blog-grid">
              {posts.map((post) => (
                <article className="blog-card" key={post.slug}>
                  <Link className="blog-card-media" href={to(`/blog/${post.slug}`)} aria-label={post.title}>
                    {post.image ? (
                      <Image src={post.image.url} alt={post.image.alt || post.title} fill sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw" />
                    ) : null}
                    {post.category ? <span>{post.category}</span> : null}
                  </Link>
                  <div className="blog-card-body">
                    <p className="blog-card-meta">
                      {[formatDate(post.publishedDate, locale), post.readingTime ? t.readingTime(post.readingTime) : null]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                    <h2><Link href={to(`/blog/${post.slug}`)}>{post.title}</Link></h2>
                    <p>{post.description}</p>
                    <Link className="blog-card-link" href={to(`/blog/${post.slug}`)}>
                      {t.readArticle} <span aria-hidden="true">{arrowForward}</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="blog-empty">
              <h2>{t.emptyBlogTitle}</h2>
              <p>{t.emptyBlogText}</p>
              <Link className="button button-outline" href={to("/quote")}>{t.requestQuote} <span aria-hidden="true">{arrowForward}</span></Link>
            </div>
          )}
        </div>
      </section>
    </SiteShell>
  );
}
