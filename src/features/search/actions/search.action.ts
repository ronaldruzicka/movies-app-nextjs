'use server';

import {
  SearchKeywordResponse,
  searchMovie,
  searchMulti,
  searchTv,
} from '@/lib/api-client/generated';
import { ContentType } from '../search-bar';

export type SearchState = SearchKeywordResponse | { error: string } | undefined;

function getSearchPromise(searchData: string, contentType: string) {
  if (contentType === 'all') {
    return searchMulti({ query: { query: searchData } });
  }

  if (contentType === 'movies') {
    return searchMovie({ query: { query: searchData } });
  }

  return searchTv({ query: { query: searchData } });
}

export async function search(_: SearchState, formData: FormData): Promise<SearchState> {
  const searchData = formData.get('search');
  const contentType = formData.get('contentType') as ContentType;

  if (!searchData || typeof searchData !== 'string') {
    return {};
  }

  const searchPromise = getSearchPromise(searchData, contentType);
  const response = await searchPromise;

  if (response.error) {
    return { error: 'Something went wrong!' };
  }

  return response.data;
}
