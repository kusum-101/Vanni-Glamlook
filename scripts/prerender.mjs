// Injects server-rendered markup into dist/index.html and writes robots.txt + sitemap.xml.
import { readFile, writeFile, rm } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { isPreview, siteUrl } from './site-config.mjs';

const root = resolve(import.meta.dirname, '..');
const url = siteUrl();
const preview = isPreview();

const { render } = await import(pathToFileURL(resolve(root, 'dist-ssr/entry-server.js')).href);
const htmlPath = resolve(root, 'dist/index.html');
const template = await readFile(htmlPath, 'utf8');
if (!template.includes('<!--app-html-->')) throw new Error('Placeholder <!--app-html--> missing from dist/index.html');
await writeFile(htmlPath, template.replace('<!--app-html-->', render()));

if (preview) {
  // Pitch preview: keep crawlers (and image search) out entirely.
  await writeFile(resolve(root, 'dist/robots.txt'), 'User-agent: *\nDisallow: /\n');
  await rm(resolve(root, 'dist/sitemap.xml'), { force: true });
} else {
  const today = new Date().toISOString().slice(0, 10);
  await writeFile(
    resolve(root, 'dist/sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${url}/</loc><lastmod>${today}</lastmod></url>
</urlset>
`,
  );
  await writeFile(resolve(root, 'dist/robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${url}/sitemap.xml\n`);
}

await rm(resolve(root, 'dist-ssr'), { recursive: true, force: true });
console.log(`Prerendered dist/index.html for ${url} · ${preview ? 'PREVIEW MODE (noindex, robots disallow)' : 'LIVE (indexable, sitemap written)'}`);
