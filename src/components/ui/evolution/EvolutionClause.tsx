import { MdEast } from 'react-icons/md';
import { Fragment } from 'react/jsx-runtime';
import type { EvolutionMethod } from '../../../models/types/evolution.info';
import Clause from './ClauseFactory';

interface EvolutionClauseProps {
  evo: EvolutionMethod[];
}

function EvolutionClause({ evo }: EvolutionClauseProps) {
  return (
    <div className='flex flex-col justify-end items-center relative'>
      {evo.map((e, i) => (
        <Fragment key={i}>
          {i > 0 && <span className='italic text-xs mt-1'>OR</span>}
          <Clause method={e.method} clause={e.clause} />
        </Fragment>
      ))}
      <MdEast />
    </div>
  );
}
export default EvolutionClause;
