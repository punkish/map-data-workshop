var pg = require('pg');
var async = require('async');
var tilecover = require('tile-cover');
var request = require('request');
var credentials = require('./credentials');

var minZoom = 0;
var maxZoom = 10;
var tileURL = 'http://localhost:8080/tiles/basemap/{z}/{x}/{y}/tile.png';

async.waterfall([
  // Get bounds of table
  function(callback) {
    console.log('1. Getting extent of OpenStreetMap data');

    pg.connect('postgres://' + credentials.pg.user + '@' + credentials.pg.host + ':' + credentials.pg.port + '/' + credentials.pg.database, function(err, client, done) {
      if (err) {
        callback(err);
      } else {
        client.query('SELECT ST_Extent(ST_Transform(way, 4326)) AS extent FROM planet_osm_polygon', [], function(err, result) {
          done();
          if (err) {
            callback(err);
          } else {
            // Fetch and clean up the extent
            var box = result.rows[0].extent.replace('BOX(', '').replace(')', '').split(',');
            var sw = box[0].split(' ');
            var ne = box[1].split(' ');

            var bounds = {
              sw: {
                lat: parseFloat(sw[1]),
                lng: parseFloat(sw[0])
              },
              ne: {
                lat: parseFloat(ne[1]),
                lng: parseFloat(ne[0])
              }
            }

            callback(null, bounds);
          }
        });
      }
    });
  },

  // Get tiles for that bounding box at z1-z10
  function(extent, callback) {
    console.log('2. Getting tiles that need to be requested');
    // Create a GeoJSON polygon to feed into tile-cover
    var polygon = {
      type: 'Polygon',
      coordinates: [
        [
          [extent.sw.lng, extent.sw.lat],
          [extent.sw.lng, extent.ne.lat],
          [extent.ne.lng, extent.ne.lat],
          [extent.ne.lng, extent.sw.lat],
          [extent.sw.lng, extent.sw.lat]
        ]
      ]
    }

    var tiles = [];

    for (var i = minZoom; i < maxZoom + 1; i++) {
			tiles = tiles.concat(tilecover.tiles(polygon, {min_zoom: i, max_zoom: i}));
		}

    callback(null, tiles);
  },

  // Seed the cache
  function(tiles, callback) {
    console.log('3. Seeding cache');
    async.eachLimit(tiles, 5, function(tile, cb) {
      var url = tileURL.replace('{x}', tile[0]).replace('{y}', tile[1]).replace('{z}', tile[2]);
      request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          cb(null);
        } else {
          console.log(error)
          cb(url);
        }
      });
    }, function(error) {
      if (error) {
        callback(error);
      } else {
        callback(null);
      }
    });
  }

], function(error, result) {
  if (error) {
    console.log('Error - ', error);
  }
  console.log('Done seeding cache');
  process.exit(0)
});
