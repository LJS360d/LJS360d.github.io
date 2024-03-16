import type { EvolutionData } from '../../../models/types/evolution.data';
import type { PokemonSprite } from '../../../models/types/pokemon.sprite';
import { MdEast } from 'react-icons/md';
import PokemonSpriteComponent from '../shared/PokemonSprite';
import EvolutionClause from './EvolutionClause';
import EvolutionMethod from './EvolutionMethod';

interface EvolutionProps {
  evolution: EvolutionData;
}
export default function EvolutionComponent({ evolution }: EvolutionProps) {
  const evos = [...evolution.newTo];
  function isPokemonSprite(
    evoOrFinalMon: unknown
  ): evoOrFinalMon is PokemonSprite {
    if (typeof evoOrFinalMon === 'object' && evoOrFinalMon !== null) {
      const sprite = evoOrFinalMon as PokemonSprite;
      return typeof sprite.species === 'string';
    }
    return false;
  }

  const evolutionNames: string[] = [evolution.from.species];
  evos.forEach((e) => {
    if (isPokemonSprite(e)) {
      evolutionNames.push(e.species);
    } else {
      evolutionNames.push(e.from.species);
      e.to.forEach((ps) => {
        evolutionNames.push(ps.species);
      });
    }
  });
  return (
    <li
      data-evolution-names={evolutionNames.join('-')}
      className='cursor-default bg-base-200 rounded-lg flex flex-col justify-start flex-1'>
      {evos.map((evoOrFinalMon, i) => (
        <div key={i}>
          <div className='flex flex-row items-center'>
            <PokemonSpriteComponent pokemon={evolution.from} />
            <div className='flex flex-col items-center'>
              <div className='flex flex-row gap-2'>
                <EvolutionMethod
                  oldMethod={evolution.oldMethod}
                  newMethod={evolution.newMethod}
                  i={i}
                />
                <EvolutionClause
                  oldClause={evolution.oldClause}
                  newClause={evolution.newClause}
                  i={i}
                />
              </div>
              <MdEast className='scale-[1.5]' />
            </div>
            {isPokemonSprite(evoOrFinalMon) ? (
              <PokemonSpriteComponent pokemon={evoOrFinalMon} />
            ) : (
              <div className='flex flex-row items-center'>
                <PokemonSpriteComponent pokemon={evoOrFinalMon.from} />
                <div className='flex flex-col items-center gap-12'>
                  {Array(evoOrFinalMon.to.length ?? 0)
                    .fill(null)
                    .map((_, i) => (
                      <div
                        key={`${evoOrFinalMon.to}-${i}`}
                        className='flex flex-col items-center'>
                        <div className='flex flex-row gap-2'>
                          <EvolutionMethod
                            i={i}
                            oldMethod={null}
                            newMethod={evoOrFinalMon.method}
                          />
                          <EvolutionClause
                            i={i}
                            oldClause={null}
                            newClause={evoOrFinalMon.clause}
                          />
                        </div>
                        <MdEast className='scale-[1.5]' />
                      </div>
                    ))}
                </div>
                <div key={i} className='flex flex-col'>
                  {evoOrFinalMon.to.map((finalMon, i) => (
                    <PokemonSpriteComponent key={i} pokemon={finalMon} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </li>
  );
}
