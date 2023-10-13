import { PostType } from '@prisma/client';
import type { Metadata } from 'next';
import { headers } from 'next/dist/client/components/headers';
import { notFound, redirect } from 'next/navigation';

import PostDetail from '@/features/post/[id]';
import { auth } from '@/lib/auth';

import { fetchPostDetail, createPostView } from './actions';

type Props = {
  params: {
    id: string;
  };
};

export const runtime = 'edge';

export async function generateMetadata({
  params: { id }
}: Props): Promise<Metadata> {
  if (Number.isNaN(Number(id))) {
    return {};
  }

  const post = await fetchPostDetail(Number(id));

  if (!post || post.isTemp) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description ?? undefined,
      url: `${process.env.NEXT_PUBLIC_APP_URL}/post/${id}`,
      type: 'article',
      publishedTime: new Date(post.createdAt).toISOString(),
      authors: ['Sh031224'],
      ...(post.thumbnail && { images: [post.thumbnail] })
    },
    twitter: {
      title: post.title,
      description: post.description ?? undefined,
      card: 'summary_large_image',
      ...(post.thumbnail && { images: [post.thumbnail] })
    }
  };
}

export default async function PostPage({ params: { id } }: Props) {
  const user = (await auth())?.user;

  const numericId = Number(id);

  if (Number.isNaN(numericId)) {
    notFound();
  }

  const post = await fetchPostDetail(numericId);

  if (!post || (post.isTemp && !user?.isAdmin)) {
    notFound();
  }

  if (post.type === PostType.EXTERNAL && post.url) {
    redirect(post.url);
  }

  createPostView(numericId, headers().get('x-forwarded-for') || '');

  return <PostDetail post={post} />;
}
