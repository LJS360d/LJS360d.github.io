import items from '../../../data/items.json';

function getItemName(item: number) {
  return items.find((i) => i.id === item)?.name ?? `ITEM ID: ${item}`;
}

interface ItemIconProps {
  id: number;
}

export default function ItemIcon({ id }: ItemIconProps) {
  return (
    <div className='min-w-fit'>
      <img
        className='icon'
        src={`/assets/items/icons/${id}.png`}
        alt={`${id}-icon`}
        title={getItemName(id)}
        width={32}
        height={32}
        loading='lazy'
      />
    </div>
  );
}
