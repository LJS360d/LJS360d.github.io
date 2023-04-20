import { toggleLoading } from './loading-wave.js';
import { showSnackbarGreenText } from './snackbar.js'
const randomFactSpan = document.querySelector('span.random-fact');
window.onload = () => { renderRandomFact(randomFactSpan) }
document.querySelector('div.content').onclick = () => { renderRandomFact(randomFactSpan) }
toggleLoading();
function renderRandomFact(element) {
    fetch('https://uselessfacts.jsph.pl/api/v2/facts/random', {
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            element.textContent = data.text;
        })
        .catch(error => {
            console.error(error)
            element.textContent = 'Error fetching random fact:', error;
        });
}
document.getElementById('copy').addEventListener('click', () => {
    navigator.clipboard.writeText(randomFactSpan.textContent).then(() => showSnackbarGreenText('Copied!'))
})