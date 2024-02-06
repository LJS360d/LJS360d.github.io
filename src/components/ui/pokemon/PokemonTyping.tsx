import type { PokemonData } from "../../../models/types/pokemon.data";
import TypeIcon from "../shared/TypeIcon";
import lodash from "lodash";
const { isEqual } = lodash;

interface TypeBarProps {
  pokemon: PokemonData;
}

function PokemonTyping({ pokemon }: TypeBarProps) {
  const shouldShowOldTypes = !isEqual(pokemon.newTypes, pokemon.oldTypes);
  const activeTypes = shouldShowOldTypes ? pokemon.newTypes : pokemon.oldTypes;

  return (
    <div className="flex flex-col gap-2">
      <span className="mr-2">Type:</span>
      {shouldShowOldTypes && (
        <div className="flex flex-row items-center">
          <div className="flex flex-wrap gap-2">
            {pokemon.oldTypes.map((type, i) => (
              <TypeIcon key={i} type={type} strikeThrough />
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-row items-center">
        <div className="flex flex-wrap gap-2">
          {activeTypes.map((type, i) => (
            <TypeIcon key={i} type={type} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PokemonTyping;
