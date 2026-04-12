const CACHE_NAME = 'indra-v1';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './script.js',
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
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
