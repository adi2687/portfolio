import { createWriteStream } from 'fs'; 
import { SitemapStream, streamToPromise } from 'sitemap';
const sitemap = new SitemapStream({ hostname: 'https://adityakurani.vercel.app' });

const links = [
  { url: '/', changefreq: 'monthly', priority: 1.0 }

];

links.forEach(link => sitemap.write(link));
sitemap.end();

streamToPromise(sitemap)
  .then(sm => createWriteStream('./public/sitemap.xml').end(sm.toString()))
  .then(() => console.log('✅ Sitemap generated successfully!'));
