import {
  Scene,
  scenesFlow,
} from './assets/scenes/scenesFlow.js';
import { appendTypewriterText } from './modules/appendTypewriterText.js';
import { setBackground } from './modules/setBackground.js';
import { setSceneText } from './modules/setSceneText.js';
import { setSceneTextTypewriter } from './modules/setSceneTextTypewriter.js';

const choice1 = document.getElementById("choice-1");
const choice2 = document.getElementById("choice-2");
const choice3 = document.getElementById("choice-3");
const sceneText = document.getElementById("scene");

const startScenario = scenesFlow.get("start");
setChoicesTextTypewriter(startScenario.nextChoices);
setSceneText(startScenario.scene);
setBackground(startScenario.background);

function choiceButtonClick() {
  toggleChoicesView();
  const READ_TIME_MS = 5000;
  const prevScene = sceneText.textContent;
  const newScenario = scenesFlow.get(this.firstChild.textContent);
  if (newScenario instanceof Scene) {
    setSceneTextTypewriter(newScenario.scene);
    setBackground(newScenario.background[0]);
    if (!newScenario.success)
      setTimeout(() => {
        //TODO:show +1/fail screen before going to next/prev
        
        setSceneText(prevScene);
      }, READ_TIME_MS);

    setTimeout(() => {
      setChoicesTextTypewriter(newScenario.nextChoices);
      setBackground(newScenario.background[1]);
      toggleChoicesView();
    }, READ_TIME_MS);
  } else {
    throw new Error(
      "The Value in scenesFlow must be an instance of class Scene"
    );
  }
}

function setChoicesTextTypewriter(choices) {
  appendTypewriterText(choice1, choices[0]);
  appendTypewriterText(choice2, choices[1]);
  appendTypewriterText(choice3, choices[2]);
}
function toggleChoicesView() {
  choice1.style.display === "none" ? showChoices() : hideChoices();
  function hideChoices() {
    choice1.style.display = "none";
    choice2.style.display = "none";
    choice3.style.display = "none";
  }
  function showChoices() {
    setTimeout(() => {
      choice1.style.display = "flex";
    }, 500);
    setTimeout(() => {
      choice2.style.display = "flex";
    }, 1000);
    setTimeout(() => {
      choice3.style.display = "flex";
    }, 1500);
  }
}

choice1.addEventListener("click", choiceButtonClick);
choice2.addEventListener("click", choiceButtonClick);
choice3.addEventListener("click", choiceButtonClick);
