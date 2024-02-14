import type { ItemData } from '../../../models/types/item.data';
import {
  toCapitalized,
  toLowerSnakeCase,
} from '../../../utils/formatting.utils';
interface ItemComponentProps {
  item: ItemData;
}

export default function ItemComponent({ item }: ItemComponentProps) {
  return (
    <li data-item-name={item.name} className='flex justify-between'>
      <div className='flex '>
        <img
          src={`/assets/processed/${toLowerSnakeCase(item.name)}.png`}
          alt={item.name}
          width={24}
          height={24}
          title={toCapitalized(item.name)}
          loading='lazy'
        />
        <span>{toCapitalized(item.name)}</span>
      </div>
    </li>
  );
}
