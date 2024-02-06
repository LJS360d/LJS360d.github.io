import type { PokemonSprite } from "../../../models/types/pokemon.sprite";

interface PokemonSpriteProps {
  pokemon: PokemonSprite;
}

export default function PokemonSpriteComponent({
  pokemon,
}: PokemonSpriteProps) {
  const species = pokemon.species.toLowerCase().replace(/_/g, " ");
  // TODO use next router.push for redirects
  return (
    <div className="min-w-fit">
      <a href={`/pokemon/${species}`} className="capitalize">
        {species}
      </a>
      <img
        className="sprite"
        src={pokemon.imageUrl}
        alt={`${species}-sprite`}
        width={112}
        height={112}
        loading="lazy"
      />
    </div>
  );
}
