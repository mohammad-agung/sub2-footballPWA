const cacheName = 'league-v1';
const urlsToCache = [
    '/',
    'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap',  
    'https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfBBc4.woff2',    
    'https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmEU9fBBc4.woff2',    
    'https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxK.woff2',
    '/manifest.json',
    '/index.html',
    '/nav.html',
    '/profile-club.html',
    '/profile-player.html',
    '/logo-club.png',
    '/assets/css/materialize.min.css',
    '/assets/css/app.css',
    '/assets/css/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
    '/assets/css/material-icon.css',
    '/assets/images/2014.png',
    '/assets/images/author-32.png',
    '/assets/images/author-64.png',
    '/assets/images/author-128.png',
    '/assets/images/author-256.png',
    '/assets/images/author-512.png',
    '/assets/js/api.js',
    '/assets/js/db.js',
    '/assets/js/materialize.min.js',
    '/assets/js/nav.js',
    '/assets/js/notifikasi.js',
    '/assets/js/profile-club.js',
    '/assets/js/profile-player.js',
    '/assets/js/favorite.js',
    '/assets/js/home.js',
    '/assets/js/matches.js',
    '/assets/js/result.js',
    '/assets/js/pre-sw.js',
    '/assets/js/lib/idb.js',
    '/pages/home.html',
    '/pages/matches.html',
    '/pages/result.html',
    '/pages/favoriteTeam.html'
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});


self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName != cacheName) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener("fetch", function (event) {
    var base_url = "https://api.football-data.org/v2/";

    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(cacheName).then(function (cache) {
                return fetch(event.request).then(function (response) {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request, { 'ignoreSearch': true }).then(function (response) {
                return response || fetch(event.request);
            })
        )
    }
});

self.addEventListener('push', function (event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    var options = {
        body: body,
        icon: 'logo-club.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});


