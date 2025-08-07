import type { JSXElement } from "solid-js";

const Male = () => <span class='text-blue-400 font-semibold'>Male ♂️</span>;
const Female = () => (
  <span class='text-pink-400 font-semibold'>Female ♀️</span>
);
const Day = () => <span class='text-yellow-400 font-semibold'>Day</span>;
const Night = () => (
  <span class='text-purple-400 font-semibold'>Night</span>
);
const Dusk = () => <span class='text-orange-400 font-semibold'>Dusk</span>;
const Rain = () => <span class='text-blue-400 font-semibold'>Rain</span>;
const Fog = () => <span class='text-slate-400 font-semibold'>Fog</span>;
const AmpedNatures = [
  'Adamant',
  'Brave',
  'Docile',
  'Hardy',
  'Hasty',
  'Impish',
  'Jolly',
  'Lax',
  'Naive',
  'Naughty',
  'Quirky',
  'Rash',
  'Sassy',
];
const Amped = () => (
  <div class='tooltip' data-tip={AmpedNatures.join(' ')}>
    <span class='text-yellow-300 font-semibold hover:underline'>Amped</span>
  </div>
);
const LowKeyNatures = [
  'Bashful',
  'Bold',
  'Calm',
  'Careful',
  'Gentle',
  'Lonely',
  'Mild',
  'Modest',
  'Quiet',
  'Relaxed',
  'Serious',
  'Timid',
];
const LowKey = () => (
  <div class='tooltip' data-tip={LowKeyNatures.join(' ')}>
    <span class='text-blue-300 font-semibold hover:underline'>Low-Key</span>
  </div>
);
const RareCandy = () => (
  <img
    title='By level'
    class='w-6 aspect-square'
    alt='Level'
    src='/assets/items/rare_candy.png'
  />
);
const PokeBall = () => (
  <img
    title='Pokè Ball'
    class='w-6 aspect-square'
    alt='Level'
    src='/assets/items/poke_ball.png'
  />
);
export const Effects: Record<string, string> = {
  EFFECT_HIT: 'None',
  EFFECT_OVERHEAT: 'Decreases SPATK by 2 stages',
  EFFECT_ATTACK_UP: 'Raises ATK by 1 stage',
  EFFECT_ATTACK_UP_HIT: 'Raises ATK by 1 stage',
  EFFECT_SPECIAL_DEFENSE_DOWN_HIT: 'Decreases SPDEF by 1 stage',
  EFFECT_DEFENSE_DOWN_HIT: 'Decreases DEF by 1 stage',
  EFFECT_RECHARGE: 'Take a turn to recharge',
};
const genderMethods = {
  FEMALE: (
    <>
      Being <Female /> using
    </>
  ),
  MALE: (
    <>
      Being <Male /> using
    </>
  ),
  LEVEL_FEMALE: (
    <>
      Being <Female /> at level
    </>
  ),
  LEVEL_MALE: (
    <>
      Being <Male /> at level
    </>
  ),
};
const timeMethods = {
  DAY: (
    <>
      At <Day /> using
    </>
  ),
  LEVEL_DAY: (
    <>
      At <Day /> at level
    </>
  ),
  HOLD_DAY: (
    <>
      Level up at <Day /> while holding
    </>
  ),
  NIGHT: (
    <>
      At <Night /> using
    </>
  ),
  LEVEL_NIGHT: (
    <>
      At <Night /> at level
    </>
  ),
  HOLD_NIGHT: (
    <>
      Level up at <Night /> while holding
    </>
  ),
  DUSK: (
    <>
      At <Dusk /> using
    </>
  ),
  LEVEL_DUSK: (
    <>
      At <Dusk /> at level
    </>
  ),
  HOLD_DUSK: (
    <>
      At <Dusk /> while holding
    </>
  ),
};
const weatherMethods = {
  RAIN: (
    <>
      During <Rain /> using
    </>
  ),
  LEVEL_RAIN: (
    <>
      During <Rain /> at level
    </>
  ),
  HOLD_RAIN: (
    <>
      During <Rain /> while holding
    </>
  ),
  FOG: (
    <>
      During <Fog /> using
    </>
  ),
  LEVEL_FOG: (
    <>
      During <Fog /> at level
    </>
  ),
  HOLD_FOG: (
    <>
      During <Fog /> while holding
    </>
  ),
};
const monSpecificMethods = {
  LEVEL_SILCOON: (
    <div class='flex flex-col items-center'>
      <RareCandy />
      <span class='italic text-xs'>by personality</span>
    </div>
  ),
  LEVEL_CASCOON: (
    <div class='flex flex-col items-center'>
      <RareCandy />
      <span class='italic text-xs'>by personality</span>
    </div>
  ),
  LEVEL_NINJASK: 'Level',
  LEVEL_SHEDINJA: (
    <div class='flex flex-col items-center'>
      <RareCandy />
      <div class='italic text-xs'>
        <span>with an empty slot in the party</span>
        <span class='flex justify-center items-center'>
          and at least 1 <PokeBall /> in the bag
        </span>
      </div>
    </div>
  ),
  FRIENDSHIP_MOVE_TYPE: 'At high friendship while knowing a',
  SPECIFIC_MON_IN_PARTY: 'Level up while having in party',
  TRADE_SPECIFIC_MON: 'Trade with',
  LEVEL_DARK_TYPE_MON_IN_PARTY: (
    <span class='flex flex-row gap-2'>
      <span>With a</span>
      <span class='type-dark'>Dark</span>
      <span>pokèmon in the party at level</span>
    </span>
  ),
  LEVEL_NATURE_AMPED: (
    <>
      With an <Amped /> nature at level
    </>
  ),
  LEVEL_NATURE_LOW_KEY: (
    <>
      With a <LowKey /> nature at level
    </>
  ),
};
export const EvolutionMethods: Record<string, string | JSXElement> = {
  LEVEL: <RareCandy />,
  TRADE: 'Trade',
  ITEM: 'Use',
  HOLD: 'Level up while holding',
  TRADE_ITEM: 'Trade while holding',
  MOVE: 'Level up while knowing',
  SPECIFIC_MAP: 'Level up while in',
  MAPSEC: 'Level up while at',
  LEVEL_ATK_LT_DEF: 'With ATK being less than DEF at level',
  LEVEL_ATK_GT_DEF: 'With ATK being more than DEF at level',
  LEVEL_ATK_EQ_DEF: 'With ATK being equal to DEF at level',
  BEAUTY: 'Beuty',
  FRIENDSHIP: 'At high friendship',
  CRITICAL_HITS: 'TODO',
  SCRIPT_TRIGGER_DMG: 'TODO',
  ...monSpecificMethods,
  ...timeMethods,
  ...weatherMethods,
  ...genderMethods,
};

export const EvolutionClauses: Record<string, string> = {};
