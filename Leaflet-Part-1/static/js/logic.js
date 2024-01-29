// Assignment 15 - Part 1: Create the Earthquake Visualization 01/29/2024
//Using d3 libraries
//***************************************************************************

// API for geojson data
let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
let boundaries = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"

// Adding a tile layer
 let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Adding a Satellite layer
let satellite = L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}');

// Create a map object, and set the default layers.
let myMap =L.map("map", {
    center : [37.09,-95.71],
    zoom :3,
    layers :[street]
});
//Base Map
let baseMaps = {'Street': street,'Satellite':satellite};

//define the earthquake layergroup 
let earthquake_data = new L.LayerGroup();
let boundary_data = new L.LayerGroup();


// Overlays that can be toggled on or off, adding Techtonic layer for Part-2
let overlayMaps = {"EarthQuake": earthquake_data,
                   "Techtonic Plates": boundary_data 
                };

                   

//add a control layer and pass in baseMaps and overlays
L.control.layers(baseMaps, overlayMaps, {collapsed : false}).addTo(myMap);

//earthquakeinfo function will dictate the warthquake points on the map
function earthquakeInfo(feature){
    return{
        color:  "black",
        radius :(feature.properties.mag)* 3,// radius based on the magnitude
        fillColor : getColor(feature.geometry.coordinates[2]),// color based on the depth of the earthquake
        weight: .5,
        opacity: 1,
        fillOpacity: 0.8
    }
};
//boundaryInfo function will dictate the boundary points on the map-Part-2
function boundaryInfo(feature){
    return{
        color:  "purple",
        weight: 3     
        
    }
};

//define a function to choose the fillColor of the earthquake based on earthquake depth
function getColor(depth){
    if (depth >-10 & depth <= 10) return "#B6F34C";
    else if (depth >10 & depth <= 30) return "#E1F34C";
    else if (depth >30 & depth <= 50) return "#F3DB4C";
    else if (depth >50 & depth <= 70) return "#F3B94C";
    else if (depth >70 & depth <= 90) return "#F0A76A";
    else return "#F06A6A";
};

//Connects to geojson API using D3 
d3.json(link).then(function(data){
    L.geoJson(data,{ 
        pointToLayer:function (feature,latlng) {
            return L.circleMarker(latlng).bindPopup("<h1>location: " + feature.properties.place + "</h1> <hr> <h2>magnitude:" + feature.properties.mag  + " <hr> <h2>Depth: " + feature.geometry.coordinates[2] + "</h2>");},
        style : earthquakeInfo
   }).addTo(earthquake_data);
earthquake_data.addTo(myMap);

 // Set up the legend.
 let legend = L.control({ position: "bottomright" });
 legend.onAdd = function() {
   let div = L.DomUtil.create("div", "info legend");
   let limits = [-10,10,30,50,70,90];
   let colors = ['#B6F34C', '#E1F34C', '#F3DB4C', '#F3B94C', '#F0A76A','#F06A6A'];
   var legendInfo = "<h4>Depth</h4>";
   div.innerHTML = legendInfo
   for (let i = 0; i < limits.length; i++) {
    div.innerHTML += "<i style='background: " + colors[i] + "'></i> "
      + limits[i] + (limits[i + 1] ? "&ndash;" + limits[i + 1] + "<br>" : "+");
  }
  return div;
};  

 // Adding the legend to the map
 legend.addTo(myMap);
 // Challenge Part 2, adding Techtonic layer
 d3.json(boundaries).then(function(plates_data){
    L.geoJson(plates_data,{ 
      style : boundaryInfo
   }).addTo(boundary_data);
   boundary_data.addTo(myMap);
});
});

