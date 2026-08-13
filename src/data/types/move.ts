import type { PokemonTypeEnum } from './pokemon.types';

export interface MoveInfo {
  accuracy: number;
  additionalEffects: MoveAdditionalEffects[] | null;
  category: MoveCategory;
  criticalHitStage: MoveCriticalHitStage;
  description: string;
  effect: number;
  flags: string[] | null;
  id: number;
  name: string;
  power: number;
  pp: number;
  priority: number;
  recoil: number;
  target: number;
  type: PokemonTypeEnum;
  old: Omit<MoveInfo, "old"> | null;
}

export interface MoveAdditionalEffects {
  moveEffect: number;
  chance?: number;
  self?: boolean;
  onChargeTurnOnly?: boolean;
}

export enum MoveCategory {
  PHYSICAL = 0,
  SPECIAL = 1,
  STATUS = 2,
}

export enum MoveCriticalHitStage {
  HIGH = 1,
  GUARANTEED = 2,
}

export enum MoveTarget {
  SELECTED = 0,
  DEPENDS = 1,
  USER_OR_SELECTED = 2,
  RANDOM = 4,
  BOTH = 8,
  USER = 16,
  FOES_AND_ALLY = 32,
  OPPONENTS_FIELD = 64,
  ALLY = 128,
  ALL_BATTLERS = 272,
}

export function getEffectStr(effect?: number): string {
  return `${effect ?? 'None'}`;
}

