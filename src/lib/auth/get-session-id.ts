import 'server-only';
import { cookies } from 'next/headers';

export const TMDB_SESSION_COOKIE_NAME = 'tmdb_session';

export async function getSessionId(): Promise<string | undefined> {
  const cookiesStore = await cookies();
  const sessionCookie = cookiesStore.get(TMDB_SESSION_COOKIE_NAME);

  return sessionCookie?.value;
}
