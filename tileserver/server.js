var tilestrata = require('tilestrata');
var disk = require('tilestrata-disk');
var mapnik = require('tilestrata-mapnik');
var express = require('express');
var app = express();
var strata = tilestrata();


// Define our basemap layer
strata.layer('basemap')
    .route('tile.png')
        .use(disk.cache({dir: './basemap'}))
        .use(mapnik({
            pathname: './osm-bright/OSMBright/mapnik.xml',
            tileSize: 256,
            scale: 1
        }))

// Prefix the tile path with /tiles
app.use(tilestrata.middleware({
    server: strata,
    prefix: '/tiles'
}));

// Send an example page at the root of the tileserver (/tiles)
app.get('/tiles', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

// Listen on the provided port, or 8080 if none provided
var port = process.argv[2] || '8080';
app.listen(port, function() {
  console.log('Tilestrata listening on port ' + port);
});
