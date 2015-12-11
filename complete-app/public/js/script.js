var CSE = {};

//A poor person's jQuery-type $ selector
CSE.$ = function(el) {
    if (el.substr(0, 1) === "#") {
        return document.getElementById(el.substr(1));
    }
    else if (el.substr(0, 1) === ".") {
        return document.getElementsByClassName(el.substr(1));
    }
    else {
        return document.getElementsByTagName(el);
    }
};

// Function to create a unique UUID for each point
CSE.getID = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = crypto.getRandomValues(new Uint8Array(1))[0]%16|0, v = c == 'x' ?
        r : (r&0x3|0x8);
        return v.toString(16);
    });
};

// Initialize the local database
CSE.db = new PouchDB('parleglite1');

CSE.socket = io();

// Create a variable to keep track of our things.
// Each key of this object is a thing UUID
CSE.things = {};

CSE.tiles = null;

// Reserve a variable for the map…
CSE.map = null;

// and for storing the center of the map when a point is being added
CSE.currentLatLng = {lat: 0, lng: 0};

CSE.locations = [];

CSE.markers = {

    prev_loc : {
        weight: 2,
        fill: true,
        radius: 5,
        opacity: 0.5,
        fillOpacity: 0.5,
        color: "#0000ff"
    },

    curr_loc : {
        weight: 2,
        fill: true,
        radius: 5,
        opacity: 1,
        fillOpacity: 1,
        color: "#0000ff"
    },

    synced : {
        weight: 2,
        fill: true,
        radius: 5,
        opacity: 1,
        fillOpacity: 1,
        color: "#00ff00"
    },

    unsynced : {
        weight: 2,
        fill: true,
        radius: 5,
        opacity: 1,
        fillOpacity: 1,
        color: "#ff0000"
    }
};

// Handle the form submission
CSE.submitForm = function(event) {
    event.preventDefault();
    CSE.$("#form").className = "off";

    var payload = {
        _id: CSE.$("#id").value,
        lat: CSE.$("#lat").value,
        lng: CSE.$("#lng").value,
        name: CSE.$("#name").value,
        desc: CSE.$("#desc").value,
        synced: false
    }
    // Save data to the in-browser database
    CSE.db.put(payload);

    CSE.socket.emit('new point', payload);
    
    // Pan back to the original location
    CSE.map.panTo([CSE.currentLatLng.lat, CSE.currentLatLng.lng]);
};

// Undo the marker
CSE.removeMarker = function(marker) {
    event.preventDefault();
    CSE.$("#form").className = "off";

    // Remove the marker from the map
    CSE.map.removeLayer(marker);

    /*
    // Remove the point from the database
    db.get(id).then(function(doc) {
        return db.remove(doc);
    }).then(function (result) {

        // handle result

    }).catch(function (err) {
        console.log(err);
    });
    */

    // Pan back to the original location
    CSE.map.panTo([CSE.currentLatLng.lat, CSE.currentLatLng.lng]);

    // // Remove the point from the database
    // CSE.db.get(id).then(function(doc) {
    //   return CSE.db.remove(doc);
    // }).then(function (result) {
    //   // handle result
    // }).catch(function (err) {
    //   console.log(err);
    // });
};

