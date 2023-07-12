import type { User } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: Combine<
      {
        id: string;
      },
      User
    >;
  }

  interface DefaultJWT {
    id: string;
  }
}
