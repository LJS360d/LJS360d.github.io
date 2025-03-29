interface PokemonIconProps {
  species: number;
  size?: number;
}

export default function PokemonIconComponent({ species, size = 24 }: PokemonIconProps) {
  return (
    <div className='min-w-fit'>
      <img
        className='icon'
        src={`/assets/pokemon/icons/${species}.png`}
        alt={`${species}-icon`}
        width={size}
        height={size}
        loading='lazy'
      />
    </div>
  );
}
