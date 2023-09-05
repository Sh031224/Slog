import { unstable_cache } from 'next/cache';

import { prisma } from '@/lib/database';
import { buildKey } from '@/lib/utils';
import { TAGS } from '@/shared/constants';

import CategoryButton from './category-button';
import CategorySelectBox from './category-select-box';

export default async function Categories() {
  const tags = buildKey(TAGS.categories);

  const categories = await unstable_cache(
    () =>{
console.log(1)
      return prisma.category.findMany({
        orderBy: { orderNumber: 'desc' }
      })
    },

    tags,
    {
      tags
    }
  )();

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
