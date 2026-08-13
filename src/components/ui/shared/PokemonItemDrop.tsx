import { getItemName, monById } from '../../../data/lookups';

interface PokemonItemDropProps {
  species: number;
  size?: number;
}

export default function PokemonItemDropComponent({
  species,
  size = 24,
}: PokemonItemDropProps) {
  const mon = monById.get(species);
  if (!mon) return null;
  if (!mon.itemCommon && !mon.itemRare) return null;
  return (
    <>
      {!!mon.itemCommon && (
        <img
          class="icon"
          src={`/assets/items/icons/${mon.itemCommon}.png`}
          alt={`item-${mon.itemCommon}-icon`}
          title={`(50%) ${getItemName(mon.itemCommon)}`}
          width={size}
          height={size}
          loading="lazy"
          decoding="async"
        />
      )}
      {!!mon.itemRare && (
        <img
          class="icon"
          src={`/assets/items/icons/${mon.itemRare}.png`}
          alt={`item-${mon.itemRare}-icon`}
          title={`(5%) ${getItemName(mon.itemRare)}`}
          width={size}
          height={size}
          loading="lazy"
          decoding="async"
        />
      )}
    </>
  );
}
