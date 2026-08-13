import evolutionsRaw from "./evolutions.json";
import itemsRaw from "./items.json";
import movesRaw from "./moves.json";
import pokemonRaw from "./species.json";
import learnsetsRaw from "./learnsets.json";
import wildEncountersRaw from "./wild_encounters.json";

import type { WildEncounters } from "./types/wild_encounters";
import type { EvolutionTree } from "./types/evolution";
import type { ItemInfo } from "./types/item";
import type { MoveInfo } from "./types/move";
import type { PokemonInfo } from "./types/pokemon";
import type { Learnset } from "./types/learnset";

// Build-time only: importing this from a hydrated island inlines ~11 MB of JSON
// into the client bundle. `trainers.json` is not re-exported because nothing
// renders it, and a barrel export makes it impossible to keep out of a chunk.

export const evolutions = evolutionsRaw as EvolutionTree[];
export const items = itemsRaw as ItemInfo[];
export const moves = movesRaw as MoveInfo[];
export const pokemon = pokemonRaw as PokemonInfo[];
export const learnsets = learnsetsRaw as Learnset[];
export const wildEncounters = wildEncountersRaw as WildEncounters[];
