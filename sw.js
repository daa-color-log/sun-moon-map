const CACHE_NAME = 'celestial-map-v2.8';
const ASSETS = [
  './',
  'index.html',
  'style.css',
  'script.js',
  'logo.svg',
  'manifest.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      for (let asset of ASSETS) {
        try {
          await cache.add(asset);
        } catch (err) {
          console.error('Failed to cache:', asset, err);
        }
      }
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  
  // Handle root path mapping to index.html in cache
  if (url.pathname === '/' || url.pathname.endsWith('/')) {
    e.respondWith(
      caches.match('index.html').then((response) => response || fetch(e.request))
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
