import Image from "next/image";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { whatsappLink } from "./site";
import { SERVICES } from "./services/services-data";
import { getPosts } from "@/lib/strapi";
import { formatDate } from "@/lib/format";
import { BadgeDollarSign, Building2, FileText, FlaskConical, Flower2, House, Leaf, MessageCircle, Mountain, RefreshCw, Send, SlidersHorizontal, Sparkles, Search, Sprout, Wrench } from "lucide-react";

// Strapi reads degrade to an empty result instead of throwing, so a render that
// happens while Strapi is unset or down still succeeds - it just produces an
// empty blog, a sitemap with no posts, or a 404 for a post that exists. When
// STRAPI_URL is missing, lib/strapi.js returns before making any fetch, so that
// render registers no revalidation at all and Next caches it as fully static:
// stale-while-revalidate was a year. This caps every such mistake at a minute.
export const revalidate = 60;

const defaultMessage = "السلام عليكم، أرغب في الاستفسار عن خدمات ومنتجات حقول السلام وطلب عرض سعر.";
const whatsapp = (message = defaultMessage) => whatsappLink(message);


const reasons = [
  ["01", "قيمة أفضل مقابل السعر", "حلول وخيارات تناسب احتياجات وميزانية مشروعك.", "value"],
  ["02", "حلول زراعية متكاملة", "من الشتلات والنباتات إلى تنسيق الحدائق واللاندسكيب.", "leaf"],
  ["03", "خيارات لمختلف المشاريع", "نخدم الفلل والحدائق والمزارع والمشاريع المختلفة.", "projects"],
  ["04", "اهتمام باحتياجات العميل", "نساعدك على اختيار الحل المناسب لمشروعك.", "refresh"],
  ["05", "سرعة وسهولة التواصل", "تواصل مباشر وسريع عبر واتساب.", "message"],
  ["06", "مرونة في الكميات", "خيارات تناسب الاحتياجات المختلفة والمشاريع بمختلف أحجامها.", "sliders"],
];

const steps = [
  ["01", "أرسل متطلباتك", "املأ نموذجاً قصيراً، ويصلنا طلبك عبر واتساب.", "send"],
  ["02", "نراجع احتياجات مشروعك", "يساعدك فريقنا في تحديد الخيارات المناسبة.", "search"],
  ["03", "تحصل على عرض السعر", "نقدم لك عرضًا بناءً على المنتجات أو الخدمات المطلوبة.", "file"],
  ["04", "نبدأ تنفيذ طلبك", "نعمل على توفير احتياجاتك ومتابعة طلبك.", "sparkles"],
];

const faqs = [
  ["هل توفرون الشتلات للمشاريع الكبيرة؟", "نعم، نوفر خيارات تناسب المشاريع بمختلف أحجامها وفق الاحتياجات والكميات المطلوبة."],
  ["هل تقدمون خدمات تنسيق الحدائق؟", "نعم، نقدم خدمات تنسيق الحدائق وأعمال اللاندسكيب وفق متطلبات المشروع."],
  ["كيف يمكنني الحصول على عرض سعر؟", "املأ نموذج طلب عرض السعر في أقل من دقيقتين، وسيصلنا طلبك عبر واتساب بكل التفاصيل. ويمكنك أيضاً مراسلتنا مباشرة عبر واتساب."],
  ["هل تتوفر أنواع مختلفة من الشتلات؟", "نوفر خيارات متنوعة من الشتلات والنباتات حسب المتاح واحتياجات المشروع."],
  ["هل توفرون مستلزمات زراعية؟", "نعم، نوفر مجموعة من الأدوات والمستلزمات والمنتجات الزراعية."],
];

const projects = [
  ["/images/landscape-project-v2.webp", "توريد وتنسيق", "حدائق تنمو بالحياة"],
  ["/images/nursery-hero-v2.webp", "لاندسكيب", "مساحات تليق بك"],
  ["/images/nursery-care-v2.webp", "نباتات داخلية", "طبيعة في كل زاوية"],
];

