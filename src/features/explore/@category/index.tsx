import type { Category } from '@prisma/client';

import CategoryButton from './components/category-button';

type Props = {
  categories: Category[];
};

export default function Category({ categories }: Props) {
  return (
    <>
      <CategoryButton href="/explore">All</CategoryButton>

      {categories.map(category => (
        <CategoryButton
          key={category.id}
          href={{ pathname: '/explore', query: { categoryId: category.id } }}
        >
          {category.title}
        </CategoryButton>
      ))}
    </>
  );
}
