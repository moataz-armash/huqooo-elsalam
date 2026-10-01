"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { googleAdsConversionSendTo } from "@/app/site";

// Section anchors point at the home page so they also work from /quote.
// #contact is the footer, which every page has, so it stays page-local.
const links = [["/#top","الرئيسية"],["/#about","من نحن"],["/services","خدماتنا"],["/#projects","مشاريعنا"],["/blog","المدونة"],["#contact","تواصل معنا"]];
const QUOTE = "/quote";
const NavLink = ({href, children, onClick, className}) =>
  href.includes("#")
    ? <a href={href} onClick={onClick} className={className}>{children}</a>
    : <Link href={href} onClick={onClick} className={className}>{children}</Link>;

export default function SiteShell({children, whatsappUrl}) {
  const [menuOpen,setMenuOpen] = useState(false);
  const [scrolled,setScrolled] = useState(false);
  const pathname = usePathname();
  const onQuote = pathname === QUOTE;

  useEffect(()=>{
    const onScroll=()=>setScrolled(window.scrollY>40);
    onScroll(); window.addEventListener("scroll",onScroll,{passive:true});

    const targets=[...document.querySelectorAll(".reveal")];
    const revealAll=()=>targets.forEach(el=>el.classList.add("is-visible"));
    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if(reduced || typeof IntersectionObserver==="undefined"){
      revealAll();
      return ()=>window.removeEventListener("scroll",onScroll);
    }
    let observerFired=false;
    const observer=new IntersectionObserver(entries=>{observerFired=true;entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target)}})},{threshold:.12});
    targets.forEach(el=>observer.observe(el));
    // Safety net: some embedded or offscreen contexts never deliver
    // observer callbacks at all. Don't leave the page invisible there.
    const fallback=window.setTimeout(()=>{if(!observerFired) revealAll()},1200);
    return ()=>{window.removeEventListener("scroll",onScroll);window.clearTimeout(fallback);observer.disconnect()};
  },[pathname]);

  // Google Ads conversion. There is no thank-you page to host the event
  // snippet, so a WhatsApp click is the conversion. One delegated listener
  // covers every wa.me link on the page, including those rendered by the
  // server component, which cannot carry onClick handlers.
  useEffect(()=>{
    const onClick=event=>{
      const link=event.target?.closest?.('a[href*="wa.me"]');
      // Skip clicks the page cancelled (an invalid quote form) and links
      // marked as re-opening an already-counted request.
      if(!link || event.defaultPrevented || link.hasAttribute("data-no-conversion") || typeof window.gtag!=="function") return;
      window.gtag("event","conversion",{send_to:googleAdsConversionSendTo});
    };
    document.addEventListener("click",onClick);
    return ()=>document.removeEventListener("click",onClick);
  },[]);

  useEffect(()=>{
    document.body.classList.toggle("menu-open",menuOpen);
    if(!menuOpen) return ()=>document.body.classList.remove("menu-open");
    const onKey=e=>{if(e.key==="Escape") setMenuOpen(false)};
    document.addEventListener("keydown",onKey);
    return ()=>{document.body.classList.remove("menu-open");document.removeEventListener("keydown",onKey)};
  },[menuOpen]);

  return <>
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`} data-header><div className="container header-inner"><a className="brand" href="/#top" aria-label="حقول السلام - الرئيسية"><Image className="brand-logo" src="/images/logo.png" alt="شعار شركة حقول السلام" width={320} height={320} sizes="130px" priority/></a><button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="primary-menu" aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"} onClick={()=>setMenuOpen(!menuOpen)}><span/><span/><span/></button><nav className={`main-nav${menuOpen ? " is-open" : ""}`} aria-label="القائمة الرئيسية"><ul id="primary-menu">{links.map(([href,label])=><li key={href}><NavLink href={href} onClick={()=>setMenuOpen(false)}>{label}</NavLink></li>)}{!onQuote && <li className="nav-quote"><Link href={QUOTE} onClick={()=>setMenuOpen(false)}>اطلب عرض السعر</Link></li>}</ul></nav><button className={`menu-backdrop${menuOpen ? " is-open" : ""}`} type="button" tabIndex="-1" aria-hidden="true" aria-label="إغلاق القائمة" onClick={()=>setMenuOpen(false)}/>{onQuote ? <a className="button button-header" href={whatsappUrl} target="_blank" rel="noopener noreferrer">راسلنا على واتساب <span aria-hidden="true">↗</span></a> : <Link className="button button-header" href={QUOTE}>اطلب عرض السعر <span aria-hidden="true">←</span></Link>}</div></header>
    <main>{children}</main>
    <footer className="site-footer" id="contact"><div className="container footer-grid"><div><a className="brand brand-light" href="/#top" aria-label="حقول السلام - الرئيسية"><Image className="brand-logo footer-logo" src="/images/logo.png" alt="شعار شركة حقول السلام" width={320} height={320} sizes="160px"/></a><p className="footer-intro">حقول السلام — حلول متكاملة للشتلات والحدائق والمشاريع الزراعية.</p></div><div><h3>روابط سريعة</h3>{links.slice(0,5).map(([href,label])=><NavLink href={href} key={href}>{label}</NavLink>)}<Link href={QUOTE}>طلب عرض سعر</Link></div><div><h3>تواصل معنا</h3><a href={whatsappUrl} target="_blank" rel="noopener noreferrer">واتساب: <bdi dir="ltr">+966553383596</bdi></a><a href="https://maps.app.goo.gl/QAJ4nZD6hWkoBAJq5" target="_blank" rel="noopener noreferrer">موقعنا على الخريطة <span aria-hidden="true">↗</span></a></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} حقول السلام. جميع الحقوق محفوظة.</span><span>نزرع الثقة، ونصنع الفرق.</span><span className="footer-credit">تم التطوير بواسطة <a href="https://www.reviewup.store" target="_blank" rel="noopener noreferrer">Review Up</a></span></div></footer>
    {!onQuote && <a className="floating-whatsapp" href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="تواصل معنا عبر واتساب"><MessageCircle aria-hidden="true" strokeWidth={1.8}/></a>}
  </>;
}
