import { For, createMemo } from "solid-js";
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
  const allMons = getBaseMonsData();

  const filteredPokemon = createMemo(() => {
    const searchText = searchStore.text;
    const filters = searchStore.filters;

    if (
      !searchText &&
      !filters.diffTypes &&
      !filters.diffStats &&
      !filters.types?.length &&
      !filters.generations?.length
    )
      return allMons;

    return allMons
      .filter((mon) => mon.species.toLowerCase().includes(searchText.toLowerCase()))
      .filter((mon) => {
        if (filters.types?.length) {
          const hasAny = filters.types.some((t) => mon.types.includes(t));
          const hasAll = filters.types.every((t) => mon.types.includes(t));
          const mode = filters.typeFilterMode ?? "include_any";
          if (mode === "include_any" && !hasAny) return false;
          if (mode === "exclude_any" && hasAny) return false;
          if (mode === "include_all" && !hasAll) return false;
          if (mode === "exclude_all" && hasAll) return false;
        }
        if (filters.generations?.length && !filters.generations.includes(mon.generation)) return false;
        if (filters.diffTypes && isEqual(mon.types, mon.old?.types)) return false;
        if (filters.diffStats && isEqual(mon.stats, mon.old?.stats)) return false;
        return true;
      });
  });

  return (
    <VirtualList
      class="list-base"
      items={filteredPokemon()}
      rowHeight={240}
      rootHeight={window.innerHeight * 0.80 }
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