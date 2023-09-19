import type { Comment } from '@prisma/client';

import { auth } from '@/lib/auth';

type Props = {
  postId: number;
};

export default async function Comments({ postId }: Props) {
  const { user } = await auth();

  return <section className="mt-8 flex flex-col"></section>;
}
