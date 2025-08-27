'use server';

import { authenticationCreateRequestToken } from '@/lib/api-client/generated';
import { redirect } from 'next/navigation';

export async function loginAction() {
  const response = await authenticationCreateRequestToken();

  if (!response.data) {
    console.error('No response data from TMDB when creating request token');
    // TODO:
    // Could render an error page or pass error state, but for simplicity, redirect back to login
    redirect('/login?error=token');
  }

  const loginRedirect = new URL(`${process.env.TMDB_AUTH_BASE_URL}/${response.data.request_token}`);

  const redirectTo = process.env.TMDB_REDIRECT_BASE_URL ? process.env.TMDB_REDIRECT_BASE_URL : '/';

  loginRedirect.searchParams.append('redirect_to', redirectTo);

  redirect(loginRedirect.toString());
}
