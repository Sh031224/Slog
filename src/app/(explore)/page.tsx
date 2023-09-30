import Posts from '@/features/(explore)/components/posts';

import { fetchPosts } from './actions';

export const runtime = 'edge';

export const revalidate = 10800;

export default async function ExplorePage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { categoryId = undefined, search } = searchParams;

  const params = {
    categoryId: categoryId !== undefined ? Number(categoryId) : undefined,
    search: search?.toString()
  };

  const initialPosts = await fetchPosts(params);

  return (
    <Posts
      initialPosts={initialPosts}
      fetchPosts={fetchPosts}
      params={params}
    />
  );
}
