import type {
  EvolutionInfo,
  EvolutionOutcome,
  EvolutionPath,
  EvolutionTree,
} from '../../../models/types/evolution.info';
import PokemonSpriteComponent from '../shared/PokemonSprite';
import EvolutionClause from './EvolutionClause';
import pokemon from '../../../data/pokemon.json';
import type { PokemonInfo } from '../../../models/types/pokemon.info';
const pokemonData = pokemon as PokemonInfo[];

interface EvolutionProps {
  evolution: EvolutionInfo;
}

export default function EvolutionTreeComponent({ evolution }: EvolutionProps) {
  const evos = flattenEvolutions(evolution.evolutions);
  const search = getEvolutionTreeSearchString(evolution);
  const renderEvolutionPath = (path: EvolutionPath, prev = true) => (
    <>
      {prev && <PokemonSpriteComponent species={path.from - 1} />}
      <div className='flex flex-col'>
        {path.to.map((to, i) => (
          <div key={i} className='flex items-center gap-6'>
            <EvolutionClause evo={to.methods} />
            <PokemonSpriteComponent species={to.species - 1} />
            {renderBranches(to)}
          </div>
        ))}
      </div>
    </>
  );

  const renderBranches = (outcome: EvolutionOutcome) => {
    const branches = evolution.evolutions.filter(
      (e) => e.from === outcome.species
    );
    return branches.length ? (
      <div className='flex flex-col'>
        {branches.map((branch, index) => (
          <div key={index} className='ml-4 flex flex-col'>
            {renderEvolutionPath(branch, false)}
          </div>
        ))}
      </div>
    ) : null;
  };

  return (
    <li
      data-evolution-name={search}
      className='cursor-default bg-base-200 rounded-lg flex flex-col justify-start flex-1 p-2'>
      <div className='flex items-center'>
        {evos.map((evo, index) => (
          <div key={index} className='flex items-center gap-6'>
            {renderEvolutionPath(evo)}
          </div>
        ))}
      </div>
    </li>
  );
}

function flattenEvolutions(evolutions: EvolutionPath[]) {
  const roots = evolutions.filter(
    (e) => !evolutions.some((ev) => ev.to.some((t) => t.species === e.from))
  );
  return roots;
}

function getEvolutionTreeSearchString(evolution: EvolutionTree) {
  return `${pokemonData.find((p) => p.id === (evolution.family - 1))?.speciesName.toUpperCase()}-${evolution.evolutions
    .map((e) => `${e.to.map((t) => pokemonData.find((p) => p.id === (t.species - 1))?.speciesName.toUpperCase()).join(' ')}`)
    .join(' ')}`;
}
