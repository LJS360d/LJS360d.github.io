import { appendTypewriterText } from "./modules/appendTypewriterText.js"
import { setSceneTextTypewriter } from "./modules/setSceneTextTypewriter.js"
import { setSceneText } from "./modules/setSceneText.js"
import { setBackground } from "./modules/setBackground.js"
import { Scene, scenesFlow } from "./assets/scenes/scenesFlow.js"

const choice1 = document.getElementById('choice-1')
const choice2 = document.getElementById('choice-2')
const choice3 = document.getElementById('choice-3')
const sceneText = document.getElementById('scene')

const startScenario = scenesFlow.get('start')
setChoicesTextTypewriter(startScenario.nextChoices)
setSceneText(startScenario.scene)
setBackground(startScenario.background)


function choiceButtonClick() {
    toggleChoicesView()
    const prevScene = sceneText.textContent
    const newScenario = scenesFlow.get(this.firstChild.textContent)
    if (newScenario instanceof Scene) {
        setSceneTextTypewriter(newScenario.scene)
        setBackground(newScenario.background[0])
        if (!newScenario.success) {
            setTimeout(() => {
                //show fail screen before going to next
                setSceneText(prevScene)
            }, 5000)
        }
        setTimeout(() => {
            setChoicesTextTypewriter(newScenario.nextChoices)
            setBackground(newScenario.background[1])
            toggleChoicesView()
        }, 5000)
    }

}

function setChoicesTextTypewriter(choices) {
    appendTypewriterText(choice1, choices[0])
    appendTypewriterText(choice2, choices[1])
    appendTypewriterText(choice3, choices[2])
}
function toggleChoicesView() {
    (choice1.style.display === 'none') ?
        showChoices() : hideChoices()
    function hideChoices() {
        choice1.style.display = 'none'
        choice2.style.display = 'none'
        choice3.style.display = 'none'
    }
    function showChoices() {
        setTimeout(() => { choice1.style.display = 'flex' }, 500)
        setTimeout(() => { choice2.style.display = 'flex' }, 1000)
        setTimeout(() => { choice3.style.display = 'flex' }, 1500)
    }
}

choice1.addEventListener('click', choiceButtonClick)
choice2.addEventListener('click', choiceButtonClick)
choice3.addEventListener('click', choiceButtonClick)