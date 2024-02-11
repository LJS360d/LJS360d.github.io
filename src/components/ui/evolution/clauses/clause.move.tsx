import movesDiff from '../../../../data/moves_diff.json';
import type { MoveData } from '../../../../models/types/move.data';
import { PokemonTypeColor } from '../../../../models/types/pokemon.type';
import { toCapitalized } from '../../../../utils/formatting.utils';
type MoveClauseProps = {
  move: string;
};

export default function MoveClause({ move }: MoveClauseProps) {
  const cleanMove = move.replace('MOVE_', '');
  const moveData = (movesDiff as MoveData[]).find((m) => m.name === cleanMove);
  if (!moveData) return <span>{toCapitalized(cleanMove)}</span>;
  const moveColor = getMoveTypeColor(moveData);
  return (
    <span style={{ color: moveColor }} className='font-semibold'>
      {toCapitalized(cleanMove)}
    </span>
  );
}

function getMoveTypeColor(move: MoveData) {
  const type = (move.newType as keyof typeof PokemonTypeColor) || 'UNKNOWN';
  return PokemonTypeColor[type];
}
