import type { PokemonType } from "./pokemon.type";

export interface MoveData {
  name: string;

  oldEffect: MoveEffect;
  newEffect: MoveEffect;

  oldPower: number;
  newPower: number;

  oldType: PokemonType;
  newType: PokemonType;

  oldAccuracy: number;
  newAccuracy: number;

  oldPp: number;
  newPp: number;

  oldPriority: number;
  newPriority: number;

  oldEffectChance: number;
  newEffectChance: number;

  oldFlags: MoveFlag[];
  newFlags: MoveFlag[];

  oldCategory: "PHYSICAL" | "SPECIAL" | "STATUS";
  newCategory: "PHYSICAL" | "SPECIAL" | "STATUS";

  oldTarget: "SINGLE" | "FOES" | "SELF" | "ALL" | "FIELD" | "RANDOM";
  newTarget: "SINGLE" | "FOES" | "SELF" | "ALL" | "FIELD" | "RANDOM";
  changes: string[];
}

type MoveFlag =
  | "MAKES_CONTACT"
  | "PROTECT_AFFECTED"
  | "MIRROR_MOVE_AFFECTED"
  | "KINGS_ROCK_AFFECTED"
  | "IRON_FIST_BOOST"
  | "SLICING_MOVE"
  | "DANCE"
  | "MAGIC_COAT_AFFECTED"
  | "SHEER_FORCE_BOOST"
  | "RECKLESS_BOOST"
  | "BALLISTIC"
  | "HIGH_CRIT"
  | "SOUND"
  | "PROTECTION_MOVE"
  | "TWO_STRIKES"
  | "WIND_MOVE"
  | "MEGA_LAUNCHER_BOOST";

type MoveEffect =
  | "MULTI_HIT"
  | "PAY_DAY"
  | "HIT"
  | "ATTACK_UP_HIT"
  | "RAMPAGE"
  | "SEMI_INVULNERABLE"
  | "SLEEP"
  | "POISON_HIT"
  | "RECOIL_IF_MISS"
  | "PARALYZE"
  | "POISON"
  | "ABSORB"
  | "CONFUSE_HIT"
  | "TRIPLE_KICK"
  | "SNORE"
  | "PROTECT"
  | "CONFUSE"
  | "RAPID_SPIN"
  | "SPECIAL_DEFENSE_DOWN_HIT"
  | "DEFENSE_DOWN_HIT"
  | "FUTURE_SIGHT"
  | "FAKE_OUT"
  | "KNOCK_OFF"
  | "BURN_HIT"
  | "PSYSHOCK"
  | "RECOIL_50"
  | "RECHARGE"
  | "OVERHEAT"
  | "INCINERATE"
  | "SPECIAL_ATTACK_DOWN_HIT"
  | "ALWAYS_CRIT"
  | "RELIC_SONG"
  | "ATTACK_DOWN_HIT";

export enum EffectsEnum {
  MULTI_HIT = "Hits the target 2-5 times",
  PAY_DAY = "Scatters coins on the ground",
  HIT = "None",
  ATTACK_UP_HIT = "May Increase the ATK of the user",
  RAMPAGE = "Confuses the user after 2-3 turns",
  SEMI_INVULNERABLE = "Becomes invulernable on the first turn,\nattacks on the second",
  SLEEP = "Puts the target asleep",
  POISON_HIT = "May Poison the target",
  RECOIL_IF_MISS = "The user takes damage if the move misses",
  PARALYZE = "Paralyzes the target",
  POISON = "Poisons the target",
  ABSORB = "Restores the user's HP by 50% of dealt damage",
  CONFUSE_HIT = "May confuse the target",
  TRIPLE_KICK = "Hits the target 1-3 times with incremental power",
  SNORE = "Can only be used if asleep,\nMay flinch the target",
  PROTECT = "Protects the user from direct damage",
  CONFUSE = "Confuses the target",
  RAPID_SPIN = "Removes hazards on the user's side of the field,\n Increases the SPD of the user",
  SPECIAL_DEFENSE_DOWN_HIT = "May decrease the SPDEF of the target",
  DEFENSE_DOWN_HIT = "May decrease the DEF of the target",
  FUTURE_SIGHT = "Deals damage 2 turns after use",
  FAKE_OUT = "Flinches the target",
  KNOCK_OFF = "Removes the target's item,\npower increases by 50%",
  BURN_HIT = "May burn the target",
  PSYSHOCK = "Inflicts damage on the target's DEF instead of SPDEF",
  RECOIL_50 = "Damages the user for 50% of the damage dealt",
  RECHARGE = "After use the user takes 1 turn to recharge",
  OVERHEAT = "Greatly decreases the user's SPATK",
  INCINERATE = "Destroys the target's held berry",
  SPECIAL_ATTACK_DOWN_HIT = "May decrease the target's SPATK",
  ALWAYS_CRIT = "Always results in a critical hit",
  RELIC_SONG = "May put the target asleep, Changes Meloetta's form",
  ATTACK_DOWN_HIT = "May decrease the target's ATK",
}

export enum TargetsEnum {
  SINGLE = "Single Target",
  FOES = "All foes",
  SELF = "User",
  ALL = "All",
  FIELD = "Field",
  RANDOM = "A random foe",
}
