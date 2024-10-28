const moodHistory = [];

function trackMood() {
    const moodSelect = document.getElementById('moodSelect');
    const mood = moodSelect.value;
    const date = new Date().toLocaleDateString();

    // Add mood entry to history
    moodHistory.push({ mood, date });
    
    // Update history on the page
    updateMoodHistory();
}

function updateMoodHistory() {
    const historyList = document.getElementById('moodHistory');
    historyList.innerHTML = '';

    moodHistory.forEach(entry => {
        const listItem = document.createElement('li');
        listItem.textContent = `${entry.date}: ${entry.mood}`;
        historyList.appendChild(listItem);
    });
}

function analyzeMood() {
    const moodCount = {};

    // Count each mood's frequency
    moodHistory.forEach(entry => {
        if (moodCount[entry.mood]) {
            moodCount[entry.mood]++;
        } else {
            moodCount[entry.mood] = 1;
        }
    });

    // Find most common mood
    let mostFrequentMood = '';
    let maxCount = 0;
    for (const mood in moodCount) {
        if (moodCount[mood] > maxCount) {
            maxCount = moodCount[mood];
            mostFrequentMood = mood;
        }
    }

    // Display analysis results
    const analysisDiv = document.getElementById('moodAnalysis');
    analysisDiv.innerHTML = `
        <p>Your most frequent mood is: <strong>${mostFrequentMood}</strong></p>
        <p>Total entries: ${moodHistory.length}</p>
        <h3>Mood Breakdown</h3>
        <ul>
            ${Object.entries(moodCount).map(([mood, count]) => `<li>${mood}: ${count}</li>`).join('')}
        </ul>
    `;
}
