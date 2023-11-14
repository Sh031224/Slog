import { PostType } from '@prisma/client';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { notFound, redirect } from 'next/navigation';

import PostHeader from '@/features/post/[id]/components/post-header';
import PostView from '@/features/post/[id]/components/post-view';
import { isExternalPost } from '@/features/post/[id]/helpers';
import { auth } from '@/lib/auth';
import Markdown from '@/shared/components/markdown';

import { createPostView, fetchPostDetail } from './actions';

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
    alternates: {
      canonical: `/post/${id}`
    },
    openGraph: {
      title: post.title,
      description: post.description ?? undefined,
      url: `${process.env.NEXT_PUBLIC_APP_URL}/post/${id}`,
      type: 'article',
      publishedTime: new Date(post.createdAt).toISOString(),
      modifiedTime: new Date(post.updatedAt).toISOString(),
      authors: [
        'Sh031224',
        'https://www.facebook.com/profile.php?id=100048700034135'
      ],
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
  const numericId = Number(id);

  if (Number.isNaN(numericId)) {
    notFound();
  }

  const user = (await auth())?.user;
  const post = await fetchPostDetail(numericId);

  if (!post || (post.isTemp && !user?.isAdmin)) {
    notFound();
  }

  if (isExternalPost(post)) {
    redirect(post.url);
  }

  return (
    <>
      <PostView
        postId={post.id}
        ip={headers().get('x-forwarded-for') || ''}
        createPostView={createPostView}
      />

      <PostHeader post={post} />

      <Markdown content={post.content || ''} />
    </>
  );
}