export default async function Home() {
  const { posts: latestPosts } = await getPosts({ pageSize: 3 });
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <SiteShell whatsappUrl={whatsapp()}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <div id="top" />
      <section className="hero"><div className="hero-media" /><div className="container hero-content reveal"><p className="eyebrow">حلول زراعية متكاملة للمشاريع والحدائق</p><h1>أفضل قيمة مقابل السعر في توريد الشتلات بالمملكة</h1><p className="hero-copy">نوفر مجموعة متنوعة من الشتلات والنباتات والخدمات الزراعية بأسعار تنافسية، مع حلول تناسب الفلل والحدائق والمزارع والمشاريع السكنية والتجارية.</p><div className="hero-actions"><Link className="button button-gold" href="/quote">اطلب عرض السعر <span aria-hidden="true">←</span></Link><a className="text-link" href="#services">تعرّف على خدماتنا <span aria-hidden="true">←</span></a></div><p className="trust-line"><span aria-hidden="true">✦</span> أرسل متطلبات مشروعك، وسنساعدك في اختيار الحل المناسب.</p></div><div className="hero-scroll">مرر للاستكشاف <span aria-hidden="true">↓</span></div></section>

      <section className="section services" id="services"><div className="container"><Heading eyebrow="ما نقدمه لك" title={<>كل ما يحتاجه مشروعك<br/><em>الزراعي في مكان واحد</em></>} text="نوفر مجموعة متكاملة من المنتجات والخدمات الزراعية لتلبية احتياجات الأفراد والمشاريع بمختلف أحجامها."/><div className="services-grid">{SERVICES.map((service,index)=><article className="service-card reveal" key={service.slug}><div className="card-top"><span className="service-number">{String(index+1).padStart(2,"0")}</span><span className="service-icon" aria-hidden="true"><LineIcon path={service.icon}/></span></div><h3>{service.title}</h3><p>{service.summary}</p><Link href={`/services/${service.slug}`}>تفاصيل الخدمة <span aria-hidden="true">←</span></Link></article>)}</div><div className="section-cta"><Link className="button button-outline" href="/services">كل الخدمات بالتفصيل <span aria-hidden="true">←</span></Link> <a className="button button-outline" href={whatsapp()} target="_blank" rel="noopener noreferrer">تحدث مع مستشار زراعي <span aria-hidden="true">↗</span></a></div></div></section>

      <section className="value-section" id="about"><div className="container value-grid"><div className="value-art reveal"><div className="image-frame"/><span className="stamp">من<br/>الأرض<br/>نبدأ</span></div><div className="value-copy reveal"><p className="eyebrow eyebrow-light">حلول مدروسة لمختلف الاحتياجات</p><h2>قيمة أفضل<br/><em>لمشروعك</em></h2><p>نحرص في حقول السلام على تقديم حلول زراعية تحقق أفضل قيمة ممكنة، من خلال توفير المنتجات والخدمات المناسبة بأسعار تنافسية تتوافق مع احتياجات المشروع.</p><Link className="button button-gold" href="/quote">احصل على عرض سعر مخصص <span aria-hidden="true">←</span></Link></div></div></section>

      <section className="section reasons"><div className="container"><Heading compact eyebrow="لماذا حقول السلام؟" title={<>لماذا يختارنا<br/><em>عملاؤنا؟</em></>} action={<a className="text-link" href={whatsapp()} target="_blank" rel="noopener noreferrer">ابدأ محادثة الآن ←</a>}/><div className="reasons-grid">{reasons.map(([number,title,text,path])=><article className="reason reveal" key={number}><span className="reason-number">{number}</span><span className="reason-icon" aria-hidden="true"><LineIcon path={path}/></span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>

      <section className="section projects" id="projects"><div className="container"><Heading eyebrow="من أعمالنا" title={<>شاهد جانبًا<br/><em>من أعمالنا</em></>} text="نماذج من مشاريعنا وخدماتنا في مجال تنسيق الحدائق واللاندسكيب وتوريد النباتات والشتلات."/><div className="projects-grid">{projects.map(([src,type,title])=><a className="project-card reveal" href={whatsapp(`السلام عليكم، أرغب في مشاهدة تفاصيل عمل ${title}.`)} target="_blank" rel="noopener noreferrer" key={title}><Image src={src} alt={title} fill sizes="(max-width: 800px) 100vw, 40vw"/><span className="project-overlay"><small>{type}</small><strong>{title}</strong><i aria-hidden="true">↗</i></span></a>)}</div></div></section>

      <section className="process-section"><div className="container"><Heading compact light eyebrow="بكل وضوح وسهولة" title={<>كيف تبدأ<br/><em>معنا؟</em></>} text="من أول رسالة وحتى استلام طلبك، نرافقك بخطوات واضحة وسريعة."/><div className="steps">{steps.map(([number,title,text,path])=><article className="step reveal" key={number}><span className="step-number">{number}</span><span className="step-icon" aria-hidden="true"><LineIcon path={path}/></span><h3>{title}</h3><p>{text}</p></article>)}</div><div className="process-cta"><Link className="button button-gold" href="/quote">ابدأ طلب عرض السعر <span aria-hidden="true">←</span></Link></div></div></section>

      <section className="section faq" id="faq"><div className="container faq-grid"><div className="faq-intro reveal"><p className="eyebrow">نجيب عن أسئلتك</p><h2>الأسئلة الأكثر<br/><em>شيوعًا</em></h2><p>لم تجد إجابة سؤالك؟ تواصل معنا مباشرة، وسنكون سعداء بمساعدتك.</p><a className="text-link" href={whatsapp()} target="_blank" rel="noopener noreferrer">اسألنا عبر واتساب ←</a></div><div className="faq-list">{faqs.map(([question,answer],index)=><details className="faq-item reveal" open={index===0 ? true : undefined} key={question}><summary><span>{question}</span><b aria-hidden="true">+</b></summary><p>{answer}</p></details>)}</div></div></section>

      <section className="section location-section" id="location"><div className="container"><Heading eyebrow="موقعنا" title={<>زورونا في <em>حقول السلام</em></>} text="تصفح موقعنا على الخريطة، واستخدم أزرار التكبير والتصغير للوصول إلينا بسهولة."/><div className="location-map"><iframe src="https://www.google.com/maps?q=24.6158125,46.7099375&z=16&output=embed" title="موقع شركة حقول السلام على الخريطة" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen/></div><div className="location-actions"><a className="button button-outline" href="https://maps.app.goo.gl/QAJ4nZD6hWkoBAJq5" target="_blank" rel="noopener noreferrer">فتح الموقع في خرائط Google <span aria-hidden="true">↗</span></a></div></div></section>

      <section className="section latest-blog" id="blog"><div className="container"><Heading compact eyebrow="من المدونة" title={<>معرفة تساعدك<br/><em>على النمو</em></>} action={<Link className="text-link" href="/blog">كل المقالات <span aria-hidden="true">←</span></Link>}/>{latestPosts.length > 0 ? <div className="blog-grid">{latestPosts.map(post=><article className="blog-card reveal" key={post.slug}><Link className="blog-card-media" href={`/blog/${post.slug}`} aria-label={post.title}>{post.image ? <Image src={post.image.url} alt={post.image.alt || post.title} fill sizes="(max-width: 600px) 100vw, 33vw"/> : null}{post.category ? <span>{post.category}</span> : null}</Link><div className="blog-card-body"><p className="blog-card-meta">{formatDate(post.publishedDate)}</p><h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3><p>{post.description}</p><Link className="blog-card-link" href={`/blog/${post.slug}`}>اقرأ المقال <span aria-hidden="true">←</span></Link></div></article>)}</div> : <div className="blog-empty"><h3>مقالات جديدة قريباً</h3><p>سيظهر هنا أحدث محتوى المدونة بمجرد نشره.</p></div>}</div></section>

      <section className="final-cta"><div className="container final-cta-inner reveal"><p className="eyebrow eyebrow-light">جاهزون لمساعدتك</p><h2>لنبدأ مشروعك<br/><em>الأخضر</em></h2><p>سواء كنت تحتاج إلى توريد شتلات، أو تنسيق حديقة، أو تنفيذ أعمال لاندسكيب، تواصل مع فريق حقول السلام وأرسل تفاصيل احتياجات مشروعك.</p><div className="final-actions"><Link className="button button-gold" href="/quote">اطلب عرض السعر <span aria-hidden="true">←</span></Link><span className="phone">واتساب <strong dir="ltr">+966553383596</strong></span></div></div></section>
    </SiteShell>
  );
}

function Heading({eyebrow,title,text,action,compact=false,light=false}) {
  return <div className={`section-heading${compact ? " compact" : ""} reveal`}><div><p className={`eyebrow${light ? " eyebrow-light" : ""}`}>{eyebrow}</p><h2>{title}</h2></div>{text && <p>{text}</p>}{action}</div>;
}

function LineIcon({path}) {
  const icons = {value: BadgeDollarSign, leaf: Leaf, projects: Building2, refresh: RefreshCw, message: MessageCircle, sliders: SlidersHorizontal, send: Send, search: Search, file: FileText, sparkles: Sparkles, sprout: Sprout, flower: Flower2, mountain: Mountain, houseplant: House, flask: FlaskConical, wrench: Wrench};
  const Icon = icons[path] || Leaf;
  return <Icon aria-hidden="true" strokeWidth={1.7}/>;
}
