/* A modified version forked from https://github.com/MazeMap/Leaflet.TileLayer.PouchDBCached */
L.TileLayer.addInitHook(function() {

	if (!this.options.useCache) {
		this._db     = null;
		this._canvas = null;
		return;
	}

	this._db = new PouchDB('offline-tiles');
	this._canvas = document.createElement('canvas');

	if (!(this._canvas.getContext && this._canvas.getContext('2d'))) {
		// HTML5 canvas is needed to pack the tiles as base64 data. If
		//   the browser doesn't support canvas, the code will forcefully
		//   skip caching the tiles.
		this._canvas = null;
	}
});

L.TileLayer.prototype.options.useCache     = false;
L.TileLayer.prototype.options.useOnlyCache = false;
L.TileLayer.prototype.options.cacheMaxAge  = 24*3600*1000;


L.TileLayer.include({

	// Overwrites L.TileLayer.prototype.createTile
	createTile: function(coords, done) {
		var tile = document.createElement('img');

		tile.onerror = L.bind(this._tileOnError, this, done, tile);

		if (this.options.crossOrigin) {
			tile.crossOrigin = '';
		}

		/*
		 Alt tag is *set to empty string to keep screen readers from reading URL and for compliance reasons
		 http://www.w3.org/TR/WCAG20-TECHS/H67
		 */
		tile.alt = '';

		var tileUrl = this.getTileUrl(coords);

		if (this.options.useCache && this._canvas) {
			this._db.get(tileUrl, {revs_info: true}, this._onCacheLookup(tile, tileUrl, done));
		} else {
			// Fall back to standard behaviour
			tile.onload = L.bind(this._tileOnLoad, this, done, tile);
		}

		tile.src = tileUrl;
		return tile;
	},

	// Returns a callback (closure over tile/key/originalSrc) to be run when the DB
	//   backend is finished with a fetch operation.
	_onCacheLookup: function(tile, tileUrl, done) {
		return function(err,data) {
			if (data) {
				this.fire('tilecachehit', {
					tile: tile,
					url: tileUrl
				});
				if (Date.now() > data.timestamp + this.options.cacheMaxAge && !this.options.useOnlyCache) {
					// Tile is too old, try to refresh it
					tile.crossOrigin = 'Anonymous';
					tile.src = tileUrl;
					tile.onload = L.bind(this._tileOnLoad, this, done, tile);

					tile.onerror = function(ev) {
						// If the tile is too old but couldn't be fetched from the network,
						//   serve the one still in cache.
						this.src = data.dataUrl;
					}
				} else {
					// Serve tile from cached data
					tile.onload = L.bind(this._tileOnLoad, this, done, tile);
					tile.src = data.dataUrl;    // data.dataUrl is already a base64-encoded PNG image.
				}
			} else {
				this.fire('tilecachemiss', {
					tile: tile,
					url: tileUrl
				});
				if (this.options.useOnlyCache) {
					// Offline, not cached
// 					console.log('Tile not in cache', tileUrl);
					tile.onload  = this._tileOnLoad;
					tile.src = L.Util.emptyImageUrl;
				} else {
					// Online, not cached, request the tile normally
// 					console.log('Requesting tile normally', tileUrl);
					tile.onload = L.bind(this._tileOnLoad, this, done, tile);

					tile.crossOrigin = 'Anonymous';
					tile.src = tileUrl;
				}
			}
		}.bind(this);
	},

	/*
		 Seeds the cache given a bounding box (latLngBounds), and
	   the minimum and maximum zoom levels
	*/
	seed: function(bbox, minZoom, maxZoom) {
		if (minZoom > maxZoom || !this._map) {
			return;
		}

		console.log(bbox, minZoom, maxZoom)

		var polygon = {
			type: "Polygon",
			coordinates: [
				[
					[bbox._southWest.lng, bbox._southWest.lat],
					[bbox._southWest.lng, bbox._northEast.lat],
					[bbox._northEast.lng, bbox._northEast.lat],
					[bbox._northEast.lng, bbox._southWest.lat],
					[bbox._southWest.lng, bbox._southWest.lat]
				]
			]
		}
		var tiles = [];

		for (var i = minZoom; i < maxZoom + 1; i++) {
			tiles = tiles.concat(tileCover(polygon, {min_zoom: i, max_zoom: i}));
		}

		this._seedTiles(tiles);

	},

	_seedTiles: function(tiles) {
		this.fire('cache-load-start', true);

	//	document.querySelector(".cache-loading").style.display = 'flex';
		var baseURL = this._url;
		var accountedFor = 0;

		async.each(tiles, function(item, callback) {
			var url = baseURL.replace('{x}', item[0]).replace('{y}', item[1]).replace('{z}', item[2]);

			this._db.get(url, function(error, data) {
				if (!data) {
					URI2Base64(url, function(data) {
						var doc = {dataUrl: data, timestamp: Date.now()};

						this._db.put(doc, url, doc.timestamp);
						accountedFor += 1;

						console.log(accountedFor + ' of ' + tiles.length);
						callback(null);
					}.bind(this));
				} else {
					callback(null);
				}
			}.bind(this));
		}.bind(this), function(done) {
			console.log("Done!")
			document.querySelector(".cache-loading").style.display = 'none';
		});

	},

	clearCache: function() {
		new PouchDB('offline-tiles').destroy();
	}

});

function URI2Base64(uri, callback) {
  var img = new Image();
  img.crossOrigin = 'Anonymous';
  img.onload = function() {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var dataURL;
    canvas.height = this.height;
    canvas.width = this.width;
    ctx.drawImage(this, 0, 0);
    dataURL = canvas.toDataURL('image/png', 1.0);

    callback(dataURL);

    canvas = null;
  }
  img.src = uri;
}
