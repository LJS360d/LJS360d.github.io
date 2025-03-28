import type { LearnsetInfo } from '../../../models/types/learnset.info';
import { toCapitalized } from '../../../utils/formatting.utils';
import movesRaw from '../../../data/moves.json';
import type { MoveInfo } from '../../../models/types/move.info';
interface LearnsetInfoProps {
  learnset: LearnsetInfo;
}

const moves = movesRaw as MoveInfo[];
export default function LearnsetComponent({ learnset }: LearnsetInfoProps) {
  const levelUpLearnset = learnset.levelUpLearnset ?? [];
  return (
    <div className='overflow-auto max-h-44 sb-base'>
      <table className='table-zebra table-xs'>
        <thead>
          <tr>
            <th>Lvl</th>
            <th>Move</th>
          </tr>
        </thead>
        <tbody>
          {levelUpLearnset.map((move, i) => (
            <tr key={i}>
              <td>{move.level}</td>
              <td>{toCapitalized(moves.find((m) => m.id === move.move)?.name ?? "")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
