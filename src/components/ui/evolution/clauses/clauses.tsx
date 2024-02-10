interface ClauseProps {
  clause: string;
}

import itemDiff from '../../../../data/items_diff.json';
import ItemClause from './clause.item';

export default function Clause({ clause }: ClauseProps) {
  if (!Number.isNaN(Number(clause))) return clause;
  if (isItem(clause)) {
    return <ItemClause item={clause} />;
  }
  return clause;
}

function isItem(str: string) {
  return itemDiff.some((item) => item.name.includes(str));
}
