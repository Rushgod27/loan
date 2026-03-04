const CACHE_NAME = "Loan-Management-App-v1.0";

const urlsToCache = [
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

  self.skipWaiting(); // activate immediately

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );

});

/* ACTIVATE */
self.addEventListener("activate", event => {

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if(name !== CACHE_NAME){
            return caches.delete(name);
          }
        })
      );
    })
  );

  self.clients.claim(); // control pages immediately

});

/* FETCH */
self.addEventListener("fetch", event => {

  event.respondWith(

    fetch(event.request) // try network first
      .then(response => {

        const clone = response.clone();

        caches.open(CACHE_NAME)
          .then(cache => cache.put(event.request, clone));

        return response;

      })
      .catch(() => caches.match(event.request)) // fallback to cache

  );

});