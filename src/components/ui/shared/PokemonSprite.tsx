import { toLowerSnakeCase } from '../../../utils/formatting.utils';

interface PokemonSpriteProps {
  pokemon: string;
}

export default function PokemonSpriteComponent({
  pokemon,
}: PokemonSpriteProps) {
  const species = pokemon.toLowerCase().replace(/_/g, ' ');
  // TODO use next router.push for redirects
  return (
    <div className='min-w-fit'>
      <a href={`/pokemon/${species}`} className='capitalize'>
        {species}
      </a>
      <img
        className='sprite'
        src={`/assets/pokemon/${toLowerSnakeCase(pokemon)}.png`}
        alt={`${species}-sprite`}
        width={64}
        height={64}
        loading='lazy'
      />
    </div>
  );
}
