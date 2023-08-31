import { unstable_cache } from 'next/cache';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/database';
import { buildKey } from '@/lib/utils';
import { POST_DETAIL_TAG } from '@/shared/tags';

type Props = {
  params: {
    id: string;
  };
};

export default async function PostPage({ params: { id } }: Props) {
  const user = (await auth())?.user;
  const post = await unstable_cache(
    () =>
      prisma.post.findUnique({
        where: {
          id: Number(id)
        }
      }),
    buildKey(POST_DETAIL_TAG, id),
    {
      tags: buildKey(POST_DETAIL_TAG + id)
    }
  )();

  return null;
}
