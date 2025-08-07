import type {
  MonsInfo,
  WildEncounters,
} from '../../../data/types/wild_encounters';
import { toCapitalized } from '../../../utils/formatting.utils';
import PokemonIconComponent from '../shared/PokemonIcon';

interface WildEncountersProps {
  encounters: WildEncounters;
}
// TODO diffing
function WildEncountersComponent(props: WildEncountersProps) {
  return (
    <li class='bg-base-200'>
      <section>
        <h1 class='stat-title'>{toCapitalized(props.encounters.locationName)}</h1>
      </section>
      <div class='grid grid-flow-row'>
        <EncountersGroup monsInfo={props.encounters.landMonsInfo} label='Land' />
        <EncountersGroup
          monsInfo={props.encounters.rockSmashMonsInfo}
          label='Rock Smash'
        />
        <EncountersGroup monsInfo={props.encounters.waterMonsInfo} label='Water' />
        <EncountersGroup
          monsInfo={props.encounters.fishingMonsInfo}
          label='Fishing'
        />
      </div>
    </li>
  );
}

interface EncountersGroupProps {
  monsInfo: MonsInfo | null;
  label: string;
}

function EncountersGroup(props: EncountersGroupProps) {
  if (!props.monsInfo?.wildPokemon.length) {
    return null;
  }

  return (
    <section class='flex flex-wrap items-center'>
      <h2 class='w-20'>{props.label}</h2>
      <span class='w-24'>{props.monsInfo.encounterRate} %</span>
      {props.monsInfo.wildPokemon.map((mon) => (
        <PokemonIconComponent size={48} species={mon.species} />
      ))}
    </section>
  );
}

export default WildEncountersComponent;
