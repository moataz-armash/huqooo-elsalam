// Locale configuration for the bilingual site.
//
// Arabic is served from the root ("/", "/services", "/blog/...") and English
// from "/en/...". That asymmetry is deliberate: the Arabic URLs are already
// indexed and listed in a submitted sitemap, and moving them under "/ar" would
// break every one of them. Arabic is also the primary audience.
//
// Everything that differs between the two languages is a lookup here or in the
// content files, never a second copy of a page. Duplicated pages drift, and a
// bug then has to be found and fixed twice.

export const LOCALES = ["ar", "en"];
export const DEFAULT_LOCALE = "ar";

export const LOCALE_CONFIG = {
  ar: {
    code: "ar",
    dir: "rtl",
    htmlLang: "ar",
    ogLocale: "ar_SA",
    // Arrow glyphs point the way reading runs, so they flip with direction.
    arrowForward: "←",
    arrowBack: "→",
    name: "العربية",
    switchName: "English",
    dateLocale: "ar-SA-u-ca-gregory-nu-latn",
  },
  en: {
    code: "en",
    dir: "ltr",
    htmlLang: "en",
    ogLocale: "en_US",
    arrowForward: "→",
    arrowBack: "←",
    name: "English",
    switchName: "العربية",
    dateLocale: "en-GB",
  },
};

export const isLocale = (value) => LOCALES.includes(value);
export const config = (locale) => LOCALE_CONFIG[locale] || LOCALE_CONFIG[DEFAULT_LOCALE];
export const otherLocale = (locale) => (locale === "ar" ? "en" : "ar");

// Turns a locale-less path ("/services") into the real one for a locale.
// Arabic has no prefix; English gets "/en". Always returns a leading slash and
// never a trailing one, so it can be compared and concatenated safely.
export function localePath(locale, path = "/") {
  const clean = `/${String(path).replace(/^\/+|\/+$/g, "")}`;
  if (locale === DEFAULT_LOCALE) return clean;
  return clean === "/" ? "/en" : `/en${clean}`;
}

// The inverse: strips the "/en" prefix so a path can be re-localised. Used by
// the language switcher, which has to map the current page to its counterpart.
export function stripLocale(pathname) {
  if (pathname === "/en") return "/";
  return pathname.startsWith("/en/") ? pathname.slice(3) : pathname;
}

// hreflang for <link rel="alternate">. Next renders alternates.languages from
// this. x-default points at Arabic, the primary language of the business.
//
// Pass explicit paths when the two versions do not share a path - a blog post
// has a different slug in each language, so "/blog/<ar-slug>" does not become
// "/en/blog/<ar-slug>". Getting that wrong tells Google two unrelated pages are
// translations of each other.
export function languageAlternates({ ar, en }) {
  const languages = {};
  if (ar) languages.ar = ar;
  if (en) languages.en = en;
  if (ar) languages["x-default"] = ar;
  return languages;
}

// Convenience for pages whose two versions do share a path.
export const sharedPathAlternates = (path) =>
  languageAlternates({ ar: localePath("ar", path), en: localePath("en", path) });
