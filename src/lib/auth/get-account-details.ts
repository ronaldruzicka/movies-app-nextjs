import 'server-only';
import type { AccountDetailsResponse } from '../api-client/generated';
import { getSessionId } from './get-session-id';

export async function getAccountDetails(): Promise<AccountDetailsResponse | undefined> {
  const sessionId = await getSessionId();

  if (!sessionId) {
    return undefined;
  }

  const accountUrl = new URL(`${process.env.TMDB_API_URL}/account`);

  accountUrl.searchParams.append('session_id', sessionId);
  accountUrl.searchParams.append('api_key', process.env.TMDB_API_KEY || '');

  const response = await fetch(accountUrl, { cache: 'no-store' });

  if (!response.ok) {
    return undefined;
  }

  const data = (await response.json()) as AccountDetailsResponse;

  return data;
}
