import lodash from 'lodash';
import type { PokemonInfo } from '../../../data/types/pokemon';
import TypeIcon from '../shared/TypeIcon';

const { difference, intersection } = lodash;

interface TypeBarProps {
  pokemon: PokemonInfo;
}

function PokemonTyping({ pokemon }: TypeBarProps) {
  const newTypes = pokemon.types;
  const oldTypes = pokemon.old?.types ?? [];

  const commonTypes = intersection(newTypes, oldTypes);
  const removedTypes = difference(oldTypes, newTypes);
  const addedTypes = difference(newTypes, oldTypes);

  return (
    <div className='flex flex-col gap-2'>
      <span className='mr-2'>Type:</span>
      <div className='flex flex-row items-center'>
        <div className='grid grid-flow-col gap-2'>
          <div className='flex flex-wrap gap-2'>
            {commonTypes.map((type, i) => (
              <TypeIcon key={`common-${i}`} type={type} />
            ))}
            {addedTypes.map((type, i) => (
              <TypeIcon key={`new-${i}`} type={type} new />
            ))}
          </div>
          <div className='flex flex-wrap gap-2 justify-end'>
            {removedTypes.map((type, i) => (
              <TypeIcon key={`old-${i}`} type={type} strikeThrough />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonTyping;
