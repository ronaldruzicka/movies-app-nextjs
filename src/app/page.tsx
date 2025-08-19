import { Search } from '@/features/search/search';
import { client } from '@/lib/api-client/generated/client.gen';

async function myInterceptor(request: Request) {
  console.log('💬 ~ myInterceptor ~ request:', request);

  // do something
  return request;
}

client.interceptors.request.use(myInterceptor);

type SearchQueryParams = {
  query?: string;
};

type Props = {
  searchParams?: Promise<SearchQueryParams>;
};

export default async function Home(props: Props) {
  const searchParams = await props.searchParams;
  const searchQuery = searchParams?.query;

  return (
    <main className="flex min-h-screen flex-col gap-4 bg-cover bg-fixed bg-center bg-no-repeat">
      <Search searchQuery={searchQuery} />
    </main>
  );
}
