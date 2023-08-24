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

  return <Category categories={categories} />;
}
