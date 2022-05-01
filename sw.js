self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('fox-store').then((cache) => cache.addAll([
      '/pwa/hyosung/default.html',
      '/pwa/hyosung/index.js',
      '/pwa/hyosung/css/bootstrap.css',
      '/pwa/hyosung/css/font-awesome.css',
      '/pwa/hyosung/css/theme.css',
    ])),
  );
});

self.addEventListener('fetch', (e) => {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});
