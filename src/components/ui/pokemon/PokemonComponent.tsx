import { useCallback, useState } from 'react';
import type { LearnsetData } from '../../../models/types/learnset.data';
import type { PokemonInfo } from '../../../models/types/pokemon.info';
import LearnsetComponent from '../learnset/LearnsetComponent';
import PokemonSprite from '../shared/PokemonSprite';
import AbilitiesBar from './PokemonAbilities';
import StatBar from './PokemonStats';
import TypeBar from './PokemonTyping';

interface PokemonComponentProps {
  pokemon: PokemonInfo;
  learnset?: LearnsetData;
}
function PokemonComponent({ pokemon, learnset }: PokemonComponentProps) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const toggleDialog = useCallback(() => {
    setDialogOpen(!dialogOpen);
  }, [dialogOpen]);

  return (
    <li
      data-name={pokemon.species}
      className='cursor-default bg-base-200 rounded-lg flex flex-row justify-start flex-1'>
      {/* left */}
      <div className='cursor-default flex flex-row flex-1'>
        <PokemonSprite pokemon={pokemon.species} />
        <StatBar pokemon={pokemon} />
        <div className='flex gap-4'>
          <AbilitiesBar pokemon={pokemon} />
          <TypeBar pokemon={pokemon} />
        </div>
      </div>
      {/* right */}
      {learnset && (
        <div onClick={() => toggleDialog()} className='min-w-36'>
          <LearnsetComponent learnset={learnset} />
        </div>
      )}
    </li>
  );
}

export default PokemonComponent;
