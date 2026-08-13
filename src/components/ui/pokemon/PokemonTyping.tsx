import lodash from 'lodash';
import type { PokemonInfo } from '../../../data/types/pokemon';
import TypeIcon from '../shared/TypeIcon';
import { createMemo, For } from 'solid-js';

// Rendered to HTML by Astro, never hydrated, so lodash stays on the build machine.
const { difference, intersection } = lodash;

interface TypeBarProps {
  pokemon: PokemonInfo;
}

function PokemonTyping(props: TypeBarProps) {
  const current = () => props.pokemon.types;
  const old = () => props.pokemon.old?.types ?? [];

  const commonTypes = createMemo(() => intersection(current(), old()));
  const removedTypes = createMemo(() => difference(old(), current()));
  const addedTypes = createMemo(() => difference(current(), old()));

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
