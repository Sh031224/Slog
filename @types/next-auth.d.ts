import type { Adapter } from '@auth/core';
import type { User as OriginalUser } from '@prisma/client';
import type { PrismaClient } from '@prisma/client/edge';

declare module 'next-auth' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface User
    extends Pick<OriginalUser, 'id' | 'email' | 'name' | 'image' | 'isAdmin'> {}

  interface Session {
    user?: Pick<OriginalUser, 'id' | 'email' | 'name' | 'image' | 'isAdmin'>;
  }

  interface DefaultJWT {
    id: string;
  }
}

declare module '@auth/prisma-adapter' {
  declare function PrismaAdapter(p: ReturnType<PrismaClient>): Adapter;
}
