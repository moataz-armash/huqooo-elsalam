"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

const links = [["#top","الرئيسية"],["#about","من نحن"],["#services","خدماتنا"],["#projects","مشاريعنا"],["#blog","المدونة"],["#contact","تواصل معنا"]];

export default function SiteShell({children, whatsappUrl}) {
  const [menuOpen,setMenuOpen] = useState(false);
  const [scrolled,setScrolled] = useState(false);

  useEffect(()=>{
    const onScroll=()=>setScrolled(window.scrollY>40);
    onScroll(); window.addEventListener("scroll",onScroll,{passive:true});
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target)}}),{threshold:.12});
    document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
    return ()=>{window.removeEventListener("scroll",onScroll);observer.disconnect()};
  },[]);

  useEffect(()=>{document.body.classList.toggle("menu-open",menuOpen); return ()=>document.body.classList.remove("menu-open")},[menuOpen]);

  return <>
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`} data-header><div className="container header-inner"><a className="brand" href="#top" aria-label="حقول السلام - الرئيسية"><Image className="brand-logo" src="/images/logo.png" alt="شعار شركة حقول السلام" width={300} height={220} priority/></a><button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="primary-menu" aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"} onClick={()=>setMenuOpen(!menuOpen)}><span/><span/><span/></button><nav className={`main-nav${menuOpen ? " is-open" : ""}`} aria-label="القائمة الرئيسية"><ul id="primary-menu">{links.map(([href,label])=><li key={href}><a href={href} onClick={()=>setMenuOpen(false)}>{label}</a></li>)}</ul></nav><button className={`menu-backdrop${menuOpen ? " is-open" : ""}`} type="button" tabIndex="-1" aria-label="إغلاق القائمة" onClick={()=>setMenuOpen(false)}/><a className="button button-header" href={whatsappUrl} target="_blank">اطلب عرض السعر <span>↗</span></a></div></header>
    <main>{children}</main>
    <footer className="site-footer" id="contact"><div className="container footer-grid"><div><a className="brand brand-light" href="#top"><Image className="brand-logo footer-logo" src="/images/logo.png" alt="شعار شركة حقول السلام" width={300} height={220}/></a><p className="footer-intro">حقول السلام — حلول متكاملة للشتلات والحدائق والمشاريع الزراعية.</p></div><div><h3>روابط سريعة</h3>{links.slice(0,5).map(([href,label])=><a href={href} key={href}>{label}</a>)}</div><div><h3>تواصل معنا</h3><a href={whatsappUrl} target="_blank">واتساب: <bdi dir="ltr">(+966553383596)</bdi></a><a href="https://maps.app.goo.gl/QAJ4nZD6hWkoBAJq5" target="_blank">موقعنا على الخريطة ↗</a></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} حقول السلام. جميع الحقوق محفوظة.</span><span>نزرع الثقة، ونصنع الفرق.</span></div></footer>
    <a className="floating-whatsapp" href={whatsappUrl} target="_blank" aria-label="اطلب عرض السعر عبر واتساب"><MessageCircle aria-hidden="true" strokeWidth={1.8}/></a>
  </>;
}
