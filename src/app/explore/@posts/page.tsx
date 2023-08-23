import { notFound } from 'next/navigation';

import { fetchPosts } from '@/features/explore/@posts/actions';

export default async function PostsPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { categoryId = undefined, isTemp = false } = searchParams;

  const initialPosts = await fetchPosts({
    categoryId: categoryId !== undefined ? Number(categoryId) : undefined,
    isTemp: isTemp === 'true'
  });

  if (initialPosts.count === 0) {
    notFound();
  }

  return (
    <div className="grid w-full grid-cols-1 gap-x-3 gap-y-8 pb-10 md:grid-cols-2 lg:grid-cols-3">
      {/*  */}
    </div>
  );
}
