document.addEventListener("DOMContentLoaded", function() {
  // Wait until map-ready event is dispatched by map.js
  document.addEventListener("map-ready", function() {
    if (!window.map) {
      console.error("Map not found. Check map.js initialization.");
      return;
    }
    if (typeof window.map.getCenter !== "function") {
      console.error("getCenter is not a function. Possibly not a Leaflet map object.");
      return;
    }

    // Use current map center as initial marker position
    const center = window.map.getCenter();
    let driverMarker = L.marker([center.lat, center.lng]).addTo(window.map)
      .bindPopup("Driver Location")
      .openPopup();

    // Simulate real-time movement every 3 seconds
    setInterval(function() {
      let latlng = driverMarker.getLatLng();
      let newLat = latlng.lat + (Math.random() - 0.5) * 0.002;
      let newLng = latlng.lng + (Math.random() - 0.5) * 0.002;
      driverMarker.setLatLng([newLat, newLng]);
    }, 3000);
  });
});
