
function createMap(earthquakes) {
    var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    let baseMap = {
    'Street Map':streetmap
    };

    let overlayMap = {
    "Earthquakes" : earthquakes
    };


    var map = L.map("map",{
    center:[40.73, -74.0059],
    zoom: 4,
    layers:[streetmap,earthquakes]
    });

    L.control.layers(baseMap, overlayMap, {
        collapsed: false
    }).addTo(map);
};

function createFeatures(response){
    let data = response.features
    console.log(data);
    let mapMarkers=[]

    for (let index = 0; index < data.length; index++){
        let feat = data[index];
    
    let depth = feat.geometry.coordinates[2]
    if (depth <= 10) {
        color = "#44ce1b";
    }
    else if (depth <= 20) {
        color = "#bbdb44";
    }
    else if (depth <= 30) {
        color = "#f7e379";
    }
    else if (depth <= 40) {
        color = "#f2a134";
    }
    else {
        color = "#e51f1f";
    }

    let mapMarker = L.circleMarker([feat.geometry.coordinates[1],feat.geometry.coordinates[0]],
        {radius:feat.properties.mag * 4 ,
        color: color

        }
        ).bindPopup("<h3>" + feat.properties.place +
        "<h3><h3>Magnitude: " + feat.properties.mag + "<h3><h3>Depth: " + feat.geometry.coordinates[2] + "</p>");
    
    mapMarkers.push(mapMarker);
    }
    createMap(L.layerGroup(mapMarkers));
 };

let url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'
d3.json(url).then(createFeatures);

