// Initialize the map
const map = L.map('map').setView([40.7128, -74.0060], 13); // Default to New York City

// Add a base layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Function to generate random blast data points within a radius
function generateBlastData(center, radius, intensity) {
    const data = [];
    for (let i = 0; i < intensity; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * radius;
        const lat = center[0] + (distance * Math.cos(angle)) / 111; // Approximate degree to km conversion
        const lng = center[1] + (distance * Math.sin(angle)) / 111;
        data.push([lat, lng, 0.5]); // [lat, lng, intensity]
    }
    return data;
}

// Function to simulate the blast
function simulateBlast() {
    const locationInput = document.getElementById("location").value;
    const [lat, lng] = locationInput.split(',').map(Number); // Get latitude and longitude from input
    const blastRadius = parseFloat(document.getElementById("blast-radius").value); // Get radius from input
    const blastIntensity = parseInt(document.getElementById("blast-intensity").value); // Get intensity from input

    // Set map view to the selected location
    map.setView([lat, lng], 13);

    // Generate the heatmap data
    const heatData = generateBlastData([lat, lng], blastRadius, blastIntensity);

    // Remove existing heatmap layer if it exists
    if (window.heat) {
        map.removeLayer(window.heat);
    }

    // Add the new heatmap layer
    window.heat = L.heatLayer(heatData, {
        radius: 25, // Adjust radius for heat effect size
        blur: 15,
        maxZoom: 17
    }).addTo(map);
}

// Add event listener for the simulate button
document.getElementById("simulate").addEventListener("click", simulateBlast);
