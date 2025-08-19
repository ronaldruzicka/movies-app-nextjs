import { SearchBar } from './search-bar';

type Props = {
  searchQuery?: string;
};

export function Search({ searchQuery }: Props) {
  return (
    <div className="flex flex-col items-center">
      <SearchBar />
      {/* <Suspense fallback={<div>Loading results...</div>}>
        <SearchTypeahead searchQuery={searchQuery} />
      </Suspense> */}
    </div>
  );
}
