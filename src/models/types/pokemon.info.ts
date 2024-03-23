import type { PokemonType } from './pokemon.type';

export interface PokemonInfo extends PokemonInfoDefinition {
  old: PokemonInfoDefinition | null;
}

export interface PokemonInfoDefinition {
  species: string;
  speciesName: string;
  stats: PokemonStatModel;
  bst: number;
  types: PokemonType[];
  natDexNum: number;
  abilities: string[];
  bodyColor: string;
  catchRate: number;
  categoryName: string;
  description: string;
  eggCycles: number;
  eggGroups: string[];
  evolutions: [];
  formChangeTable: PokemonFormChange[];
  evYield: PokemonEvYieldModel;
  expYield: number;
  friendship: string;
  genderRatio: string;
  growthRate: string;
  height: number;
  weight: number;
  flags: PokemonFlags[];
  itemCommon?: string;
  itemRare?: string;
}

// ? HP, ATK, DEF, SpATK, SpDEF, SPE
type PokemonStatModel = [number, number, number, number, number, number];
type PokemonEvYieldModel = [
  number | null,
  number | null,
  number | null,
  number | null,
  number | null,
  number | null,
];

export interface PokemonFormChange {
  form: string;
  clause: string;
  method?: string;
}

export enum PokemonFlags {
  alolanForm = 'ALOLAN',
  galarianForm = 'GALARIAN',
  hisuianForm = 'HISUIAN',
  paldeanForm = 'PALDEAN',
  legendary = 'LEGENDARY',
  mythical = 'MYTHICAL',
  megaEvolution = 'MEGAEVOLUTION',
  primalReversion = 'PRIMAL',
  ultraBeast = 'ULTRABEAST',
  ultraBurst = 'ULTRABURST',
  gigantamax = 'GIGANTAMAX',
  paradoxForm = 'PARADOX',
  totem = 'TOTEM',
  alternateForm = 'ALTERNATE_FORM',
}
