interface MoveCategoryProps {
  category: number;
  strikeThrough?: boolean;
}

const categoryStrings = ['physical', 'special', 'status'];
function MoveCategory({ category, strikeThrough }: MoveCategoryProps) {
  return (
    <span
      className={`category-${categoryStrings[category]} ${
        strikeThrough ? 'obst' : ''
      }`}
    />
  );
}

export default MoveCategory;
