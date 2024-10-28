// Load stored mood history from localStorage or initialize as an empty array
let moodHistory = JSON.parse(localStorage.getItem("moodHistory")) || [];

// Function to handle form submission and track mood
document.getElementById("mood-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const moodSelect = document.getElementById("mood");
    const mood = moodSelect.value;
    const date = new Date().toLocaleDateString();

    // Add mood entry to history
    moodHistory.push({ mood, date });
    saveMoodHistory(); // Save to localStorage
    
    // Update the history display and clear form
    updateMoodHistory();
    moodSelect.value = '';
    document.getElementById("mood-output").textContent = `Mood "${mood}" recorded for ${date}.`;
});

// Function to save mood history to localStorage
function saveMoodHistory() {
    localStorage.setItem("moodHistory", JSON.stringify(moodHistory));
}

// Function to update mood history display
function updateMoodHistory() {
    const historyList = document.getElementById("mood-history");
    historyList.innerHTML = ''; // Clear previous history

    moodHistory.forEach((entry, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${entry.date}: ${entry.mood}`;

        // Add delete button to each mood entry
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-btn");
        deleteButton.onclick = () => deleteMoodEntry(index);

        listItem.appendChild(deleteButton);
        historyList.appendChild(listItem);
    });
}

// Function to delete a specific mood entry
function deleteMoodEntry(index) {
    moodHistory.splice(index, 1); // Remove mood entry
    saveMoodHistory(); // Update localStorage
    updateMoodHistory(); // Refresh display
}

// Function to analyze mood history
function analyzeMood() {
    if (moodHistory.length === 0) {
        document.getElementById("mood-analysis").textContent = "No mood data to analyze.";
        return;
    }

    // Count each mood's frequency
    const moodCount = {};
    moodHistory.forEach(entry => {
        moodCount[entry.mood] = (moodCount[entry.mood] || 0) + 1;
    });

    // Determine most frequent mood
    let mostFrequentMood = '';
    let maxCount = 0;
    for (const mood in moodCount) {
        if (moodCount[mood] > maxCount) {
            maxCount = moodCount[mood];
            mostFrequentMood = mood;
        }
    }

    // Display analysis results
    const analysisDiv = document.getElementById("mood-analysis");
    analysisDiv.innerHTML = `
        <p>Most frequent mood: <strong>${mostFrequentMood}</strong> (appeared ${maxCount} times)</p>
        <p>Total entries: ${moodHistory.length}</p>
        <h3>Mood Breakdown:</h3>
        <ul>
            ${Object.entries(moodCount).map(([mood, count]) => `<li>${mood}: ${count}</li>`).join('')}
        </ul>
    `;
}

// Function to clear all mood data
function clearMoodData() {
    if (confirm("Are you sure you want to clear all mood data?")) {
        moodHistory = []; // Reset mood history array
        localStorage.removeItem("moodHistory"); // Remove from localStorage
        updateMoodHistory(); // Refresh display
        document.getElementById("mood-analysis").innerHTML = ''; // Clear analysis results
    }
}

// Initialize page with stored mood history
updateMoodHistory();
