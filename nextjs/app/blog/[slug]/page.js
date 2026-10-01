import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";
import SiteShell from "@/components/SiteShell";
import { getPost, getPostIndex, getPosts } from "@/lib/strapi";
import { formatDate } from "@/lib/format";
import { siteName, siteUrl, whatsappLink } from "../../site";

// Posts added after a deploy render on demand instead of 404ing, so an
// automation can publish without triggering a rebuild.
export const dynamicParams = true;

export async function generateStaticParams() {
  const index = await getPostIndex();
  return index.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  const url = `/blog/${post.slug}`;
  const title = post.seo.metaTitle || post.title;
  const description = post.seo.metaDescription || post.description;
  const image = post.seo.ogImage;
  return {
    title,
    description,
    keywords: post.seo.keywords ? post.seo.keywords.split(",").map((k) => k.trim()) : undefined,
    alternates: { canonical: post.seo.canonical || url },
    robots: post.seo.noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "article",
      locale: "ar_SA",
      url,
      siteName,
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

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const { posts } = await getPosts({ pageSize: 4 });
  const related = posts.filter((item) => item.slug !== post.slug).slice(0, 3);
  const pageUrl = `${siteUrl}/blog/${post.slug}`;
  const meta = [formatDate(post.publishedDate), post.author, post.readingTime ? `${post.readingTime} دقائق قراءة` : null]
    .filter(Boolean)
    .join(" · ");

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      image: post.image?.url ? [post.image.url] : undefined,
      datePublished: post.publishedDate || undefined,
      dateModified: post.updatedAt || post.publishedDate || undefined,
      inLanguage: "ar",
      mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
      author: post.author ? { "@type": "Person", name: post.author } : { "@id": `${siteUrl}/#business` },
      publisher: { "@id": `${siteUrl}/#business` },
      articleSection: post.category || undefined,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "الرئيسية", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "المدونة", item: `${siteUrl}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: pageUrl },
      ],
    },
  ];

  // Content comes from the client's own Strapi, written by their automation.
  const html = marked.parse(post.content || "", { gfm: true, breaks: true });

  return (
    <SiteShell whatsappUrl={whatsappLink("السلام عليكم، أرغب في الاستفسار عن خدمات حقول السلام.")}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="article-hero">
        <div className="container article-heading">
          <Link className="article-back" href="/blog">← العودة إلى المدونة</Link>
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
          <span>هل تحتاج مساعدة في مشروعك؟</span>
          <p>أرسل تفاصيل طلبك في أقل من دقيقتين، ويصلك عرض سعر يناسب احتياجك.</p>
          <Link href="/quote">اطلب عرض سعر <span aria-hidden="true">←</span></Link>
        </aside>
      </div>

      {related.length > 0 ? (
        <section className="section latest-blog">
          <div className="container">
            <div className="section-heading compact">
              <div>
                <p className="eyebrow">اقرأ أيضاً</p>
                <h2>مقالات أخرى</h2>
              </div>
              <Link className="text-link" href="/blog">كل المقالات <span aria-hidden="true">←</span></Link>
            </div>
            <div className="blog-grid">
              {related.map((item) => (
                <article className="blog-card" key={item.slug}>
                  <Link className="blog-card-media" href={`/blog/${item.slug}`} aria-label={item.title}>
                    {item.image ? (
                      <Image src={item.image.url} alt={item.image.alt || item.title} fill sizes="(max-width: 900px) 50vw, 33vw" />
                    ) : null}
                  </Link>
                  <div className="blog-card-body">
                    <p className="blog-card-meta">{formatDate(item.publishedDate)}</p>
                    <h3><Link href={`/blog/${item.slug}`}>{item.title}</Link></h3>
                    <Link className="blog-card-link" href={`/blog/${item.slug}`}>اقرأ المقال <span aria-hidden="true">←</span></Link>
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
