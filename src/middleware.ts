import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });
    const isAuthorized = !!token;

    if (req.nextUrl.pathname.startsWith('/sign-in')) {
      if (isAuthorized) {
        return NextResponse.redirect(new URL('/', req.url));
      }

      return null;
    }

    if (!isAuthorized) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }

      return NextResponse.redirect(
        new URL(`/sign-in?from=${encodeURIComponent(from)}`, req.url)
      );
    }
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true;
      }
    }
  }
);

export const config = {
  matcher: ['/sign-in', '/profile']
};
