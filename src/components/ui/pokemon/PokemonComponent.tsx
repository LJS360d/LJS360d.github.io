import { useState } from 'react';
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
function PokemonComponent({ pokemon, learnset, forms }: PokemonComponentProps) {
  const [usedForm, setUsedForm] = useState<PokemonInfo>(pokemon);

  return (
    <li
      data-name={pokemon.species}
      data-diffonly={!!pokemon.old}
      data-types={JSON.stringify(pokemon.types)}
      data-generations={JSON.stringify([pokemon.generation])}
      className='grid grid-flow-row'>
      {/* left */}
      {forms.length > 0 && (
        <div
          role='tablist'
          className='tabs w-fit max-w-full tabs-bordered hover:bg-base-100 p-0 inline-block overflow-x-auto'>
          {[pokemon, ...forms].map((form, i) => (
            <button
              key={i}
              role='tab'
              type='button'
              className={`tab hover:bg-base-200 tab-bordered text-nowrap min-w-fit ${usedForm.species === form.species ? 'tab-active' : ''}`}
              onClick={() => setUsedForm(form)}>
              <PokemonIcon species={form.id} />
              <span className='capitalize w-fit'>
                {form.species.toLowerCase().replace(/_/g, ' ')}
              </span>
            </button>
          ))}
        </div>
      )}
      <div className='cursor-default bg-base-200 rounded-lg flex flex-row justify-start flex-1 p-2'>
        <div className='cursor-default flex flex-row flex-1 gap-4 items-center pl-2'>
          <a
            href={`/pokemon/${usedForm.species.toLowerCase()}`}
            className='capitalize'>
            {usedForm.speciesName}
            <PokemonSprite species={usedForm.id} />
          </a>
          <StatBar pokemon={usedForm} />
          <div className='grid grid-flow-col gap-4'>
            <AbilitiesBar pokemon={usedForm} />
            <TypeBar pokemon={usedForm} />
            {(!!usedForm.itemCommon || !!usedForm.itemRare) && (
              <PokemonHeldItems pokemon={usedForm} />
            )}
          </div>
        </div>
        {learnset && <LearnsetComponent learnset={learnset} />}
      </div>
    </li>
  );
}

export default PokemonComponent;
