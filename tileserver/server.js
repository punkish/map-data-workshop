var tilestrata = require('tilestrata');
var disk = require('tilestrata-disk');
var mapnik = require('tilestrata-mapnik');
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

// start accepting requests
strata.listen(8080);
