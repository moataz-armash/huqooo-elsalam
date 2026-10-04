import Image from "next/image";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { whatsappLink, siteName, siteUrl } from "@/app/site";
import { getServices } from "@/app/services/services-data";
import { getPosts } from "@/lib/strapi";
import { formatDate } from "@/lib/format";
import { config, localePath, otherLocale, sharedPathAlternates } from "@/app/i18n";
import { home } from "@/app/content/home";
import { ui, DEFAULT_WHATSAPP } from "@/app/content/ui";
import { HeadingText } from "./HeadingText";
import { BadgeDollarSign, Building2, FileText, FlaskConical, Flower2, House, Leaf, MessageCircle, Mountain, RefreshCw, Send, SlidersHorizontal, Sparkles, Search, Sprout, Wrench } from "lucide-react";

export function homeMetadata(locale) {
  const c = home(locale);
  const { ogLocale } = config(locale);
  const brand = ui(locale).brandName;
  const url = localePath(locale, "/");
  return {
    // absolute, not templated: the home page's own title already ends with the
    // brand, and the layout template would append it a second time.
    title: { absolute: c.metaTitle },
    description: c.metaDescription,
    keywords: c.keywords,
    alternates: { canonical: url, languages: sharedPathAlternates("/") },
    openGraph: {
      type: "website",
      locale: ogLocale,
      url,
      siteName: brand,
      title: c.metaTitle,
      description: c.metaDescription,
      images: [{ url: "/images/nursery-hero-v2.webp", width: 1983, height: 793, alt: c.heroImageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: c.twitterTitle,
      description: c.metaDescription,
      images: ["/images/nursery-hero-v2.webp"],
    },
  };
}

export default async function HomePage({ locale }) {
  const c = home(locale);
  const t = ui(locale);
  const { arrowForward } = config(locale);
  const services = getServices(locale);
  const { posts: latestPosts } = await getPosts(locale, { pageSize: 3 });
  const whatsapp = (message = DEFAULT_WHATSAPP[locale]) => whatsappLink(message);
  const to = (path) => localePath(locale, path);

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: c.faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <SiteShell locale={locale} whatsappUrl={whatsapp()} switchHref={localePath(otherLocale(locale), "/")}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <div id="top" />

      <section className="hero"><div className="hero-media" /><div className="container hero-content reveal"><p className="eyebrow">{c.heroEyebrow}</p><h1>{c.heroTitle}</h1><p className="hero-copy">{c.heroCopy}</p><div className="hero-actions"><Link className="button button-gold" href={to("/quote")}>{t.quoteCta} <span aria-hidden="true">{arrowForward}</span></Link><a className="text-link" href="#services">{c.heroServicesLink} <span aria-hidden="true">{arrowForward}</span></a></div><p className="trust-line"><span aria-hidden="true">✦</span> {c.heroTrust}</p></div><div className="hero-scroll">{c.heroScroll} <span aria-hidden="true">↓</span></div></section>

      <section className="section services" id="services"><div className="container"><Heading eyebrow={c.servicesEyebrow} title={<HeadingText value={c.servicesHeading} />} text={c.servicesText} /><div className="services-grid">{services.map((service, index) => <article className="service-card reveal" key={service.slug}><div className="card-top"><span className="service-number">{String(index + 1).padStart(2, "0")}</span><span className="service-icon" aria-hidden="true"><LineIcon path={service.icon} /></span></div><h3>{service.title}</h3><p>{service.summary}</p><Link href={to(`/services/${service.slug}`)}>{t.serviceDetails} <span aria-hidden="true">{arrowForward}</span></Link></article>)}</div><div className="section-cta"><Link className="button button-outline" href={to("/services")}>{c.allServicesDetailed} <span aria-hidden="true">{arrowForward}</span></Link> <a className="button button-outline" href={whatsapp()} target="_blank" rel="noopener noreferrer">{c.talkToAdvisor} <span aria-hidden="true">↗</span></a></div></div></section>

      <section className="value-section" id="about"><div className="container value-grid"><div className="value-art reveal"><div className="image-frame" /><span className="stamp">{c.stamp.map((line, i) => <span key={line}>{i > 0 && <br />}{line}</span>)}</span></div><div className="value-copy reveal"><p className="eyebrow eyebrow-light">{c.valueEyebrow}</p><h2><HeadingText value={c.valueHeading} /></h2><p>{c.valueText}</p><Link className="button button-gold" href={to("/quote")}>{c.valueCta} <span aria-hidden="true">{arrowForward}</span></Link></div></div></section>

      <section className="section reasons"><div className="container"><Heading compact eyebrow={c.reasonsEyebrow} title={<HeadingText value={c.reasonsHeading} />} action={<a className="text-link" href={whatsapp()} target="_blank" rel="noopener noreferrer">{c.reasonsAction} {arrowForward}</a>} /><div className="reasons-grid">{c.reasons.map(([number, title, text, path]) => <article className="reason reveal" key={number}><span className="reason-number">{number}</span><span className="reason-icon" aria-hidden="true"><LineIcon path={path} /></span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>

      <section className="section projects" id="projects"><div className="container"><Heading eyebrow={c.projectsEyebrow} title={<HeadingText value={c.projectsHeading} />} text={c.projectsText} /><div className="projects-grid">{c.projects.map(([src, type, title]) => <a className="project-card reveal" href={whatsapp(c.projectMessage(title))} target="_blank" rel="noopener noreferrer" key={title}><Image src={src} alt={title} fill sizes="(max-width: 800px) 100vw, 40vw" /><span className="project-overlay"><small>{type}</small><strong>{title}</strong><i aria-hidden="true">↗</i></span></a>)}</div></div></section>

      <section className="process-section"><div className="container"><Heading compact light eyebrow={c.processEyebrow} title={<HeadingText value={c.processHeading} />} text={c.processText} /><div className="steps">{c.steps.map(([number, title, text, path]) => <article className="step reveal" key={number}><span className="step-number">{number}</span><span className="step-icon" aria-hidden="true"><LineIcon path={path} /></span><h3>{title}</h3><p>{text}</p></article>)}</div><div className="process-cta"><Link className="button button-gold" href={to("/quote")}>{c.processCta} <span aria-hidden="true">{arrowForward}</span></Link></div></div></section>

      <section className="section faq" id="faq"><div className="container faq-grid"><div className="faq-intro reveal"><p className="eyebrow">{c.faqEyebrow}</p><h2><HeadingText value={c.faqHeading} /></h2><p>{c.faqText}</p><a className="text-link" href={whatsapp()} target="_blank" rel="noopener noreferrer">{c.faqAction} {arrowForward}</a></div><div className="faq-list">{c.faqs.map(([question, answer], index) => <details className="faq-item reveal" open={index === 0 ? true : undefined} key={question}><summary><span>{question}</span><b aria-hidden="true">+</b></summary><p>{answer}</p></details>)}</div></div></section>

      <section className="section location-section" id="location"><div className="container"><Heading eyebrow={c.locationEyebrow} title={<HeadingText value={c.locationHeading} />} text={c.locationText} /><div className="location-map"><iframe src="https://www.google.com/maps?q=24.6158125,46.7099375&z=16&output=embed" title={c.locationMapTitle} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /></div><div className="location-actions"><a className="button button-outline" href="https://maps.app.goo.gl/QAJ4nZD6hWkoBAJq5" target="_blank" rel="noopener noreferrer">{c.locationCta} <span aria-hidden="true">↗</span></a></div></div></section>

      <section className="section latest-blog" id="blog"><div className="container"><Heading compact eyebrow={c.blogEyebrow} title={<HeadingText value={c.blogHeading} />} action={<Link className="text-link" href={to("/blog")}>{t.allArticles} <span aria-hidden="true">{arrowForward}</span></Link>} />{latestPosts.length > 0 ? <div className="blog-grid">{latestPosts.map((post) => <article className="blog-card reveal" key={post.slug}><Link className="blog-card-media" href={to(`/blog/${post.slug}`)} aria-label={post.title}>{post.image ? <Image src={post.image.url} alt={post.image.alt || post.title} fill sizes="(max-width: 600px) 100vw, 33vw" /> : null}{post.category ? <span>{post.category}</span> : null}</Link><div className="blog-card-body"><p className="blog-card-meta">{formatDate(post.publishedDate, locale)}</p><h3><Link href={to(`/blog/${post.slug}`)}>{post.title}</Link></h3><p>{post.description}</p><Link className="blog-card-link" href={to(`/blog/${post.slug}`)}>{t.readArticle} <span aria-hidden="true">{arrowForward}</span></Link></div></article>)}</div> : <div className="blog-empty"><h3>{t.emptyBlogTitle}</h3><p>{t.emptyBlogHome}</p></div>}</div></section>

      <section className="final-cta"><div className="container final-cta-inner reveal"><p className="eyebrow eyebrow-light">{c.finalEyebrow}</p><h2><HeadingText value={c.finalHeading} /></h2><p>{c.finalText}</p><div className="final-actions"><Link className="button button-gold" href={to("/quote")}>{t.quoteCta} <span aria-hidden="true">{arrowForward}</span></Link><span className="phone">{c.finalPhoneLabel} <strong dir="ltr">+966553383596</strong></span></div></div></section>
    </SiteShell>
  );
}

function Heading({ eyebrow, title, text, action, compact = false, light = false }) {
  return <div className={`section-heading${compact ? " compact" : ""} reveal`}><div><p className={`eyebrow${light ? " eyebrow-light" : ""}`}>{eyebrow}</p><h2>{title}</h2></div>{text && <p>{text}</p>}{action}</div>;
}

function LineIcon({ path }) {
  const icons = { value: BadgeDollarSign, leaf: Leaf, projects: Building2, refresh: RefreshCw, message: MessageCircle, sliders: SlidersHorizontal, send: Send, search: Search, file: FileText, sparkles: Sparkles, sprout: Sprout, flower: Flower2, mountain: Mountain, houseplant: House, flask: FlaskConical, wrench: Wrench };
  const Icon = icons[path] || Leaf;
  return <Icon aria-hidden="true" strokeWidth={1.7} />;
}
