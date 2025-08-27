import type { NextRequest } from 'next/server';
import { TMDB_SESSION_COOKIE_NAME } from './lib/auth/get-session-id';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|auth|favicon.ico|robots.txt|images|login|$).*)'],
  runtime: 'nodejs',
};

export function middleware(request: NextRequest) {
  const token = request.cookies.get(TMDB_SESSION_COOKIE_NAME)?.value;

  if (!token && request.nextUrl.pathname.includes('/account')) {
    const redirectTo = new URL('/login', request.url);

    return Response.redirect(redirectTo);
  }
}
