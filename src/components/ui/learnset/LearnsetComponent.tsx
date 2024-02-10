import type { LearnsetData } from "../../../models/types/learnset.data";
import { toCapitalized } from "../../../utils/formatting.utils";

interface LearnsetInfoProps {
  learnset: LearnsetData;
}

export default function LearnsetComponent({ learnset }: LearnsetInfoProps) {
  const moves = learnset.moves;
  return (
    <div className="overflow-auto max-h-44 sb-base">
      <table className="table-zebra table-xs">
        <thead>
          <tr>
            <th>Lvl</th>
            <th>Move</th>
          </tr>
        </thead>
        <tbody>
          {moves.map((move) => (
            <tr key={move.level}>
              <td>{move.level}</td>
              <td>{toCapitalized(move.move)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
