import Link from "next/link";
import { CircleCheck, Clock, MessageCircle } from "lucide-react";
import SiteShell from "@/components/SiteShell";
import QuoteForm from "@/components/QuoteForm";
import { siteName, siteUrl, whatsappLink } from "../site";

const title = "طلب عرض سعر";
const description =
  "أرسل تفاصيل طلبك في أقل من دقيقتين واحصل على عرض سعر لتوريد الشتلات وتنسيق الحدائق والنباتات الداخلية والمستلزمات الزراعية عبر واتساب.";

// alternates and openGraph are set in full: Next.js replaces these objects
// rather than merging them, so leaving them out would inherit the home
// page's canonical ("/") and point search engines away from this page.
export const metadata = {
  title,
  description,
  alternates: { canonical: "/quote" },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: "/quote",
    siteName,
    title: `${title} | ${siteName}`,
    description,
    images: [{ url: "/images/nursery-rows-v2.webp", width: 1536, height: 1024, alt: "مشتل حقول السلام" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ${siteName}`,
    description,
    images: ["/images/nursery-rows-v2.webp"],
  },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "الرئيسية", item: siteUrl },
    { "@type": "ListItem", position: 2, name: title, item: `${siteUrl}/quote` },
  ],
};

export default function QuotePage() {
  return (
    <SiteShell whatsappUrl={whatsappLink("السلام عليكم، أرغب في الاستفسار عن خدمات ومنتجات حقول السلام.")}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <section className="quote-hero">
        <div className="container">
          <nav className="quote-crumbs" aria-label="مسار التنقل">
            <Link href="/">الرئيسية</Link><span aria-hidden="true">/</span><span aria-current="page">{title}</span>
          </nav>
          <p className="eyebrow eyebrow-light">عرض سعر مجاني وبدون التزام</p>
          <h1>اطلب عرض سعر<br /><em>في أقل من دقيقتين</em></h1>
          <p className="quote-hero-intro">
            أجب عن أسئلة سريعة، وستصلنا تفاصيل طلبك عبر واتساب ليجهّز فريقنا عرضاً يناسب مشروعك وميزانيتك.
          </p>
          <ul className="quote-hero-points">
            <li><Clock aria-hidden="true" />4 خطوات سريعة</li>
            <li><CircleCheck aria-hidden="true" />بدون أي التزام</li>
            <li><MessageCircle aria-hidden="true" />رد مباشر عبر واتساب</li>
          </ul>
        </div>
      </section>
      <QuoteForm />
    </SiteShell>
  );
}
