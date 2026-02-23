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
function MoveComponent(props: MoveComponentProps) {
  return (
    <li class='cursor-default bg-base-200 rounded-lg flex flex-row justify-start  flex-1'>
      <div class='flex flex-col items-start'>
        <h6 class='capitalize'>{toCapitalized(props.move.name)}</h6>
        <div class='flex flex-row gap-1'>
          {props.move.old && props.move.type !== props.move.old?.type ? (
            <div class='flex flex-col gap-1'>
              <TypeIcon type={props.move.type} />
              <TypeIcon type={props.move.old.type} strikeThrough />
            </div>
          ) : (
            <TypeIcon type={props.move.type} />
          )}
          {props.move.old && props.move.category !== props.move.old.category ? (
            <div class='flex flex-col gap-1'>
              <MoveCategory type={props.move.type} category={props.move.category} />
              <MoveCategory type={props.move.old.type} category={props.move.old.category} strikeThrough />
            </div>
          ) : (
            <MoveCategory type={props.move.type} category={props.move.category} />
          )}
        </div>
      </div>
      {props.move.category !== MoveCategoryEnum.STATUS && props.move.power > 1 && (
        <div class='flex flex-col items-start'>
          <span>Power</span>
          {props.move.old && props.move.power !== props.move.old.power ? (
            <>
              <span class='new'>{props.move.power}</span>
              <span class='old'>{props.move.old.power}</span>
            </>
          ) : (
            <span>{props.move.power}</span>
          )}
        </div>
      )}
      <div class='flex flex-col items-start'>
        <span>Accuracy</span>
        {props.move.old && props.move.accuracy !== props.move.old.accuracy ? (
          <>
            <span class='new'>{props.move.accuracy}%</span>
            <span class='old'>{props.move.old.accuracy}%</span>
          </>
        ) : (
          <span>{props.move.accuracy ? `${props.move.accuracy}%` : '-'}</span>
        )}
      </div>
      {props.move.target !== MoveTarget.SELECTED && (
        <div class='flex flex-col items-start'>
          <span>Target</span>
          {props.move.old && props.move.target !== props.move.old.target ? (
            <>
              <span class='new'>
                {MoveTarget[props.move.target] ?? props.move.target}
              </span>
              <span class='old'>
                {MoveTarget[props.move.old.target] ?? props.move.old.target}
              </span>
            </>
          ) : (
            <span>{MoveTarget[props.move.target] ?? props.move.target}</span>
          )}
        </div>
      )}
      {props.move.priority > 0 && (
        <div class='flex flex-col items-start'>
          <span>Priority</span>
          {props.move.old && props.move.priority !== props.move.old.priority ? (
            <>
              <span class='new'>{props.move.priority}</span>
              <span class='old'>{props.move.old.priority}</span>
            </>
          ) : (
            <span>{props.move.priority}</span>
          )}
        </div>
      )}
      {props.move.recoil > 0 && (
        <div class='flex flex-col items-start'>
          <span>Recoil</span>
          {props.move.old && props.move.recoil !== props.move.old.recoil ? (
            <>
              <span class='new'>{props.move.recoil}%</span>
              <span class='old'>{props.move.old.recoil}%</span>
            </>
          ) : (
            <span>{props.move.recoil}%</span>
          )}
        </div>
      )}
      {props.move.effect !== 1 && (
        <div class='flex flex-col items-start'>
          <span>Effect</span>
          {props.move.old && props.move.effect !== props.move.old.effect ? (
            <>
              <span class='new w-fit'>{getEffectStr(props.move.effect)}</span>
              <span class='old w-fit'>{getEffectStr(props.move.old.effect)}</span>
            </>
          ) : (
            <span class='w-fit'>{getEffectStr(props.move.effect)}</span>
          )}
        </div>
      )}
      {!!props.move.additionalEffects?.length && (
        <>
          {props.move.additionalEffects.map((effect, index) => (
            <div>
              <div class='flex flex-col items-start'>
                <span>Secondary Effect</span>
                {props.move.old?.additionalEffects?.[index]?.moveEffect !==
                  effect.moveEffect ? (
                  <>
                    <span class='new'>
                      {getEffectStr(effect.moveEffect)}
                    </span>
                    <span class='old'>
                      {getEffectStr(
                        props.move.old?.additionalEffects?.[index]?.moveEffect
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
                  {props.move.old?.additionalEffects?.[index]?.chance !==
                    effect.chance ? (
                    <>
                      <span class='new'>{effect.chance}%</span>
                      <span class='old'>
                        {props.move.old?.additionalEffects?.[index]?.chance}%
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
