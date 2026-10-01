import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
// This file's own directory, not process.cwd(): the dev server can be launched
// from the repo root (npm --prefix nextjs run dev), where cwd is the parent and
// Turbopack would take the wrong root. Next loads .env files before evaluating
// this config, so STRAPI_URL below is already populated either way.
const projectDir = dirname(fileURLToPath(import.meta.url));

// Blog images are served by Strapi, whose host is environment-specific, so the
// pattern is derived from STRAPI_URL rather than hard-coded.
const strapi = process.env.STRAPI_URL ? new URL(process.env.STRAPI_URL) : null;

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: { root: projectDir },
  images: {
    remotePatterns: strapi
      ? [{ protocol: strapi.protocol.replace(":", ""), hostname: strapi.hostname, port: strapi.port, pathname: "/**" }]
      : [],
  },
};

export default nextConfig;
