const cacheName = 'review-cache-v2';


// data to catch


// Install and create a new cache.

self.addEventListener('install', function(e) {
        const paths = [
        './',
        './index.html',
        './restaurant.html',
        './restaurant.html?id=1',
        './restaurant.html?id=2',
        './restaurant.html?id=3',
        './restaurant.html?id=4',
        './restaurant.html?id=5',
        './restaurant.html?id=6',
        './restaurant.html?id=7',
        './restaurant.html?id=8',
        './restaurant.html?id=9',
        './restaurant.html?id=10',
        './css/styles.css',
        './data/restaurants.json',
        './js/main.js',
        './js/restaurant_info.js',
        './js/dbhelper.js',
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
        './img/404.png',
        './img/favicon.png',
        'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css',
        'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
        'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js'
    ];

  console.log('Installing - ServiceWorker');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('Caching - ServiceWorker');
      return cache.addAll(paths);
    })
    .then(function() {
      console.log('Installation complete');
    }).catch(function(error) {console.log(error);}
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


// Feth from the network.

self.addEventListener('fetch', function(e) {
  console.log('Fetch - ServiceWorker');
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});

