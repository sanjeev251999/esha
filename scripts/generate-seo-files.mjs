// Generates public/sitemap.xml and public/robots.txt before every build.
// The site URL is read from src/environments/environment.ts (single source of truth).
import { readFileSync, writeFileSync } from 'node:fs';

const env = readFileSync(new URL('../src/environments/environment.ts', import.meta.url), 'utf8');
const match = env.match(/siteUrl:\s*['"]([^'"]+)['"]/);
if (!match) throw new Error('siteUrl not found in src/environments/environment.ts');
const siteUrl = match[1].replace(/\/$/, '');

const pages = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/services', priority: '0.9', changefreq: 'monthly' },
  { path: '/offers', priority: '0.9', changefreq: 'weekly' },
  { path: '/enquire', priority: '0.8', changefreq: 'weekly' },
  { path: '/gallery', priority: '0.7', changefreq: 'monthly' },
  { path: '/about', priority: '0.6', changefreq: 'yearly' },
  { path: '/contact', priority: '0.8', changefreq: 'yearly' },
];
const today = new Date().toISOString().slice(0, 10);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>${siteUrl}${p.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

writeFileSync(new URL('../public/sitemap.xml', import.meta.url), sitemap);
writeFileSync(new URL('../public/robots.txt', import.meta.url), robots);
console.log(`sitemap.xml & robots.txt generated for ${siteUrl}`);
