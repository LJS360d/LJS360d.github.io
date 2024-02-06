import type { PokemonSprite } from "./pokemon.sprite";

export interface LastStageEvolution {
  from: PokemonSprite;
  method: string[];
  clause: string[];
  to: PokemonSprite[];
}

export interface EvolutionData {
  from: PokemonSprite;

  oldMethod: string[];
  newMethod: string[];

  oldClause: string[];
  newClause: string[];

  oldTo: (PokemonSprite | LastStageEvolution)[];
  newTo: (PokemonSprite | LastStageEvolution)[];

  new?: boolean;
}
