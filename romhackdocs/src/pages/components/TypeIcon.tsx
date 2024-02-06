import { Types } from '@/types/Types';

interface TypeIconProps {
  type: Types;
  strikeThrough?: boolean;
}
function TypeIcon({ type, strikeThrough }: TypeIconProps) {
  return (
    <span
      className={`type-${type === "???" ? "unknown" : type} ${
        strikeThrough ? "obst" : ""
      }`}
    >
      {type}
    </span>
  );
}

export default TypeIcon;
