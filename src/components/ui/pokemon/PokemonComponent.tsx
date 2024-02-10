import type { LearnsetData } from '../../../models/types/learnset.data';
import type { PokemonData } from '../../../models/types/pokemon.data';
import LearnsetComponent from '../learnset/LearnsetComponent';
import PokemonSprite from '../shared/PokemonSprite';
import AbilitiesBar from './PokemonAbilities';
import StatBar from './PokemonStats';
import TypeBar from './PokemonTyping';

interface PokemonComponentProps {
  pokemon: PokemonData;
  learnset?: LearnsetData;
}
function PokemonComponent({ pokemon, learnset }: PokemonComponentProps) {
  return (
    <li
      data-pokemon-name={pokemon.species}
      className='cursor-default bg-base-200 rounded-lg flex flex-row justify-start flex-1'>
      {/* left */}
      <div className='cursor-default flex flex-row flex-1'>
        <PokemonSprite pokemon={pokemon} />
        <StatBar pokemon={pokemon} />
        <div className='flex gap-4'>
          <AbilitiesBar pokemon={pokemon} />
          <TypeBar pokemon={pokemon} />
        </div>
      </div>
      {/* right */}
      {learnset && (
        <div className='min-w-36'>
          <LearnsetComponent learnset={learnset} />
        </div>
      )}
    </li>
  );
}

export default PokemonComponent;
