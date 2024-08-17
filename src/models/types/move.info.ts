import type { PokemonType } from './pokemon.type';

export interface MoveInfo extends MoveInfoDefinition {
  old: MoveInfoDefinition | null;
}

export interface MoveInfoDefinition {
  id: string;
  name: string;
  description: string;
  type: PokemonType;
  category: MoveCategory;
  target: MoveTarget;
  pp: number;
  accuracy: number | null; // null -> skip accuracy check
  power?: number; // power 0 -> status (unnecessary)
  priority?: number;
  recoil?: number;
  criticalHitStage?: MoveCriticalHitStage;

  flags: string[];

  effect: string;
  additionalEffects?: MoveAdditionalEffects;

  // TODO contestData
}

export interface MoveAdditionalEffects {
  moveEffect: string;
  chance?: number;
  self?: boolean;
  onChargeTurnOnly?: boolean;
}

export enum MoveCategory {
  PHYSICAL = 'PHYSICAL',
  SPECIAL = 'SPECIAL',
  STATUS = 'STATUS',
}

export enum MoveCriticalHitStage {
  HIGH = 1,
  GUARANTEED = 2,
}

export enum MoveTarget {
  SINGLE = 'SINGLE',
  FOES = 'FOES',
  SELF = 'SELF',
  ALLY = 'ALLY',
  DEPENDS = 'DEPENDS',
  SELF_OR_ALLY = 'SELF_OR_ALLY',
  ALL = 'ALL',
  FIELD = 'FIELD',
  OPPONENTS_FIELD = 'OPPONENTS_FIELD',
  RANDOM = 'RANDOM',
}

export function getEffectStr(str?: string) {
  return (
    EffectsEnum[
      str
        ?.replace('EFFECT_', '')
        .replace('MOVE_', '') as keyof typeof EffectsEnum
    ] ?? str
  );
}

export enum EffectsEnum {
  MULTI_HIT = 'Hits the target 2-5 times',
  PAYDAY = 'Scatters coins on the ground',
  HIT = 'None',
  ATTACK_UP_HIT = 'May Increase the ATK of the user',
  RAMPAGE = 'Confuses the user after 2-3 turns',
  SEMI_INVULNERABLE = 'Becomes invulernable on the first turn,\nattacks on the second',
  SLEEP = 'Puts the target asleep',
  POISON_HIT = 'May Poison the target',
  RECOIL_IF_MISS = 'The user takes damage if the move misses',
  PARALYZE = 'Paralyzes the target',
  POISON = 'Poisons the target',
  ABSORB = "Restores the user's HP by 50% of dealt damage",
  CONFUSE_HIT = 'May confuse the target',
  TRIPLE_KICK = 'Hits the target 1-3 times with incremental power',
  SNORE = 'Can only be used if asleep,\nMay flinch the target',
  PROTECT = 'Protects the user from direct damage',
  CONFUSE = 'Confuses the target',
  RAPID_SPIN = "Removes hazards on the user's side of the field,\n Increases the SPD of the user",
  SPECIAL_DEFENSE_DOWN_HIT = 'May decrease the SPDEF of the target',
  DEFENSE_DOWN_HIT = 'May decrease the DEF of the target',
  FUTURE_SIGHT = 'Deals damage 2 turns after use',
  FAKE_OUT = 'Flinches the target',
  FLINCH = 'May flinch the target',
  KNOCK_OFF = "Removes the target's item,\npower increases by 50%",
  BURN = 'May burn the target',
  TOXIC = 'Badly poisons the target',
  PARALYSIS = 'May paralyze the target',
  FREEZE_OR_FROSTBITE = 'May freeze the target',
  PSYSHOCK = "Inflicts damage on the target's DEF instead of SPDEF",
  RECOIL_50 = 'Damages the user for 50% of the damage dealt',
  RECHARGE = 'After use the user takes 1 turn to recharge',
  OVERHEAT = "Greatly decreases the user's SPATK",
  INCINERATE = "Destroys the target's held berry",
  SPECIAL_ATTACK_DOWN_HIT = "May decrease the target's SPATK",
  ACCURACY_DOWN = "Decreases the target's accuracy",
  EVASION_DOWN = "Decreases the target's evasion",
  DEFENSE_DOWN = "Decreases the target's DEF",
  ATTACK_DOWN = "Decreases the target's ATK",
  OHKO = 'Defeats the target in ONE HIT',
  ALWAYS_CRIT = 'Always results in a critical hit',
  RELIC_SONG = "May put the target asleep, Changes Meloetta's form",
  ATTACK_DOWN_HIT = "May decrease the target's ATK",
  ROAR = "Will force the target to switch out",
  WRAP = "Deals damage for 2-5 turns while trapping the target on the field",
}
