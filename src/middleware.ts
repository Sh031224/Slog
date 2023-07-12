// // import { NextResponse } from 'next/server';
// // import { getToken } from 'next-auth/jwt';
// // import { withAuth } from 'next-auth/middleware';

// // export const config = {
// //   matcher: ['/sign-in', '/profile']
// // };

// import { auth } from '@/lib/auth';
// import { NextAuthRequest } from 'next-auth/lib';
// import { NextResponse } from 'next/server';

// export default auth((req: NextAuthRequest) => {

// });

// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
// };

import { NextResponse } from 'next/server';
import NextAuth from 'next-auth';
import type { NextAuthRequest } from 'next-auth/lib';

import authConfig from '@/auth.config';

export const middleware = NextAuth(authConfig).auth((req: NextAuthRequest) => {
  const isAuthorized = !!req.auth.user;

  if (req.nextUrl.pathname.startsWith('/sign-in')) {
    if (isAuthorized) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  if (req.nextUrl.pathname.startsWith('/profile')) {
    let from = req.nextUrl.pathname;
    if (req.nextUrl.search) {
      from += req.nextUrl.search;
    }

    return NextResponse.redirect(
      new URL(`/sign-in?from=${encodeURIComponent(from)}`, req.url)
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/sign-in', '/profile']
};
