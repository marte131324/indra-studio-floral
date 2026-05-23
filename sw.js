const CACHE_NAME = 'indra-v3';
const urlsToCache = [
  './',
  './index.html',
  './style.css?v=2',
  './script.js?v=2',
  './Assets/Logo.jpg',
  './Assets/bg.png',
  './Assets/gallery1.png',
  './Assets/gallery2.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
