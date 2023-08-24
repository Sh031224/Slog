import { notFound } from 'next/navigation';

import { fetchPosts } from '@/app/explore/@posts/actions';
import Posts from '@/features/explore/@posts';

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

  return <Posts initialPosts={initialPosts} fetchPosts={fetchPosts} />;
}

export const revalidation = 3600;
