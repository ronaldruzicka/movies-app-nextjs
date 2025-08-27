import { authenticationCreateSession } from '@/lib/api-client/generated';
import { TMDB_SESSION_COOKIE_NAME } from '@/lib/auth/get-session-id';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const request_token = url.searchParams.get('request_token');
  const approved = url.searchParams.get('approved');

  if (!request_token || approved !== 'true') {
    console.error('wrong params');
    return new Response(`<main>
        <h1>Authentication Failed</h1>
        <p>Access was denied or the request token is missing.</p>
      </main>`);
  }

  const response = await authenticationCreateSession({
    body: { request_token },
  });

  const session_id = response.data?.session_id;

  if (!session_id) {
    console.error('no session id');
    return new Response(`<main>
        <h1>Authentication Failed</h1>
        <p>Could not create a session with TMDB. Please try again.</p>
      </main>`);
  }

  const cookiesStore = await cookies();

  cookiesStore.set(TMDB_SESSION_COOKIE_NAME, session_id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  redirect('/');
}
