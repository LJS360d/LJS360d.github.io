import { appendTypewriterText } from "./appendTypewriterText.js"

export function setSceneTextTypewriter(text){
    const sceneSpan = document.getElementById('scene')
    sceneSpan.textContent = ''
    appendTypewriterText(sceneSpan,text)
}