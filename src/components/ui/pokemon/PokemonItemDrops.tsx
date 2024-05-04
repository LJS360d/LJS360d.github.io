import type { PokemonInfo } from '../../../models/types/pokemon.info';

interface ItemBarProps {
  pokemon: PokemonInfo;
}

function PokemonItemDrops({ pokemon }: ItemBarProps) {
  return (
    <>
      TODO: {pokemon.itemCommon} {pokemon.itemRare}
    </>
  );
}

export default PokemonItemDrops;
