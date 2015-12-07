# Tileserver demo

## Running
````
node server.js
````

Tiles will then be available at `http://localhost:8080/basemap/{z}/{x}/{y}/tile.png`


#### To manually build the tile styles

First download the shapefiles that we need and install `carto` globally:
````
./setup.sh
sudo npm install -g carto
````


Next, fill out `osm-bright/configure.py`
  - path (`getcwd()``)
  - host (`localhost`)
  - port (`5432`)
  - dbname (`osm`)
  - user (your username)
  - password
  - land-high (`path.join(path.dirname(getcwd()) + "/shp/land_polygons/land-polygons-split-3857/land_polygons.shp")``)
  - land-low (`path.join(path.dirname(getcwd()) + "/shp/simplified_land_polygons/simplified-land-polygons-complete-3857/simplified_land_polygons.shp")`)


Build the `project.mml` file for `osm-bright`, clean up the errors, and convert it to a Mapnik XML file
````
cd osm-bright
./make.py

cd ..
node setup.js

cd osm-bright/OSMBright/
carto project_mod.mml > mapnik.xml
````
