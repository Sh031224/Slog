import { PostType } from '@prisma/client';
import type { Metadata } from 'next';
import { unstable_cache } from 'next/cache';
import { notFound, redirect } from 'next/navigation';

import PostDetail from '@/features/post/[id]';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/database';
import { buildKey } from '@/lib/utils';
import { TAGS } from '@/shared/constants';

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({
  params: { id }
}: Props): Promise<Metadata> {
  const post = await unstable_cache(
    () =>
      prisma.post.findUnique({
        where: {
          id: Number(id)
        }
      }),
    buildKey(TAGS.post, id),
    {
      tags: buildKey(TAGS.post + id)
    }
  )();

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
      publishedTime: post.createdAt.toISOString(),
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

  const post = await unstable_cache(
    () =>
      prisma.post.findUnique({
        where: {
          id: Number(id)
        }
      }),
    buildKey(TAGS.post, id),
    {
      tags: buildKey(TAGS.post + id)
    }
  )();

  if (!post || (post.isTemp && !user?.isAdmin)) {
    notFound();
  }

  if (post.type === PostType.EXTERNAL && post.url) {
    redirect(post.url);
  }

  return <PostDetail post={post} />;
}
