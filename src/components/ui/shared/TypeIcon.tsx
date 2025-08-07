import {
  PokemonTypeString,
  type PokemonType,
  type PokemonTypeEnum,
} from '../../../data/types/pokemon.types';

interface TypeIconProps {
  type: PokemonType | PokemonTypeEnum;
  strikeThrough?: boolean;
  new?: boolean;
}

export default function TypeIcon({
  type,
  strikeThrough,
  new: isNew,
}: TypeIconProps) {
  const formattedType =
    typeof type === 'number'
      ? PokemonTypeString[type].toLowerCase()
      : type.toLowerCase();
  const klass = `type-${
    formattedType === '???' ? 'mystery' : formattedType
  } ${strikeThrough ? 'obst' : ''} ${isNew ? 'new-type' : ''}`;

  return <span class={klass}>{formattedType}</span>;
}
