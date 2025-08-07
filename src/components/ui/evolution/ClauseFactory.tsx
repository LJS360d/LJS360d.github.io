import ItemIcon from '../item/ItemIcon';
import PokemonIconComponent from '../shared/PokemonIcon';
import moves from '../../../data/moves.json';
import type { MoveInfo } from '../../../data/types/move';
import { PokemonTypeString } from '../../../data/types/pokemon.types';

const moveData = moves as MoveInfo[];

function getMoveName(move: number) {
  return moveData.find((m) => m.id === move)?.name ?? `MOVE ID: ${move}`;
}

interface ClauseProps {
  method: number;
  clause: number;
}

export default function ClauseFactory(props: ClauseProps) {

  return (
    <div class={'flex gap-2'}>
      <span>{getEvolutionMethodDescription(props.method, props.clause)}</span>
    </div>
  );
}

enum EvolutionMethod {
  EVO_NONE = 65534,
  EVO_FRIENDSHIP = 1,
  EVO_FRIENDSHIP_DAY = 2,
  EVO_FRIENDSHIP_NIGHT = 3,
  EVO_LEVEL = 4,
  EVO_TRADE = 5,
  EVO_TRADE_ITEM = 6,
  EVO_ITEM = 7,
  EVO_LEVEL_ATK_GT_DEF = 8,
  EVO_LEVEL_ATK_EQ_DEF = 9,
  EVO_LEVEL_ATK_LT_DEF = 10,
  EVO_LEVEL_SILCOON = 11,
  EVO_LEVEL_CASCOON = 12,
  EVO_LEVEL_NINJASK = 13,
  EVO_LEVEL_SHEDINJA = 14,
  EVO_BEAUTY = 15,
  EVO_LEVEL_FEMALE = 16,
  EVO_LEVEL_MALE = 17,
  EVO_LEVEL_NIGHT = 18,
  EVO_LEVEL_DAY = 19,
  EVO_LEVEL_DUSK = 20,
  EVO_ITEM_HOLD_DAY = 21,
  EVO_ITEM_HOLD_NIGHT = 22,
  EVO_MOVE = 23,
  EVO_FRIENDSHIP_MOVE_TYPE = 24,
  EVO_MAPSEC = 25,
  EVO_ITEM_MALE = 26,
  EVO_ITEM_FEMALE = 27,
  EVO_LEVEL_RAIN = 28,
  EVO_SPECIFIC_MON_IN_PARTY = 29,
  EVO_LEVEL_DARK_TYPE_MON_IN_PARTY = 30,
  EVO_TRADE_SPECIFIC_MON = 31,
  EVO_SPECIFIC_MAP = 32,
  EVO_LEVEL_NATURE_AMPED = 33,
  EVO_LEVEL_NATURE_LOW_KEY = 34,
  EVO_CRITICAL_HITS = 35,
  EVO_SCRIPT_TRIGGER_DMG = 36,
  EVO_DARK_SCROLL = 37,
  EVO_WATER_SCROLL = 38,
  EVO_ITEM_NIGHT = 39,
  EVO_ITEM_DAY = 40,
  EVO_ITEM_HOLD = 41,
  EVO_LEVEL_FOG = 42,
  EVO_MOVE_TWO_SEGMENT = 43,
  EVO_MOVE_THREE_SEGMENT = 44,
  EVO_LEVEL_FAMILY_OF_THREE = 45,
  EVO_LEVEL_FAMILY_OF_FOUR = 46,
  EVO_USE_MOVE_TWENTY_TIMES = 47,
  EVO_RECOIL_DAMAGE_MALE = 48,
  EVO_RECOIL_DAMAGE_FEMALE = 49,
  EVO_ITEM_COUNT_999 = 50,
  EVO_DEFEAT_THREE_WITH_ITEM = 51,
  EVO_OVERWORLD_STEPS = 52,
}

