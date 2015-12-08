# Tileserver demo

Download an OpenStreetMap extract of Mumbai, put it into a PostGIS database, customize the OSM-Bright style
for our needs, and run a tile server that caches tiles to disk with Tilestrata.

## Setup
````
npm install
````

Also see the manual style build instructions

## Running
````
node server.js
````

Tiles will then be available at `http://localhost:8080/basemap/{z}/{x}/{y}/tile.png`, or whatever port is provided.


#### To manually build the tile styles

*Assumes you have Postgresql, osm2pgsql, git, and curl installed. Will also download and import the
Mumbai metro extract.*

First download the Mumbai metro extract, shapefiles that we need, and install `carto` globally:
````
./setup.sh
sudo npm install -g carto
cp osm-bright/configure.py.sample osm-bright/configure.py
````


Next, fill out `osm-bright/configure.py`
  - path (`getcwd()`)
  - host (`localhost`)
  - port (`5432`)
  - dbname (`osm`)
  - user (your username)
  - password
  - land-high (`path.join(path.dirname(getcwd()) + "/shp/land_polygons/land-polygons-split-3857/land_polygons.shp")`)
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

You should now be able to run `node server.js`.
