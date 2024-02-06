import Image from 'next/image';

import { PokemonInfo } from '@/types/PokemonInfo';

interface pokemonInfoProps {
  entry: PokemonInfo;
}

function PokemonInfoComponent({ entry: pokemonInfo }: pokemonInfoProps) {
  const entry = pokemonInfo;

  return (
    <li>
      <div className="species">
        <span>{entry.species.replace(/_/, "-").toLowerCase()}</span>
        <Image
          className="sprite"
          src={`https://img.pokemondb.net/sprites/home/normal/${entry.species
            .toLowerCase()
            .replace(/_/, "-")}.png`}
          alt="Sprite"
          width={112}
          height={112}
        />
      </div>
      {entry.newStats && (
        <div className="stats">
          <div className="old-stats">
          {entry.oldStats?.split('/').map((stat, i) => (
            <span key={i} className="st red">{stat}</span>
          ))}
          </div>
          <div className="new-stats">
          {entry.newStats?.split('/').map((stat, i) => (
            <span key={i} className="green">{stat}</span>
          ))}
          </div>
        </div>
      )}
      {entry.newAbilities && (
        <div className="ability">
          <div className="old-abilities">
          {entry.oldAbilities?.split('/').map((ability, i) => (
            <span key={i} className="st red">{ability}</span>
          ))}
          </div>
          <div className="new-abilities">
          {entry.newAbilities?.split('/').map((ability, i) => (
            <span key={i} className="green">{ability}</span>
          ))}
          </div>
        </div>
      )}
      {entry.newType && (
        <div className="type">
          <span className="st red">{entry.oldType}</span>
          <span className="green">{entry.newType}</span>
        </div>
      )}
    </li>
  );
}

export default PokemonInfoComponent;
