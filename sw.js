const CACHE_NAME = "Loan-Management-App-v1.3";

const APP_FILES = [
  "./",
  "./index.html",
  "./agent.html",
  "./css/styles.css",
  "./js/firebase.js",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

/* INSTALL */
self.addEventListener("install", event => {

  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_FILES))
  );

});

/* ACTIVATE */
self.addEventListener("activate", event => {

  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if(key !== CACHE_NAME){
            return caches.delete(key);
          }
        })
      );
    })
  );

  self.clients.claim();

});

/* FETCH */
self.addEventListener("fetch", event => {

  const url = new URL(event.request.url);

  // 🔥 NEVER CACHE FIREBASE OR API REQUESTS
  if (
    url.hostname.includes("firebase") ||
    url.hostname.includes("googleapis") ||
    url.hostname.includes("gstatic")
  ) {
    event.respondWith(fetch(event.request));
    return;
  }

  // NETWORK FIRST
  event.respondWith(

    fetch(event.request)
      .then(response => {

        const clone = response.clone();

        caches.open(CACHE_NAME)
          .then(cache => cache.put(event.request, clone));

        return response;

      })
      .catch(() => caches.match(event.request))

  );

});