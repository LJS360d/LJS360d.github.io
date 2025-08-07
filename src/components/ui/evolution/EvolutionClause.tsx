import MdEast from '~icons/material-symbols/east';
import type { EvolutionMethod } from '../../../data/types/evolution';
import Clause from './ClauseFactory';

interface EvolutionClauseProps {
  evo: EvolutionMethod[];
}

function EvolutionClause({ evo }: EvolutionClauseProps) {
  return (
    <div class='flex flex-col justify-end items-center relative'>
      {evo.map((e, i) => (
        <div>
          {i > 0 && <span class='italic text-xs mt-1'>OR</span>}
          <Clause method={e.method} clause={e.clause} />
        </div>
      ))}
      <MdEast />
    </div>
  );
}
export default EvolutionClause;
