// Service Worker for fast reloading and offline capabilities
const CACHE_NAME = 'jagdish-portfolio-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/assets/css/styles.css',
  '/assets/js/app.js',
  '/assets/js/main.js',
  '/assets/js/navbar.js',
  '/assets/js/sections/home.js',
  '/assets/js/sections/gallery.js',
  '/assets/js/sections/blog.js',
  '/assets/js/sections/contact.js',
  '/assets/images/Jagadish.jpg',
  '/assets/images/f10-photo.jpg',
  '/assets/images/f26-photo.jpg',
  // Add other assets as needed
];

// Install event - cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        
        // Clone the request
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest).then(
          (response) => {
            // Check if valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone the response
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          }
        );
      })
  );
});

// Handle push notifications
self.addEventListener('push', (event) => {
  const title = 'Jagdish Ayer Portfolio';
  const options = {
    body: event.data.text(),
    icon: '/assets/images/f10-photo.jpg',
    badge: '/assets/images/f10-photo.jpg'
  };
  
  event.waitUntil(self.registration.showNotification(title, options));
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow('https://jagdishkumarayer.com.np')
  );
});