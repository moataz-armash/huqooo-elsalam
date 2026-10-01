import Image from "next/image";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { getPosts } from "@/lib/strapi";
import { formatDate } from "@/lib/format";
import { siteName, siteUrl, whatsappLink } from "../site";

const title = "المدونة";
const description =
  "مقالات ونصائح من حقول السلام عن العناية بالنباتات، اختيار الشتلات المناسبة، تنسيق الحدائق، وأعمال اللاندسكيب في المملكة العربية السعودية.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: "/blog",
    siteName,
    title: `${title} | ${siteName}`,
    description,
    images: [{ url: "/images/nursery-care-v2.webp", width: 1024, height: 1536, alt: "مشتل حقول السلام" }],
  },
  twitter: { card: "summary_large_image", title: `${title} | ${siteName}`, description, images: ["/images/nursery-care-v2.webp"] },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "الرئيسية", item: siteUrl },
    { "@type": "ListItem", position: 2, name: title, item: `${siteUrl}/blog` },
  ],
};

export default async function BlogIndexPage() {
  const { posts } = await getPosts({ pageSize: 24 });

  return (
    <SiteShell whatsappUrl={whatsappLink("السلام عليكم، أرغب في الاستفسار عن خدمات حقول السلام.")}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <section className="blog-hero">
        <div className="container">
          <nav className="quote-crumbs" aria-label="مسار التنقل">
            <Link href="/">الرئيسية</Link><span aria-hidden="true">/</span>
            <span aria-current="page">{title}</span>
          </nav>
          <p className="eyebrow eyebrow-light">من المدونة</p>
          <h1>معرفة تساعدك<br /><em>على النمو</em></h1>
          <p>{description}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {posts.length > 0 ? (
            <div className="blog-grid">
              {posts.map((post) => (
                <article className="blog-card" key={post.slug}>
                  <Link className="blog-card-media" href={`/blog/${post.slug}`} aria-label={post.title}>
                    {post.image ? (
                      <Image src={post.image.url} alt={post.image.alt || post.title} fill sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw" />
                    ) : null}
                    {post.category ? <span>{post.category}</span> : null}
                  </Link>
                  <div className="blog-card-body">
                    <p className="blog-card-meta">
                      {[formatDate(post.publishedDate), post.readingTime ? `${post.readingTime} دقائق قراءة` : null]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                    <h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2>
                    <p>{post.description}</p>
                    <Link className="blog-card-link" href={`/blog/${post.slug}`}>
                      اقرأ المقال <span aria-hidden="true">←</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="blog-empty">
              <h2>مقالات جديدة قريباً</h2>
              <p>نجهّز محتوى يساعدك في العناية بنباتاتك وتخطيط مساحتك الخضراء. حتى ذلك الحين، تواصل معنا مباشرة لأي استفسار.</p>
              <Link className="button button-outline" href="/quote">اطلب عرض سعر <span aria-hidden="true">←</span></Link>
            </div>
          )}
        </div>
      </section>
    </SiteShell>
  );
}
