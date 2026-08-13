import { items, learnsets, moves, pokemon } from './index';
import type { EvolutionTree } from './types/evolution';
import type { ItemInfo } from './types/item';
import type { Learnset } from './types/learnset';
import type { MoveInfo } from './types/move';
import { PokemonFlags, type PokemonInfo } from './types/pokemon';
import type { WildEncounters } from './types/wild_encounters';

// Indexes and derived data, built once per build. Build-time only, like ./index.

export const moveById: ReadonlyMap<number, MoveInfo> = new Map(
  moves.map((m) => [m.id, m])
);

export const itemById: ReadonlyMap<number, ItemInfo> = new Map(
  items.map((i) => [i.id, i])
);

export const monById: ReadonlyMap<number, PokemonInfo> = new Map(
  pokemon.map((m) => [m.id, m])
);

export const learnsetBySpecies: ReadonlyMap<number, Learnset> = new Map(
  learnsets.map((l) => [l.species, l])
);

export function getMoveName(id: number): string {
  return moveById.get(id)?.name ?? `MOVE ID: ${id}`;
}

export function getItemName(id: number): string {
  return itemById.get(id)?.name ?? `ITEM ID: ${id}`;
}

const ALTERNATE_FORM_FLAGS: readonly PokemonFlags[] = [
  PokemonFlags.alternateForm,
  PokemonFlags.alolanForm,
  PokemonFlags.galarianForm,
  PokemonFlags.hisuianForm,
  PokemonFlags.paldeanForm,
];

export const baseMons: readonly PokemonInfo[] = pokemon.filter(
  ({ species, flags }) =>
    !species.endsWith('_FEMALE') &&
    !flags?.some((flag) => ALTERNATE_FORM_FLAGS.includes(flag))
);

const baseMonIndex: ReadonlyMap<string, number> = new Map(
  baseMons.map((m, i) => [m.species, i])
);

export function getMonPaginator(
  species: string
): [PokemonInfo | undefined, PokemonInfo | undefined] {
  const i = baseMonIndex.get(species);
  return i === undefined ? [undefined, undefined] : [baseMons[i - 1], baseMons[i + 1]];
}

const FORMS_BLACKLIST = new Set(['PORYGON_Z']);
const NO_FORMS: readonly PokemonInfo[] = [];

/** base species -> alternate forms, keyed off every underscore prefix. */
const altForms: ReadonlyMap<string, PokemonInfo[]> = (() => {
  const bySpecies = new Set(pokemon.map((m) => m.species));
  const map = new Map<string, PokemonInfo[]>();
  for (const mon of pokemon) {
    if (FORMS_BLACKLIST.has(mon.species)) continue;
    for (let cut = mon.species.indexOf('_'); cut !== -1; cut = mon.species.indexOf('_', cut + 1)) {
      const base = mon.species.slice(0, cut);
      if (!bySpecies.has(base)) continue;
      const forms = map.get(base);
      if (forms) forms.push(mon);
      else map.set(base, [mon]);
    }
  }
  return map;
})();

export function getMonAlternateForms(species: string): readonly PokemonInfo[] {
  return altForms.get(species) ?? NO_FORMS;
}

// Search haystacks, emitted as `data-s` so the client never needs the datasets.

export function evolutionSearchKey(evolution: EvolutionTree): string {
  const names = new Set<number>([evolution.family]);
  for (const path of evolution.evolutions) {
    names.add(path.from);
    for (const outcome of path.to) names.add(outcome.species);
  }
  return speciesNames(names);
}

export function wildEncountersSearchKey(encounters: WildEncounters): string {
  const names = new Set<number>();
  for (const group of [
    encounters.landMonsInfo,
    encounters.waterMonsInfo,
    encounters.fishingMonsInfo,
    encounters.rockSmashMonsInfo,
  ]) {
    for (const mon of group?.wildPokemon ?? []) names.add(mon.species);
  }
  return `${speciesNames(names)} ${encounters.locationName.toLowerCase()}`;
}

function speciesNames(ids: Iterable<number>): string {
  const names: string[] = [];
  for (const id of ids) {
    const name = monById.get(id)?.speciesName;
    if (name) names.push(name);
  }
  return names.join(' ').toLowerCase();
}
