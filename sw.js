
const cacheName = 'review-cache-v1';


// data to catch

const paths = [
  './',
  'index.html',
  'restaurant.html?id=1',
  'restaurant.html?id=2',
  'restaurant.html?id=3',
  'restaurant.html?id=4',
  'restaurant.html?id=5',
  'restaurant.html?id=6',
  'restaurant.html?id=7',
  'restaurant.html?id=8',
  'restaurant.html?id=9',
  'restaurant.html?id=10',
  './css/styles.css',
  './css/responsive.css',
  './js/main.js',
  './js/dbhelper.js',
  './js/script.js',
  './js/restaurant_info.js',
  './data/restaurants.json',
  './img/1.jpg',
  './img/2.jpg',
  './img/3.jpg',
  './img/4.jpg',
  './img/5.jpg',
  './img/6.jpg',
  './img/7.jpg',
  './img/8.jpg',
  './img/9.jpg',
  './img/10.jpg',
  './img/favicon.png'
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
                    return cacheName.startsWith('review-') && cacheName != version;
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

