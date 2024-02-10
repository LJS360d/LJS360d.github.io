const MALE = "<b style='color: blue;'>Male ♂️</b>";
const FEMALE = "<b style='color: pink;'>Female ♀️</b>";

export const Effects: Record<string, string> = {
  EFFECT_HIT: 'None',
  EFFECT_OVERHEAT: 'Decreases SPATK by 2 stages',
  EFFECT_ATTACK_UP: 'Raises ATK by 1 stage',
  EFFECT_ATTACK_UP_HIT: 'Raises ATK by 1 stage',
  EFFECT_SPECIAL_DEFENSE_DOWN_HIT: 'Decreases SPDEF by 1 stage',
  EFFECT_DEFENSE_DOWN_HIT: 'Decreases DEF by 1 stage',
  EFFECT_RECHARGE: 'Take a turn to recharge',
};
export const EvolutionMethods: Record<string, string> = {
  LEVEL: 'Level ',
  TRADE: 'Trade',
  ITEM: 'Use',
  HOLD: 'Level up while holding',
  TRADE_ITEM: 'Trade while holding',
  MOVE: 'Level up while knowing',
  SPECIFIC_MAP: 'TODO',
  FRIENDSHIP_MOVE_TYPE: 'Sylveon',
  HOLD_NIGHT: 'Level up at night while holding',
  NIGHT: 'At night',
  LEVEL_ATK_LT_DEF: 'With ATK being less than DEF at level',
  LEVEL_ATK_GT_DEF: 'With ATK being more than DEF at level',
  LEVEL_ATK_EQ_DEF: 'With ATK being equal to DEF at level',
  LEVEL_SILCOON: 'TODO',
  LEVEL_CASCOON: 'TODO',
  LEVEL_NINJASK: 'TODO',
  LEVEL_SHEDINJA: 'TODO',
  MAPSEC: 'TODO',
  BEAUTY: 'Beuty',
  FEMALE: `Being ${FEMALE}`,
  LEVEL_FEMALE: `Being ${FEMALE} at level`,
  LEVEL_MALE: `Being ${MALE} at level`,
  HOLD_DAY: 'Level up at day while holding',
  DAY: 'At day',
  SPECIFIC_MON_IN_PARTY: 'TODO',
  TRADE_SPECIFIC_MON: 'Trade with',
  LEVEL_DARK_TYPE_MON_IN_PARTY:
    'Level up with a dark type Pokèmon in the party',
  LEVEL_DAY: 'At day at level',
  LEVEL_NIGHT: 'At night at level',
  LEVEL_RAIN: 'During the rain at level',
  LEVEL_NATURE_AMPED: 'With an AMPED nature at level',
  LEVEL_NATURE_LOW_KEY: 'With a LOW_KEY nature at level',
  FRIENDSHIP: 'At high friendship',
  CRITICAL_HITS: 'TODO',
  SCRIPT_TRIGGER_DMG: 'TODO',
  LEVEL_DUSK: 'TODO',
};

export const EvolutionClauses: Record<string, string> = {};
