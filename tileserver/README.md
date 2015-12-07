# To manually build the tile styles

````
./setup.sh

sudo npm install -g carto

````


Fill out configure.py
  - path (`getcwd()``)
  - host (`localhost`)
  - port (`5432`)
  - dbname (`osm`)
  - user (your username)
  - password
  - land-high (`path.join(path.dirname(getcwd()) + "/shp/land_polygons/land-polygons-split-3857/land_polygons.shp")``)
  - land-low (`path.join(path.dirname(getcwd()) + "/shp/simplified_land_polygons/simplified-land-polygons-complete-3857/simplified_land_polygons.shp")`)

````

cd osm-bright
./make.py

cd ..
node setup.js

cd osm-bright/OSMBright/
carto project_mod.mml > mapnik.xml


````
