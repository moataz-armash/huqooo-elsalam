// Single source of truth for absolute URLs used in metadata, Open Graph,
// sitemap and JSON-LD.
//
// Resolution order:
//   1. NEXT_PUBLIC_SITE_URL   - set this once a real custom domain is attached.
//   2. VERCEL_PROJECT_PRODUCTION_URL - injected by Vercel at build time, so
//      deployments are correct with no configuration at all.
//   3. localhost              - local development.
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : null;

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  vercelUrl ||
  "http://localhost:3000"
).replace(/\/$/, "");

export const siteName = "حقول السلام";
export const whatsappNumber = "966553383596";
export const phoneE164 = "+966553383596";
export const mapsUrl = "https://maps.app.goo.gl/QAJ4nZD6hWkoBAJq5";
export const geo = { latitude: 24.6158125, longitude: 46.7099375 };
