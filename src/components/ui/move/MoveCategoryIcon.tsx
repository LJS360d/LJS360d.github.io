interface MoveCategoryProps {
  category: number;
  type: number;
  strikeThrough?: boolean;
  typeBasedCategory?: boolean;
}

const categoryStrings = ['physical', 'special', 'status'];
function MoveCategory(props: MoveCategoryProps) {
  const categoryStr =
    categoryStrings[
      (props.typeBasedCategory ?? true) && props.category !== 2 ? getCategoryForType(props.type) : props.category
    ];
  return (
    <span
      class={`category-${categoryStr} ${
        props.strikeThrough ? 'obst' : ''
      }`}
    />
  );
}

function getCategoryForType(type: number) {
  if (type <= 10) return 0;
  return 1;
}

export default MoveCategory;
