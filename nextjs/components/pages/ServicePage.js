import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import SiteShell from "@/components/SiteShell";
import ServiceIcon from "@/components/ServiceIcon";
import { getService, getServices } from "@/app/services/services-data";
import { siteName, siteUrl, whatsappLink } from "@/app/site";
import { config, localePath, otherLocale, sharedPathAlternates } from "@/app/i18n";
import { pages } from "@/app/content/pages";
import { ui } from "@/app/content/ui";

export function serviceMetadata(locale, slug) {
  const service = getService(slug, locale);
  if (!service) return {};
  const { ogLocale } = config(locale);
  const brand = ui(locale).brandName;
  const path = `/services/${service.slug}`;
  const url = localePath(locale, path);
  const images = [{ url: service.image, alt: service.imageAlt }];
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: url, languages: sharedPathAlternates(path) },
    openGraph: {
      type: "article", locale: ogLocale, url, siteName: brand,
      title: `${service.metaTitle} | ${brand}`,
      description: service.metaDescription,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.metaTitle} | ${brand}`,
      description: service.metaDescription,
      images: [service.image],
    },
  };
}

export default function ServicePage({ locale, slug }) {
  const service = getService(slug, locale);
  if (!service) notFound();

  const c = pages(locale).service;
  const t = ui(locale);
  const { arrowForward } = config(locale);
  const to = (path) => localePath(locale, path);
  const absolute = (path) => `${siteUrl}${to(path)}`;
  const others = getServices(locale).filter((s) => s.slug !== service.slug);
  const quoteHref = to(`/quote?service=${service.quoteService}`);
  const pageUrl = absolute(`/services/${service.slug}`);
  const areaServed = locale === "ar" ? "المملكة العربية السعودية" : "Saudi Arabia";

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
      areaServed: { "@type": "Country", name: areaServed },
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
        { "@type": "ListItem", position: 1, name: t.home, item: absolute("/") },
        { "@type": "ListItem", position: 2, name: t.services, item: absolute("/services") },
        { "@type": "ListItem", position: 3, name: service.title, item: pageUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: locale,
      mainEntity: service.faqs.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ];

  return (
    <SiteShell
      locale={locale}
      whatsappUrl={whatsappLink(c.whatsapp(service.title))}
      switchHref={localePath(otherLocale(locale), `/services/${service.slug}`)}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section
        className="page-hero"
        style={{ backgroundImage: `linear-gradient(115deg,rgba(4,45,35,.95),rgba(7,84,66,.82)), url('${service.image}')` }}
      >
        <div className="container">
          <nav className="quote-crumbs" aria-label={t.breadcrumbAria}>
            <Link href={to("/")}>{t.home}</Link><span aria-hidden="true">/</span>
            <Link href={to("/services")}>{t.services}</Link><span aria-hidden="true">/</span>
            <span aria-current="page">{service.title}</span>
          </nav>
          <p className="eyebrow eyebrow-light">{c.eyebrow}</p>
          <h1>{service.heading}</h1>
          <p className="quote-hero-intro">{service.summary}</p>
          <Link className="button button-gold" href={quoteHref}>
            {c.quoteForService} <span aria-hidden="true">{arrowForward}</span>
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="container service-intro">
          <div>
            {service.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <h2>{c.whatItIncludes}</h2>
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
              <h2>{c.whoFor}</h2>
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
            <p className="eyebrow">{c.faqEyebrow}</p>
            <h2>{c.faqAbout(service.title)}</h2>
            <p>{c.faqText}</p>
            <Link className="text-link" href={quoteHref}>{t.requestQuote} <span aria-hidden="true">{arrowForward}</span></Link>
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
              <p className="eyebrow">{c.otherEyebrow}</p>
              <h2>{c.otherTitle}</h2>
            </div>
            <Link className="text-link" href={to("/services")}>{c.allServices} <span aria-hidden="true">{arrowForward}</span></Link>
          </div>
          <div className="other-services">
            {others.map((other) => (
              <Link className="other-service" href={to(`/services/${other.slug}`)} key={other.slug}>
                <span className="other-service-icon"><ServiceIcon name={other.icon} /></span>
                <span><strong>{other.title}</strong><small>{other.summary}</small></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="service-cta">
        <div className="container">
          <h2>{c.ctaTitle(service.title)}</h2>
          <p>{c.ctaText}</p>
          <Link className="button button-gold" href={quoteHref}>{t.requestQuote} <span aria-hidden="true">{arrowForward}</span></Link>
        </div>
      </section>
    </SiteShell>
  );
}
