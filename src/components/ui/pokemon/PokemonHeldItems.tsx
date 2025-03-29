import type { PokemonInfo } from "../../../models/types/pokemon.info";
import ItemIcon from "../item/ItemIcon";

interface PokemonHeldItemsProps {
  pokemon: PokemonInfo;
}

function PokemonHeldItems({ pokemon }: PokemonHeldItemsProps) {
  const { itemCommon, itemRare } = pokemon;
  const { itemCommon: oldItemCommon, itemRare: oldItemRare } = pokemon.old ?? {};

  return (
    <div className="flex flex-col items-start">
      {!!itemCommon && (
        <div>
          <span>Common held item</span>
          {oldItemCommon !== undefined && oldItemCommon !== itemCommon ? (
            <div className="old">
              <ItemIcon id={oldItemCommon} />
            </div>
          ) : null}
          <ItemIcon id={itemCommon} />
        </div>
      )}
      {!!itemRare && (
        <div>
          <span>Rare held item</span>
          {oldItemRare !== undefined && oldItemRare !== itemRare ? (
            <div className="old">
              <ItemIcon id={oldItemRare} />
            </div>
          ) : null}
          <ItemIcon id={itemRare} />
        </div>
      )}
    </div>
  );
}

export default PokemonHeldItems;