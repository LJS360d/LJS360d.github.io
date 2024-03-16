import lodash from 'lodash';
import type { PokemonInfo } from '../../../models/types/pokemon.info';
import TypeIcon from '../shared/TypeIcon';
const { isEqual } = lodash;

interface TypeBarProps {
  pokemon: PokemonInfo;
}

function PokemonTyping({ pokemon }: TypeBarProps) {
  const newTypes = pokemon.types;
  const oldTypes = pokemon.old?.types ?? newTypes;
  const shouldShowOldTypes = !isEqual(newTypes, oldTypes);
  const activeTypes = shouldShowOldTypes ? newTypes : oldTypes;

  return (
    <div className='flex flex-col gap-2'>
      <span className='mr-2'>Type:</span>
      {shouldShowOldTypes && (
        <div className='flex flex-row items-center'>
          <div className='flex flex-wrap gap-2'>
            {oldTypes.map((type, i) => (
              <TypeIcon key={i} type={type} strikeThrough />
            ))}
          </div>
        </div>
      )}

      <div className='flex flex-row items-center'>
        <div className='flex flex-wrap gap-2'>
          {activeTypes.map((type, i) => (
            <TypeIcon key={i} type={type} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PokemonTyping;
