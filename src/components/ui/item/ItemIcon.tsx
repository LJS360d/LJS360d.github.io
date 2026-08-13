import { getItemName } from '../../../data/lookups';

interface ItemIconProps {
  id: number;
}

export default function ItemIcon({ id }: ItemIconProps) {
  return (
    <div class='min-w-fit'>
      <img
        class='icon'
        src={`/assets/items/icons/${id}.png`}
        alt={`${id}-icon`}
        title={getItemName(id)}
        width={32}
        height={32}
        loading='lazy'
        decoding='async'
      />
    </div>
  );
}
