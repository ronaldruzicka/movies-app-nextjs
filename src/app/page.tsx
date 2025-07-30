import { Header } from '@/components/header';
import { Search } from '@/features/search/search';
import { client } from '@/lib/api-client/generated/client.gen';

async function myInterceptor(request: Request) {
  console.log('💬 ~ myInterceptor ~ request:', request);

  // do something
  return request;
}

client.interceptors.request.use(myInterceptor);

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-4 bg-cover bg-fixed bg-center bg-no-repeat">
      <Header />
      <Search />
    </main>
  );
}
