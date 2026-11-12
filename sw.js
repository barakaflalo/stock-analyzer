/* ── AppNest · Cloudflare Pages fix (Oct 2026) ──
   Cloudflare redirects *.html to clean URLs (/index.html -> /). Chrome refuses a
   "redirected" response that a Service Worker hands to a page load (ERR_FAILED).
   This strips the redirect flag from every response the SW fetches or reads from cache. */
(function(){
  var NB={101:1,204:1,205:1,304:1};
  function clean(r){
    if(!r||!r.redirected||NB[r.status])return r;
    return r.blob().then(function(b){return new Response(b,{status:r.status,statusText:r.statusText,headers:r.headers});});
  }
  var _fetch=self.fetch.bind(self);
  self.fetch=function(input,init){
    if(input&&typeof input==='object'&&input.mode==='navigate')input=input.url;
    return _fetch(input,init).then(clean);
  };
  var cm=Cache.prototype.match;
  Cache.prototype.match=function(){return cm.apply(this,arguments).then(clean);};
  var sm=CacheStorage.prototype.match;
  CacheStorage.prototype.match=function(){return sm.apply(this,arguments).then(clean);};
})();

// ═══════════════════════════════════════════════════
// StockAI Service Worker v11 (2.4.0) — Network First + revalidate
// כל קבצי האפליקציה נבדקים מול השרת בכל טעינה (ETag — זול ומהיר),
// כך שלא יכולות להיטען גרסאות מעורבבות. מטמון רק כגיבוי לאופליין.
// ═══════════════════════════════════════════════════
const CACHE_NAME = 'stockai-v11';

self.addEventListener('install', () => { self.skipWaiting(); });

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;   // APIs חיצוניים — לא נוגעים
  event.respondWith(
    fetch(event.request.url, { cache: 'no-cache', credentials: 'same-origin' })
      .then((response) => {
        if (response && response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((c) => c.put(event.request, copy)).catch(() => {});
        }
        return response;
      })
      .catch(() => caches.match(event.request).then((r) => r || caches.match(url.pathname.replace(/[^/]*$/, ''))))
  );
});
