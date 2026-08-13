import lodash from 'lodash';
import type { PokemonInfo } from '../../../data/types/pokemon';
import { toCapitalized } from '../../../utils/formatting.utils';
import { createMemo, For } from 'solid-js';

// Rendered to HTML by Astro, never hydrated, so lodash stays on the build machine.
const { difference, intersection } = lodash;

interface AbilitiesBarProps {
  pokemon: PokemonInfo;
}

export default function PokemonAbilities(props: AbilitiesBarProps) {
  const current = () => props.pokemon.abilities ?? [];
  const old = () => props.pokemon.old?.abilities ?? [];
  const label = current().length === 1 ? 'Ability' : 'Abilities';

  const commonAbilities = createMemo(() => intersection(current(), old()));
  const removedAbilities = createMemo(() => difference(old(), current()));
  const addedAbilities = createMemo(() => difference(current(), old()));

  return (
    <div>
      <span>{label}:</span>
      <div class='grid grid-flow-row'>
        <For each={commonAbilities()}>
          {(ability) => (
            <span class='common'>
              {toCapitalized(ability)}
            </span>
          )}
        </For>
        <For each={addedAbilities()}>
          {(ability) => (
            <span class='new'>
              {toCapitalized(ability)}
            </span>
          )}
        </For>
        <For each={removedAbilities()}>
          {(ability) => (
            <span class='old'>
              {toCapitalized(ability)}
            </span>
          )}
        </For>
      </div>
    </div>
  );
}
