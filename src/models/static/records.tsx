const Male = () => <span className='text-blue-400 font-semibold'>Male ♂️</span>;
const Female = () => (
  <span className='text-pink-400 font-semibold'>Female ♀️</span>
);
const Day = () => <span className='text-yellow-400 font-semibold'>Day</span>;
const Night = () => (
  <span className='text-purple-400 font-semibold'>Night</span>
);
const Dusk = () => <span className='text-orange-400 font-semibold'>Dusk</span>;
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
  DAY: (
    <>
      At <Day /> using
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
  NIGHT: (
    <>
      At <Night /> using
    </>
  ),
  LEVEL_DUSK: (
    <>
      At <Night /> at level
    </>
  ),
};
export const EvolutionMethods: Record<string, string | JSX.Element> = {
  LEVEL: 'Level ',
  TRADE: 'Trade',
  ITEM: 'Use',
  HOLD: 'Level up while holding',
  TRADE_ITEM: 'Trade while holding',
  MOVE: 'Level up while knowing',
  SPECIFIC_MAP: 'TODO',
  FRIENDSHIP_MOVE_TYPE: 'At high friendship while knowing a',
  LEVEL_ATK_LT_DEF: 'With ATK being less than DEF at level',
  LEVEL_ATK_GT_DEF: 'With ATK being more than DEF at level',
  LEVEL_ATK_EQ_DEF: 'With ATK being equal to DEF at level',
  LEVEL_SILCOON: '50% chance at level',
  LEVEL_CASCOON: '50% chance at level',
  LEVEL_NINJASK: 'Level',
  LEVEL_SHEDINJA: 'With an empty slot in the party at level',
  MAPSEC: 'Level up while at',
  BEAUTY: 'Beuty',
  SPECIFIC_MON_IN_PARTY: 'Level up while having in party',
  TRADE_SPECIFIC_MON: 'Trade with',
  LEVEL_DARK_TYPE_MON_IN_PARTY:
    'With a dark type Pokèmon in the party at level',
  LEVEL_RAIN: 'During the rain at level',
  LEVEL_NATURE_AMPED: 'With an AMPED nature at level',
  LEVEL_NATURE_LOW_KEY: 'With a LOW_KEY nature at level',
  FRIENDSHIP: 'At high friendship',
  CRITICAL_HITS: 'TODO',
  SCRIPT_TRIGGER_DMG: 'TODO',
  ...timeMethods,
  ...genderMethods,
};

export const EvolutionClauses: Record<string, string> = {};
