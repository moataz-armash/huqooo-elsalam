import { Tajawal, Manrope } from "next/font/google";
import "./globals.css";
import { siteUrl, siteName, phoneE164, mapsUrl, geo } from "./site";

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-tajawal",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const description =
  "حقول السلام لتوريد الشتلات الزراعية وتنسيق الحدائق وأعمال اللاندسكيب والنباتات الداخلية والمستلزمات الزراعية في الرياض والمملكة العربية السعودية، بأفضل قيمة مقابل السعر.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "حقول السلام | توريد الشتلات وتنسيق الحدائق واللاندسكيب",
    template: `%s | ${siteName}`,
  },
  description,
  keywords: [
    "توريد شتلات",
    "شتلات زراعية",
    "تنسيق حدائق",
    "لاندسكيب",
    "نباتات داخلية",
    "مشاتل الرياض",
    "أسمدة ومبيدات",
    "حقول السلام",
  ],
  applicationName: siteName,
  authors: [{ name: siteName }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: "/",
    siteName,
    title: "حقول السلام | توريد الشتلات وتنسيق الحدائق واللاندسكيب",
    description,
    images: [
      {
        url: "/images/nursery-hero-v2.webp",
        width: 1983,
        height: 793,
        alt: "مشتل حقول السلام لتوريد الشتلات وتنسيق الحدائق",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "حقول السلام | حلول زراعية متكاملة",
    description,
    images: ["/images/nursery-hero-v2.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  category: "agriculture",
};

export const viewport = {
  themeColor: "#075442",
  width: "device-width",
  initialScale: 1,
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteUrl}/#business`,
  name: siteName,
  alternateName: "Huqool Alsalam",
  description,
  url: siteUrl,
  telephone: phoneE164,
  image: `${siteUrl}/images/nursery-hero-v2.webp`,
  logo: `${siteUrl}/images/logo.png`,
  priceRange: "$$",
  address: { "@type": "PostalAddress", addressCountry: "SA", addressRegion: "الرياض" },
  geo: { "@type": "GeoCoordinates", latitude: geo.latitude, longitude: geo.longitude },
  hasMap: mapsUrl,
  areaServed: { "@type": "Country", name: "المملكة العربية السعودية" },
  sameAs: [mapsUrl],
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: siteName,
  inLanguage: "ar",
  publisher: { "@id": `${siteUrl}/#business` },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" className={`${tajawal.variable} ${manrope.variable}`}>
      <head>
        <link rel="preload" as="image" href="/images/nursery-hero-v2.webp" fetchPriority="high" />
        {/* Without JS the reveal animation would leave the page blank. */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationLd, websiteLd]) }}
        />
      </body>
    </html>
  );
}
