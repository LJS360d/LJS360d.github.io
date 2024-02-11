interface ClauseProps {
  clause: string;
}

import itemsDiff from '../../../../data/items_diff.json';
import { toCapitalized } from '../../../../utils/formatting.utils';
import ItemClause from './clause.item';
import MoveClause from './clause.move';
import TypeClause from './clause.type';

export default function ClauseFactory({ clause }: ClauseProps) {
  if (isLevel(clause)) return clause;
  if (isItem(clause)) {
    return <ItemClause item={clause} />;
  }
  if (isMove(clause)) return <MoveClause move={clause} />;
  if (isType(clause)) return <TypeClause type={clause} />;
  if (isPlace(clause)) return <>{getPlaceName(clause)}</>;
  return <>{toCapitalized(clause || '')}</>;
}

function isLevel(str: string) {
  return !Number.isNaN(Number(str));
}

function isItem(str: string) {
  return itemsDiff.some((item) => item.name.includes(str));
}

function isMove(str: string) {
  return String(str).startsWith('MOVE');
}

function isType(str: string) {
  return String(str).startsWith('TYPE');
}

function isPlace(str: string) {
  return String(str).startsWith('MAP');
}

function getPlaceName(str: string) {
  return toCapitalized(str.replace(/^MAP_(?=[^_])|^MAPSEC_(?=[^_])/i, ''));
}
