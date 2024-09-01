import { toLowerSnakeCase } from '../../../utils/formatting.utils';

interface PokemonSpriteProps {
  pokemon: string;
  width?: number;
  height?: number;
}

export default function PokemonSpriteComponent({
  pokemon,
  width = 64,
  height = width,
}: PokemonSpriteProps) {
  const species = pokemon.toLowerCase().replace(/_/g, ' ');
  // TODO use next router.push for redirects
  return (
    <div className='min-w-fit'>
      <img
        className='sprite'
        src={`/assets/pokemon/${toLowerSnakeCase(pokemon)}.png`}
        alt={`${species}-sprite`}
        width={width}
        height={height}
        loading='lazy'
      />
    </div>
  );
}
