import Image from 'next/image';

import { PokemonInfo } from '@/types/PokemonInfo';

import StatBar from './StatBar';

interface pokemonInfoProps {
  entry: PokemonInfo;
}

function PokemonInfoComponent({ entry }: pokemonInfoProps) {
  const speciesName = entry.species.replace(/_/, "-").toLowerCase();
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
    <li className='pokemon-info'>
      <div
        className="species"
        onClick={copyToClipboard}
        title="Click to Copy Info"
      >
        <span>{speciesName}</span>
        <Image
          className="sprite"
          src={`https://img.pokemondb.net/sprites/home/normal/${speciesName}.png`}
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
            {"Type: "}
            <span className="st red">{entry.oldType}</span>
            <span className="green">{entry.newType}</span>
          </div>
        )}
      </div>
    </li>
  );
}

export default PokemonInfoComponent;
