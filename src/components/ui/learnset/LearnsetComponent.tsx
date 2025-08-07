import { createMemo, For } from 'solid-js';
import { moves } from '../../../data';
import type { Learnset } from '../../../data/types/learnset';
import { toCapitalized } from '../../../utils/formatting.utils';

interface LearnsetInfoProps {
  learnset: Learnset;
}

export default function LearnsetComponent(props: LearnsetInfoProps) {
  const levelUpLearnset = createMemo(() => props.learnset.levelUpLearnset ?? []);
  return (
    <div class='overflow-auto max-h-44 sb-base'>
      <table class='table-zebra table-xs'>
        <thead>
          <tr>
            <th>Lvl</th>
            <th>Move</th>
          </tr>
        </thead>
        <tbody>
          <For each={levelUpLearnset()}>
            {(move) => (
              <tr>
                <td>{move.level}</td>
                <td>
                  {toCapitalized(
                    moves.find((m) => m.id === move.move)?.name ?? ''
                  )}
                </td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  );
}
