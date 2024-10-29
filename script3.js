const tamagotchiName = document.getElementById("tamagotchi-name");
const tamagotchiStatus = document.getElementById("tamagotchi-status");

const tamagotchiId = "your_tamagotchi_id"; // Replace with your Tamagotchi ID

// Function to fetch Tamagotchi data from API
async function fetchTamagotchi() {
    try {
        const response = await fetch(`https://tamagotchi-api.com/tamagotchis/${tamagotchiId}`);
        const data = await response.json();
        
        // Update the display with the Tamagotchi data
        tamagotchiName.textContent = data.name;
        tamagotchiStatus.textContent = `Status: ${data.status}`;
    } catch (error) {
        console.error("Error fetching Tamagotchi data:", error);
    }
}

// Function to feed Tamagotchi
async function feedTamagotchi() {
    // Send a request to feed the Tamagotchi
    await fetch(`https://tamagotchi-api.com/tamagotchis/${tamagotchiId}/feed`, { method: 'POST' });
    fetchTamagotchi();
}

// Function to play with Tamagotchi
async function playWithTamagotchi() {
    // Send a request to play with the Tamagotchi
    await fetch(`https://tamagotchi-api.com/tamagotchis/${tamagotchiId}/play`, { method: 'POST' });
    fetchTamagotchi();
}

// Function to put Tamagotchi to sleep
async function putTamagotchiToSleep() {
    // Send a request to put the Tamagotchi to sleep
    await fetch(`https://tamagotchi-api.com/tamagotchis/${tamagotchiId}/sleep`, { method: 'POST' });
    fetchTamagotchi();
}

// Event Listeners
document.getElementById("feed-btn").addEventListener("click", feedTamagotchi);
document.getElementById("play-btn").addEventListener("click", playWithTamagotchi);
document.getElementById("sleep-btn").addEventListener("click", putTamagotchiToSleep);

// Initial fetch
fetchTamagotchi();
