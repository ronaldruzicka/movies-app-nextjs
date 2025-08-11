'use client';

import { useActionState } from 'react';

import { type SearchState, search } from './actions/search.action';
import { SearchBar } from './search-bar';
import { SearchResults } from './search-results';

export function Search() {
  const [state, formAction, isPending] = useActionState<SearchState, FormData>(search, undefined);

  return (
    <>
      <SearchBar formAction={formAction} isPending={isPending} />
      <SearchResults isPending={isPending} results={state} />
    </>
  );
}
