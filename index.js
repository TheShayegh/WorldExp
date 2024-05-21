var travels = 
`city,latitude,longitude
İstanbul,41.0082,28.9784
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
Banff,51.1784,-115.5708
Vancouver,49.2827,-123.1207
Vancouver,49.2427,-122.9207
Vienna,48.2081,16.3713
Zurich,47.3769,8.5417
Venice,45.4404,12.3160
Florence,43.7700,11.2577
Rome,41.8967,12.4822
Vatican,41.9029,12.4534
Munich,48.1351,11.5820
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
    "esri/layers/FeatureLayer",
    "esri/widgets/ScaleBar",
    "esri/widgets/BasemapToggle"
  ], function (Map, MapView, Graphic, GraphicsLayer, ScaleBar, BasemapToggle) {
    var map = new Map({
      basemap: "topo"
    });
    var view = new MapView({
      container: "viewDiv",
      map: map,
      zoom: 3,
      center: [0, 20]
    });
    //Add satellite basemap toggle bottom right.
    var toggle = new BasemapToggle({
      view: view,
      nextBasemap: "satellite"
    });
    view.ui.add(toggle, "top-right");


    // Add pins.

    var graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);
    // Define a symbol for drawing the point
    var stayMarkerSymbol = {
        type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
        color: [64, 176, 64, .8], // Green color
        style: "square", // Specifies the marker is square-shaped
        size: "12px", // Larger size, adjust as needed
        outline: {
            color: [255, 255, 255], // White outline color
            width: 1
        }
    };
    var travelMarkerSymbol = {
        type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
        color: [196, 64, 64, .4], // Orange color
        size: "8px", // Larger size, adjust as needed
        outline: {
            color: [255, 255, 255], // White outline color
            width: 1
        }
        };
      // Parse CSV data
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
            symbol: stayMarkerSymbol
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
            symbol: travelMarkerSymbol
          });
          graphicsLayer.add(pointGraphic);
        }
      });
  });
  