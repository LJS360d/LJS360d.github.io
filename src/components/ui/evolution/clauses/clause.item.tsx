interface ItemClauseProps {
  item: string;
}
import itemsDiff from '../../../../data/items_diff.json';
import {
  toCapitalized,
  toLowerSnakeCase,
} from '../../../../utils/formatting.utils';

export default function ItemClause({ item }: ItemClauseProps) {
  function getItemIconUrl(item: string) {
    const foundItem = itemsDiff.find((i) => i.name === item);
    if (!foundItem) return '';
    return `/assets/items/${toLowerSnakeCase(item)}.png`;
  }
  return (
    <img
      src={getItemIconUrl(item)}
      alt={item}
      title={toCapitalized(item)}
      className='h-8 aspect-square'
    />
  );
}
