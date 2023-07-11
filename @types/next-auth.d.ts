import type { User } from 'next-auth';

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
  }
}

declare module 'next-auth' {
  interface Session {
    user: Combine<
      {
        id: string;
      },
      User
    >;
  }
}
