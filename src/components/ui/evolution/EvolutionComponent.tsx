import type {
  EvolutionOutcome,
  EvolutionPath,
  EvolutionTree
} from '../../../data/types/evolution';
import PokemonSpriteComponent from '../shared/PokemonSprite';
import EvolutionClause from './EvolutionClause';

interface EvolutionProps {
  evolution: EvolutionTree;
}

export default function EvolutionTreeComponent({ evolution }: EvolutionProps) {
  const evos = flattenEvolutions(evolution.evolutions);
  const renderEvolutionPath = (path: EvolutionPath, prev = true) => (
    <>
      {prev && <PokemonSpriteComponent species={path.from} />}
      <div class='flex flex-col'>
        {path.to.map((to) => (
          <div class='flex items-center gap-6'>
            <EvolutionClause evo={to.methods} />
            <PokemonSpriteComponent species={to.species} />
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
      <div class='flex flex-col'>
        {branches.map((branch) => (
          <div class='ml-4 flex flex-col'>
            {renderEvolutionPath(branch, false)}
          </div>
        ))}
      </div>
    ) : null;
  };

  return (
    <li
      class='cursor-default bg-base-200 rounded-lg flex flex-col justify-start flex-1 p-2'>
      <div class='flex items-center'>
        {evos.map((evo) => (
          <div class='flex items-center gap-6'>
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


