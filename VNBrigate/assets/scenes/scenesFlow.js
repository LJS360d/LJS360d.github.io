import * as backgrounds from '../backgrounds/backgrounds.js';
import * as choices from '../choices/choices.js';
import * as scenes from './scenes.js';

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
scenesFlow.set(
  "start",
  new Scene(scenes.SCENE_1, backgrounds.BG_INTRO, null, [
    choices.CHOICE_1_1,
    choices.CHOICE_1_2,
    choices.CHOICE_1_3,
  ])
);
//Choice 1
scenesFlow.set(
  choices.CHOICE_1_1,
  new Scene(scenes.SCENE_1_1, [backgrounds.BG_DEATH, backgrounds.BG_INTRO], false, [
    choices.CHOICE_1_1,
    choices.CHOICE_1_2,
    choices.CHOICE_1_3,
  ])
);
scenesFlow.set(
  choices.CHOICE_1_2,
  new Scene(scenes.SCENE_1_2, [backgrounds.BG_DEATH, backgrounds.BG_INTRO], false, [
    choices.CHOICE_1_1,
    choices.CHOICE_1_2,
    choices.CHOICE_1_3,
  ])
);
scenesFlow.set(
  choices.CHOICE_1_3,
  new Scene(scenes.SCENE_1_3, [backgrounds.BG_1, backgrounds.BG_1], true, [
    choices.CHOICE_2_1,
    choices.CHOICE_2_2,
    choices.CHOICE_2_3,
  ])
);
//Choice 2
scenesFlow.set(
  choices.CHOICE_2_1,
  new Scene(scenes.SCENE_2_1, [backgrounds.BG_RIPNICOLAS, backgrounds.BG_1], false, [
    choices.CHOICE_2_1,
    choices.CHOICE_2_2,
    choices.CHOICE_2_3,
  ])
);
scenesFlow.set(
  choices.CHOICE_2_2,
  new Scene(scenes.SCENE_2_2, [backgrounds.BG_DEPARTURE, backgrounds.BG_DEPARTURE], true, [
    choices.CHOICE_3_1,
    choices.CHOICE_3_2,
    choices.CHOICE_3_3,
  ])
);
scenesFlow.set(
  choices.CHOICE_2_3,
  new Scene(scenes.SCENE_2_3, [backgrounds.BG_RIPNICOLAS, backgrounds.BG_1], false, [
    choices.CHOICE_2_1,
    choices.CHOICE_2_2,
    choices.CHOICE_2_3,
  ])
);
//Choice 3
scenesFlow.set(
  choices.CHOICE_3_1,
  new Scene(scenes.SCENE_3_1, [backgrounds.BG_RIPNICOLAS, backgrounds.BG_DEPARTURE], false, [
    choices.CHOICE_3_1,
    choices.CHOICE_3_2,
    choices.CHOICE_3_3,
  ])
);
scenesFlow.set(
  choices.CHOICE_3_2,
  new Scene(scenes.SCENE_3_2, [backgrounds.BG_DEPARTURE, backgrounds.BG_DEPARTURE], true, [
    choices.CHOICE_4_1,
    choices.CHOICE_4_2,
    choices.CHOICE_4_3,
  ])
);
scenesFlow.set(
  choices.CHOICE_3_3,
  new Scene(scenes.SCENE_3_3, [backgrounds.BG_DEATH, backgrounds.BG_DEPARTURE], false, [
    choices.CHOICE_3_1,
    choices.CHOICE_3_2,
    choices.CHOICE_3_3,
  ])
);
//Choice 4
scenesFlow.set(
  choices.CHOICE_4_1,
  new Scene(scenes.SCENE_4_1, [backgrounds.BG_DEATH_ALL, backgrounds.BG_DEPARTURE], false, [
    choices.CHOICE_4_1,
    choices.CHOICE_4_2,
    choices.CHOICE_4_3,
  ])
);
scenesFlow.set(
  choices.CHOICE_4_2,
  new Scene(scenes.SCENE_4_2, [backgrounds.BG_DEPARTURE, backgrounds.BG_DEPARTURE], true, [
    choices.CHOICE_5_1,
    choices.CHOICE_5_2,
    choices.CHOICE_5_3,
  ])
);
scenesFlow.set(
  choices.CHOICE_4_3,
  new Scene(scenes.SCENE_4_3, [backgrounds.BG_RIPNICOLAS, backgrounds.BG_DEPARTURE], false, [
    choices.CHOICE_4_1,
    choices.CHOICE_4_2,
    choices.CHOICE_4_3,
  ])
);
//choice 5
scenesFlow.set(
  choices.CHOICE_5_1,
  new Scene(scenes.SCENE_5_1, [backgrounds.BG_DEPARTURE, backgrounds.BG_DEPARTURE], true, [
    choices.CHOICE_6_1,
    choices.CHOICE_6_2,
    choices.CHOICE_6_3,
  ])
);
scenesFlow.set(
  choices.CHOICE_5_2,
  new Scene(scenes.SCENE_5_2, [backgrounds.BG_DEATH, backgrounds.BG_DEPARTURE], false, [
    choices.CHOICE_5_1,
    choices.CHOICE_5_2,
    choices.CHOICE_5_3,
  ])
);
scenesFlow.set(
  choices.CHOICE_5_3,
  new Scene(scenes.SCENE_5_3, [backgrounds.BG_DEATH, backgrounds.BG_DEPARTURE], false, [
    choices.CHOICE_5_1,
    choices.CHOICE_5_2,
    choices.CHOICE_5_3,
  ])
);
//choice 6
scenesFlow.set(
  choices.CHOICE_6_1,
  new Scene(scenes.SCENE_6_1, [backgrounds.BG_DEPARTURE, backgrounds.BG_DEPARTURE], true, [
    choices.CHOICE_7_1,
    choices.CHOICE_7_2,
    choices.CHOICE_7_3,
  ])
);
scenesFlow.set(
  choices.CHOICE_6_2,
  new Scene(scenes.SCENE_6_2, [backgrounds.BG_DEATH, backgrounds.BG_DEPARTURE], false, [
    choices.CHOICE_6_1,
    choices.CHOICE_6_2,
    choices.CHOICE_6_3,
  ])
);
scenesFlow.set(
  choices.CHOICE_6_3,
  new Scene(scenes.SCENE_6_3, [backgrounds.BG_DEATH, backgrounds.BG_DEPARTURE], false, [
    choices.CHOICE_6_1,
    choices.CHOICE_6_2,
    choices.CHOICE_6_3,
  ])
);
//Choice 7
scenesFlow.set(
  choices.CHOICE_7_1,
  new Scene(scenes.SCENE_7_1, [backgrounds.BG_DEPARTURE, backgrounds.BG_DEPARTURE], true, [
    choices.CHOICE_8_1,
    choices.CHOICE_8_2,
    choices.CHOICE_8_3,
  ])
);
scenesFlow.set(
  choices.CHOICE_7_2,
  new Scene(scenes.SCENE_7_2, [backgrounds.BG_DEATH, backgrounds.BG_DEPARTURE], false, [
    choices.CHOICE_7_1,
    choices.CHOICE_7_2,
    choices.CHOICE_7_3,
  ])
);
scenesFlow.set(
  choices.CHOICE_7_3,
  new Scene(scenes.SCENE_7_3, [backgrounds.BG_DEATH, backgrounds.BG_DEPARTURE], false, [
    choices.CHOICE_7_1,
    choices.CHOICE_7_2,
    choices.CHOICE_7_3,
  ])
);
//Choice 8
scenesFlow.set(
  choices.CHOICE_8_1,
  "end-1"
);
scenesFlow.set(
  choices.CHOICE_8_2,
  new Scene(scenes.SCENE_8_2, [backgrounds.BG_DEATH_ALL, backgrounds.BG_DEPARTURE], false, [
    choices.CHOICE_8_1,
    choices.CHOICE_8_2,
    choices.CHOICE_8_3,
  ])
);
scenesFlow.set(
  choices.CHOICE_8_3,
  "end-2"
);