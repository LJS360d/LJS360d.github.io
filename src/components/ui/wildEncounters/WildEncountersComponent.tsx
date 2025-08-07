import { pokemon } from '../../../data';
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
function WildEncountersComponent({ encounters }: WildEncountersProps) {
  return (
    <li data-search={getWildEncountersSearchString(encounters)} class='bg-base-200'>
      <section>
        <h1 class='stat-title'>{toCapitalized(encounters.locationName)}</h1>
      </section>
      <div class='grid grid-flow-row'>
        <EncountersGroup monsInfo={encounters.landMonsInfo} label='Land' />
        <EncountersGroup
          monsInfo={encounters.rockSmashMonsInfo}
          label='Rock Smash'
        />
        <EncountersGroup monsInfo={encounters.waterMonsInfo} label='Water' />
        <EncountersGroup
          monsInfo={encounters.fishingMonsInfo}
          label='Fishing'
        />
      </div>
    </li>
  );
}

function getWildEncountersSearchString(encounters: WildEncounters) {
  const monsSet = new Set<string>([
    ...(encounters.landMonsInfo?.wildPokemon.map(
      (mon) => pokemon[mon.species - 1].speciesName
    ) ?? []),
    ...(encounters.waterMonsInfo?.wildPokemon.map(
      (mon) => pokemon[mon.species - 1].speciesName
    ) ?? []),
    ...(encounters.fishingMonsInfo?.wildPokemon.map(
      (mon) => pokemon[mon.species - 1].speciesName
    ) ?? []),
    ...(encounters.rockSmashMonsInfo?.wildPokemon.map(
      (mon) => pokemon[mon.species - 1].speciesName
    ) ?? []),
  ]);
  return Array.from(monsSet).join(' ').toUpperCase();
}

interface EncountersGroupProps {
  monsInfo: MonsInfo | null;
  label: string;
}

function EncountersGroup({ monsInfo, label }: EncountersGroupProps) {
  if (!monsInfo?.wildPokemon.length) {
    return null;
  }

  return (
    <section class='flex flex-wrap items-center'>
      <h2 class='w-20'>{label}</h2>
      <span class='w-24'>{monsInfo.encounterRate} %</span>
      {monsInfo.wildPokemon.map((mon, i) => (
        <PokemonIconComponent size={48} key={i} species={mon.species} />
      ))}
    </section>
  );
}

export default WildEncountersComponent;
