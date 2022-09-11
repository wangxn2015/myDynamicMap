var mymap = L.map('mapid').setView([40.0761946, 116.2468865], 15);
// L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox.streets',
//     accessToken: 'ABCDEFG' //ENTER YOUR ACCESS TOKEN HERE
// }).addTo(mymap);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(mymap);


mapMarkers1 = [];
mapMarkers2 = [];
mapMarkers3 = [];

var source = new EventSource('/topic/ues'); //ENTER YOUR TOPICNAME HERE
source.addEventListener('message', function(e){

  console.log('Message');
  obj = JSON.parse(e.data);
  console.log(obj);
  console.log(obj.imsi);
  if(obj.imsi == '2000') {
    for (var i = 0; i < mapMarkers1.length; i++) {
      mymap.removeLayer(mapMarkers1[i]);
    }
    marker1 = L.marker([obj.point.lat, obj.point.lng]).addTo(mymap);
    mapMarkers1.push(marker1);
  }

  if(obj.imsi == '2001') {
    for (var i = 0; i < mapMarkers2.length; i++) {
      mymap.removeLayer(mapMarkers2[i]);
    }
    marker2 = L.marker([obj.point.lat, obj.point.lng]).addTo(mymap);
    mapMarkers2.push(marker2);
  }

  if(obj.imsi == '2002') {
    for (var i = 0; i < mapMarkers3.length; i++) {
      mymap.removeLayer(mapMarkers3[i]);
    }
    marker3 = L.marker([obj.point.lat, obj.point.lng]).addTo(mymap);
    mapMarkers3.push(marker3);
  }
}, false);
