// Shared by vite.config.ts and scripts/prerender.mjs so the HTML, robots.txt and sitemap always agree.

/** Public URL: explicit SITE_URL, else the Vercel production domain, else a placeholder. */
export function siteUrl(env = process.env) {
  const vercel = env.VERCEL_PROJECT_PRODUCTION_URL;
  return (env.SITE_URL || (vercel ? `https://${vercel}` : 'https://www.example.com')).replace(/\/$/, '');
}

/** Preview mode keeps the site out of search engines. On unless PREVIEW_MODE=false. */
export function isPreview(env = process.env) {
  return (env.PREVIEW_MODE ?? 'true').toLowerCase() !== 'false';
}
