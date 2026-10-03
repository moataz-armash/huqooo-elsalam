module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  // 1337 is taken by another Strapi on the production box, so this one is 1340.
  port: env.int('PORT', 1340),
  // Public URL when running behind nginx. Without it the admin panel builds
  // redirects from the internal address and breaks after login.
  url: env('URL', undefined),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});
