import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = 'https://petrupodut.dev';
const BLOG_DIR = path.join(__dirname, '../src/content/blog');
const PUBLIC_DIR = path.join(__dirname, '../public');
const DIST_DIR = path.join(__dirname, '../dist');
const ROOT_DIR = path.join(__dirname, '..');

const generateSitemap = () => {
  const lastMod = new Date().toISOString().split('T')[0];
  
  // 1. Rute statice
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${DOMAIN}/</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${DOMAIN}/blog</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`;

  // 2. Scanare articole blog (dinamice)
  if (fs.existsSync(BLOG_DIR)) {
    const files = fs.readdirSync(BLOG_DIR);
    files.forEach(file => {
      if (file.endsWith('.md')) {
        const slug = file.replace('.md', '');
        sitemap += `
  <url>
    <loc>${DOMAIN}/blog/${slug}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
      }
    });
  }

  sitemap += `\n</urlset>`;

  // 3. Salvare în locațiile necesare
  [PUBLIC_DIR, DIST_DIR, ROOT_DIR].forEach(dir => {
    if (fs.existsSync(dir)) {
      fs.writeFileSync(path.join(dir, 'sitemap.xml'), sitemap);
      console.log(`✅ Sitemap generated in ${dir}`);
    }
  });
};

generateSitemap();
