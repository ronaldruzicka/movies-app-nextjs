import type { searchMovie, searchPerson, searchTv } from '@/lib/api-client/generated';
import { SearchResults } from './search-results';

type Props = {
  moviePromise: ReturnType<typeof searchMovie>;
  tvPromise: ReturnType<typeof searchTv>;
  personPromise: ReturnType<typeof searchPerson>;
};

export default async function SearchResultsContainer({
  moviePromise,
  tvPromise,
  personPromise,
}: Props) {
  const [movieResponse, tvResponse, personResponse] = await Promise.all([
    moviePromise,
    tvPromise,
    personPromise,
  ]);

  const movieResults = movieResponse.data ?? { results: [], total_results: 0 };
  const tvResults = tvResponse.data ?? { results: [], total_results: 0 };
  const personResults = personResponse.data ?? { results: [], total_results: 0 };

  return (
    <SearchResults
      movieResults={movieResults}
      personResults={personResults}
      tvResults={tvResults}
    />
  );
}
