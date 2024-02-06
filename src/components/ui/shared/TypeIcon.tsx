import type { PokemonType } from "../../../models/types/pokemon.type";

interface TypeIconProps {
  type: PokemonType;
  strikeThrough?: boolean;
}

export default function TypeIcon({ type, strikeThrough }: TypeIconProps) {
  const formattedType = type.toLowerCase();
  const className = `type-${
    formattedType === "???" ? "unknown" : formattedType
  } ${strikeThrough ? "obst" : ""}`;

  return <span className={className}>{formattedType}</span>;
}
