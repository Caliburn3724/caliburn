// Initialize the map
const map = L.map('map').setView([40.7128, -74.0060], 6); // Default to New York

// Add a tile layer (map style)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map);

// Function to simulate a nuclear blast
function simulateBlast() {
    const blastRadius = document.getElementById('blastRadius').value;
    
    // Set a marker for the blast center (in this case, the map's center)
    const center = map.getCenter();

    // Add a circle with the specified radius
    const blastCircle = L.circle(center, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: blastRadius * 1000 // Convert km to meters
    }).addTo(map);

    // Pan map to show the blast area
    map.panTo(center);
}
