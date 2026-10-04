import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import ServiceIcon from "@/components/ServiceIcon";
import { getServices } from "@/app/services/services-data";
import { siteName, siteUrl, whatsappLink } from "@/app/site";
import { config, localePath, otherLocale, sharedPathAlternates } from "@/app/i18n";
import { pages } from "@/app/content/pages";
import { ui, ENQUIRY_WHATSAPP } from "@/app/content/ui";
import { HeadingText } from "./HeadingText";

export function servicesMetadata(locale) {
  const c = pages(locale).servicesIndex;
  const { ogLocale } = config(locale);
  const brand = ui(locale).brandName;
  const url = localePath(locale, "/services");
  return {
    title: c.metaTitle,
    description: c.description,
    alternates: { canonical: url, languages: sharedPathAlternates("/services") },
    openGraph: {
      type: "website", locale: ogLocale, url, siteName: brand,
      title: `${c.metaTitle} | ${brand}`,
      description: c.description,
      images: [{ url: "/images/nursery-hero-v2.webp", width: 1983, height: 793, alt: c.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${c.metaTitle} | ${brand}`,
      description: c.description,
      images: ["/images/nursery-hero-v2.webp"],
    },
  };
}

export default function ServicesIndexPage({ locale }) {
  const c = pages(locale).servicesIndex;
  const t = ui(locale);
  const { arrowForward } = config(locale);
  const services = getServices(locale);
  const to = (path) => localePath(locale, path);
  const absolute = (path) => `${siteUrl}${to(path)}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: t.home, item: absolute("/") },
        { "@type": "ListItem", position: 2, name: c.title, item: absolute("/services") },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: service.title,
        url: absolute(`/services/${service.slug}`),
      })),
    },
  ];

  return (
    <SiteShell locale={locale} whatsappUrl={whatsappLink(ENQUIRY_WHATSAPP[locale])} switchHref={localePath(otherLocale(locale), "/services")}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section
        className="page-hero"
        style={{ backgroundImage: "linear-gradient(115deg,rgba(4,45,35,.95),rgba(7,84,66,.82)), url('/images/nursery-hero-v2.webp')" }}
      >
        <div className="container">
          <nav className="quote-crumbs" aria-label={t.breadcrumbAria}>
            <Link href={to("/")}>{t.home}</Link><span aria-hidden="true">/</span>
            <span aria-current="page">{c.title}</span>
          </nav>
          <p className="eyebrow eyebrow-light">{c.eyebrow}</p>
          <h1><HeadingText value={c.heading} /></h1>
          <p className="quote-hero-intro">{c.intro}</p>
          <Link className="button button-gold" href={to("/quote")}>{t.requestQuote} <span aria-hidden="true">{arrowForward}</span></Link>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="services-grid">
            {services.map((service, index) => (
              <article className="service-card" key={service.slug}>
                <div className="card-top">
                  <span className="service-number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="service-icon" aria-hidden="true"><ServiceIcon name={service.icon} /></span>
                </div>
                <h2>{service.title}</h2>
                <p>{service.summary}</p>
                <Link href={to(`/services/${service.slug}`)}>{t.serviceDetails} <span aria-hidden="true">{arrowForward}</span></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="service-cta">
        <div className="container">
          <h2>{c.ctaTitle}</h2>
          <p>{c.ctaText}</p>
          <Link className="button button-gold" href={to("/quote")}>{t.requestQuote} <span aria-hidden="true">{arrowForward}</span></Link>
        </div>
      </section>
    </SiteShell>
  );
}
