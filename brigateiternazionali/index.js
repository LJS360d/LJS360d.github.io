import { appendTypewriterText } from "./modules/appendTypewriterText.js"
const choice1 = document.getElementById('choice-1')
const choice2 = document.getElementById('choice-2')
const choice3 = document.getElementById('choice-3')
const sceneText = document.getElementById('scene')

appendTypewriterText(choice1, "Mi dileguo")
appendTypewriterText(choice2, '"Cosa mai può andare storto?"')
appendTypewriterText(choice3, "Chiedi a Elon Musk di andare a ballare in puglia")

function choice1Click() {
    sceneText.textContent = this.textContent
}
function choice2Click() {
    sceneText.textContent = this.textContent
}
function choice3Click() {
    sceneText.textContent = this.textContent
}

choice1.addEventListener('click', choice1Click)
choice2.addEventListener('click', choice2Click)
choice3.addEventListener('click', choice3Click)

