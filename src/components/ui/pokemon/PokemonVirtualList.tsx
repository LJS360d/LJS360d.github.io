import { createMemo } from "solid-js";
import { learnsets } from "../../../data";
import { searchStore } from "../../../data/store/search.store";
import { getBaseMonsData, getMonAlternateForms } from "../../../utils/pokemon.data.utils";
import VirtualList from "../../common/VirtualList";
import PokemonComponent from "./PokemonComponent";
import { isEqual } from "lodash";

function getLearnset(pokemonId: number) {
  return learnsets.find((ls) => ls.species === pokemonId);
}

export default function PokemonVirtualList() {
  const filteredPokemon = createMemo(() => {
    const allMons = getBaseMonsData();
    const searchText = searchStore.text;
    const filters = searchStore.filters;

    if (
      !searchText &&
      !filters.diffTypes &&
      !filters.diffStats &&
      !filters.types?.length
    ) return allMons;

    return allMons
      .filter((mon) => mon.species.toLowerCase().includes(searchText.toLowerCase()))
      .filter((mon) => {
        let filterOut = false;
        if (filters.types?.length) {
          filterOut ||= filters.types.some(type => mon.types.includes(type));
        }
        if (filters.diffTypes) {
          filterOut ||= isEqual(mon.types, mon.old?.types);
        }
        if (filters.diffStats) {
          filterOut ||= isEqual(mon.stats, mon.old?.stats);
        }
        return !filterOut;
      })
      ;
  });

  return (
    <VirtualList
      class="list-base"
      items={filteredPokemon()}
      rowHeight={240}
      rootHeight={window.innerHeight - 64}
      overscan={40}
    >
      {
        (item) => {
          if (!item) return null;
          return <PokemonComponent
            pokemon={item}
            forms={getMonAlternateForms(item.species)}
            learnset={getLearnset(item.id)} />;
        }
      }
    </VirtualList>
  )
}