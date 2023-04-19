const randomFactSpan = document.querySelector('span.random-fact');
new window.SpeechSynthesisUtterance().lang = 'en-US';
window.onload = () => { renderRandomFact(randomFactSpan) }
window.onclick = () => { renderRandomFact(randomFactSpan) }
function renderRandomFact(element) {
    fetch('https://uselessfacts.jsph.pl/api/v2/facts/random', {
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            element.textContent = data.text;
            window.speechSynthesis.speak(data.text);
        })
        .catch(error => {
            console.error('Error fetching random fact:', error);
        });
}