import * as scenes from './scenes.js';
import * as choices from '../choices/choices.js';
import * as backgrounds from '../backgrounds/backgrounds.js';
export class Scene {
    /**
     * 
     * @param {string} scene 
     * @param {string | URL} background 
     * @param {boolean} success 
     * @param {Array<string>} nextChoices 
     */
    constructor(scene, background, success, nextChoices) {
        this.scene = scene;
        this.background = background;
        this.success = success;
        this.nextChoices = nextChoices;
    }
}

export const scenesFlow = new Map();
scenesFlow.set('start', new Scene(scenes.SCENE_1, backgrounds.BG_1, null, [choices.CHOICE_1_1, choices.CHOICE_1_2, choices.CHOICE_1_3]))

scenesFlow.set(choices.CHOICE_1_1, new Scene(scenes.SCENE_1_1, [backgrounds.BG_1_1,backgrounds.BG_2], true, [choices.CHOICE_2_1, choices.CHOICE_2_2, choices.CHOICE_2_3]))
scenesFlow.set(choices.CHOICE_1_2, new Scene(scenes.SCENE_1_2, [backgrounds.BG_1_2,backgrounds.BG_1], false, [choices.CHOICE_1_1, choices.CHOICE_1_2, choices.CHOICE_1_3]))
scenesFlow.set(choices.CHOICE_1_3, new Scene(scenes.SCENE_1_3, [backgrounds.BG_1_3,backgrounds.BG_1], false, [choices.CHOICE_1_1, choices.CHOICE_1_2, choices.CHOICE_1_3]))



