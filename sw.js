// Service worker minimo: mette in cache solo l'app shell (il file HTML, il manifest e le
// icone), per poter riaprire l'app anche offline. Le chiamate alle fonti immagine
// (Wikimedia, Met, NASA, Openverse, ecc. — tutte su domini esterni) non vengono mai
// intercettate: per quelle l'event listener sotto non chiama event.respondWith, quindi
// vanno dritte alla rete come farebbero senza service worker, senza mai restituire una
// foto vecchia al posto di un errore di rete onesto.
const CACHE_NAME = 'smarchive-shell-v1';
const SHELL_ASSETS = [
  './smarchive-prototype-nuovo-utente.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  // Solo GET, solo stesso dominio, solo i file dell'app shell: tutto il resto (in
  // particolare qualunque fetch verso le API di immagini reali su altri domini) non viene
  // toccato da questo service worker.
  if (event.request.method !== 'GET' || url.origin !== self.location.origin) return;
  const isShellAsset = SHELL_ASSETS.some((asset) => url.pathname.endsWith(asset.replace('./', '/')));
  if (!isShellAsset) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const network = fetch(event.request)
        .then((res) => {
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, res.clone())).catch(() => {});
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
