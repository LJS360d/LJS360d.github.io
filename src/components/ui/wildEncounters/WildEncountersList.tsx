import { createMemo, For } from "solid-js";
import { pokemon, wildEncounters } from "../../../data";
import { searchStore } from "../../../data/store/search.store";
import WildEncountersComponent from "./WildEncountersComponent";
import type { WildEncounters } from "../../../data/types/wild_encounters";

function getWildEncountersSearchString(encounters: WildEncounters) {
  const monsSet = new Set<string>([
    ...(encounters.landMonsInfo?.wildPokemon.map(
      (mon) => pokemon[mon.species - 1].speciesName
    ) ?? []),
    ...(encounters.waterMonsInfo?.wildPokemon.map(
      (mon) => pokemon[mon.species - 1].speciesName
    ) ?? []),
    ...(encounters.fishingMonsInfo?.wildPokemon.map(
      (mon) => pokemon[mon.species - 1].speciesName
    ) ?? []),
    ...(encounters.rockSmashMonsInfo?.wildPokemon.map(
      (mon) => pokemon[mon.species - 1].speciesName
    ) ?? []),
  ]);
  return Array.from(monsSet).join(' ').toLowerCase() + ' ' + encounters.locationName.toLowerCase();
}

export default function WildEncountersList() {
  const allEncounters = wildEncounters.map((e) => ({ ...e, search: getWildEncountersSearchString(e) }));
  const filteredWildEncounters = createMemo(() => {
    const searchText = searchStore.text;
    if (!searchText) return allEncounters;
    return allEncounters.filter((enc) => enc.search.includes(searchText.toLowerCase()));
  });

  return (
    <ul class="list-base">
      <For each={filteredWildEncounters()}>
        {(enc) => (
          <WildEncountersComponent encounters={enc} />
        )}
      </For>
    </ul>
  )
}