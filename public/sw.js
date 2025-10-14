const CACHE_NAME = 'portfolio-v1';
const urlsToCache = [
  '/',
  '/src/main.jsx',
  '/src/components/Hero.jsx',
  '/src/components/About.jsx',
  '/src/components/Contact.jsx',
  '/src/ui/navbar.jsx',
  '/src/components/ScrollProgress.jsx',
  '/src/components/exp.jsx',
  '/data/hero.json',
  '/data/about.json',
  '/data/skills.json',
  '/data/awards.json',
  '/data/timeline.json',
  '/data/projects.json',
  '/metesting.jpg',
  '/logo.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});
