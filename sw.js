// ═══════════════════════════════════════════════════
// StockAI Service Worker v3 — Network First
// תמיד מביא גרסה טרייה מהרשת; מטמון רק כגיבוי לאופליין
// ═══════════════════════════════════════════════════
const CACHE_NAME = 'stockai-v3';

// התקנה: השתלט מיד (בלי לחכות לסגירת טאבים ישנים)
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// הפעלה: מחק את כל המטמונים הישנים + השתלט על כל הטאבים
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// Network First: קודם רשת (תמיד טרי!), מטמון רק אם אין אינטרנט
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  // אל תתערב בבקשות ל-API חיצוניים (Worker, Yahoo, Google וכו')
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME)
          .then((cache) => cache.put(event.request, copy))
          .catch(() => {});
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
