// ═══════════════════════════════════════════════════
// StockAI Service Worker v9 — Network First + revalidate
// כל קבצי האפליקציה נבדקים מול השרת בכל טעינה (ETag — זול ומהיר),
// כך שלא יכולות להיטען גרסאות מעורבבות. מטמון רק כגיבוי לאופליין.
// ═══════════════════════════════════════════════════
const CACHE_NAME = 'stockai-v10';

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
