let mood = "happy"; // Initial mood
const petImg = document.getElementById("pet");
const moodOutput = document.getElementById("mood-output");

const moods = {
    happy: "buddy waving.gif",
    sad: "buddy sad.gif",
    playing: "buddy walking.gif",
    eating: "buddy eating.gif",
    sleeping: "buddy sleeping.gif",
};

document.getElementById("feed").addEventListener("click", () => {
    mood = "happy"; // Update mood
    petImg.src = moods.eating; // Show eating GIF
    updateMoodOutput("Your Buddy is eating!");
});

document.getElementById("play").addEventListener("click", () => {
    mood = "happy"; // Update mood
    petImg.src = moods.playing; // Show playing GIF
    updateMoodOutput("Your Buddy is playing!");
});

document.getElementById("sleep").addEventListener("click", () => {
    mood = "sleeping"; // Update mood
    petImg.src = moods.sleeping; // Show sleeping GIF
    updateMoodOutput("Your Buddy is sleeping!");
});

document.getElementById("check").addEventListener("click", () => {
    updateMoodOutput(`Your Buddy is currently ${mood}.`);
});

function updateMoodOutput(message) {
    moodOutput.textContent = message;
}
