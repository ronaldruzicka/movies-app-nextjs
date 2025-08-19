'use server';

import { type SearchKeywordResponse } from '@/lib/api-client/generated';
import { redirect } from 'next/navigation';

export type SearchState = SearchKeywordResponse | { error: string } | undefined;

export async function search(_: unknown, formData: FormData): Promise<SearchState> {
  const searchQuery = formData.get('query');

  if (!searchQuery || typeof searchQuery !== 'string') {
    return { error: 'You need to write a search query' };
  }

  const searchParams = new URLSearchParams();

  searchParams.set('query', searchQuery);

  redirect(`/search?${searchParams.toString()}`);
}
