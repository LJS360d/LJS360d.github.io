import moves from '../../../../data/moves.json';
import type { MoveInfo } from '../../../../models/types/move.info';
import { PokemonTypeColor } from '../../../../models/types/pokemon.type';
import { toCapitalized } from '../../../../utils/formatting.utils';
type MoveClauseProps = {
  move: string;
};

export default function MoveClause({ move }: MoveClauseProps) {
  const cleanMove = move.replace('MOVE_', '');
  const moveData = (moves as MoveInfo[]).find((m) => m.name === cleanMove);
  if (!moveData) return <span>{toCapitalized(cleanMove)}</span>;
  const moveColor = getMoveTypeColor(moveData);
  return (
    <span style={{ color: moveColor }} className='font-semibold'>
      {toCapitalized(cleanMove)}
    </span>
  );
}

function getMoveTypeColor(move: MoveInfo) {
  const type = (move.type as keyof typeof PokemonTypeColor) || 'UNKNOWN';
  return PokemonTypeColor[type];
}
