import Link from "next/link";
import { CircleCheck, Clock, MessageCircle } from "lucide-react";
import SiteShell from "@/components/SiteShell";
import QuoteForm from "@/components/QuoteForm";
import { siteName, siteUrl, whatsappLink } from "@/app/site";
import { config, localePath, otherLocale, sharedPathAlternates } from "@/app/i18n";
import { pages } from "@/app/content/pages";
import { ui } from "@/app/content/ui";
import { HeadingText } from "./HeadingText";

// alternates and openGraph are set in full: Next.js replaces these objects
// rather than merging them, so leaving them out would inherit the home
// page's canonical ("/") and point search engines away from this page.
export function quoteMetadata(locale) {
  const c = pages(locale).quote;
  const { ogLocale } = config(locale);
  const brand = ui(locale).brandName;
  const url = localePath(locale, "/quote");
  return {
    title: c.title,
    description: c.description,
    alternates: { canonical: url, languages: sharedPathAlternates("/quote") },
    openGraph: {
      type: "website", locale: ogLocale, url, siteName: brand,
      title: `${c.title} | ${brand}`,
      description: c.description,
      images: [{ url: "/images/nursery-rows-v2.webp", width: 1536, height: 1024, alt: c.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${c.title} | ${brand}`,
      description: c.description,
      images: ["/images/nursery-rows-v2.webp"],
    },
  };
}

export default function QuotePage({ locale }) {
  const c = pages(locale).quote;
  const t = ui(locale);
  const to = (path) => localePath(locale, path);
  const absolute = (path) => `${siteUrl}${to(path)}`;
  const icons = [Clock, CircleCheck, MessageCircle];

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t.home, item: absolute("/") },
      { "@type": "ListItem", position: 2, name: c.title, item: absolute("/quote") },
    ],
  };

  return (
    <SiteShell locale={locale} whatsappUrl={whatsappLink(c.whatsapp)} switchHref={localePath(otherLocale(locale), "/quote")}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <section className="quote-hero">
        <div className="container">
          <nav className="quote-crumbs" aria-label={t.breadcrumbAria}>
            <Link href={to("/")}>{t.home}</Link><span aria-hidden="true">/</span><span aria-current="page">{c.title}</span>
          </nav>
          <p className="eyebrow eyebrow-light">{c.eyebrow}</p>
          <h1><HeadingText value={c.heading} /></h1>
          <p className="quote-hero-intro">{c.intro}</p>
          <ul className="quote-hero-points">
            {c.points.map((point, i) => {
              const Icon = icons[i] || CircleCheck;
              return <li key={point}><Icon aria-hidden="true" />{point}</li>;
            })}
          </ul>
        </div>
      </section>
      <QuoteForm locale={locale} />
    </SiteShell>
  );
}
