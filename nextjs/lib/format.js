import { config } from "@/app/i18n";

// ar-SA defaults to the Hijri calendar, which is not what a blog date means
// here, and to Arabic-Indic digits while the rest of the site uses Latin ones.
// Hence the -u-ca-gregory-nu-latn extensions on the Arabic locale.
const formatters = new Map();

function formatter(locale) {
  const tag = config(locale).dateLocale;
  if (!formatters.has(tag)) {
    formatters.set(
      tag,
      new Intl.DateTimeFormat(tag, { year: "numeric", month: "long", day: "numeric" }),
    );
  }
  return formatters.get(tag);
}

export function formatDate(value, locale = "ar") {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? null : formatter(locale).format(date);
}
