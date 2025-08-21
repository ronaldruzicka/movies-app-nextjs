import { Skeleton } from '@/components/ui/skeleton';
import { Tabs } from '@/components/ui/tabs';
import SearchResultsContainer from '@/features/search/search-results-container';
import { SearchResultsGrid } from '@/features/search/search-results-grid';
import { searchMovie, searchPerson, searchTv } from '@/lib/api-client/generated';
import { Suspense } from 'react';

export default async function SearchPage({ searchParams }: PageProps<'/search'>) {
  const params = await searchParams;
  const { query } = params ?? {};

  if (!query || typeof query !== 'string') {
    return (
      <div className="container py-8">
        <p>Enter a search query to see results.</p>
      </div>
    );
  }

  const moviePromise = searchMovie({ query: { query } });
  const tvPromise = searchTv({ query: { query } });
  const personPromise = searchPerson({ query: { query } });

  return (
    <div className="container mx-auto flex h-dvh flex-col gap-8 p-3 lg:items-center lg:p-8">
      <h1 className="text-4xl font-extrabold tracking-tight text-balance">
        Search results for: {query}
      </h1>
      <Suspense
        fallback={
          <Tabs className="w-full">
            <Skeleton className="xs:w-[330px] xs:self-center h-9 w-full rounded-lg" />
            <SearchResultsGrid>
              {Array.from({ length: 8 }, (_, index) => {
                return <Skeleton key={index} className="h-[138px] w-full rounded-lg" />;
              })}
            </SearchResultsGrid>
          </Tabs>
        }
      >
        <SearchResultsContainer
          moviePromise={moviePromise}
          personPromise={personPromise}
          tvPromise={tvPromise}
        />
      </Suspense>
    </div>
  );
}
