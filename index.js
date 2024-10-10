var travels = 
`city,latitude,longitude
Ahvaz,31.3183,48.6706
Abadan,30.3666,48.2755
Khorramshahr,30.4256,48.1891
Shalamcheh,30.5126,48.0290
Dezful,32.3840,48.3996
Ganaveh,29.5808,50.5172
Deylam,30.0550,50.1649
Izeh,31.8240,49.8701
Susangerd,31.5567,48.1697
Mahshahr,30.5550,49.1879
Yasuj,30.6638,51.5949
Andimeshk,32.4618,48.3521
Shush,32.1958,48.2543
Shushtar,32.0465,48.8550
DezDamLake,32.6409,48.4537
Deylam,30.00,50.2
Ganaveh,29.6,50.55
Yasuj,30.6,51.55
Shiraz,29.5926,52.5836
Ahvaz,31.3,48.64
Mahshahr,30.6,49.2
Deylam,30.05,50.2
Ganaveh,29.6,50.5
ShahCheragh,29.6096,52.5433
Jamkarān,34.5840,50.9107
Chalus,36.6548,51.4213
Fereydunkenar,36.6867,52.5328
Ramsar,36.9268,50.6431
Mashhad,36.2972,59.6067
Qom,34.6416,50.8746
Jamkarān,34.58,50.907
Kashan,33.9910,51.4235
Fereydunshahr,32.9406,50.1260
Ahvaz,31.33,48.67
Chaghaukhor,31.92,50.88
Saveh,35.0240,50.3549
Hamedan,34.7983,48.5148
GardanehHeyran,38.4033229,48.6037468
Ardabil,38.2432,48.2976
Sareyn,38.1503,48.0701
Zanjan,36.6830,48.5087
Anzali,37.4639,49.4799
Astara,38.4225,48.8687
Gisum,37.67,49.0
Rasht,37.3,49.55
Qazvin,36.2795,50.0046
Sari,36.5659,53.0586
Mahmudabad,36.6329,52.2667
Shiraz,29.55,52.55
Pasargadae,30.2002,53.1778
Persepolis,29.9356,52.8892
Margoon,30.4911,51.8938
Yasuj,30.7,51.6
Ganaveh,29.6,50.6
Mahshahr,30.5,49.2
Abadan,30.35,48.25
Ahvaz,31.3,48.7
DarrehEshq,31.7667,50.8016
Semirom,31.4149,51.5683
Zarinshahr,32.4033,51.3995
Shahrebabak,30.1232,55.1173
Minab,27.1372,57.0675
BandarAbbas,27.1963,56.2884
Qeshm,26.9547,56.2680
Borujerd,33.8942,48.7670
Bisheh,33.3297414,48.8742401
SheikhAlikhan,32.5042931,50.0657708
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
Chaghaukhor,31.9232056,50.8873412
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
Kermanshah,34.3277,47.0778
Sanandaj,35.3119,46.9964
Baneh,35.9969,45.8853
Montreal,45.5519,-73.5
`;

var stays = 
`city,latitude,longitude
Boroujen,31.9684,51.2937
Tehran,35.7219,51.3347
Edmonton,53.5461,-113.4937
`;
var well_explored = 
`city,latitude,longitude
Isfahan,32.6539,51.6660
ShahSeyedAli,32.1322702,51.9173782
HamzehAli,31.93815,51.0044655
BabaGardaloo,32.0279926,50.9944949
Shahrekord,32.3274,50.8650
Delijan,33.9872,50.6877
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
  function createWellExploreMarkerSymbol(size) {
    return {
      type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
      color: [196, 64, 64, 0.5], // Green color
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
      if (graphic.uid < well_explored.split(/\r\n|\r|\n/).length-2) { // well_explored color
        graphic.symbol = createWellExploreMarkerSymbol(staySize);
      } else if (graphic.uid < stays.split(/\r\n|\r|\n/).length+well_explored.split(/\r\n|\r|\n/).length-4) { // stayMarkerSymbol color
        graphic.symbol = createStayMarkerSymbol(staySize);
      } else  { // travelMarkerSymbol color
        graphic.symbol = createTravelMarkerSymbol(travelSize);
      }
    });
  }

  // Watch for zoom changes to scale the markers
  view.watch("scale", scaleMarkers);

  // Parse CSV data and add graphics
  const rows3 = well_explored.split('\n').slice(1); // skip header
  rows3.forEach(row => {
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
        symbol: createWellExploreMarkerSymbol(12)
      });
      graphicsLayer.add(pointGraphic);
    }
  });

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
