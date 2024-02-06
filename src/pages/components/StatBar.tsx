import { PokemonInfo } from '@/types/PokemonInfo';

interface StatBarProps {
  entry: PokemonInfo;
}

function StatBar({ entry }: StatBarProps) {
  const statNames = ["HP", "ATK", "DEF", "SPATK", "SPDEF", "SPE"];

  const oldStats = entry.oldStats!.split("/").map((stat) => parseInt(stat));
  const newStats = entry.newStats!.split("/").map((stat) => parseInt(stat));
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
    <div className="stats">
      <div className="new-stats">
        {newStats.map((statValue, i) => (
          <div className="stat-bar" key={i}>
            <span className="stat-label">{statNames[i]}</span>
            <span
              className={
                statDifferences[i] > 0
                  ? "green bold"
                  : statDifferences[i] < 0
                  ? "red bold"
                  : ""
              }
            >
              {statValue}
            </span>
          </div>
        ))}
        <div className="stat-bar">
          <span className="bst-label">BST:</span>
          <span className={BSTDifference > 0 ? "green bold" : BSTDifference < 0 ? "red bold" : ""}>
            {newBST}
          </span>
        </div>
      </div>
      <div className="old-stats">
        {oldStats.map((stat, i) => (
          <span
            key={i}
            className={statDifferences[i] !== 0 ? "st red" : "invis"}
          >
            {stat}
          </span>
        ))}
        <span className={newBST !== oldBST ? "st red" : "invis"}>{oldBST}</span>
      </div>
      {/* <div className="stat-differences">
        {statDifferences.map((statDifference, i) => (
          <div key={i}>
            <span
              className={
                statDifference === 0
                  ? "invis"
                  : statDifference > 0
                  ? "green"
                  : "red"
              }>
              {statDifference > 0 ? "+" : ""}
              {statDifference}
            </span>
          </div>
        ))}
        <span className={BSTDifference >= 0 ? "green" : "red"}>
          {BSTDifference >= 0 ? "+" : ""}
          {BSTDifference}
        </span>
      </div> */}
    </div>
  );
}

export default StatBar;
