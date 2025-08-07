import { createMutable } from "solid-js/store";
import type { PokemonType } from "../types/pokemon.types";

export interface SearchFilters {
  diffTypes: boolean;
  diffStats: boolean;
  types: PokemonType[];
  generations: number[];
}


interface SearchState {
  text: string;
  filters: Partial<SearchFilters>;
}

export const searchStore = createMutable<SearchState>({
  text: "",
  filters: {},
});