
var cacheName = 'r-v1';


// data to catch

let paths = [
    '/',
    './index.html',
    './restaurant.html?',
    './js/dbhelper.js',
    './js/main.js',
    './js/restaurant_info.js',
    './css/styles.css',
    './data/restaurants.json',
     '/?homescreen=1',
    './img/1.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.jpg',
    './img/5.jpg',
    './img/6.jpg',
    './img/7.jpg',
    './img/8.jpg',
    './img/9.jpg',
    './img/10.jpg'
    ];


// Install and create a new cache.

self.addEventListener('install', function(e) {
  console.log('Installing - ServiceWorker');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('Caching - ServiceWorker');
      return cache.addAll(paths);
    })
    .then(function() {
      console.log('Installation complete');
    })
  );
});



// Feth from the network.

self.addEventListener('fetch', function(e) {
  console.log('Fetch - ServiceWorker');
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});




// Activate new cache and delete the old cache.

self.addEventListener('activate', function(event) {
    console.log('Activate new cache');
    
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    return cacheName.startsWith('r-') && cacheName != version;
                }).map(function(cacheName) {
                    return cache.delete(cacheName);
                })
               )
             }).catch(function (error) {
            // Log this if there is no cache on first run.

            console.log('No old cache to delete');
            return
        })
       );
     });

