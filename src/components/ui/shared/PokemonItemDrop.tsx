import { pokemon, items } from "../../../data";
import { ItemInfo } from "../../../data/types/item";
import { PokemonInfo } from "../../../data/types/pokemon";

interface PokemonItemDropProps {
  species: number;
  size?: number;
}

function getMon(species: number): PokemonInfo | null {
  return pokemon.find((mon) => mon.id === species) ?? null;
}

function getItem(item: number): ItemInfo | null {
  return items.find((it) => it.id === item) ?? null;
}

export default function PokemonItemDropComponent({
  species,
  size = 24,
}: PokemonItemDropProps) {
  const mon = getMon(species);
  if (!mon) return null;
  if (!mon.itemCommon && !mon.itemRare) return null;
  return (
    <>
      {!!mon.itemCommon && (
        <img
          class="icon"
          src={`/assets/items/icons/${mon.itemCommon}.png`}
          alt={`item-${mon.itemCommon}-icon`}
          title={"(50%) "+ getItem(mon.itemCommon)!.name}
          width={size}
          height={size}
          loading="lazy"
        />
      )}
      {!!mon.itemRare && (
        <img
          class="icon"
          src={`/assets/items/icons/${mon.itemRare}.png`}
          alt={`item-${mon.itemRare}-icon`}
          title={"(5%) "+ getItem(mon.itemRare)!.name}
          width={size}
          height={size}
          loading="lazy"
        />
      )}
    </>
  );
}
