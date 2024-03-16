import lodash from 'lodash';
import type { PokemonInfo } from '../../../models/types/pokemon.info';
import { toCapitalized } from '../../../utils/formatting.utils';
const { isEqual } = lodash;

interface AbilitiesBarProps {
  pokemon: PokemonInfo;
}

export default function PokemonAbilities({ pokemon }: AbilitiesBarProps) {
  const newAbilities = pokemon.abilities;
  const oldAbilities = pokemon.old?.abilities ?? newAbilities;
  const label = newAbilities.length > 1 ? 'Abilities' : 'Ability';
  return (
    <div>
      <span>{label}:</span>
      {!isEqual(newAbilities, oldAbilities) ? (
        <div className='grid grid-flow-row'>
          {oldAbilities.map((ability, i) => (
            <span className='old' key={i}>
              {toCapitalized(ability)}
            </span>
          ))}{' '}
          {newAbilities.map((ability, i) => (
            <span className='new' key={i}>
              {toCapitalized(ability)}
            </span>
          ))}
        </div>
      ) : (
        <div className='flex flex-col'>
          {newAbilities.map((ability) => (
            <span key={ability}>{toCapitalized(ability)}</span>
          ))}
        </div>
      )}
    </div>
  );
}
