import { createMemo } from 'solid-js';
import type { PokemonInfo } from '../../../data/types/pokemon';

interface StatBarProps {
  pokemon: PokemonInfo;
}

export default function PokemonStats(props: StatBarProps) {
  const statNames = ['HP', 'ATK', 'DEF', 'SPATK', 'SPDEF', 'SPE'];
 const newStats = () => props.pokemon.stats;
  const oldStats = () => props.pokemon.old?.stats ?? newStats();

  const statDifferences = createMemo(() => {
    const differences = [];
    const newStatsArr = newStats();
    const oldStatsArr = oldStats();
    for (let i = 0; i < newStatsArr.length; i++) {
      differences.push(newStatsArr[i] - oldStatsArr[i]);
    }
    return differences;
  });

  const oldBST = createMemo(() => oldStats().reduce((sum, num) => sum + num, 0));
  const newBST = createMemo(() => newStats().reduce((sum, num) => sum + num, 0));
  const BSTDifference = createMemo(() => statDifferences().reduce((sum, num) => sum + num, 0));


  return (
    <div class='grid grid-cols-2 gap-2'>
      <div>
        {newStats().map((statValue, i) => (
          <div
            class='flex flex-row items-center justify-between w-28'
          >
            <span class='flex-1'>{statNames[i]}</span>
            <span
              class={
                statDifferences()[i] > 0
                  ? 'new'
                  : statDifferences()[i] < 0
                    ? 'text-red-500 '
                    : ''
              }>
              {statValue}
            </span>
          </div>
        ))}
        <div class='flex flex-row items-center justify-between w-28'>
          <span>BST</span>
          <span
            class={
              BSTDifference() > 0
                ? 'new'
                : BSTDifference() < 0
                  ? 'text-red-500'
                  : ''
            }>
            {newBST()}
          </span>
        </div>
      </div>
      <div class='flex flex-col'>
        {oldStats().map((stat, i) => (
          <span
            class={statDifferences()[i] !== 0 ? 'old' : 'invisible'}>
            {stat}
          </span>
        ))}
        <span class={newBST() !== oldBST() ? 'old' : 'invisible'}>
          {oldBST()}
        </span>
      </div>
    </div>
  );
}
