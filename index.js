var travels = 
`city,latitude,longitude
Isfahan,32.6539,51.6660
Varamin,35.3252,51.6472
Istanbul,41.0082,28.9784
Montreal,45.5019,-73.5674
Toronto,43.6502,-79.4232
Niagara,43.1362,-79.1077
Nowshahr,36.6494,51.4887
Masal,37.3633,49.1324
Gisum,37.6777,49.0518
Rasht,37.2713,49.5921
Olsabelangah,37.3101146,48.9604798
Toronto,43.6732,-79.3632
Niagara,43.0942,-79.1297
Jasper,52.8737,-118.0814
Calgary,51.0447,-114.0719
Banff,51.4254,-116.1773
Vancouver,49.2827,-123.1207
Vancouver,49.2427,-122.9207
Vienna,48.2081,16.3713
Zurich,47.3769,8.5417
Venice,45.4404,12.3160
Florence,43.7700,11.2577
Rome,41.8967,12.4822
Vatican,41.9029,12.4534
Munich,48.1351,11.5820
Berlin,52.5200,13.4050
Heidelberg,49.3988,8.6724
Banff,51.1808,-115.5942
Wapta,51.1871,-116.5761
Elk,53.6029,-112.8638
Elk,53.6029,-112.8038
Jasper,52.83,-118.3
Bangkok,13.7563,100.5018
`;

var stays = 
`city,latitude,longitude
Boroujen,31.9684,51.2937
Tehran,35.7219,51.3347
Edmonton,53.5461,-113.4937
`;

require([
  "esri/Map",
  "esri/views/MapView",
  "esri/Graphic",
  "esri/layers/GraphicsLayer",
  "esri/widgets/ScaleBar",
  "esri/widgets/BasemapToggle",
  "esri/core/watchUtils"
], function (Map, MapView, Graphic, GraphicsLayer, ScaleBar, BasemapToggle, watchUtils) {
  var map = new Map({
    basemap: "topo"
  });

  var view = new MapView({
    container: "viewDiv",
    map: map,
    zoom: 3,
    center: [0, 20],
    constraints: {
      minZoom: 3, // Set the minimum zoom level
      // maxZoom: 10, // Set the maximum zoom level to prevent excessive zooming
      snapToZoom: false // Disable snapping to zoom levels to allow smooth zooming
    }
  });

  // Add satellite basemap toggle bottom right.
  var toggle = new BasemapToggle({
    view: view,
    nextBasemap: "satellite"
  });
  view.ui.add(toggle, "top-right");

  // Add pins.
  var graphicsLayer = new GraphicsLayer();
  map.add(graphicsLayer);

  // Function to create stay marker symbol
  function createStayMarkerSymbol(size) {
    return {
      type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
      color: [64, 176, 64, 0.7], // Green color
      style: "square", // Specifies the marker is square-shaped
      size: size, // Size
      outline: {
        color: [255, 255, 255], // White outline color
        width: 1
      }
    };
  }

  // Function to create travel marker symbol
  function createTravelMarkerSymbol(size) {
    return {
      type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
      color: [196, 64, 64, 0.5], // Red color
      style: "circle", // Specifies the marker is circle-shaped
      size: size, // Size
      outline: {
        color: [255, 255, 255], // White outline color
        width: 1
      }
    };
  }

  // Function to scale markers based on zoom level
  function scaleMarkers() {
    var scale = view.scale;
    var staySize = 12 * (45000000**.3 / scale**.3);
    var travelSize = 8 * (45000000**.3 / scale**.3);

    graphicsLayer.graphics.forEach(function(graphic) {
      if (graphic.uid < stays.split(/\r\n|\r|\n/).length-2) { // stayMarkerSymbol color
        graphic.symbol = createStayMarkerSymbol(staySize);
      } else { // travelMarkerSymbol color
        graphic.symbol = createTravelMarkerSymbol(travelSize);
      }
    });
  }

  // Watch for zoom changes to scale the markers
  view.watch("scale", scaleMarkers);

  // Parse CSV data and add graphics
  const rows2 = stays.split('\n').slice(1); // skip header
  rows2.forEach(row => {
    const columns = row.split(',');
    if (columns.length === 3) {
      const city = columns[0];
      const latitude = parseFloat(columns[1]);
      const longitude = parseFloat(columns[2]);

      // Create a point for each city
      var point = {
        type: "point",
        longitude: longitude,
        latitude: latitude
      };

      // Create a graphic for each city
      var pointGraphic = new Graphic({
        geometry: point,
        symbol: createStayMarkerSymbol(12)
      });
      graphicsLayer.add(pointGraphic);
    }
  });

  const rows1 = travels.split('\n').slice(1); // skip header
  rows1.forEach(row => {
    const columns = row.split(',');
    if (columns.length === 3) {
      const city = columns[0];
      const latitude = parseFloat(columns[1]);
      const longitude = parseFloat(columns[2]);

      // Create a point for each city
      var point = {
        type: "point",
        longitude: longitude,
        latitude: latitude
      };

      // Create a graphic for each city
      var pointGraphic = new Graphic({
        geometry: point,
        symbol: createTravelMarkerSymbol(8)
      });
      graphicsLayer.add(pointGraphic);
    }
  });

  // Initial call to set the marker sizes
  scaleMarkers();
});
