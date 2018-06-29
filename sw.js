
var cacheName = 'r-v1';


// data to catch

let paths = [
    './',
    'https://github.com/SIonut0122/restaurant-review/index.html',
    'https://github.com/SIonut0122/restaurant-review/restaurant.html?',
    'https://github.com/SIonut0122/restaurant-review/js/dbhelper.js',
    'https://github.com/SIonut0122/restaurant-review/js/main.js',
    'https://github.com/SIonut0122/restaurant-review/js/restaurant_info.js',
    'https://github.com/SIonut0122/restaurant-review/css/styles.css',
    'https://github.com/SIonut0122/restaurant-review/data/restaurants.json',
     'https://github.com/SIonut0122/restaurant-review/?homescreen=1',
    'https://github.com/SIonut0122/restaurant-review/img/1.jpg',
    'https://github.com/SIonut0122/restaurant-review/img/2.jpg',
    'https://github.com/SIonut0122/restaurant-review/img/3.jpg',
    'https://github.com/SIonut0122/restaurant-review/img/4.jpg',
    'https://github.com/SIonut0122/restaurant-review/img/5.jpg',
    'https://github.com/SIonut0122/restaurant-review/img/6.jpg',
    'https://github.com/SIonut0122/restaurant-review/img/7.jpg',
    'https://github.com/SIonut0122/restaurant-review/img/8.jpg',
    'https://github.com/SIonut0122/restaurant-review/img/9.jpg',
    'https://github.com/SIonut0122/restaurant-review/img/10.jpg'
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

