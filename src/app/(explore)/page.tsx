import { notFound } from 'next/navigation';

import Posts from '@/features/(explore)/components/posts';

import { fetchPosts } from './actions';

export const runtime = 'edge';

export default async function ExplorePage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { categoryId = undefined, isTemp = false } = searchParams;

  const params = {
    categoryId: categoryId !== undefined ? Number(categoryId) : undefined,
    isTemp: isTemp === 'true'
  };

  const initialPosts = await fetchPosts(params);

  if (initialPosts.count === 0) {
    notFound();
  }

  return (
    <div className="grid w-full grid-cols-1 gap-x-3 gap-y-8 pb-10 md:grid-cols-2 lg:grid-cols-3">
      <Posts
        initialPosts={initialPosts}
        fetchPosts={fetchPosts}
        params={params}
      />
    </div>
  );
}
