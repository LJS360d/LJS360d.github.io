import type { PokemonType } from './pokemon.type';

export interface PokemonInfo extends PokemonInfoDefinition {
  old: PokemonInfoDefinition | null;
}

export interface PokemonInfoDefinition {
  id: number;
  species: string;
  speciesName: string;
  stats: PokemonStatModel;
  bst: number;
  generation: number;
  types: PokemonType[];
  natDexNum: number;
  abilities: string[] | null;
  bodyColor: number;
  catchRate: number;
  categoryName: string;
  description: string;
  eggCycles: number;
  eggGroups: number[];
  evolutions: [];
  formChangeTable: PokemonFormChange[] | null;
  evYield: PokemonEvYieldModel;
  expYield: number;
  genderRatio: number;
  growthRate: number;
  height: number;
  weight: number;
  flags: PokemonFlags[] | null;
  itemCommon?: number;
  itemRare?: number;
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
  form: number;
  method: number;
  params: number[];
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
