'use server';

import { authenticationDeleteSession } from '@/lib/api-client/generated';
import { getSessionId, TMDB_SESSION_COOKIE_NAME } from '@/lib/auth/get-session-id';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function logoutAction() {
  const sessionId = await getSessionId();

  if (!sessionId) {
    console.error('No session ID found for logout');

    redirect('/');
  }

  const response = await authenticationDeleteSession({
    body: { session_id: sessionId },
  });

  if (!response.data?.success) {
    console.error('Failed to delete session on TMDB');

    redirect('/');
  }

  revalidatePath('/', 'layout');

  const cookiesStore = await cookies();

  cookiesStore.delete(TMDB_SESSION_COOKIE_NAME);

  redirect('/');
}
