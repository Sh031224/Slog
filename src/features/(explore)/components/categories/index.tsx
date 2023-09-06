import { unstable_cache } from 'next/cache';

import { prisma } from '@/lib/database';
import { buildKey } from '@/lib/utils';
import SegmentNav from '@/shared/components/side-nav';
import { TAGS } from '@/shared/constants';

import CategorySelectBox from './category-select-box';

export default async function Categories() {
  const tags = buildKey(TAGS.categories);

  const categories = await unstable_cache(
    () =>
      prisma.category.findMany({
        orderBy: { orderNumber: 'desc' }
      }),
    tags,
    {
      tags
    }
  )();

  return (
    <>
      <SegmentNav href="/">All</SegmentNav>

      {categories.map(category => (
        <SegmentNav key={category.id} href={`/?categoryId=${category.id}`}>
          {category.title}
        </SegmentNav>
      ))}

      {/* mobile */}
      <CategorySelectBox categories={categories} />
    </>
  );
}
