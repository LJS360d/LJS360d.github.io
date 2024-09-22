interface MoveCategoryProps {
  category: number;
  type: number;
  strikeThrough?: boolean;
  typeBasedCategory?: boolean;
}

const categoryStrings = ['physical', 'special', 'status'];
function MoveCategory({
  category,
  strikeThrough,
  type,
  typeBasedCategory = true,
}: MoveCategoryProps) {
  const categoryStr =
    categoryStrings[
      typeBasedCategory && category !== 2 ? getCategoryForType(type) : category
    ];
  return (
    <span
      className={`category-${categoryStr} ${
        strikeThrough ? 'obst' : ''
      }`}
    />
  );
}

function getCategoryForType(type: number) {
  if (type <= 10) return 0;
  return 1;
}

export default MoveCategory;
