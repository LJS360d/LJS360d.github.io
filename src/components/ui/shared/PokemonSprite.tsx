interface PokemonSpriteProps {
  species: number;
  width?: number;
  height?: number;
}

export default function PokemonSpriteComponent({
  species,
  width = 64,
  height = width,
}: PokemonSpriteProps) {
  return (
    <div className='min-w-fit'>
      <img
        className='sprite'
        src={`/assets/pokemon/sprites/${species}.png`}
        alt={`${species}-sprite`}
        width={width}
        height={height}
        loading='lazy'
      />
    </div>
  );
}
