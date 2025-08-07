import lodash from 'lodash';
import type { PokemonInfo } from '../../../data/types/pokemon';
import TypeIcon from '../shared/TypeIcon';
import { createMemo, For } from 'solid-js';

const { difference, intersection } = lodash;

interface TypeBarProps {
  pokemon: PokemonInfo;
}

function PokemonTyping(props: TypeBarProps) {

  const commonTypes = createMemo(() => intersection(props.pokemon.types, (props.pokemon.old?.types ?? [])));
  const removedTypes = createMemo(() => difference((props.pokemon.old?.types ?? []), props.pokemon.types));
  const addedTypes = createMemo(() => difference(props.pokemon.types, (props.pokemon.old?.types ?? [])));

  return (
    <div class='flex flex-col gap-2'>
      <span class='mr-2'>Type:</span>
      <div class='flex flex-row items-center'>
        <div class='grid grid-flow-col gap-2'>
          <div class='flex flex-wrap gap-2'>
            <For each={commonTypes()}>
              {(type) => (
                <TypeIcon type={type} />
              )}
            </For>
            <For each={addedTypes()}>
              {(type) => (
                <TypeIcon type={type} new />
              )}
            </For>
          </div>
          <div class='flex flex-wrap gap-2 justify-end'>
            <For each={removedTypes()}>
              {(type) => (
                <TypeIcon type={type} strikeThrough />
              )}
            </For>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonTyping;
