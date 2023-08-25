import { notFound } from 'next/navigation';

import Home from '@/features/(home)';

import { fetchPosts } from './actions';

export default async function HomePage({
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
    <Home initialPosts={initialPosts} fetchPosts={fetchPosts} params={params} />
  );
}
