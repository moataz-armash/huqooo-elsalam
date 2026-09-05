// Single source of truth for absolute URLs used in metadata, Open Graph,
// sitemap and JSON-LD. Set NEXT_PUBLIC_SITE_URL in the deployment
// environment to the live domain before going to production.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://huqool-alsalam.com").replace(/\/$/, "");

export const siteName = "حقول السلام";
export const whatsappNumber = "966553383596";
export const phoneE164 = "+966553383596";
export const mapsUrl = "https://maps.app.goo.gl/QAJ4nZD6hWkoBAJq5";
export const geo = { latitude: 24.6158125, longitude: 46.7099375 };
