import MdEast from '~icons/material-symbols/east';
import type { EvolutionMethod } from '../../../data/types/evolution';
import Clause from './ClauseFactory';
import { For } from 'solid-js';

interface EvolutionClauseProps {
  evo: EvolutionMethod[];
}

function EvolutionClause(props: EvolutionClauseProps) {
  return (
    <div class='flex flex-col justify-end items-center relative'>
      <For each={props.evo}>
        {(evo, i) => (
          <>
            {i() > 0 && <span class='italic text-xs mt-1'>OR</span>}
            <Clause method={evo.method} clause={evo.clause} />
          </>
        )}
      </For>
      <MdEast />
    </div>
  );
}
export default EvolutionClause;
