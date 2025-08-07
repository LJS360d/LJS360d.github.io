import { splitProps } from "solid-js";
import type { PokemonInfo } from "../../../data/types/pokemon";
import ItemIcon from "../item/ItemIcon";

interface PokemonHeldItemsProps {
  pokemon: PokemonInfo;
}

function PokemonHeldItems(props: PokemonHeldItemsProps) {
  const [newEntries,] = splitProps(props.pokemon, ["itemCommon", "itemRare"]);
  const [old,] = splitProps(props.pokemon?.old ?? {} as PokemonInfo, ["itemCommon", "itemRare"]);

  return (
    <div class="flex flex-col items-start">
      {!!newEntries.itemCommon && (
        <div>
          <span>Common held item</span>
          {old.itemCommon !== undefined && old.itemCommon !== newEntries.itemCommon ? (
            <div class="old">
              <ItemIcon id={old.itemCommon} />
            </div>
          ) : null}
          <ItemIcon id={newEntries.itemCommon} />
        </div>
      )}
      {!!newEntries.itemRare && (
        <div>
          <span>Rare held item</span>
          {old.itemRare !== undefined && old.itemRare !== newEntries.itemRare ? (
            <div class="old">
              <ItemIcon id={old.itemRare} />
            </div>
          ) : null}
          <ItemIcon id={newEntries.itemRare} />
        </div>
      )}
    </div>
  );
}

export default PokemonHeldItems;