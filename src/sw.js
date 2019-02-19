importScripts('/serviceworker-cache-polyfill.js');

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('Karazhan').then(function(cache) {
      return cache.addAll([
        '/',
        '/app.vue',
        '/app.js',
        '/routes.js',
        '/public/index.html.ejs',
        '/?homescreen=1',
        '/css/app.css',
        '/components/bossQuote.vue',
        '/images/bg-min.jpg',
        '/pages/home.vue',
        '/pages/info.vue',
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  console.log(event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});