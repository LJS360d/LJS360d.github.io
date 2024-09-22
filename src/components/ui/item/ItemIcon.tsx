import items from '../../../data/items.json';

function getItemName(item: number) {
  return items.find((i) => i.id === item)?.name ?? `ITEM ID: ${item}`;
}

interface ItemIconProps {
  id: number;
}

export default function ItemIcon({ id }: ItemIconProps) {
  const itemId = id - 1;
  return (
    <div className='min-w-fit'>
      <img
        className='icon'
        src={`/assets/items/icons/${itemId}.png`}
        alt={`${itemId}-icon`}
        title={getItemName(itemId)}
        width={24}
        height={24}
        loading='lazy'
      />
    </div>
  );
}
