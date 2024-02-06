import Image from 'next/image';

import { PokemonInfo } from '@/types/PokemonInfo';
import { Types } from '@/types/Types';

import StatBar from './StatBar';
import TypeIcon from './TypeIcon';

interface pokemonInfoProps {
  entry: PokemonInfo;
}

function PokemonInfoComponent({ entry }: pokemonInfoProps) {
  const speciesName = entry.species
    .replace(/_/g, "-")
    .toLowerCase();
  const speciesUrl =
    speciesName === "darmanitan-galarian"
      ? "darmanitan-galarian-standard"
      : speciesName === "darmanitan-zen-mode-galarian"
      ? "darmanitan-galarian-zen"
      : speciesName.replace(/(-cloak|-style|-mode)/g, "");

      
  const oldTypes = Array.from(
    new Set(entry.oldType?.toLowerCase().split("/") as Types[])
  );
  const newTypes = Array.from(
    new Set(entry.newType?.toLowerCase().split("/") as Types[])
  );

  function copyToClipboard() {
    navigator.clipboard.writeText(getPokemonInfo());
  }
  function getPokemonInfo(): string {
    let info = "```\n";
    info += `${entry.species}\n`;
    if (entry.newStats) info += `Stats:\n${entry.newStats}\n`;
    if (entry.newAbilities) info += `Abilities:\n${entry.newAbilities}\n`;
    if (entry.newType) info += `Type:\n${entry.newType}\n`;
    return info + "```";
  }
  return (
    <li className="pokemon-info">
      <div
        className="species"
        onClick={copyToClipboard}
        title="Click to Copy Info"
      >
        <span>{speciesName}</span>
        <Image
          className="sprite"
          src={`https://img.pokemondb.net/sprites/home/normal/${speciesUrl}.png`}
          alt="Sprite"
          width={112}
          height={112}
        />
      </div>
      {entry.newStats && <StatBar entry={entry} key={entry.species}></StatBar>}
      <div className="info-wrapper">
        {entry.newAbilities && (
          <div className="ability">
            {"Abilities: "}
            <span className="st red">{entry.oldAbilities}</span>
            <span className="green">{entry.newAbilities}</span>
          </div>
        )}
        {entry.newType && (
          <div className="type">
            {
              <div className="fd-row">
                <span className="red">Old Type: </span>
                {oldTypes.map((type, i) => (
                  <TypeIcon key={i} type={type} strikeThrough></TypeIcon>
                ))}
              </div>
            }
            <div className="fd-row">
              <span className="green">New Type: </span>
              {newTypes.map((type, i) => (
                <TypeIcon key={i} type={type}></TypeIcon>
              ))}
            </div>
          </div>
        )}
      </div>
    </li>
  );
}

export default PokemonInfoComponent;
