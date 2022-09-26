var mymap = L.map('mapid').setView([40.075,116.24], 15);

// this one doesn't work
// L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 25,
//     id: 'mapbox.streets',
//     accessToken: 'pk.eyJ1IjoieHdhbjQ5MzEiLCJhIjoiY2w3cmI0NGc3MDViczNub2dhcng1bW80YSJ9.3eB96jIX2ttB5u-BFwbOrA' //ENTER YOUR ACCESS TOKEN HERE
// }).addTo(mymap);

//this works
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '© OpenStreetMap'
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

  if(obj.Imsi == "2000") {
    console.log('2000')
    console.log(obj.Imsi)
    for (var i = 0; i < mapMarkers1.length; i++) {
      mymap.removeLayer(mapMarkers1[i]);
    }
    marker1 = L.marker([obj.Loca.Lat, obj.Loca.Lng]).addTo(mymap);
    mapMarkers1.push(marker1);
  }

  if(obj.Imsi == "2001") {
    console.log('2001')
    console.log(obj.Imsi)
    for (var i = 0; i < mapMarkers2.length; i++) {
      mymap.removeLayer(mapMarkers2[i]);
    }
    marker2 = L.marker([obj.Loca.Lat, obj.Loca.Lng]).addTo(mymap);
    mapMarkers2.push(marker2);
  }

  if(obj.Imsi == "2002") {
    console.log('2002')
    console.log(obj.Imsi)
    for (var i = 0; i < mapMarkers3.length; i++) {
      mymap.removeLayer(mapMarkers3[i]);
    }
    marker3 = L.marker([obj.Loca.Lat, obj.Loca.Lng]).addTo(mymap);
    mapMarkers3.push(marker3);
  }
}, false);




// source.addEventListener('message', function(e){

//   console.log('Message');
//   obj = JSON.parse(e.data);
//   console.log(obj);

//   if(obj.busline == '00001') {
//     for (var i = 0; i < mapMarkers1.length; i++) {
//       mymap.removeLayer(mapMarkers1[i]);
//     }
//     marker1 = L.marker([obj.latitude, obj.longitude]).addTo(mymap);
//     mapMarkers1.push(marker1);
//   }

//   if(obj.busline == '00002') {
//     for (var i = 0; i < mapMarkers2.length; i++) {
//       mymap.removeLayer(mapMarkers2[i]);
//     }
//     marker2 = L.marker([obj.latitude, obj.longitude]).addTo(mymap);
//     mapMarkers2.push(marker2);
//   }

//   if(obj.busline == '00003') {
//     for (var i = 0; i < mapMarkers3.length; i++) {
//       mymap.removeLayer(mapMarkers3[i]);
//     }
//     marker3 = L.marker([obj.latitude, obj.longitude]).addTo(mymap);
//     mapMarkers3.push(marker3);
//   }
// }, false);