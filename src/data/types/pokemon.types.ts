export type PokemonType =
  | 'NORMAL'
  | 'FIRE'
  | 'WATER'
  | 'GRASS'
  | 'ELECTRIC'
  | 'ICE'
  | 'FIGHTING'
  | 'POISON'
  | 'GROUND'
  | 'FLYING'
  | 'PSYCHIC'
  | 'BUG'
  | 'ROCK'
  | 'GHOST'
  | 'DARK'
  | 'STEEL'
  | 'FAIRY'
  | 'DRAGON'
  | '???';

export enum PokemonTypeColor {
  NORMAL = '#A8A878',
  FIRE = '#F08030',
  WATER = '#6890F0',
  GRASS = '#78C850',
  ELECTRIC = '#F8D030',
  ICE = '#98D8D8',
  FIGHTING = '#C03028',
  POISON = '#A040A0',
  GROUND = '#E0C068',
  FLYING = '#A890F0',
  PSYCHIC = '#F85888',
  BUG = '#A8B820',
  ROCK = '#B8A038',
  GHOST = '#705898',
  DARK = '#705848',
  DRAGON = '#7038F8',
  STEEL = '#B8B8D0',
  FAIRY = '#EE99AC',
  MYSTERY = '#68A090',
}

export enum PokemonTypeEnum {
  TYPE_NONE = 0,
  TYPE_NORMAL = 1,
  TYPE_FIGHTING = 2,
  TYPE_FLYING = 3,
  TYPE_POISON = 4,
  TYPE_GROUND = 5,
  TYPE_ROCK = 6,
  TYPE_BUG = 7,
  TYPE_GHOST = 8,
  TYPE_STEEL = 9,
  TYPE_MYSTERY = 10,
  TYPE_FIRE = 11,
  TYPE_WATER = 12,
  TYPE_GRASS = 13,
  TYPE_ELECTRIC = 14,
  TYPE_PSYCHIC = 15,
  TYPE_ICE = 16,
  TYPE_DRAGON = 17,
  TYPE_DARK = 18,
  TYPE_FAIRY = 19,
  TYPE_STELLAR = 20,
}

export const PokemonTypeString: { [key: number]: string } = {
  [PokemonTypeEnum.TYPE_NONE]: 'None',
  [PokemonTypeEnum.TYPE_NORMAL]: 'Normal',
  [PokemonTypeEnum.TYPE_FIGHTING]: 'Fighting',
  [PokemonTypeEnum.TYPE_FLYING]: 'Flying',
  [PokemonTypeEnum.TYPE_POISON]: 'Poison',
  [PokemonTypeEnum.TYPE_GROUND]: 'Ground',
  [PokemonTypeEnum.TYPE_ROCK]: 'Rock',
  [PokemonTypeEnum.TYPE_BUG]: 'Bug',
  [PokemonTypeEnum.TYPE_GHOST]: 'Ghost',
  [PokemonTypeEnum.TYPE_STEEL]: 'Steel',
  [PokemonTypeEnum.TYPE_MYSTERY]: 'Mystery',
  [PokemonTypeEnum.TYPE_FIRE]: 'Fire',
  [PokemonTypeEnum.TYPE_WATER]: 'Water',
  [PokemonTypeEnum.TYPE_GRASS]: 'Grass',
  [PokemonTypeEnum.TYPE_ELECTRIC]: 'Electric',
  [PokemonTypeEnum.TYPE_PSYCHIC]: 'Psychic',
  [PokemonTypeEnum.TYPE_ICE]: 'Ice',
  [PokemonTypeEnum.TYPE_DRAGON]: 'Dragon',
  [PokemonTypeEnum.TYPE_DARK]: 'Dark',
  [PokemonTypeEnum.TYPE_FAIRY]: 'Fairy',
  [PokemonTypeEnum.TYPE_STELLAR]: 'Stellar',
};

export const UsedPokemonTypes: { [key: number]: string } = {
  [PokemonTypeEnum.TYPE_NORMAL]: 'Normal',
  [PokemonTypeEnum.TYPE_FIGHTING]: 'Fighting',
  [PokemonTypeEnum.TYPE_FLYING]: 'Flying',
  [PokemonTypeEnum.TYPE_POISON]: 'Poison',
  [PokemonTypeEnum.TYPE_GROUND]: 'Ground',
  [PokemonTypeEnum.TYPE_ROCK]: 'Rock',
  [PokemonTypeEnum.TYPE_BUG]: 'Bug',
  [PokemonTypeEnum.TYPE_GHOST]: 'Ghost',
  [PokemonTypeEnum.TYPE_STEEL]: 'Steel',
  [PokemonTypeEnum.TYPE_FIRE]: 'Fire',
  [PokemonTypeEnum.TYPE_WATER]: 'Water',
  [PokemonTypeEnum.TYPE_GRASS]: 'Grass',
  [PokemonTypeEnum.TYPE_ELECTRIC]: 'Electric',
  [PokemonTypeEnum.TYPE_PSYCHIC]: 'Psychic',
  [PokemonTypeEnum.TYPE_ICE]: 'Ice',
  [PokemonTypeEnum.TYPE_DRAGON]: 'Dragon',
  [PokemonTypeEnum.TYPE_DARK]: 'Dark',
  [PokemonTypeEnum.TYPE_FAIRY]: 'Fairy',
};