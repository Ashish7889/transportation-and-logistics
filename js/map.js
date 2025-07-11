document.addEventListener("DOMContentLoaded", function() {
  // Attempt geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        // Success callback
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        console.log("Geolocation success:", lat, lng);

        window.map = L.map('map').setView([lat, lng], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(window.map);

        // Dispatch an event so realtime.js knows the map is ready
        document.dispatchEvent(new Event("map-ready"));
      },
      function(error) {
        // Error or user denied permission
        console.error("Geolocation error:", error.message);
        fallbackToLondon();
      }
    );
  } else {
    // Geolocation not supported
    console.warn("Geolocation not supported. Falling back to London.");
    fallbackToLondon();
  }

  // Fallback function if geolocation fails
  function fallbackToLondon() {
    window.map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(window.map);

    // Dispatch an event so realtime.js knows the map is ready
    document.dispatchEvent(new Event("map-ready"));
  }
});