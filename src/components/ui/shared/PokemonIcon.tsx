import { toLowerSnakeCase } from '../../../utils/formatting.utils';

interface PokemonIconProps {
  pokemon: string;
}

export default function PokemonIconComponent({
  pokemon,
}: PokemonIconProps) {
  const species = pokemon.toLowerCase().replace(/_/g, ' ');
  // TODO use next router.push for redirects
  return (
    <div className='min-w-fit'>
      <img
        className='icon'
        src={`/assets/pokemon/${toLowerSnakeCase(pokemon)}_icon.png`}
        alt={`${species}-icon`}
        width={24}
        height={24}
        loading='lazy'
      />
    </div>
  );
}
