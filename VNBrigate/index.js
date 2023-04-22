import { appendTypewriterText } from "./modules/appendTypewriterText.js"
import { setSceneTextTypewriter } from "./modules/setSceneTextTypewriter.js"
import { setSceneText } from "./modules/setSceneText.js"
import { setBackground } from "./modules/setBackground.js"
import * as choices from "./assets/choices/choices.js"
import * as scenes from "./assets/scenes/scenes.js"
import * as backgrounds from "./assets/backgrounds/backgrounds.js"

const choice1 = document.getElementById('choice-1')
const choice2 = document.getElementById('choice-2')
const choice3 = document.getElementById('choice-3')
const sceneText = document.getElementById('scene')

appendTypewriterText(choice1, choices.CHOICE_1_1)
appendTypewriterText(choice2, choices.CHOICE_1_2)
appendTypewriterText(choice3, choices.CHOICE_1_3)
setSceneText(scenes.SCENE_1)

function choice1Click() {
    toggleChoicesView()
    switch (this.firstChild.textContent) {
        case choices.CHOICE_1_1:
            setSceneTextTypewriter(scenes.SCENE_1_1)
            setBackground(backgrounds.BG_1_1)
            setTimeout(() => {
                setBackground(backgrounds.BG_1)
                sceneText.textContent = scenes.SCENE_1
                toggleChoicesView()
            }, 5000)
            break;
    }

}
function choice2Click() {
    toggleChoicesView()
    switch (this.firstChild.textContent) {
        case choices.CHOICE_1_2:
            setSceneTextTypewriter(scenes.SCENE_1_2)
            setBackground(backgrounds.BG_1_2)

            setTimeout(() => {
                setBackground(backgrounds.BG_1)
                sceneText.textContent = scenes.SCENE_1
                toggleChoicesView()
            }, 5000)
            break;
    }
}
function choice3Click() {
    toggleChoicesView()
    switch (this.firstChild.textContent) {
        case choices.CHOICE_1_3:
            setSceneTextTypewriter(scenes.SCENE_1_3)
            setBackground(backgrounds.BG_1_3)

            setTimeout(() => {
                setBackground(backgrounds.BG_1)
                sceneText.textContent = scenes.SCENE_1
                toggleChoicesView()
            }, 5000)
            break;
    }
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

choice1.addEventListener('click', choice1Click)
choice2.addEventListener('click', choice2Click)
choice3.addEventListener('click', choice3Click)