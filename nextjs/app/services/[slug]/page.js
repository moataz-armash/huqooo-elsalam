import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import SiteShell from "@/components/SiteShell";
import ServiceIcon from "../service-icon";
import { SERVICES, getService } from "../services-data";
import { siteName, siteUrl, whatsappLink } from "../../site";

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  const url = `/services/${service.slug}`;
  const images = [{ url: service.image, alt: service.imageAlt }];
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "ar_SA",
      url,
      siteName,
      title: `${service.metaTitle} | ${siteName}`,
      description: service.metaDescription,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.metaTitle} | ${siteName}`,
      description: service.metaDescription,
      images: [service.image],
    },
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = SERVICES.filter((s) => s.slug !== service.slug);
  const quoteHref = `/quote?service=${service.quoteService}`;
  const pageUrl = `${siteUrl}/services/${service.slug}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.title,
      serviceType: service.title,
      description: service.metaDescription,
      url: pageUrl,
      image: `${siteUrl}${service.image}`,
      provider: { "@id": `${siteUrl}/#business` },
      areaServed: { "@type": "Country", name: "المملكة العربية السعودية" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: service.title,
        itemListElement: service.includes.map(([name, description]) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name, description },
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "الرئيسية", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "خدماتنا", item: `${siteUrl}/services` },
        { "@type": "ListItem", position: 3, name: service.title, item: pageUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: service.faqs.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ];

  return (
    <SiteShell whatsappUrl={whatsappLink(`السلام عليكم، أرغب في الاستفسار عن خدمة ${service.title}.`)}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section
        className="page-hero"
        style={{ backgroundImage: `linear-gradient(115deg,rgba(4,45,35,.95),rgba(7,84,66,.82)), url('${service.image}')` }}
      >
        <div className="container">
          <nav className="quote-crumbs" aria-label="مسار التنقل">
            <Link href="/">الرئيسية</Link><span aria-hidden="true">/</span>
            <Link href="/services">خدماتنا</Link><span aria-hidden="true">/</span>
            <span aria-current="page">{service.title}</span>
          </nav>
          <p className="eyebrow eyebrow-light">من خدماتنا</p>
          <h1>{service.heading}</h1>
          <p className="quote-hero-intro">{service.summary}</p>
          <Link className="button button-gold" href={quoteHref}>
            اطلب عرض سعر لهذه الخدمة <span aria-hidden="true">←</span>
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="container service-intro">
          <div>
            {service.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <h2>ما تشمله الخدمة</h2>
            <ul className="feature-grid">
              {service.includes.map(([name, description]) => (
                <li className="feature" key={name}>
                  <span className="feature-tick" aria-hidden="true"><Check /></span>
                  <div><strong>{name}</strong><span>{description}</span></div>
                </li>
              ))}
            </ul>
          </div>
          <aside className="service-aside">
            <div className="service-figure">
              <Image src={service.image} alt={service.imageAlt} fill sizes="(max-width: 900px) 100vw, 380px" />
            </div>
            <div className="audience-card">
              <h2>لمن هذه الخدمة؟</h2>
              <ul>
                {service.audience.map((item) => (
                  <li key={item}><Check aria-hidden="true" />{item}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="section faq">
        <div className="container faq-grid">
          <div className="faq-intro">
            <p className="eyebrow">أسئلة شائعة</p>
            <h2>عن {service.title}</h2>
            <p>لم تجد إجابة سؤالك؟ أرسل تفاصيل طلبك وسنوضّح لك كل ما تحتاجه قبل أي التزام.</p>
            <Link className="text-link" href={quoteHref}>اطلب عرض سعر <span aria-hidden="true">←</span></Link>
          </div>
          <div className="faq-list">
            {service.faqs.map(([question, answer], index) => (
              <details className="faq-item" key={question} open={index === 0 ? true : undefined}>
                <summary><span>{question}</span><b aria-hidden="true">+</b></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section other-services-section">
        <div className="container">
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">خدمات أخرى</p>
              <h2>قد تحتاج أيضاً</h2>
            </div>
            <Link className="text-link" href="/services">كل الخدمات <span aria-hidden="true">←</span></Link>
          </div>
          <div className="other-services">
            {others.map((other) => (
              <Link className="other-service" href={`/services/${other.slug}`} key={other.slug}>
                <span className="other-service-icon"><ServiceIcon name={other.icon} /></span>
                <span><strong>{other.title}</strong><small>{other.summary}</small></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="service-cta">
        <div className="container">
          <h2>جاهز للبدء في {service.title}؟</h2>
          <p>أرسل تفاصيل مشروعك في أقل من دقيقتين، ويصلك عرض سعر يناسب احتياجك وميزانيتك.</p>
          <Link className="button button-gold" href={quoteHref}>اطلب عرض سعر <span aria-hidden="true">←</span></Link>
        </div>
      </section>
    </SiteShell>
  );
}
