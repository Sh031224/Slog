import { getServerSession } from 'next-auth/next';

import { nextAuthOptions } from '@/lib/next-auth';

export async function getCurrentUser() {
  const session = await getServerSession(nextAuthOptions);

  return session?.user;
}
