import { useCallback, useState } from 'react';
import type { LearnsetInfo } from '../../../models/types/learnset.info';
import type { PokemonInfo } from '../../../models/types/pokemon.info';
import LearnsetComponent from '../learnset/LearnsetComponent';
import PokemonIcon from '../shared/PokemonIcon';
import PokemonSprite from '../shared/PokemonSprite';
import AbilitiesBar from './PokemonAbilities';
import StatBar from './PokemonStats';
import TypeBar from './PokemonTyping';

interface PokemonComponentProps {
  pokemon: PokemonInfo;
  forms: PokemonInfo[];
  learnset?: LearnsetInfo;
}
function PokemonComponent({ pokemon, learnset, forms }: PokemonComponentProps) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [usedForm, setUsedForm] = useState<PokemonInfo>(pokemon);
  const toggleDialog = useCallback(() => {
    setDialogOpen(!dialogOpen);
  }, [dialogOpen]);

  return (
    <li data-name={pokemon.species} className='grid grid-flow-row'>
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
              <PokemonIcon pokemon={form.species} />
              <span className='capitalize w-fit'>
                {form.species.toLowerCase().replace(/_/g, ' ')}
              </span>
            </button>
          ))}
        </div>
      )}
      <div className='cursor-default bg-base-200 rounded-lg flex flex-row justify-start flex-1 p-2'>
        <div className='cursor-default flex flex-row flex-1 gap-4 items-center pl-2'>
          <PokemonSprite pokemon={usedForm.species} />
          <StatBar pokemon={usedForm} />
          <div className='flex gap-4'>
            <AbilitiesBar pokemon={usedForm} />
            <TypeBar pokemon={usedForm} />
          </div>
        </div>
        {learnset && <LearnsetComponent learnset={learnset} />}
      </div>
    </li>
  );
}

export default PokemonComponent;
