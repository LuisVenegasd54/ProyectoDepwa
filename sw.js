const cahceName = "rickandmortisw";
const staticAssets = [
    './',
    './assets/logo.png',
    './index.html',
    './manifest.webmanifest',
    './css/index.css',
    './index.js'
];

this.addEventListener('install', async e => {
    const cache = await caches.open(cahceName);
    await cache.addAll(staticAssets);
    return this.skipWaiting();
});

this.addEventListener('activate', e => {
    this.clients.claim();
});

this.addEventListener('fetch', async e => {
    const req = e.request;
    const url = new URL(req.url);

    if (url.origin == location.origin) {
        e.respondWith(cacheFirst(req));
    } else {
        e.respondWith(networkAndCache(req));
    }
});

async function cacheFirst(req) {
    const cache = await caches.open(cahceName);
    const cached = await cache.match(req);
    return cached || fetch(req);
}

async function networkAndCache(req) {
    const cache = await caches.open(cahceName);
    try {
        const fresh = await fetch(req);
        await cache.put(req, fresh.clone());
        return fresh;
    } catch (e) {
        const cached = await cache.match(req);
        return cached;
    }
}