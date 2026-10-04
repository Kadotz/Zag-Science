const CACHE = 'zag-science-v27-30-larger-expanded-table';
const CORE = ['./', './index.html', './manifest.webmanifest', './assets/icons/icon-192.png', './assets/icons/icon-512.png', './assets/icons/apple-touch-icon.png'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)));
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).then(response => {
      const copy = response.clone();
      caches.open(CACHE).then(cache => cache.put('./index.html', copy));
      return response;
    }).catch(() => caches.match('./index.html')));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    if (response && response.ok) {
      const copy = response.clone();
      caches.open(CACHE).then(cache => cache.put(event.request, copy));
    }
    return response;
  })));
});

self.addEventListener('push', event => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; } catch (_) { data = { body: event.data ? event.data.text() : '' }; }
  const kind = data.kind || 'workout';
  const isStreak = kind === 'streak';
  const isBodyweight = kind === 'bodyweight';
  event.waitUntil(self.registration.showNotification(data.title || (isBodyweight ? 'Update your bodyweight' : (isStreak ? 'Keep your streak alive' : 'Workout reminder')), {
    body: data.body || (isBodyweight ? 'It has been 2 weeks since your last bodyweight update.' : (isStreak ? 'Your streak is waiting. Train today or use a rest day.' : 'Your workout is ready when you are.')),
    icon: './assets/icons/icon-192.png',
    badge: './assets/icons/icon-192.png',
    tag: isBodyweight ? 'zag-bodyweight-reminder' : (isStreak ? 'zag-streak-reminder' : 'zag-workout-reminder'),
    renotify: true,
    data: { kind },
    actions: isBodyweight ? [] : [{ action: 'open-workout', title: 'Open Workout' }, { action: 'rest-day', title: 'Rest Day' }]
  }));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const action = event.action === 'rest-day' ? 'rest-day' : (event.action === 'open-workout' ? 'open-workout' : 'clicked');
  const kind = (event.notification.data && event.notification.data.kind) || 'workout';
  const target = `./?notificationAction=${encodeURIComponent(action)}&notificationKind=${encodeURIComponent(kind)}`;
  event.waitUntil((async () => {
    const windows = await clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const client of windows) {
      if ('navigate' in client) await client.navigate(target);
      if ('focus' in client) return client.focus();
    }
    return clients.openWindow(target);
  })());
});
