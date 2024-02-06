import type { PokemonType } from "./pokemon.type";

export interface PokemonData {
  number: number;
  species: string;
  imageUrl: string;
  iconUrl: string;

  oldStats: number[];
  newStats: number[];

  oldTypes: PokemonType[];
  newTypes: PokemonType[];

  oldCatchRate: number;
  newCatchRate: number;

  oldExpYield: number;
  newExpYield: number;

  oldEvYield: EvYield;
  newEvYield: EvYield;

  oldItemYield?: ItemYield;
  newItemYield?: ItemYield;

  oldGenderRatio: number | null;
  newGenderRatio: number | null;

  oldFriendship: number | undefined;
  newFriendship: number | undefined;

  oldEggGroups: string[];
  newEggGroups: string[];

  oldEggCycles: number;
  newEggCycles: number;

  oldGrowthRate: string;
  newGrowthRate: string;

  oldAbilities: string[];
  newAbilities: string[];

  oldBodyColor?: string;
  newBodyColor?: string;

  oldFlags: string[];
  newFlags: string[];

  notes?: string[];
}

export type EvYield =
  | { hp: number }
  | { attack: number }
  | { defense: number }
  | { spAttack: number }
  | { spDefense: number }
  | { speed: number };
export type ItemYield = { common: string } | { rare: string };
