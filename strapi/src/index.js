"use strict";

// Public read permissions and the blog categories live here, in code, instead
// of being clicked into the admin panel.
//
// Both normally live only in Strapi's database, which means they do not travel
// with a deploy: a fresh instance silently returns 403 on every endpoint, and
// the site shows its fallback copy with no clue why. Doing it here means any
// environment configures itself on start, and no database ever has to be
// copied from one machine to another.
//
// Everything below is additive. It never edits or removes an existing record,
// so it is safe to run against an instance that already holds real content.

const PUBLIC_READ = [
  "api::blog-post.blog-post",
  "api::author.author",
  "api::blog-category.blog-category",
  "api::blog-tag.blog-tag",
];

const CATEGORIES = [
  { slug: "plants", name: "شتلات ونباتات", description: "اختيار وزراعة الأشجار والنخيل والشجيرات والأزهار والعشب" },
  { slug: "landscape", name: "تنسيق حدائق ولاندسكيب", description: "تصميم وتنفيذ المساحات الخارجية وشبكات الري والإضاءة" },
  { slug: "indoor", name: "نباتات داخلية", description: "النباتات الداخلية للمنازل والمكاتب والمنشآت" },
  { slug: "plant-care", name: "العناية بالنباتات", description: "الري والتسميد والآفات والصيانة الموسمية" },
];

const LOCALE = "ar";

// The site requests locale=ar on every read, so ar must exist and be the
// default. Locales are database rows, not config, so a fresh instance starts
// with English only and every Arabic read falls back or comes back empty.
async function ensureArabicLocale(strapi) {
  const locales = strapi.plugin("i18n")?.service("locales");
  if (!locales) {
    strapi.log.warn("[bootstrap] i18n plugin unavailable; skipping locale setup");
    return;
  }
  const existing = await locales.findByCode(LOCALE);
  if (!existing) {
    await locales.create({ code: LOCALE, name: "Arabic (ar)" });
    strapi.log.info("[bootstrap] created locale ar");
  }
  if (typeof locales.setDefaultLocale === "function") {
    const current = await locales.getDefaultLocale();
    if (current !== LOCALE) {
      await locales.setDefaultLocale({ code: LOCALE });
      strapi.log.info(`[bootstrap] default locale ${current} -> ${LOCALE}`);
    }
  }
}

async function grantPublicRead(strapi) {
  const role = await strapi.db
    .query("plugin::users-permissions.role")
    .findOne({ where: { type: "public" } });

  if (!role) {
    strapi.log.warn("[bootstrap] public role not found; skipping permissions");
    return;
  }

  let added = 0;
  for (const uid of PUBLIC_READ) {
    for (const verb of ["find", "findOne"]) {
      const action = `${uid}.${verb}`;
      const existing = await strapi.db
        .query("plugin::users-permissions.permission")
        .findOne({ where: { action, role: role.id } });
      if (existing) continue;
      await strapi.db
        .query("plugin::users-permissions.permission")
        .create({ data: { action, role: role.id } });
      added += 1;
    }
  }
  strapi.log.info(`[bootstrap] public read permissions: ${added} added, ${PUBLIC_READ.length * 2 - added} already present`);
}

async function seedCategories(strapi) {
  let created = 0;
  for (const category of CATEGORIES) {
    const existing = await strapi.documents("api::blog-category.blog-category").findFirst({
      filters: { slug: category.slug },
      locale: LOCALE,
      status: "published",
    });
    if (existing) continue;
    await strapi.documents("api::blog-category.blog-category").create({
      data: category,
      locale: LOCALE,
      status: "published",
    });
    created += 1;
  }
  strapi.log.info(`[bootstrap] blog categories: ${created} created, ${CATEGORIES.length - created} already present`);
}

module.exports = {
  register() {},

  async bootstrap({ strapi }) {
    try {
      await ensureArabicLocale(strapi);
      await grantPublicRead(strapi);
      await seedCategories(strapi);
    } catch (error) {
      // Never prevent Strapi from starting because of this.
      strapi.log.error(`[bootstrap] setup failed: ${error.message}`);
    }
  },
};
