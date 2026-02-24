import { createMutable } from "solid-js/store";
import type { PokemonType } from "../types/pokemon.types";

export type TypeFilterMode =
  | "include_any"
  | "exclude_any"
  | "include_all"
  | "exclude_all";

export interface SearchFilters {
  diffTypes: boolean;
  diffStats: boolean;
  types: PokemonType[];
  typeFilterMode: TypeFilterMode;
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