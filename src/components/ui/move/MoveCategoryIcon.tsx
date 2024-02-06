interface MoveCategoryProps {
  category: string;
  strikeThrough?: boolean;
}

function MoveCategory({ category, strikeThrough }: MoveCategoryProps) {
  return (
    <span
      className={`category-${category.toLowerCase()} ${
        strikeThrough ? 'obst' : ''
      }`}
    />
  );
}

export default MoveCategory;
