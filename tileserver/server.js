var tilestrata = require('tilestrata');
var disk = require('tilestrata-disk');
var mapnik = require('tilestrata-mapnik');
var express = require('express');
var app = express();
var strata = tilestrata();


// define layers
strata.layer('basemap')
    .route('tile.png')
        .use(disk.cache({dir: './basemap'}))
        .use(mapnik({
            xml: './osm-bright/OSMBright/mapnik.xml',
            tileSize: 256,
            scale: 1
        }))

app.use(tilestrata.middleware({
    server: strata,
    prefix: '/tiles'
}));

app.listen('8080', function() {
  console.log('Tilestrata listening on port 8080')
});
