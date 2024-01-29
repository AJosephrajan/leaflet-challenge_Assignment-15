# leaflet-challenge_Assignment-15
In this project, I built a layered world map that displays all earthquakes from the last 7 days by magnitude and depth as well as the borders of the Earth’s tectonic plates.
Clicking on any of the earthquakes will show the name of the earthquake which is uaully just a description of the location,Magnitude and Depth that it happened. In the bottom right corner of the screen is a legend to help the user understand the depth of the earthquake. In the upper right corner of the screen is a control for the user to choose which map layer is visible and whether or not the earthquakes or tectonic plates are visible.

Tools

The following are the tools, techniques, and resources used in this project.

Javascript, leaflet, are used to generate the map

HTML is used for the framework of the page and CSS for styling

D3 JSON and Leaflet geoJSON are used to load in the data

Data 
As given by the instructio I got the data from
https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson

For the challenge I used the data
https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json

Steps:
   1. Create the map layers
   2. Create the map object and adding the layers
   3. Define Layer groups and controling
   4. earth quake function, boundary Info, getcolor function
   5. Connects to geojson API using D3 
   6. Adding the legend to the map