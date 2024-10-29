let mood = "happy"; // Initial mood
const petImg = document.getElementById("pet");
const moodOutput = document.getElementById("mood-output");

// Paths to mood images (Ensure these images are correctly uploaded to your GitHub repository)
const moods = {
    happy: "buddy waving.gif",
    sad: "buddy sad.gif",
    playing: "buddy walking.gif",
    eating: "buddy eating.gif",
    sleeping: "buddy sleeping.gif",
};

// Function to update the mood output
function updateMoodOutput(message) {
    moodOutput.textContent = message; // Update mood output text
}

// Event listener for feeding the pet
document.getElementById("feed").addEventListener("click", () => {
    mood = "happy"; // Update mood
    petImg.src = moods.eating; // Show eating GIF
    updateMoodOutput("Your Buddy is eating!");
});

// Event listener for playing with the pet
document.getElementById("play").addEventListener("click", () => {
    mood = "happy"; // Update mood
    petImg.src = moods.playing; // Show playing GIF
    updateMoodOutput("Your Buddy is playing!");
});

// Event listener for putting the pet to sleep
document.getElementById("sleep").addEventListener("click", () => {
    mood = "sleeping"; // Update mood
    petImg.src = moods.sleeping; // Show sleeping GIF
    updateMoodOutput("Your Buddy is sleeping!");
});

// Event listener for scolding the pet
document.getElementById("scold").addEventListener("click", () => {
    mood = "sad"; // Update mood
    petImg.src = moods.sad; // Show sad GIF
    updateMoodOutput("Your Buddy is sad!");
});

// Event listener for checking the pet's mood
document.getElementById("check").addEventListener("click", () => {
    updateMoodOutput(`Your Buddy is currently ${mood}.`);
});

// Initialize the pet image to the default happy mood image
petImg.src = moods.happy; // Set the default image
updateMoodOutput("Your Buddy is happy!");
