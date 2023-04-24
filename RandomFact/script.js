import { toggleLoading } from './modules/loading-wave.js';
import { showSnackbarGreenText } from './modules/snackbar.js'
import { appendTypewriterText } from './modules/typewriter.js';
const randomFactSpan = document.querySelector('span.random-fact');

toggleLoading();
const typeSelect = document.getElementById('fact-type');
function renderSwitchFact(type, element) {
    switch (type) {
        case "random":
            renderRandomFact(element);
            break;
        case "cat":
            renderRandomCatFact(element)
            break;
        case "v2":
            renderRandomV2Fact(element)
            break;
    }
}
function renderRandomFact(element) {

    fetch('https://uselessfacts.jsph.pl/api/v2/facts/random', {
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            element.textContent = '';
            appendTypewriterText(element, data.text);
        })
        .catch(error => {
            console.error(error)
            element.textContent = 'Error fetching random fact:', error;
        });
}
function renderRandomCatFact(element) {
    fetch('https://meowfacts.herokuapp.com/', {
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            element.textContent = '';
            appendTypewriterText(element, data.data[0]);
        })
        .catch(error => {
            console.error(error)
            element.textContent = 'Error fetching random fact:', error;
        });
}
function renderRandomV2Fact(element){
    fetch('https://api.api-ninjas.com/v1/facts', {
        headers: {
            'X-Api-Key': 't3neLT4iSFNXHd+C69gJyw==S0SLFTfRd2MszCvH',
            'Accept': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log();
            element.textContent = '';
            appendTypewriterText(element, data[0].fact);
        })
        .catch(error => {
            console.error(error)
            element.textContent = 'Error fetching random fact:', error;
        });

}
document.getElementById('copy').addEventListener('click', () => {
    navigator.clipboard.writeText(randomFactSpan.textContent).then(() => showSnackbarGreenText('Copied!'))
})
document.body.addEventListener('keydown', (e) => {
    if (e.key === " ")
        renderSwitchFact(typeSelect.value, randomFactSpan)

})
window.onload = () => { renderSwitchFact(typeSelect.value, randomFactSpan) }
document.querySelector('div.content').onclick = () => { renderSwitchFact(typeSelect.value, randomFactSpan) }
document.getElementById('fact-type').onchange = () => { renderSwitchFact(typeSelect.value, randomFactSpan) }