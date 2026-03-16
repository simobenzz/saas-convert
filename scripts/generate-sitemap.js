import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://pdf2word-online.com';
const LANGUAGES = ['en', 'fr'];
const ROUTES = [
  '',
  'about',
  'privacy-policy',
  'terms-of-service',
];

const generateSitemap = () => {
  const now = new Date().toISOString().split('T')[0];
  
  const allUrls = [];
  LANGUAGES.forEach(lang => {
    ROUTES.forEach(route => {
      allUrls.push(`${lang}/${route}`);
    });
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map((path) => `  <url>
    <loc>${BASE_URL}/${path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${path.endsWith('/') ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
  console.log('✅ Sitemap generated successfully in public/sitemap.xml');
};

generateSitemap();
