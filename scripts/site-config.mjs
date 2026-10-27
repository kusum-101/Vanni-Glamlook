// Shared by vite.config.ts and scripts/prerender.mjs so the HTML, robots.txt and sitemap always agree.

/** Public URL: explicit SITE_URL, else the host's production URL (Vercel or Netlify), else a placeholder. */
export function siteUrl(env = process.env) {
  const vercel = env.VERCEL_PROJECT_PRODUCTION_URL;
  const netlify = env.NETLIFY === 'true' ? env.URL : undefined;
  return (env.SITE_URL || (vercel ? `https://${vercel}` : netlify) || 'https://www.example.com').replace(/\/$/, '');
}

/** Preview mode keeps the site out of search engines. On unless PREVIEW_MODE=false. */
export function isPreview(env = process.env) {
  return (env.PREVIEW_MODE ?? 'true').toLowerCase() !== 'false';
}
