interface PokemonSpriteProps {
  species: number;
  width?: number;
  height?: number;
}

export default function PokemonSpriteComponent(props: PokemonSpriteProps) {
  return (
    <div class='min-w-fit'>
      <img
        class='sprite'
        src={`/assets/pokemon/sprites/${props.species}.png`}
        alt={`${props.species}-sprite`}
        width={props.width ?? 64}
        height={props.height ?? props.width ?? 64}
        loading='lazy'
      />
    </div>
  );
}
