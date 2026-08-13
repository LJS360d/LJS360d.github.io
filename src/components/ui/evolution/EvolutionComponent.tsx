import type {
  EvolutionOutcome,
  EvolutionPath,
  EvolutionTree
} from '../../../data/types/evolution';
import PokemonSpriteComponent from '../shared/PokemonSprite';
import EvolutionClause from './EvolutionClause';

interface EvolutionProps {
  evolution: EvolutionTree;
  searchKey?: string;
}

export default function EvolutionTreeComponent({
  evolution,
  searchKey
}: EvolutionProps) {
  // Indexed once so `renderBranches` is a lookup rather than a scan per outcome.
  const pathsByFrom = new Map<number, EvolutionPath[]>();
  for (const path of evolution.evolutions) {
    const existing = pathsByFrom.get(path.from);
    if (existing) existing.push(path);
    else pathsByFrom.set(path.from, [path]);
  }

  const roots = flattenEvolutions(evolution.evolutions);

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
    const branches = pathsByFrom.get(outcome.species);
    return branches?.length ? (
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
      data-s={searchKey}
      class='cursor-default bg-base-200 rounded-lg flex flex-col justify-start flex-1 p-2'>
      <div class='flex items-center'>
        {roots.map((evo) => (
          <div class='flex items-center gap-6'>{renderEvolutionPath(evo)}</div>
        ))}
      </div>
    </li>
  );
}

function flattenEvolutions(evolutions: EvolutionPath[]) {
  const reachable = new Set<number>();
  for (const path of evolutions) {
    for (const outcome of path.to) reachable.add(outcome.species);
  }
  return evolutions.filter((e) => !reachable.has(e.from));
}
