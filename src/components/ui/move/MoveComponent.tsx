import {
  EffectsEnum,
  type MoveData,
  TargetsEnum,
} from "../../../models/types/move.data";
import TypeIcon from "../shared/TypeIcon";
import MoveCategory from "./MoveCategoryIcon";
import { toCapitalized } from "../../../utils/formatting.utils";

interface MoveComponentProps {
  move: MoveData;
}
function MoveComponent({ move }: MoveComponentProps) {
  return (
    <li className="cursor-default bg-base-200 rounded-lg flex flex-row justify-start flex-1">
      <div className="flex flex-col items-start">
        <h6 className="capitalize">{toCapitalized(move.name)}</h6>
        <div className="flex flex-row">
          {move.oldType !== move.newType ? (
            <div className="flex flex-col">
              <TypeIcon type={move.newType} />
              <TypeIcon type={move.oldType} strikeThrough />
            </div>
          ) : (
            <TypeIcon type={move.newType} />
          )}
          {move.oldCategory !== move.newCategory ? (
            <>
              <MoveCategory category={move.newCategory} />
              <MoveCategory category={move.oldCategory} strikeThrough />
            </>
          ) : (
            <MoveCategory category={move.newCategory} />
          )}
        </div>
      </div>

      <div className="flex flex-col items-start">
        <span>Power</span>
        {move.oldPower !== move.newPower ? (
          <>
            <span className="new">{move.newPower}</span>
            <span className="old">{move.oldPower}</span>
          </>
        ) : (
          <span>{move.newPower}</span>
        )}
      </div>
      <div className="flex flex-col items-start">
        <span>Accuracy</span>
        {move.oldAccuracy !== move.newAccuracy ? (
          <>
            <span className="new">{move.newAccuracy}%</span>
            <span className="old">{move.oldAccuracy}%</span>
          </>
        ) : (
          <span>{move.newAccuracy ? `${move.newAccuracy}%` : "-"}</span>
        )}
      </div>
      {move.newTarget !== "SINGLE" && (
        <div className="flex flex-col items-start">
          <span>Target</span>
          {move.oldTarget !== move.newTarget ? (
            <>
              <span className="new">
                {TargetsEnum[move.newTarget] ?? move.newTarget}
              </span>
              <span className="old">
                {TargetsEnum[move.oldTarget] ?? move.oldTarget}
              </span>
            </>
          ) : (
            <span>{TargetsEnum[move.newTarget] ?? move.newTarget}</span>
          )}
        </div>
      )}
      {move.newPriority > 0 && (
        <div className="flex flex-col items-start">
          <span>Priority</span>
          {move.oldPriority !== move.newPriority ? (
            <>
              <span className="new">{move.newPriority}</span>
              <span className="old">{move.oldPriority}</span>
            </>
          ) : (
            <span>{move.newPriority}</span>
          )}
        </div>
      )}
      {move.newEffect !== "HIT" && (
        <div className="flex flex-col items-start">
          <span>Effect</span>
          {move.oldEffect !== move.newEffect ? (
            <>
              <span className="new w-fit">
                {EffectsEnum[move.newEffect] ?? move.newEffect}
              </span>
              <span className="old w-fit">
                {EffectsEnum[move.oldEffect] ?? move.oldEffect}
              </span>
            </>
          ) : (
            <span className="w-fit">
              {EffectsEnum[move.newEffect] ?? move.newEffect}
            </span>
          )}
        </div>
      )}
      {move.newEffectChance > 0 && (
        <div className="flex flex-col items-start">
          <span>Effect Chance</span>
          {move.oldEffectChance !== move.newEffectChance ? (
            <>
              <span className="new">{move.newEffectChance}%</span>
              <span className="old">{move.oldEffectChance}%</span>
            </>
          ) : (
            <span>{move.newEffectChance}%</span>
          )}
        </div>
      )}
    </li>
  );
}

export default MoveComponent;
