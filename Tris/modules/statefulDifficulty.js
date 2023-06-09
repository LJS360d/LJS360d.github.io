const selectDifficulty = document.getElementById('select-difficulty');
selectDifficulty.addEventListener('change', handleDifficultySelect);
function handleDifficultySelect(event) {
    const selectedDifficulty = event.target.value;
    localStorage.setItem('selectedDifficulty', selectedDifficulty);
}
function getSelectedDifficulty() {
    const storedDifficulty = localStorage.getItem('selectedDifficulty');
    if (storedDifficulty) {
        selectDifficulty.value = storedDifficulty;
    }
}
getSelectedDifficulty();
