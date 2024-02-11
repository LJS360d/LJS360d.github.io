import { toKebabCase } from '../../../../utils/formatting.utils';
type TypeClauseProps = {
  type: string;
};

export default function TypeClause({ type }: TypeClauseProps) {
  const cleanType = type.replace('TYPE_', '').toLowerCase();
  const className = toKebabCase(type);
  return (
    <div className='flex flex-row gap-2'>
      <span className={className}>{cleanType}</span>
      <span>move</span>
    </div>
  );
}
