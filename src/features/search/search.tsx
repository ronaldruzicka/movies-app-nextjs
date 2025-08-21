import { SearchBar } from './search-bar';

export function Search() {
  return (
    <div className="flex flex-col items-center">
      <SearchBar />
      {/* <Suspense fallback={<div>Loading results...</div>}>
        <SearchTypeahead searchQuery={searchQuery} />
      </Suspense> */}
    </div>
  );
}
