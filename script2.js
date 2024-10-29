// Initialize the map
const map = L.map('map').setView([40.7128, -74.0060], 10); // Default view over New York

// Add a tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
}).addTo(map);

let selectedLatLng = null;

// Update coordinates display when the map is clicked
map.on('click', function(e) {
    selectedLatLng = e.latlng;
    document.getElementById("coordinates").textContent = `Selected Location: ${selectedLatLng.lat.toFixed(4)}, ${selectedLatLng.lng.toFixed(4)}`;
});

// Function to simulate explosion effects
function simulateExplosion() {
    // Check if a location is selected
    if (!selectedLatLng) {
        alert("Please click on the map to select a location for the blast.");
        return;
    }
    
    // Get the user-defined yield from the input
    const yield = parseFloat(document.getElementById("yield").value);
    if (isNaN(yield) || yield <= 0) {
        alert("Please enter a valid blast yield.");
        return;
    }

    // Clear previous circles
    map.eachLayer((layer) => {
        if (layer instanceof L.Circle) map.removeLayer(layer);
    });

    // Define blast radii based on yield
    const blastRadii = [
        { name: 'Fireball', radius: yield * 0.2 },
        { name: 'Heavy Blast Damage', radius: yield * 1.0 },
        { name: 'Moderate Blast Damage', radius: yield * 2.0 },
        { name: 'Light Blast Damage', radius: yield * 3.0 }
    ];

    // Create circles to represent blast radii
    blastRadii.forEach(effect => {
        L.circle(selectedLatLng, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.2,
            radius: effect.radius * 1000 // Convert km to meters for Leaflet
        }).addTo(map).bindPopup(`${effect.name}: ${effect.radius.toFixed(2)} km`).openPopup();
    });

    map.setView(selectedLatLng, 10); // Center the map on the selected location
}
