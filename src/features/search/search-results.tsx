import type { SearchKeywordResponse } from '@/lib/api-client/generated';

type Props = {
  isPending: boolean;
  results: SearchKeywordResponse | { error: string } | undefined;
};

export function SearchResults({ isPending, results }: Props) {
  console.log('💬 ~ SearchResults ~ results:', results);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!results) {
    return null;
  }

  if ('error' in results) {
    return <div>Error: {results.error}</div>;
  }

  if (!results.results || results.results.length === 0) {
    return <div>No results found.</div>;
  }

  return (
    <ul>
      {results.results.map((result) => {
        return <li key={result.id}>{result.name}</li>;
      })}
    </ul>
  );
}
