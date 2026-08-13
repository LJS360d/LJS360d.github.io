import type { ItemInfo } from '../../../data/types/item';
import { toCapitalized } from '../../../utils/formatting.utils';
import ItemIcon from './ItemIcon';

interface ItemComponentProps {
  item: ItemInfo;
  searchKey?: string;
}

export default function ItemComponent(props: ItemComponentProps) {
  return (
    <li data-s={props.searchKey} class='flex flex-row justify-start w-full'>
      <div class='flex gap-4'>
        <ItemIcon id={props.item.id} />
        <span>{toCapitalized(props.item.name)}</span>
        <p class='text-xs'>{props.item.description}</p>
      </div>
    </li>
  );
}
