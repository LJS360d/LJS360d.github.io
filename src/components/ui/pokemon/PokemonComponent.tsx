import { useCallback, useState } from 'react';
import type { LearnsetInfo } from '../../../models/types/learnset.info';
import type { PokemonInfo } from '../../../models/types/pokemon.info';
import PokemonIcon from '../shared/PokemonIcon';
import PokemonSprite from '../shared/PokemonSprite';
import AbilitiesBar from './PokemonAbilities';
import StatBar from './PokemonStats';
import TypeBar from './PokemonTyping';
import LearnsetComponent from '../learnset/LearnsetComponent';
import itemsRaw from '../../../data/items.json';
import type { ItemInfo } from '../../../models/types/item.data';
import ItemIcon from '../item/ItemIcon';
import PokemonHeldItems from './PokemonHeldItems';
const items = itemsRaw as ItemInfo[];

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

  const getItemData = (id: number) => {
    return items.find((item) => item.id === id);
  };

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
            {(!!usedForm.itemCommon || !!usedForm.itemRare) &&
              <PokemonHeldItems pokemon={usedForm} />
            }
          </div>
        </div>
        {learnset && <LearnsetComponent learnset={learnset} />}
      </div>
    </li>
  );
}

export default PokemonComponent;
