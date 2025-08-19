'use client';

import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SearchResultsItem } from '@/features/search/search-results-item';
import type {
  SearchMovieResponse,
  SearchPersonResponse,
  SearchTvResponse,
} from '@/lib/api-client/generated';
import { formatDate } from '@/lib/format/format-date';
import { formatList } from '@/lib/format/format-list';
import { isNotNil } from 'es-toolkit';
import { SearchResultsGrid } from './search-results-grid';

type SearchResultsProps = {
  movieResults: SearchMovieResponse;
  tvResults: SearchTvResponse;
  personResults: SearchPersonResponse;
};

export function SearchResults({ movieResults, tvResults, personResults }: SearchResultsProps) {
  const counts = {
    movie: movieResults.total_results ?? 0,
    tv: tvResults.total_results ?? 0,
    person: personResults.total_results ?? 0,
  };

  const maxCount = Math.max(counts.movie, counts.tv, counts.person);

  const defaultTab: 'movie' | 'tv' | 'person' =
    counts.movie === maxCount ? 'movie' : counts.tv === maxCount ? 'tv' : 'person';

  return (
    <Tabs defaultValue={defaultTab}>
      <TabsList>
        <TabsTrigger value="movie">
          Movies
          <Badge variant="default">{counts.movie}</Badge>
        </TabsTrigger>
        <TabsTrigger value="tv">
          TV Shows
          <Badge variant="default">{counts.tv}</Badge>
        </TabsTrigger>
        <TabsTrigger value="person">
          People
          <Badge variant="default">{counts.person}</Badge>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="movie">
        <SearchResultsGrid>
          {movieResults.results?.map((movie) => {
            if (!movie.id || !movie.title) {
              return null;
            }
            return (
              <SearchResultsItem
                key={movie.id}
                alt={`Movie ${movie.title} poster image`}
                category="movie"
                id={movie.id}
                imagePath={movie.poster_path}
                info={movie.overview}
                subtitle={formatDate(movie.release_date)}
                title={movie.title}
              />
            );
          })}
        </SearchResultsGrid>
      </TabsContent>
      <TabsContent value="tv">
        <SearchResultsGrid>
          {tvResults.results?.map((show) => {
            if (!show.id || !show.name) {
              return null;
            }

            return (
              <SearchResultsItem
                key={show.id}
                alt={`TV show ${show.name} poster image`}
                category="tv"
                id={show.id}
                imagePath={show.poster_path}
                info={show.overview}
                subtitle={formatDate(show.first_air_date)}
                title={show.name}
              />
            );
          })}
        </SearchResultsGrid>
      </TabsContent>
      <TabsContent value="person">
        <SearchResultsGrid>
          {personResults.results?.map((person) => {
            if (!person.id || !person.name) {
              return null;
            }

            const knownFor = person.known_for?.map((media) => media.title).filter(isNotNil) || [];

            return (
              <SearchResultsItem
                key={person.id}
                alt={`${person.name} photo`}
                category="person"
                id={person.id}
                imagePath={person.profile_path}
                info={formatList(knownFor)}
                subtitle={person.known_for_department}
                title={person.name}
              />
            );
          })}
        </SearchResultsGrid>
      </TabsContent>
    </Tabs>
  );
}
