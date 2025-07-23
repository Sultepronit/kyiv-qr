const CACHE_NAME = 'kyiv-pwa-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/script.js',
    '/style.css',
    '/favicon-32x32.png',
    '/favicon-16x16.png',
    '/apple-touch-icon.png',
    '/favicon.ico',
    '/pwa-192x192.png',
    '/pwa-512x512.png',
    '/pwa-maskable-192x192.png',
    '/pwa-maskable-512x512.png',
];

self.addEventListener('install', e => {
    self.skipWaiting();
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', e => {
    e.respondWith(
        // cache-first strategy, never update!
        // caches.match(e.request).then(response => response || fetch(e.request))

        // cache-first strategy, with update
        caches.match(e.request).then(cached => {
            const fetchPromise = fetch(e.request)
                .then(response => {
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    const resClone = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(e.request, resClone));
                    return response
                })
                .catch(() => cached);

            return cached || fetchPromise;
        })
    );
});