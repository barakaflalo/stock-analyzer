// StockAI Service Worker — v1.0
var CACHE_NAME = 'stockai-v1';
var ASSETS = [
  './stock-analyzer.html',
  './manifest.json'
];

// Install: cache core assets
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE_NAME; })
            .map(function(k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

// Fetch: network-first for API calls, cache-first for assets
self.addEventListener('fetch', function(e) {
  // Always go to network for Anthropic API
  if (e.request.url.includes('anthropic.com') || e.request.url.includes('fonts.googleapis.com')) {
    e.respondWith(fetch(e.request).catch(function() {
      return new Response('Offline', { status: 503 });
    }));
    return;
  }
  // Cache-first for local assets
  e.respondWith(
    caches.match(e.request).then(function(cached) {
      return cached || fetch(e.request).then(function(response) {
        var clone = response.clone();
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(e.request, clone);
        });
        return response;
      });
    }).catch(function() {
      return caches.match('./stock-analyzer.html');
    })
  );
});
