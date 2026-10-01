// ar-SA defaults to the Hijri calendar, which is not what a blog date means
// here, and to Arabic-Indic digits while the rest of the site uses Latin ones.
const dateFormatter = new Intl.DateTimeFormat("ar-SA-u-ca-gregory-nu-latn", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export function formatDate(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? null : dateFormatter.format(date);
}
