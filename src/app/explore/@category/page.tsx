import Category from '@/features/explore/@category';
import { prisma } from '@/lib/database';

export default async function CategoryPage() {
  const categories = await prisma.category.findMany({
    orderBy: { orderNumber: 'desc' }
  });

  return <Category categories={categories} />;
}
