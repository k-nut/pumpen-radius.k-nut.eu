function createMap() {
  // create a map in the "map" div, set the view to a given place and zoom
  var map = L.map("map").setView([52.4690, 13.4009], 11);

  // add an OpenStreetMap tile layer
  L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
    attribution: "&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
  }).addTo(map);

  var xhttp = new XMLHttpRequest();
  var loader = document.getElementById('loader');
  xhttp.open('POST', 'https://overpass-api.de/api/interpreter', true)
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      var data = JSON.parse(this.response);
      data.elements.forEach(function(element){
        L.circle([element.lat, element.lon], 500).addTo(map);
      });
      loader.classList.add('hidden');
    }
  };
  xhttp.send('[out:json];area[name="Berlin"];node(area)[man_made=water_well];out;');
}

document.addEventListener("DOMContentLoaded", createMap);

