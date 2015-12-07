var fs = require('fs');

// Read in the config file
var config = JSON.parse(fs.readFileSync(__dirname + '/osm-bright/OSMBright/project.mml', 'utf-8'));

// Do a small tweak
config.Layer.forEach(function(layer) {
  if (layer['class'] === 'shp') {
    layer['Datasource']['type'] = 'shape';
  } else {
    layer['Datasource']['type'] = 'postgis';
  }

  if (layer['id'] === 'ne_places') {
    layer['Datasource'] = {
      file: __dirname + '/shp/ne_places/10m-populated-places-simple.shp',
      srs: '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0.0 +k=1.0 +units=m +nadgrids=@null +wktext +no_defs +over',
      type: 'shape'
    }
    layer['srs'] = '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0.0 +k=1.0 +units=m +nadgrids=@null +wktext +no_defs +over';
  }
});

fs.writeFileSync(__dirname + '/osm-bright/OSMBright/project_mod.mml', JSON.stringify(config, null, 2), 'utf-8');
