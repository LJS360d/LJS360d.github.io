interface PokemonIconProps {
  species: number;
}

export default function PokemonIconComponent({ species }: PokemonIconProps) {
  // TODO use next router.push for redirects
  return (
    <div className='min-w-fit'>
      <img
        className='icon'
        src={`/assets/pokemon/icons/${species}.png`}
        alt={`${species}-icon`}
        width={24}
        height={24}
        loading='lazy'
      />
    </div>
  );
}
