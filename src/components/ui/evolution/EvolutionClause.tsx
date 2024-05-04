import { MdEast } from 'react-icons/md';
import { EvolutionMethods } from '../../../models/static/records';
import type { EvolutionMethod } from '../../../models/types/evolution.info';
import Clause from './clauses/clause.factory';

interface EvolutionClauseProps {
  evo: EvolutionMethod[];
}

function EvolutionClause({ evo }: EvolutionClauseProps) {
  return (
    <div className='flex flex-col justify-end items-center relative'>
      {evo.map((e, i) => (
        <>
          {i > 0 && <span className='italic text-xs mt-1'>OR</span>}
          <div className='flex gap-2'>
            <span className='text-sm'>
              {EvolutionMethods[e.method.replace('EVO_', '')] ?? e.method}
            </span>
            <Clause clause={e.clause} />
          </div>
        </>
      ))}
      <MdEast />
    </div>
  );
}
export default EvolutionClause;
