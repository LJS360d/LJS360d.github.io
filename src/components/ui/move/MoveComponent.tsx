import {
  EffectsEnum,
  MoveTarget,
  getEffectStr,
  type MoveInfo,
} from '../../../models/types/move.info';
import { toCapitalized } from '../../../utils/formatting.utils';
import TypeIcon from '../shared/TypeIcon';
import MoveCategory from './MoveCategoryIcon';

interface MoveComponentProps {
  move: MoveInfo;
}
function MoveComponent({ move }: MoveComponentProps) {
  return (
    <li
      data-move-name={move.name}
      className='cursor-default bg-base-200 rounded-lg flex flex-row justify-start flex-1'>
      <div className='flex flex-col items-start'>
        <h6 className='capitalize'>{toCapitalized(move.name)}</h6>
        <div className='flex flex-row'>
          {move.old && move.type !== move.old?.type ? (
            <div className='flex flex-col'>
              <TypeIcon type={move.type} />
              <TypeIcon type={move.old.type} strikeThrough />
            </div>
          ) : (
            <TypeIcon type={move.type} />
          )}
          {move.old && move.category !== move.old.category ? (
            <>
              <MoveCategory category={move.category} />
              <MoveCategory category={move.old.category} strikeThrough />
            </>
          ) : (
            <MoveCategory category={move.category} />
          )}
        </div>
      </div>
      {move.category !== 'STATUS' && move.power && move.power > 1 && (
        <div className='flex flex-col items-start'>
          <span>Power</span>
          {move.old && move.power !== move.old.power ? (
            <>
              <span className='new'>{move.power}</span>
              <span className='old'>{move.old.power}</span>
            </>
          ) : (
            <span>{move.power}</span>
          )}
        </div>
      )}
      <div className='flex flex-col items-start'>
        <span>Accuracy</span>
        {move.old && move.accuracy !== move.old.accuracy ? (
          <>
            <span className='new'>{move.accuracy}%</span>
            <span className='old'>{move.old.accuracy}%</span>
          </>
        ) : (
          <span>{move.accuracy ? `${move.accuracy}%` : '-'}</span>
        )}
      </div>
      {move.target !== MoveTarget.SINGLE && (
        <div className='flex flex-col items-start'>
          <span>Target</span>
          {move.old && move.target !== move.old.target ? (
            <>
              <span className='new'>
                {MoveTarget[move.target] ?? move.target}
              </span>
              <span className='old'>
                {MoveTarget[move.old.target] ?? move.old.target}
              </span>
            </>
          ) : (
            <span>{MoveTarget[move.target] ?? move.target}</span>
          )}
        </div>
      )}
      {move.priority && move?.priority > 0 && (
        <div className='flex flex-col items-start'>
          <span>Priority</span>
          {move.old && move.priority !== move.old.priority ? (
            <>
              <span className='new'>{move.priority}</span>
              <span className='old'>{move.old.priority}</span>
            </>
          ) : (
            <span>{move.priority}</span>
          )}
        </div>
      )}
      {move.recoil && move.recoil > 0 && (
        <div className='flex flex-col items-start'>
          <span>Recoil</span>
          {move.old && move.recoil !== move.old.recoil ? (
            <>
              <span className='new'>{move.recoil}%</span>
              <span className='old'>{move.old.recoil}%</span>
            </>
          ) : (
            <span>{move.recoil}%</span>
          )}
        </div>
      )}
      {move.effect !== 'EFFECT_HIT' && (
        <div className='flex flex-col items-start'>
          <span>Effect</span>
          {move.old && move.effect !== move.old.effect ? (
            <>
              <span className='new w-fit'>{getEffectStr(move.effect)}</span>
              <span className='old w-fit'>{getEffectStr(move.old.effect)}</span>
            </>
          ) : (
            <span className='w-fit'>{getEffectStr(move.effect)}</span>
          )}
        </div>
      )}
      {move.additionalEffects && (
        <>
          <div className='flex flex-col items-start'>
            <span>Effect</span>
            {move.old &&
            move.old.additionalEffects?.moveEffect !==
              move.additionalEffects.moveEffect ? (
              <>
                <span className='new'>
                  {getEffectStr(move.additionalEffects.moveEffect)}
                </span>
                <span className='old'>
                  {getEffectStr(move.old.additionalEffects?.moveEffect)}
                </span>
              </>
            ) : (
              <span>{getEffectStr(move.additionalEffects.moveEffect)}</span>
            )}
          </div>
          <div className='flex flex-col items-start'>
            <span>Effect chance</span>
            {move.old &&
            move.old.additionalEffects?.chance !==
              move.additionalEffects.chance ? (
              <>
                <span className='new'>{move.additionalEffects.chance}%</span>
                <span className='old'>
                  {move.old.additionalEffects?.chance}%
                </span>
              </>
            ) : (
              <span>{move.additionalEffects.chance}%</span>
            )}
          </div>
        </>
      )}
    </li>
  );
}

export default MoveComponent;
