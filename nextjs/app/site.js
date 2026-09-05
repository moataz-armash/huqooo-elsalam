// Single source of truth for absolute URLs used in metadata, Open Graph,
// sitemap and JSON-LD.
//
// `www` is deliberate: it is the host that actually serves a 200. The apex
// (hqolalsalam.com) issues a 308 redirect to it, and pointing canonical or
// sitemap entries at a redirect makes Search Console report
// "Page with redirect". If the redirect direction is ever flipped in Vercel,
// change this value to match.
const PRODUCTION_URL = "https://www.hqolalsalam.com";

// NEXT_PUBLIC_SITE_URL stays supported as an override for a future domain,
// but nothing needs to be configured for the current one to be correct.
// Note: it must be created with Vercel's "Config" type, never "Secret" --
// a NEXT_PUBLIC_* value is inlined into the client bundle and is not secret.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || PRODUCTION_URL).replace(/\/$/, "");

export const siteName = "حقول السلام";
export const whatsappNumber = "966553383596";
export const phoneE164 = "+966553383596";
export const mapsUrl = "https://maps.app.goo.gl/QAJ4nZD6hWkoBAJq5";
export const geo = { latitude: 24.6158125, longitude: 46.7099375 };
