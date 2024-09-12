import lodash from 'lodash';
import type { PokemonInfo } from '../../../models/types/pokemon.info';
import { toCapitalized } from '../../../utils/formatting.utils';

const { difference, intersection } = lodash;

interface AbilitiesBarProps {
  pokemon: PokemonInfo;
}

export default function PokemonAbilities({ pokemon }: AbilitiesBarProps) {
  const newAbilities = pokemon?.abilities ?? [];
  const oldAbilities = pokemon.old?.abilities ?? [];
  const label = newAbilities?.length === 1 ? 'Ability' : 'Abilities';

  const commonAbilities = intersection(newAbilities, oldAbilities);
  const removedAbilities = difference(oldAbilities, newAbilities);
  const addedAbilities = difference(newAbilities, oldAbilities);

  return (
    <div>
      <span>{label}:</span>
      <div className='grid grid-flow-row'>
        {commonAbilities.map((ability, i) => (
          <span className='common' key={`common-${i}`}>
            {toCapitalized(ability)}
          </span>
        ))}
        {removedAbilities.map((ability, i) => (
          <span className='old' key={`old-${i}`}>
            {toCapitalized(ability)}
          </span>
        ))}
        {addedAbilities.map((ability, i) => (
          <span className='new' key={`new-${i}`}>
            {toCapitalized(ability)}
          </span>
        ))}
      </div>
    </div>
  );
}
