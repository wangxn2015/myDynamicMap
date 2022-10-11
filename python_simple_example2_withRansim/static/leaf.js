var mymap = L.map('mapid').setView([40.075,116.24], 15);

// this one doesn't work
// L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 25,
//     id: 'mapbox.streets',
//     accessToken: 'pk.eyJ1IjoieHdhbjQ5MzEiLCJhIjoiY2w3cmI0NGc3MDViczNub2dhcng1bW80YSJ9.3eB96jIX2ttB5u-BFwbOrA' //ENTER YOUR ACCESS TOKEN HERE
// }).addTo(mymap);

//this works
// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 20,
//     attribution: '© OpenStreetMap'
// }).addTo(mymap);

//this works
L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
maxZoom: 20,
subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
}).addTo(mymap);


//this works
// L.tileLayer('http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}', {
//     // minZoom: 100,
//     // maxZoom: 20,
//     tms: false,
//     attribution: '佰才邦',
//     pmIgnore: true
// }).addTo(mymap);



mapMarkers1 = [];
mapMarkers2 = [];
mapMarkers3 = [];

var source = new EventSource('/ues'); //ENTER YOUR TOPICNAME HERE
source.addEventListener('message', function(e){

  console.log('Message');
  obj = JSON.parse(e.data);
  console.log(obj);


    console.log(obj.Imsi)
    for (var i = 0; i < mapMarkers1.length; i++) {
      mymap.removeLayer(mapMarkers1[i]);
    }
    marker1 = L.marker([obj.Loca.Lat, obj.Loca.Lng]).addTo(mymap);
    mapMarkers1.push(marker1);



}, false);





