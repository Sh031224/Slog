import { NextResponse } from 'next/server';
import type { NextAuthRequest } from 'next-auth/lib';

import { auth } from './lib/auth';

export const middleware = auth((req: NextAuthRequest) => {
  const isAuthorized = !!req.auth.user;

  if (req.nextUrl.pathname.startsWith('/sign-in') && isAuthorized) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (req.nextUrl.pathname.startsWith('/settings') && !isAuthorized) {
    let from = req.nextUrl.pathname;
    if (req.nextUrl.search) {
      from += req.nextUrl.search;
    }

    return NextResponse.redirect(
      new URL(`/sign-in?from=${encodeURIComponent(from)}`, req.url)
    );
  }

  if (req.nextUrl.pathname.startsWith('/post')) {
    const requestHeaders = new Headers(req.headers);

    const ip =
      req.ip ||
      req.headers.get('x-real-ip') ||
      req.headers.get('x-forwarded-for') ||
      '';

    console.log(
      req.ip,
      req.headers.get('x-real-ip'),
      req.headers.get('x-forwarded-for')
    );

    requestHeaders.set('x-forwarded-for', ip);

    return NextResponse.next({
      request: {
        headers: requestHeaders
      }
    });
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/sign-in', '/settings', '/post/:path*']
};
