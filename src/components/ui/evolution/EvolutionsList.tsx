import { createMemo, For } from "solid-js";
import { evolutions, pokemon } from "../../../data";
import { searchStore } from "../../../data/store/search.store";
import type { EvolutionTree } from "../../../data/types/evolution";
import EvolutionTreeComponent from "./EvolutionComponent";

function getEvolutionTreeSearchString(evolution: EvolutionTree) {
  return `${pokemon.find((p) => p.id === (evolution.family))?.speciesName.toLowerCase()}-${evolution.evolutions
    .map((e) => `${e.to.map((t) => pokemon.find((p) => p.id === (t.species))?.speciesName.toLowerCase()).join(' ')}`)
    .join(' ')}`;
}

// not a virtual list because:
// 1) fuck you
// 2) virtualizing it actually makes it slower for this use case
// 3) virtualizing it makes the components render all with the same height, which we do not want for this use case 
export default function EvolutionsList() {
  const allEvolutions = evolutions.map((e) => ({ ...e, search: getEvolutionTreeSearchString(e) }));

  const filteredEvolutions = createMemo(() => {
    const searchText = searchStore.text;
    if (!searchText) return allEvolutions;
    return allEvolutions.filter((evolution) => evolution.search.includes(searchText.toLowerCase()));
  });

  return (
    <ul class="list-base">
      <For each={filteredEvolutions()}>
        {(evolution) => (
          <EvolutionTreeComponent evolution={evolution} />
        )}
      </For>
    </ul>
  )
}