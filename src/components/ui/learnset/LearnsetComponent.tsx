import type { LearnsetInfo } from '../../../models/types/learnset.info';
import { toCapitalized } from '../../../utils/formatting.utils';

interface LearnsetInfoProps {
  learnset: LearnsetInfo;
}

export default function LearnsetComponent({ learnset }: LearnsetInfoProps) {
  const moves = learnset.levelUpLearnset ?? [];
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
          {moves.map((move, i) => (
            <tr key={i}>
              <td>{move.level}</td>
              <td>{toCapitalized(move.move)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
