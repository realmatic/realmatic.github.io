// mapid is the id of the div where the map will appear
const map = L.map('mapid').setView([45.5152, -122.6784], 12);   // center position + zoom

// Add a tile to the map = a background. Comes from OpenStreetmap
L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
    maxZoom: 20,
    }).addTo(map);

// Add a svg layer to the map
L.svg().addTo(map);

import markers from './portland_plot_trees.json' assert { type: 'json' };

function myMarkers(lot) {
  L.circleMarker([lot.lat, lot.lon], {
    radius: lot.count,
    stroke: true,
    color: '#cf9986',
    fillColor: '#325028',
    fillOpacity: .8 
  }).addTo(map).bindPopup('Count: ' + lot.count + '<br>Carbon: ' + lot.carbon + '<br>Biomass: ' + lot.biomass);
}

markers.forEach(myMarkers);

