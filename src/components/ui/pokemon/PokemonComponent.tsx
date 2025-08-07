import { createEffect, createSignal } from 'solid-js';
import type { Learnset } from '../../../data/types/learnset';
import type { PokemonInfo } from '../../../data/types/pokemon';
import LearnsetComponent from '../learnset/LearnsetComponent';
import PokemonIcon from '../shared/PokemonIcon';
import PokemonSprite from '../shared/PokemonSprite';
import AbilitiesBar from './PokemonAbilities';
import PokemonHeldItems from './PokemonHeldItems';
import StatBar from './PokemonStats';
import TypeBar from './PokemonTyping';

interface PokemonComponentProps {
  pokemon: PokemonInfo;
  forms: PokemonInfo[];
  learnset?: Learnset;
}

function PokemonComponent(props: PokemonComponentProps) {
  const [usedForm, setUsedForm] = createSignal<PokemonInfo>(props.pokemon);

  createEffect(() => {
    setUsedForm(props.pokemon);
  });

  return (
    <li class='grid grid-flow-row'>
      {/* left */}
      {props.forms.length > 0 && (
        <div
          role='tablist'
          class='tabs w-fit max-w-full tabs-bordered hover:bg-base-100 p-0 inline-block overflow-x-auto'>
          {[props.pokemon, ...props.forms].map((form) => (
            <button
              role='tab'
              type='button'
              class={`tab hover:bg-base-200 tab-bordered text-nowrap min-w-fit ${usedForm().species === form.species ? 'tab-active' : ''}`}
              onClick={() => setUsedForm(form)}>
              <PokemonIcon species={form.id} />
              <span class='capitalize w-fit'>
                {form.species.toLowerCase().replace(/_/g, ' ')}
              </span>
            </button>
          ))}
        </div>
      )}
      <div class='cursor-default bg-base-200 rounded-lg flex flex-row justify-start flex-1 p-2'>
        <div class='cursor-default flex flex-row flex-1 gap-4 items-center pl-2'>
          <a
            href={`/pokemon/${usedForm().species.toLowerCase()}`}
            class='capitalize'>
            {usedForm().speciesName}
            <PokemonSprite species={usedForm().id} />
          </a>
          <StatBar pokemon={usedForm()} />
          <div class='grid grid-flow-col gap-4'>
            <AbilitiesBar pokemon={usedForm()} />
            <TypeBar pokemon={usedForm()} />
            {(!!usedForm().itemCommon || !!usedForm().itemRare) && (
              <PokemonHeldItems pokemon={usedForm()} />
            )}
          </div>
        </div>
        {props.learnset && <LearnsetComponent learnset={props.learnset} />}
      </div>
    </li>
  );
}

export default PokemonComponent;
