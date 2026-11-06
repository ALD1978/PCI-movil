// Guarda el programa en el móvil para que funcione sin cobertura.
// Al cambiar VERSION, el móvil descarga la versión nueva la próxima vez que abre la app
// y la usa a partir de la siguiente apertura.
const VERSION = "pci-movil-v1";
const ARCHIVOS = [
  "./",
  "./index.html",
  "./jspdf.umd.min.js",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-mask.png",
  "./apple-touch-icon.png"
];

self.addEventListener("install", ev => {
  ev.waitUntil(caches.open(VERSION).then(c => c.addAll(ARCHIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", ev => {
  ev.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", ev => {
  if (ev.request.method !== "GET") return;
  ev.respondWith(
    caches.match(ev.request, { ignoreSearch: true }).then(r => r || fetch(ev.request))
  );
});
