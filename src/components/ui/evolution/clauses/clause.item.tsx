interface ItemClauseProps {
  item: string;
}
import itemsDiff from '../../../../data/items_diff.json';
import { toCapitalized, toKebabCase } from '../../../../utils/formatting.utils';

export default function ItemClause({ item }: ItemClauseProps) {
  function getItemIconUrl(item: string) {
    const foundItem = itemsDiff.find((i) => i.name === item);
    if (!foundItem) return '';
    return `https://img.pokemondb.net/sprites/items/${toKebabCase(item)}.png`;
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
