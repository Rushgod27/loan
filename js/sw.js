const CACHE_NAME = "agent-app-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/agent-dashboard.html",
  "/borrowers.html",
  "/borrower-profile.html",
  "/css/styles.css",
  "/js/firebase.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});