import { SearchBar } from '@/components/search-bar';
import { movieLatestId } from '@/lib/api-client/generated';

export default async function Home() {
  const response = await movieLatestId();

  console.log(response);

  return (
    <main className="flex flex-col gap-4">
      <h1>Movie Recommendations</h1>
      <search>
        <input type="text" placeholder="Search" />
        <button type="submit">Search</button>
        <SearchBar />
      </search>
    </main>
  );
}
