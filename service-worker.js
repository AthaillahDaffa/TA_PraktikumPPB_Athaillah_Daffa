/* eslint-disable no-restricted-globals */
const CACHE_NAME = 'MyFGO-app-cache-v1';

const urlsToCache = [
  '/',
  '/public/index.html',
  '/public/profile.html',
  '/public/resistance.html',
  '/public/XYZ.html',
  '/public/waifu.html',
  '/public/styles.css',
  '/public/manifest.json',
  '/public/icons/manifest-icon-192.maskable.png',
  '/public/icons/manifest-icon-512.maskable.png',
  '/public/fotoprofil.png',
  // link URL service workers
];

self.addEventListener('install', (event) => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request because it's a stream and can only be consumed once.
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          (response) => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response because it's a stream and can only be consumed once.
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});
