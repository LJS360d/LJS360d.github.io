import { useState } from 'react';
import type { LearnsetData } from '../../../models/types/learnset.data';
import type { PokemonInfo } from '../../../models/types/pokemon.info';
import PokemonSprite from '../shared/PokemonSprite';
import AbilitiesBar from './PokemonAbilities';
import StatBar from './PokemonStats';
import TypeBar from './PokemonTyping';
import PokemonIcon from '../shared/PokemonIcon';

interface PokemonComponentProps {
  pokemon: PokemonInfo;
  forms: PokemonInfo[];
  learnset?: LearnsetData;
}
function PokemonComponent({ pokemon, learnset, forms }: PokemonComponentProps) {
  /* const [dialogOpen, setDialogOpen] = useState<boolean>(false); */
  const [usedForm, setUsedForm] = useState<PokemonInfo>(pokemon);
  /* const toggleDialog = useCallback(() => {
    setDialogOpen(!dialogOpen);
  }, [dialogOpen]); */

  return (
    <li data-name={pokemon.species} className='grid grid-flow-row'>
      {/* left */}
      {forms.length > 0 && (
        <div
          role='tablist'
          className='tabs tabs-bordered w-fit max-w-full hover:bg-base-100 p-0 overflow-x-auto'>
          {[pokemon, ...forms].map((form, i) => (
            <button
              key={i}
              role='tab'
              type='button'
              className={`tab hover:bg-base-200 w-fit tab-lg tab-bordered ${usedForm.species === form.species ? 'tab-active' : ''}`}
              onClick={() => setUsedForm(form)}>
              <div className='flex gap-2 items-center justify-start'>
                <PokemonIcon pokemon={form.species} />
                <span className='capitalize w-fit'>{form.species.toLowerCase().replace(/_/g, ' ')}</span>
              </div>
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
      </div>
    </li>
  );
}

export default PokemonComponent;
