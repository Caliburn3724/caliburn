let happiness = 100; // Initial happiness
let health = 100; // Initial health
const petImg = document.getElementById("pet");
const moodOutput = document.getElementById("mood-output");
const happinessOutput = document.getElementById("happiness-value");
const healthOutput = document.getElementById("health-value");

const moods = {
    happy: "buddy_waving.gif", // Change to your GIF path
    sad: "buddy_sad.gif", // Change to your GIF path
    playing: "buddy_playing.gif", // Change to your GIF path
    eating: "buddy_eating.gif", // Change to your GIF path
    sleeping: "buddy_sleeping.gif", // Change to your GIF path
    dead: "buddy_dead.gif" // Change to your GIF path
};

// Function to update the outputs for happiness and health
function updateOutputs() {
    happinessOutput.textContent = happiness;
    healthOutput.textContent = health;

    if (health <= 0) {
        petImg.src = moods.dead; // Show dead GIF
        updateMoodOutput("Your Buddy has passed away. Please take better care next time.");
    }
}

// Function to update the mood output text
function updateMoodOutput(message) {
    moodOutput.textContent = message;
}

// Event listeners for interaction buttons
document.getElementById("feed").addEventListener("click", () => {
    if (health > 0) {
        happiness = Math.min(happiness + 20, 100); // Increase happiness
        health = Math.min(health + 10, 100); // Increase health
        petImg.src = moods.eating; // Show eating GIF
        updateMoodOutput("Your Buddy is eating!");
        updateOutputs();
    }
});

document.getElementById("play").addEventListener("click", () => {
    if (health > 0) {
        happiness = Math.max(happiness - 10, 0); // Decrease happiness slightly
        health = Math.max(health - 5, 0); // Decrease health when playing
        petImg.src = moods.playing; // Show playing GIF
        updateMoodOutput("Your Buddy is playing!");
        updateOutputs();
    } else {
        petImg.src = moods.dead; // Show dead GIF if health is zero
        updateMoodOutput("Your Buddy cannot play anymore.");
    }
});

document.getElementById("sleep").addEventListener("click", () => {
    if (health > 0) {
        happiness = Math.min(happiness + 10, 100); // Increase happiness slightly
        health = Math.min(health + 5, 100); // Increase health
        petImg.src = moods.sleeping; // Show sleeping GIF
        updateMoodOutput("Your Buddy is sleeping!");
        updateOutputs();
    }
});

document.getElementById("check").addEventListener("click", () => {
    if (health > 0) {
        if (happiness > 50) {
            petImg.src = moods.happy; // Show happy GIF
            updateMoodOutput("Your Buddy is happy!");
        } else {
            petImg.src = moods.sad; // Show sad GIF
            updateMoodOutput("Your Buddy is sad. They need more attention.");
        }
    } else {
        petImg.src = moods.dead; // Show dead GIF if health is zero
        updateMoodOutput("Your Buddy has passed away.");
    }
    updateOutputs(); // Update health and happiness values display
});

// Initialize the outputs on load
updateOutputs();

