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
      className='flex flex-row justify-start w-full'>
      <div className='flex gap-4'>
        <ItemIcon id={item.id} />
        <span>{toCapitalized(item.name)}</span>
        <p className='text-xs'>{item.description}</p>
      </div>
    </li>
  );
}
