import { unstable_cache } from 'next/cache';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/database';
import { buildKey } from '@/lib/utils';
import { TAGS } from '@/shared/constants';

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
    buildKey(TAGS.post, id),
    {
      tags: buildKey(TAGS.post + id)
    }
  )();

  return null;
}
