import * as choices from './choices.js';
export const choicesMap = new Map();
export const choicesFlow = new Map();

for (const choice in choices) {
    choicesMap.set(choices[choice], choice);
    choicesFlow.set(choice, false);
}
//Set choice Flow here
choicesFlow.set('CHOICE_1_1',true)
choicesFlow.set('CHOICE_2_3',true)
choicesFlow.set('CHOICE_3_2',true)


/* choicesFlow.forEach((value,key)=>{
        if(value)
        console.log(key);
}) */