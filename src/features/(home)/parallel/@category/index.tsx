import type { Category } from '@prisma/client';

import CategoryButton from './components/category-button';
import CategorySelectBox from './components/category-select-box';

type Props = {
  categories: Category[];
};

export default function Category({ categories }: Props) {
  return (
    <>
      <CategoryButton href="/">All</CategoryButton>

      {categories.map(category => (
        <CategoryButton
          key={category.id}
          href={{ pathname: '/', query: { categoryId: category.id } }}
        >
          {category.title}
        </CategoryButton>
      ))}

      {/* mobile */}
      <CategorySelectBox categories={categories} />
    </>
  );
}
