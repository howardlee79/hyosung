self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('fox-store').then((cache) => cache.addAll([
      '/hyosung/default.html',
      '/hyosung/index.js',
      '/hyosung/css/bootstrap.css',
      '/hyosung/css/font-awesome.css',
      '/hyosung/css/theme.css',
    ])),
  );
});

self.addEventListener('fetch', (e) => {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});
