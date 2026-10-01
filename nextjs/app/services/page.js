import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import ServiceIcon from "./service-icon";
import { SERVICES } from "./services-data";
import { siteName, siteUrl, whatsappLink } from "../site";

const title = "خدماتنا";
const description =
  "خدمات حقول السلام الزراعية: توريد الشتلات، تنسيق الحدائق، أعمال اللاندسكيب، النباتات الداخلية، الأسمدة والمبيدات، والأدوات الزراعية. اطلب عرض سعر عبر واتساب.";

export const metadata = {
  title: "خدماتنا الزراعية",
  description,
  alternates: { canonical: "/services" },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: "/services",
    siteName,
    title: `خدماتنا الزراعية | ${siteName}`,
    description,
    images: [{ url: "/images/nursery-hero-v2.webp", width: 1983, height: 793, alt: "مشتل حقول السلام" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `خدماتنا الزراعية | ${siteName}`,
    description,
    images: ["/images/nursery-hero-v2.webp"],
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "الرئيسية", item: siteUrl },
      { "@type": "ListItem", position: 2, name: title, item: `${siteUrl}/services` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: SERVICES.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.title,
      url: `${siteUrl}/services/${service.slug}`,
    })),
  },
];

export default function ServicesPage() {
  return (
    <SiteShell whatsappUrl={whatsappLink("السلام عليكم، أرغب في الاستفسار عن خدمات حقول السلام.")}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section
        className="page-hero"
        style={{ backgroundImage: "linear-gradient(115deg,rgba(4,45,35,.95),rgba(7,84,66,.82)), url('/images/nursery-hero-v2.webp')" }}
      >
        <div className="container">
          <nav className="quote-crumbs" aria-label="مسار التنقل">
            <Link href="/">الرئيسية</Link><span aria-hidden="true">/</span>
            <span aria-current="page">{title}</span>
          </nav>
          <p className="eyebrow eyebrow-light">ما نقدمه لك</p>
          <h1>كل ما يحتاجه مشروعك<br /><em>الزراعي في مكان واحد</em></h1>
          <p className="quote-hero-intro">
            ستة مجالات تغطي احتياجات الأفراد والمشاريع، من الشتلة الأولى حتى صيانة المساحة الخضراء.
          </p>
          <Link className="button button-gold" href="/quote">اطلب عرض سعر <span aria-hidden="true">←</span></Link>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="services-grid">
            {SERVICES.map((service, index) => (
              <article className="service-card" key={service.slug}>
                <div className="card-top">
                  <span className="service-number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="service-icon" aria-hidden="true"><ServiceIcon name={service.icon} /></span>
                </div>
                <h2>{service.title}</h2>
                <p>{service.summary}</p>
                <Link href={`/services/${service.slug}`}>تفاصيل الخدمة <span aria-hidden="true">←</span></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="service-cta">
        <div className="container">
          <h2>لست متأكداً أي خدمة تناسبك؟</h2>
          <p>أرسل تفاصيل مشروعك ويساعدك فريقنا على تحديد الخيار المناسب، مع عرض سعر واضح وبدون التزام.</p>
          <Link className="button button-gold" href="/quote">اطلب عرض سعر <span aria-hidden="true">←</span></Link>
        </div>
      </section>
    </SiteShell>
  );
}
