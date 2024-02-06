import type { PokemonData } from "../../../models/types/pokemon.data";

interface StatBarProps {
  pokemon: PokemonData;
}

export default function PokemonStats({ pokemon }: StatBarProps) {
  const statNames = ["HP", "ATK", "DEF", "SPATK", "SPDEF", "SPE"];

  const oldStats = pokemon.oldStats;
  const newStats = pokemon.newStats;
  const statDifferences = getStatDifferences();

  const oldBST = oldStats.reduce((sum, num) => sum + num, 0);
  const newBST = newStats.reduce((sum, num) => sum + num, 0);
  const BSTDifference = statDifferences.reduce((sum, num) => sum + num, 0);

  function getStatDifferences() {
    const statDifferencesArray = [];
    for (let i = 0; i < oldStats.length; i++)
      statDifferencesArray.push(newStats[i] - oldStats[i]);
    return statDifferencesArray;
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      <div>
        {newStats.map((statValue, i) => (
          <div
            className="flex flex-row items-center justify-between w-28"
            key={i}
          >
            <span className="flex-1">{statNames[i]}</span>
            <span
              className={
                statDifferences[i] > 0
                  ? "new"
                  : statDifferences[i] < 0
                  ? "text-red-500 "
                  : ""
              }
            >
              {statValue}
            </span>
          </div>
        ))}
        <div className="flex flex-row items-center justify-between w-28">
          <span>BST</span>
          <span
            className={
              BSTDifference > 0
                ? "new"
                : BSTDifference < 0
                ? "text-red-500"
                : ""
            }
          >
            {newBST}
          </span>
        </div>
      </div>
      <div className="flex flex-col">
        {oldStats.map((stat, i) => (
          <span
            key={i}
            className={statDifferences[i] !== 0 ? "old" : "invisible"}
          >
            {stat}
          </span>
        ))}
        <span className={newBST !== oldBST ? "old" : "invisible"}>
          {oldBST}
        </span>
      </div>
    </div>
  );
}
