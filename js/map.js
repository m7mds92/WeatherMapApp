let map;

function initMap() {
    map = L.map('map').setView([15.5007, 32.5599], 6);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    console.log('Map initialization successfully');
}

let currentMarker = null;

function updateMapMarker(lat, lon, popupText){
    if(currentMarker){
        map.removeLayer(currentMarker);
    }
    currentMarker = L.marker([lat,lon]).addTo(map).bindPopup(popupText).openPopup();
}