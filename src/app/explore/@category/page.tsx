import { unstable_cache } from 'next/cache';

import Category from '@/features/explore/@category';
import { prisma } from '@/lib/database';
import { buildTags } from '@/lib/utils';
import { CATEGORIES_TAG } from '@/shared/tags';

export default async function CategoryPage() {
  const tags = buildTags(CATEGORIES_TAG);

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
    <aside className="sticky top-[3.5rem] z-10  h-fit w-full space-y-1 pb-4 max-md:bg-background/95 max-md:pt-4 max-md:backdrop-blur md:top-[5.5rem] md:w-56 md:shrink-0 md:pb-0 md:pr-7">
      <h2 className="mb-2 hidden px-4 text-lg font-semibold tracking-tight md:block">
        Categories
      </h2>

      <div className="max-md:!mt-0 md:max-h-[80vh] md:space-y-2 md:overflow-y-auto md:pb-4">
        <Category categories={categories} />
      </div>
    </aside>
  );
}
