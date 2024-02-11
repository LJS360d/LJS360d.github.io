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
  UNKNOWN = '#68A090',
}
