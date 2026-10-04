import Script from "next/script";
import { Tajawal, Manrope } from "next/font/google";
import "./globals.css";
import { siteUrl, siteName, phoneE164, mapsUrl, geo, googleAdsId } from "./site";
import { config } from "./i18n";
import { home } from "./content/home";
import { ui } from "./content/ui";

// Both root layouts share everything except <html lang> and dir. They cannot
// share a parent layout: in the App Router only a root layout may render
// <html>, and the two languages need different attributes on it, so each route
// group has its own root. This module holds what they have in common.
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

export const viewport = {
  themeColor: "#075442",
  width: "device-width",
  initialScale: 1,
};

export function rootMetadata(locale) {
  const c = home(locale);
  return {
    metadataBase: new URL(siteUrl),
    // The brand name is localised too: an English page titled
    // "... | حقول السلام" looks like a mistake in a search result.
    title: { default: c.metaTitle, template: `%s | ${ui(locale).brandName}` },
    description: c.metaDescription,
    applicationName: siteName,
    authors: [{ name: siteName }],
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    category: "agriculture",
  };
}

function structuredData(locale) {
  const c = home(locale);
  const areaServed = locale === "ar" ? "المملكة العربية السعودية" : "Saudi Arabia";
  const addressRegion = locale === "ar" ? "الرياض" : "Riyadh";

  // One business, described once per language. @id is the same in both so the
  // two descriptions are understood as the same entity rather than two
  // competing businesses at the same address.
  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#business`,
    name: ui(locale).brandName,
    alternateName: ui(locale === "ar" ? "en" : "ar").brandName,
    description: c.metaDescription,
    url: siteUrl,
    telephone: phoneE164,
    image: `${siteUrl}/images/nursery-hero-v2.webp`,
    logo: `${siteUrl}/images/logo.png`,
    priceRange: "$$",
    address: { "@type": "PostalAddress", addressCountry: "SA", addressRegion },
    geo: { "@type": "GeoCoordinates", latitude: geo.latitude, longitude: geo.longitude },
    hasMap: mapsUrl,
    areaServed: { "@type": "Country", name: areaServed },
    sameAs: [mapsUrl],
  };

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: ui(locale).brandName,
    inLanguage: locale,
    publisher: { "@id": `${siteUrl}/#business` },
  };

  return [organizationLd, websiteLd];
}

// Conversions are reported from any production build, which is what the
// server runs via `next start`. Host-agnostic on purpose: keying this to
// VERCEL_ENV silently disabled tracking the moment the site moved off Vercel.
// Vercel previews and local `next dev` stay out of the Ads account; export
// ANALYTICS_DISABLED=1 to silence a production build you are testing locally.
const analyticsEnabled =
  process.env.NODE_ENV === "production" &&
  process.env.VERCEL_ENV !== "preview" &&
  process.env.ANALYTICS_DISABLED !== "1";

export function RootHtml({ locale, children }) {
  const { htmlLang, dir } = config(locale);
  return (
    <html lang={htmlLang} dir={dir} className={`${tajawal.variable} ${manrope.variable}`}>
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(locale)) }}
        />
        {analyticsEnabled && (
          <>
            <Script
              id="gtag-src"
              src={`https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${googleAdsId}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
