import { Effects } from '@/types/EffectsRecord';
import { MoveInfo } from '@/types/MoveInfo';

interface moveInfoProps {
  entry: MoveInfo;
}
function MoveInfoComponent({ entry }: moveInfoProps) {
  const moveName = entry.name?.replace(/_/g, " ").toLowerCase();
  return (
    <li className="move-info">
      <div>
        <span className="move-name">{moveName}</span>
        {entry.newType && (
          <div>
            <span className="st red">{entry.oldType}</span>
            <span className="green bold">{entry.newType}</span>
          </div>
        )}
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
