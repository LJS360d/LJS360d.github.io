import type { ItemInfo } from '../../../data/types/item';
import { toCapitalized } from '../../../utils/formatting.utils';
import ItemIcon from './ItemIcon';

interface ItemComponentProps {
  item: ItemInfo;
}

export default function ItemComponent({ item }: ItemComponentProps) {
  return (
    <li
      data-item-name={item.name.toUpperCase()}
      class='flex flex-row justify-start w-full'>
      <div class='flex gap-4'>
        <ItemIcon id={item.id} />
        <span>{toCapitalized(item.name)}</span>
        <p class='text-xs'>{item.description}</p>
      </div>
    </li>
  );
}