// Create the map on load
CSE.makeMap = function() {

    // Initialize a new leaflet map
    CSE.map = L.map('map');

    // Add our tiles to new map
    CSE.tiles = L.tileLayer('//14.139.123.7/tiles/basemap/{z}/{x}/{y}/tile.png', {
        useCache: true,
        saveToCache: false,
        maxZoom: 13,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' + 'Style by <a href="http://mapbox.com">Mapbox</a>'
    }).addTo(CSE.map);

    //navigator.geolocation.watchPosition(success_callback_function, error_callback_function, position_options)

    // Handle user location found
    CSE.map.on("locationfound", function(event) {

        //CSE.map.removeLayer(CSE.curr_loc);

        // Add a blue marker for current location
        var loc = L.circleMarker(loc, CSE.markers.prev_loc);

        // Insert current location into the locations array
        CSE.locations.push(event.latlng);

        // Create a trail of points
        // CSE.locations.forEach(function(loc) {
        //     .addTo(CSE.map);
        // });

        // // Calculate radius of circle given location accuracy
        // var radius = event.accuracy / 2;
        //
        // // Add a circle halo for the marker to represent accuracy error
        // L.circle(event.latlng, radius).addTo(CSE.map);
        //
        // CSE.curr_loc.bindPopup(
        //     "You are within " + radius + " meters from this point"
        // );
        //
        // // Close the popup after 3 seconds
        // setTimeout(function() {
        //     curr_loc.closePopup();
        // }, 3000)
    });

    // Alert the user to a location error
    CSE.map.on("locationerror", function(event) {
        alert(event.message);
    });

    // Fire an event to find the user's location and draw the map
    CSE.map.locate({
        watch: true,
        setView: true,
        //enableHighAccuracy: true,
        maximumAge: 30000 // After every 30sec, recent loc is fetched and updates map setview
    });


    // Handle the user right clicking or long pressing on the map
    CSE.map.on("contextmenu", function(event) {
        var lat = event.latlng.lat.toFixed(6),
            lng = event.latlng.lng.toFixed(6),
            id = CSE.getID();

        CSE.$("#id").value = id;
        CSE.$("#lat").value = lat;
        CSE.$("#lng").value = lng;

        // Add a red (unsynced) marker to the map
        var thing = L.circleMarker(event.latlng, CSE.markers.unsynced)
            .addTo(CSE.map);


        // // Toggle the form on
        CSE.$("#form").className = "on";

        // Store the center of the map
        var center = CSE.map.getCenter();
        CSE.currentLatLng.lat = center.lat;
        CSE.currentLatLng.lng = center.lng;

        // Pan the map to make sure the added marker is visible
        CSE.map.panToOffset([lat, lng], [0, 150]);

        // Add an event listener to undo the marker
        CSE.$("#undo")
            .addEventListener("click", function(event) {
                event.preventDefault();

                // Make sure all form fields are empty
                CSE.$("#id").value = "";
                CSE.$("#lat").value = "";
                CSE.$("#lng").value = "";
                CSE.$("#name").value = "";
                CSE.$("#desc").value = "";

                CSE.$("#form").className = "off";

                // Remove the marker from the map
                CSE.map.removeLayer(thing);

                // Pan back to the original location
                CSE.map.panTo([center.lat, center.lng]);
            });
    });

    // When we load the page, check if we have any existing points
    CSE.db.allDocs().then(function(result) {

        // For each row…
        result.rows.forEach(function(row) {

            // Retrieve the information from the local database…
            CSE.db.get(row.id).then(function(point) {

                // and add a marker to map
                CSE.things[point._id] = L.circleMarker(
                        [point.lat, point.lng],
                        point.synced ? CSE.markers.synced : CSE.markers.unsynced
                    )
                    .addTo(CSE.map);

                CSE.things[point._id]
                    .bindPopup(
                        '<b>Name:</b> ' + point.name + '<br>' +
                        '<b>Description:</b> ' + point.desc + '<br>' +
                        (point.synced ? '<b>Status:</b> synced' : '<br><button>Sync</button>')
                    );
            });
        });
    });
};


// CSE.bounds = CSE.map.getBounds();
CSE.xhr = new XMLHttpRequest();
CSE.xhr.open("get","http://localhost:3000/get_all_points",true);
CSE.xhr.send();

CSE.xhr.onreadystatechange = function(){
    if(CSE.xhr.readyState == 4 && CSE.xhr.status == 200){
        old_points = JSON.parse(CSE.xhr.responseText);
        CSE.buildMarkers(old_points)
    }
}

// Plotting markers from pg
CSE.buildMarkers = function (existing_points){
    existing_points.forEach(function(old_point) {
        L.circleMarker([old_point.lat, old_point.lng], CSE.markers.unsynced)
            .addTo(CSE.map);
    });

}
