const CACHE_NAME = 'gotime-payroll-v2';

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k))))
    );
    self.clients.claim();
});

// ดึงข้อมูลสดจาก Network ก่อนเสมอเพื่อให้โค้ดและข้อมูล Supabase อัปเดตตลอด
self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});