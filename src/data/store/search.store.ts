import { createStore } from "solid-js/store";

interface SearchState {
  text: string | null;
  filters: Record<string, any> | null;
}

export const [searchStore, setSearchStore] = createStore<SearchState>({
  text: null,
  filters: null,
});