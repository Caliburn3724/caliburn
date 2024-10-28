document.getElementById('mood-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const mood = document.getElementById('mood').value;
    const moodOutput = document.getElementById('mood-output');

    if (mood) {
        moodOutput.textContent = `Your selected mood is: ${mood.charAt(0).toUpperCase() + mood.slice(1)}`;
    } else {
        moodOutput.textContent = '';
    }
});
