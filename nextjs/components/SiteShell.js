"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Languages, MessageCircle } from "lucide-react";
import { googleAdsConversionSendTo } from "@/app/site";
import { config, localePath, otherLocale } from "@/app/i18n";
import { ui } from "@/app/content/ui";

// Section anchors point at the home page so they also work from /quote.
// The footer keeps id="contact" so any existing /#contact link still lands
// there, but nothing in the nav points at it any more: it scrolled to the
// footer, which the quote button above it already covers.
// Each nav href is stored without a language prefix and localised here, so the
// English menu links to /en/services rather than back into the Arabic site.
const navHref = (locale, href) => {
  if (href.startsWith("#")) return href;
  if (href.startsWith("/#")) return `${localePath(locale, "/")}${href.slice(1)}`;
  return localePath(locale, href);
};

const NavLink = ({ href, children, onClick, className }) =>
  href.includes("#")
    ? <a href={href} onClick={onClick} className={className}>{children}</a>
    : <Link href={href} onClick={onClick} className={className}>{children}</Link>;

export default function SiteShell({ children, whatsappUrl, locale = "ar", switchHref }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const t = ui(locale);
  const { arrowForward } = config(locale);
  const quoteHref = localePath(locale, "/quote");
  const homeHref = localePath(locale, "/");
  const onQuote = pathname === quoteHref;
  const other = otherLocale(locale);
  // Falls back to the other language's home page. A page with no counterpart
  // (an article not translated yet) must still offer a working switch rather
  // than a link to a 404.
  const languageHref = switchHref || localePath(other, "/");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });

    const targets = [...document.querySelectorAll(".reveal")];
    const revealAll = () => targets.forEach((el) => el.classList.add("is-visible"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      revealAll();
      return () => window.removeEventListener("scroll", onScroll);
    }
    let observerFired = false;
    const observer = new IntersectionObserver((entries) => { observerFired = true; entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } }); }, { threshold: .12 });
    targets.forEach((el) => observer.observe(el));
    // Safety net: some embedded or offscreen contexts never deliver
    // observer callbacks at all. Don't leave the page invisible there.
    const fallback = window.setTimeout(() => { if (!observerFired) revealAll(); }, 1200);
    return () => { window.removeEventListener("scroll", onScroll); window.clearTimeout(fallback); observer.disconnect(); };
  }, [pathname]);

  // Google Ads conversion. There is no thank-you page to host the event
  // snippet, so a WhatsApp click is the conversion. One delegated listener
  // covers every wa.me link on the page, including those rendered by the
  // server component, which cannot carry onClick handlers.
  useEffect(() => {
    const onClick = (event) => {
      const link = event.target?.closest?.('a[href*="wa.me"]');
      // Skip clicks the page cancelled (an invalid quote form) and links
      // marked as re-opening an already-counted request.
      if (!link || event.defaultPrevented || link.hasAttribute("data-no-conversion") || typeof window.gtag !== "function") return;
      window.gtag("event", "conversion", { send_to: googleAdsConversionSendTo });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    if (!menuOpen) return () => document.body.classList.remove("menu-open");
    const onKey = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => { document.body.classList.remove("menu-open"); document.removeEventListener("keydown", onKey); };
  }, [menuOpen]);

  // The header is tight at tablet widths: an extra full-width nav item there
  // wrapped the WhatsApp button onto three lines. The header pill therefore
  // carries a short code, and the full language name appears only inside the
  // mobile drawer, where there is room for it.
  const languageSwitch = (className, label) => (
    <a className={className} href={languageHref} lang={other} aria-label={t.switchLanguageAria}>
      <Languages aria-hidden="true" strokeWidth={1.8} /><span className="lang-label">{label}</span>
    </a>
  );

  return <>
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`} data-header>
      <div className="container header-inner">
        <a className="brand" href={homeHref} aria-label={t.brandAria}>
          <Image className="brand-logo" src="/images/logo.png" alt={t.logoAlt} width={320} height={320} sizes="130px" priority />
        </a>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="primary-menu"
          aria-label={menuOpen ? t.closeMenu : t.openMenu} onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
        <nav className={`main-nav${menuOpen ? " is-open" : ""}`} aria-label={t.navAria}>
          <ul id="primary-menu">
            {t.nav.map(([href, label]) => (
              <li key={href}><NavLink href={navHref(locale, href)} onClick={() => setMenuOpen(false)}>{label}</NavLink></li>
            ))}
            {!onQuote && <li className="nav-quote"><Link href={quoteHref} onClick={() => setMenuOpen(false)}>{t.quoteCta}</Link></li>}
            <li className="nav-lang">{languageSwitch("", t.switchLanguage)}</li>
          </ul>
        </nav>
        <button className={`menu-backdrop${menuOpen ? " is-open" : ""}`} type="button" tabIndex="-1" aria-hidden="true"
          aria-label={t.closeMenu} onClick={() => setMenuOpen(false)} />
        {languageSwitch("lang-switch", t.switchShort)}
        {onQuote
          ? <a className="button button-header" href={whatsappUrl} target="_blank" rel="noopener noreferrer">{t.whatsappCta} <span aria-hidden="true">↗</span></a>
          : <Link className="button button-header" href={quoteHref}>{t.quoteCta} <span aria-hidden="true">{arrowForward}</span></Link>}
      </div>
    </header>

    <main>{children}</main>

    <footer className="site-footer" id="contact">
      <div className="container footer-grid">
        <div>
          <a className="brand brand-light" href={homeHref} aria-label={t.brandAria}>
            <Image className="brand-logo footer-logo" src="/images/logo.png" alt={t.logoAlt} width={320} height={320} sizes="160px" />
          </a>
          <p className="footer-intro">{t.footerIntro}</p>
        </div>
        <div>
          <h3>{t.quickLinks}</h3>
          {t.nav.map(([href, label]) => <NavLink href={navHref(locale, href)} key={href}>{label}</NavLink>)}
          <Link href={quoteHref}>{t.quoteLink}</Link>
        </div>
        <div>
          <h3>{t.contactUs}</h3>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">{t.whatsappLabel} <bdi dir="ltr">+966553383596</bdi></a>
          <a href="https://maps.app.goo.gl/QAJ4nZD6hWkoBAJq5" target="_blank" rel="noopener noreferrer">{t.mapLink} <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {t.brandName}. {t.rights}</span>
        <span>{t.tagline}</span>
        <span className="footer-credit">{t.developedBy} <a href="https://www.reviewup.store" target="_blank" rel="noopener noreferrer">Review Up</a></span>
      </div>
    </footer>

    {!onQuote && <a className="floating-whatsapp" href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label={t.whatsappAria}><MessageCircle aria-hidden="true" strokeWidth={1.8} /></a>}
  </>;
}
