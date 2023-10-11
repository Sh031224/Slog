import type { Metadata } from 'next';

import Posts from '@/features/(explore)/components/posts';

import { fetchPosts } from './actions';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export const runtime = 'edge';

export const revalidate = 10800;

export function generateMetadata({ searchParams }: Props): Metadata {
  if (Object.keys(searchParams).length === 0) {
    return {};
  }

  return {
    robots: 'noindex'
  };
}

export default async function ExplorePage({ searchParams }: Props) {
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
