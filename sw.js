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

self.onfetch = function (event) {
  var req = event.request;
  return event.respondWith(function cacheFirst() {
    // Open your cache.
    return self.caches.open('v1').then(function (cache) {
      // Check if the request is in there.
      return cache.match(req).then(function (res) {
        // If not match, there is no rejection but an undefined response.
        if (!res) {
          // Go to network.
          return fetch(req.clone()).then(function (res) {
            // Put in cache and return the network response.
            return cache.put(req, res.clone()).then(function () {
              return res;
            });
          });
        }
        return res;
      });
    });
  });
}
