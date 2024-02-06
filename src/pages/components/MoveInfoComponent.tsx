import { Effects } from '@/types/EffectsRecord';
import { MoveInfo } from '@/types/MoveInfo';
import { Types } from '@/types/Types';

import TypeIcon from './TypeIcon';

interface moveInfoProps {
  entry: MoveInfo;
}
function MoveInfoComponent({ entry }: moveInfoProps) {
  const moveName = entry.name?.replace(/_/g, " ").toLowerCase();
  const oldType = entry.oldType?.replace(/TYPE_/g, "").toLowerCase() as Types;
  const newType = entry.newType?.replace(/TYPE_/g, "").toLowerCase() as Types;
  const type = entry.type?.replace(/TYPE_/g, "").toLowerCase() as Types;
  return (
    <li className="move-info">
      <div>
        <span className="bold">{moveName}</span>
        {entry.newType && (
          <div>
            <TypeIcon type={oldType} strikeThrough></TypeIcon>
            <TypeIcon type={newType}></TypeIcon>
          </div>
        )}
        {entry.type && <TypeIcon type={type}></TypeIcon>}
      </div>
      {entry.newPower && (
        <div>
          BP:
          <span className="st red">{entry.oldPower}</span>
          <span className="green bold">{entry.newPower}</span>
        </div>
      )}
      {entry.newAccuracy && (
        <div>
          Accuracy:
          <span className="st red">{entry.oldAccuracy}%</span>
          <span className="green bold">{entry.newAccuracy}%</span>
        </div>
      )}
      {entry.newEffect && (
        <div>
          Effect:
          <span className="st red">{Effects[entry.oldEffect!]}</span>
          <span className="green bold">{Effects[entry.newEffect]}</span>
        </div>
      )}
      {entry.newSecondaryEffectChance && (
        <div>
          Effect Chance:
          <span className="st red">{entry.oldSecondaryEffectChance}%</span>
          <span className="green bold">{entry.newSecondaryEffectChance}%</span>
        </div>
      )}
    </li>
  );
}

export default MoveInfoComponent;