function getEvolutionMethodDescription(
  method: EvolutionMethod,
  clause: number
) {
  switch (method) {
    case EvolutionMethod.EVO_NONE:
      return 'No evolution method';
    case EvolutionMethod.EVO_FRIENDSHIP:
      return 'At High friendship';
    case EvolutionMethod.EVO_FRIENDSHIP_DAY:
      return 'At High friendship during the day';
    case EvolutionMethod.EVO_FRIENDSHIP_NIGHT:
      return 'At High friendship during the night';
    case EvolutionMethod.EVO_LEVEL_SILCOON:
    case EvolutionMethod.EVO_LEVEL_CASCOON:
    case EvolutionMethod.EVO_LEVEL_NINJASK:
    case EvolutionMethod.EVO_LEVEL:
      return `At level ${clause}`;
    case EvolutionMethod.EVO_TRADE:
      return 'Trade';
    case EvolutionMethod.EVO_TRADE_ITEM:
      return (
        <div class='flex gap-1 items-center'>
          Trade while holding
          <ItemIcon id={clause} />
        </div>
      );
    case EvolutionMethod.EVO_ITEM:
      return (
        <div class='flex gap-1 items-center'>
          Use item
          <ItemIcon id={clause} />
        </div>
      );
    case EvolutionMethod.EVO_LEVEL_ATK_GT_DEF:
      return `At level ${clause}, with Attack greater than Defense`;
    case EvolutionMethod.EVO_LEVEL_ATK_EQ_DEF:
      return `At level ${clause}, with Attack equal to Defense`;
    case EvolutionMethod.EVO_LEVEL_ATK_LT_DEF:
      return `At level ${clause}, with Attack less than Defense`;
    case EvolutionMethod.EVO_LEVEL_SHEDINJA:
      return (
        <div class='flex gap-2 items-center'>
          <span>At level {clause}</span>
          <div class='italic text-xs'>
            <span>with an empty slot in the party</span>
            <span class='flex justify-center items-center'>
              and at least 1 PokéBall in the bag
            </span>
          </div>
        </div>
      );
    case EvolutionMethod.EVO_BEAUTY:
      return `When beauty stat reaches ${clause}`;
    case EvolutionMethod.EVO_LEVEL_FEMALE:
      return `At level ${clause}, if female`;
    case EvolutionMethod.EVO_LEVEL_MALE:
      return `At level ${clause}, if male`;
    case EvolutionMethod.EVO_LEVEL_NIGHT:
      return `At level ${clause}, during the night`;
    case EvolutionMethod.EVO_LEVEL_DAY:
      return `At level ${clause}, during the day`;
    case EvolutionMethod.EVO_LEVEL_DUSK:
      return `At level ${clause}, during dusk`;
    case EvolutionMethod.EVO_ITEM_HOLD_DAY:
      return (
        <div class='flex gap-1 items-center'>
          Level up while holding
          <ItemIcon id={clause} />
          during the day
        </div>
      );
    case EvolutionMethod.EVO_ITEM_HOLD_NIGHT:
      return (
        <div class='flex gap-1 items-center'>
          Level up while holding
          <ItemIcon id={clause} />
          during the night
        </div>
      );
    case EvolutionMethod.EVO_MOVE:
      return (
        <div class='flex gap-1 items-center'>
          Level up having learned
          <b>{getMoveName(clause)}</b>
        </div>
      );
    case EvolutionMethod.EVO_FRIENDSHIP_MOVE_TYPE:
      return (
        <div class='flex gap-1 items-center'>
          At high friendship when knowing a<b>{PokemonTypeString[clause]}</b>
          type move
        </div>
      );
    case EvolutionMethod.EVO_MAPSEC:
      return `Level up in area ${clause}`;
    case EvolutionMethod.EVO_ITEM_MALE:
      return (
        <div class='flex gap-1 items-center'>
          Use item
          <ItemIcon id={clause} />
          to evolve if male
        </div>
      );
    case EvolutionMethod.EVO_ITEM_FEMALE:
      return (
        <div class='flex gap-1 items-center'>
          Use item
          <ItemIcon id={clause} />
          to evolve if female
        </div>
      );
    case EvolutionMethod.EVO_LEVEL_RAIN:
      return `At level ${clause}, during rain`;
    case EvolutionMethod.EVO_SPECIFIC_MON_IN_PARTY:
      return (
        <div class='flex gap-1 items-end mb-1'>
          Level up while
          <PokemonIconComponent species={clause} />
          is in the party
        </div>
      );
    case EvolutionMethod.EVO_LEVEL_DARK_TYPE_MON_IN_PARTY:
      return `At level ${clause}, with a Dark-type Pokémon in the party`;
    case EvolutionMethod.EVO_TRADE_SPECIFIC_MON:
      return (
        <div class='flex gap-1 items-center'>
          Trade with
          <PokemonIconComponent species={clause} />
        </div>
      );
    case EvolutionMethod.EVO_SPECIFIC_MAP:
      return `Evolves in the place ${clause}`;
    case EvolutionMethod.EVO_LEVEL_NATURE_AMPED:
      return `At level ${clause}, if nature is Amped`;
    case EvolutionMethod.EVO_LEVEL_NATURE_LOW_KEY:
      return `At level ${clause}, if nature is Low Key`;
    case EvolutionMethod.EVO_CRITICAL_HITS:
      return `Evolves after landing ${clause} critical hits in the same battle`;
    case EvolutionMethod.EVO_SCRIPT_TRIGGER_DMG:
      return `Evolves taking ${clause} damage`;
    case EvolutionMethod.EVO_DARK_SCROLL:
      return 'Use the Dark Scroll to evolve';
    case EvolutionMethod.EVO_WATER_SCROLL:
      return 'Use the Water Scroll to evolve';
    case EvolutionMethod.EVO_ITEM_NIGHT:
      return (
        <div class='flex gap-1 items-center'>
          Use item
          <ItemIcon id={clause} />
          during the night
        </div>
      );
    case EvolutionMethod.EVO_ITEM_DAY:
      return (
        <div class='flex gap-1 items-center'>
          Use item
          <ItemIcon id={clause} />
          during the day
        </div>
      );
    case EvolutionMethod.EVO_ITEM_HOLD:
      return (
        <div class='flex gap-1 items-center'>
          Level up while holding
          <ItemIcon id={clause} />
        </div>
      );
    case EvolutionMethod.EVO_LEVEL_FOG:
      return `At level ${clause}, during fog`;
    case EvolutionMethod.EVO_MOVE_TWO_SEGMENT:
      return (
        <div class='flex gap-1 items-center'>
          Level up having learned
          <b>{getMoveName(clause)}</b>
        </div>
      );
    case EvolutionMethod.EVO_MOVE_THREE_SEGMENT:
      return (
        <div class='flex gap-1 items-center'>
          Level up having learned
          <b>{getMoveName(clause)}</b>, 1% chance
        </div>
      );
    case EvolutionMethod.EVO_LEVEL_FAMILY_OF_THREE:
      return `At level ${clause}, evolves if in a family of three`;
    case EvolutionMethod.EVO_LEVEL_FAMILY_OF_FOUR:
      return `At level ${clause}, evolves if in a family of four`;
    case EvolutionMethod.EVO_USE_MOVE_TWENTY_TIMES:
      return (
        <div class='flex gap-1 items-center'>
          Evolves after using the move
          <b>{getMoveName(clause)}</b>
          twenty times
        </div>
      );
    case EvolutionMethod.EVO_RECOIL_DAMAGE_MALE:
      return `Evolves after taking ${clause} recoil damage as a male`;
    case EvolutionMethod.EVO_RECOIL_DAMAGE_FEMALE:
      return `Evolves after taking ${clause} recoil damage as a female`;
    case EvolutionMethod.EVO_ITEM_COUNT_999:
      return (
        <div class='flex gap-1 items-center'>
          Have 999 of
          <ItemIcon id={clause} />
          in your bag
        </div>
      );
    case EvolutionMethod.EVO_DEFEAT_THREE_WITH_ITEM:
      return (
        <div class='flex gap-1 items-center'>
          After defeating three Pokémon while holding
          <ItemIcon id={clause} />
        </div>
      );
    case EvolutionMethod.EVO_OVERWORLD_STEPS:
      return `Evolves after taking ${clause} steps in the overworld`;
    default:
      return 'Unknown evolution method';
  }
}
