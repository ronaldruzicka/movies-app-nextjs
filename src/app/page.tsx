import { Search } from '@/features/search/search';
import { client } from '@/lib/api-client/generated/client.gen';

type ReqInterceptor = Parameters<typeof client.interceptors.request.use>[0];

const myInterceptor: ReqInterceptor = async (options) => {
  console.log('💬 ~ myInterceptor ~ options:', options);
};

client.interceptors.request.use(myInterceptor);

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-4 bg-cover bg-fixed bg-center bg-no-repeat">
      <Search />
    </main>
  );
}
