import type { LearnsetInfo } from "../../../models/types/LearnsetInfo";

import type { PokemonData } from "../../../models/types/pokemon.data";
import PokemonSprite from "../shared/PokemonSprite";
import AbilitiesBar from "./PokemonAbilities";
import StatBar from "./PokemonStats";
import TypeBar from "./PokemonTyping";

interface PokemonComponentProps {
  pokemon: PokemonData;
  learnset?: LearnsetInfo;
}
function PokemonComponent({ pokemon, learnset }: PokemonComponentProps) {
  return (
    <li className="cursor-default bg-base-200 rounded-lg flex flex-row justify-start flex-1">
      {/* left */}
      <div className="cursor-default flex flex-row flex-1">
        <PokemonSprite pokemon={pokemon} />
        <StatBar pokemon={pokemon} />
        <div className="flex gap-4">
          <AbilitiesBar pokemon={pokemon} />
          <TypeBar pokemon={pokemon} />
        </div>
      </div>
      {/* right */}
      {/* <div>
        <div className='w-[48rem]'>
          {learnset && <LearnsetInfoComponent learnset={learnset} />}
        </div>
      </div> */}
    </li>
  );
}

export default PokemonComponent;
