import {
  getEffectStr,
  MoveCategory as MoveCategoryEnum,
  MoveTarget,
  type MoveInfo,
} from '../../../data/types/move';
import { toCapitalized } from '../../../utils/formatting.utils';
import TypeIcon from '../shared/TypeIcon';
import MoveCategory from './MoveCategoryIcon';

interface MoveComponentProps {
  move: MoveInfo;
}
function MoveComponent({ move }: MoveComponentProps) {
  return (
    <li
      data-move-name={move.name.toUpperCase()}
      class='cursor-default bg-base-200 rounded-lg flex flex-row justify-start flex-1'>
      <div class='flex flex-col items-start'>
        <h6 class='capitalize'>{toCapitalized(move.name)}</h6>
        <div class='flex flex-row gap-1'>
          {move.old && move.type !== move.old?.type ? (
            <div class='flex flex-col gap-1'>
              <TypeIcon type={move.type} />
              <TypeIcon type={move.old.type} strikeThrough />
            </div>
          ) : (
            <TypeIcon type={move.type} />
          )}
          {move.old && move.category !== move.old.category ? (
            <div class='flex flex-col gap-1'>
              <MoveCategory type={move.type} category={move.category} />
              <MoveCategory type={move.old.type} category={move.old.category} strikeThrough />
            </div>
          ) : (
            <MoveCategory type={move.type} category={move.category} />
          )}
        </div>
      </div>
      {move.category !== MoveCategoryEnum.STATUS && move.power > 1 && (
        <div class='flex flex-col items-start'>
          <span>Power</span>
          {move.old && move.power !== move.old.power ? (
            <>
              <span class='new'>{move.power}</span>
              <span class='old'>{move.old.power}</span>
            </>
          ) : (
            <span>{move.power}</span>
          )}
        </div>
      )}
      <div class='flex flex-col items-start'>
        <span>Accuracy</span>
        {move.old && move.accuracy !== move.old.accuracy ? (
          <>
            <span class='new'>{move.accuracy}%</span>
            <span class='old'>{move.old.accuracy}%</span>
          </>
        ) : (
          <span>{move.accuracy ? `${move.accuracy}%` : '-'}</span>
        )}
      </div>
      {move.target !== MoveTarget.SELECTED && (
        <div class='flex flex-col items-start'>
          <span>Target</span>
          {move.old && move.target !== move.old.target ? (
            <>
              <span class='new'>
                {MoveTarget[move.target] ?? move.target}
              </span>
              <span class='old'>
                {MoveTarget[move.old.target] ?? move.old.target}
              </span>
            </>
          ) : (
            <span>{MoveTarget[move.target] ?? move.target}</span>
          )}
        </div>
      )}
      {move.priority > 0 && (
        <div class='flex flex-col items-start'>
          <span>Priority</span>
          {move.old && move.priority !== move.old.priority ? (
            <>
              <span class='new'>{move.priority}</span>
              <span class='old'>{move.old.priority}</span>
            </>
          ) : (
            <span>{move.priority}</span>
          )}
        </div>
      )}
      {move.recoil > 0 && (
        <div class='flex flex-col items-start'>
          <span>Recoil</span>
          {move.old && move.recoil !== move.old.recoil ? (
            <>
              <span class='new'>{move.recoil}%</span>
              <span class='old'>{move.old.recoil}%</span>
            </>
          ) : (
            <span>{move.recoil}%</span>
          )}
        </div>
      )}
      {move.effect !== 1 && (
        <div class='flex flex-col items-start'>
          <span>Effect</span>
          {move.old && move.effect !== move.old.effect ? (
            <>
              <span class='new w-fit'>{getEffectStr(move.effect)}</span>
              <span class='old w-fit'>{getEffectStr(move.old.effect)}</span>
            </>
          ) : (
            <span class='w-fit'>{getEffectStr(move.effect)}</span>
          )}
        </div>
      )}
      {!!move.additionalEffects?.length && (
        <>
          {move.additionalEffects.map((effect, index) => (
            <div key={index}>
              <div class='flex flex-col items-start'>
                <span>Secondary Effect</span>
                {move.old?.additionalEffects?.[index]?.moveEffect !==
                effect.moveEffect ? (
                  <>
                    <span class='new'>
                      {getEffectStr(effect.moveEffect)}
                    </span>
                    <span class='old'>
                      {getEffectStr(
                        move.old?.additionalEffects?.[index]?.moveEffect
                      )}
                    </span>
                  </>
                ) : (
                  <span>{getEffectStr(effect.moveEffect)}</span>
                )}
              </div>

              {!!effect.chance && (
                <div class='flex flex-col items-start'>
                  <span>Effect chance</span>
                  {move.old?.additionalEffects?.[index]?.chance !==
                  effect.chance ? (
                    <>
                      <span class='new'>{effect.chance}%</span>
                      <span class='old'>
                        {move.old?.additionalEffects?.[index]?.chance}%
                      </span>
                    </>
                  ) : (
                    <span>{effect.chance}%</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </li>
  );
}

export default MoveComponent;
