import type { PokemonData } from "../../..//models/types/pokemon.data";
import { toCapitalized } from "../../../utils/formatting.utils";
import lodash from "lodash";
const { isEqual } = lodash;

interface AbilitiesBarProps {
  pokemon: PokemonData;
}

export default function PokemonAbilities({ pokemon }: AbilitiesBarProps) {
  const label = pokemon.newAbilities.length > 1 ? "Abilities" : "Ability";
  return (
    <div>
      <span>{label}:</span>
      {!isEqual(pokemon.newAbilities, pokemon.oldAbilities) ? (
        <div className="grid grid-flow-row">
          {pokemon.oldAbilities.map((ability, i) => (
            <span className="old" key={i}>
              {toCapitalized(ability)}
            </span>
          ))}{" "}
          {pokemon.newAbilities.map((ability, i) => (
            <span className="new" key={i}>
              {toCapitalized(ability)}
            </span>
          ))}
        </div>
      ) : (
        <div className="flex flex-col">
          {pokemon.newAbilities.map((ability) => (
            <span key={ability}>{toCapitalized(ability)}</span>
          ))}
        </div>
      )}
    </div>
  );
}
