const CACHE_NAME = 'celestial-map-v14.0';
const ASSETS = [
  './',
  'index.html',
  'style.css',
  'script.js',
  'logo.svg',
  'icon-192-v2.png',
  'icon-512-v2.png',
  'screenshot-mobile.png',
  'screenshot-desktop.png',
  'manifest.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
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
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
