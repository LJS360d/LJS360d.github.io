import lodash from 'lodash';
import type { PokemonInfo } from '../../../data/types/pokemon';
import { toCapitalized } from '../../../utils/formatting.utils';
import { createMemo, For } from 'solid-js';

const { difference, intersection } = lodash;

interface AbilitiesBarProps {
  pokemon: PokemonInfo;
}

export default function PokemonAbilities(props: AbilitiesBarProps) {
  const label = (props.pokemon?.abilities ?? [])?.length === 1 ? 'Ability' : 'Abilities';

  const commonAbilities = createMemo(() => intersection((props.pokemon?.abilities ?? []), (props.pokemon.old?.abilities ?? [])));
  const removedAbilities = createMemo(() => difference((props.pokemon.old?.abilities ?? []), (props.pokemon?.abilities ?? [])));
  const addedAbilities = createMemo(() => difference((props.pokemon?.abilities ?? []), (props.pokemon.old?.abilities ?? [])));

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
