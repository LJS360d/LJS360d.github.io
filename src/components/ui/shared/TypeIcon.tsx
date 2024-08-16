import type { PokemonType } from "../../../models/types/pokemon.type";

interface TypeIconProps {
  type: PokemonType;
  strikeThrough?: boolean;
  new?: boolean;
}

export default function TypeIcon({ type, strikeThrough, new: isNew }: TypeIconProps) {
  const formattedType = type.toLowerCase();
  const className = `type-${
    formattedType === "???" ? "unknown" : formattedType
  } ${strikeThrough ? "obst" : ""} ${isNew ? "new-type" : ""}`;

  return <span className={className}>{formattedType}</span>;
}
