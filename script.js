// Array to store mood history
const moodHistory = [];

// Function to handle form submission and track mood
document.getElementById("mood-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const moodSelect = document.getElementById("mood");
    const mood = moodSelect.value;
    const date = new Date().toLocaleDateString();

    // Add mood entry to history
    moodHistory.push({ mood, date });
    
    // Update the history and clear form
    updateMoodHistory();
    moodSelect.value = '';
    document.getElementById("mood-output").textContent = `Mood "${mood}" recorded for ${date}.`;
});

// Function to update mood history display
function updateMoodHistory() {
    const historyList = document.getElementById("mood-history");
    historyList.innerHTML = ''; // Clear previous history

    moodHistory.forEach(entry => {
        const listItem = document.createElement("li");
        listItem.textContent = `${entry.date}: ${entry.mood}`;
        historyList.appendChild(listItem);
    });
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
