'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, SearchIcon } from 'lucide-react';

import { Separator } from '@/components/ui/separator';
import Form from 'next/form';
import { useActionState } from 'react';
import type { SearchState } from './actions/search.action';
import { search } from './actions/search.action';

export function SearchBar() {
  const [, formAction, isPending] = useActionState<SearchState, FormData>(search, undefined);

  return (
    <Form action={formAction}>
      <search className="relative my-52 flex w-[70dvw] items-center">
        <Input
          className="h-16 rounded-4xl bg-transparent px-4 shadow-none"
          name="query"
          placeholder="Search for a movie, tv show, person ... "
          type="text"
        />

        <div className="absolute right-4 flex items-center gap-2">
          <Separator className="h-9 bg-neutral-200" orientation="vertical" />
          <Button className="rounded-full" disabled={isPending} type="submit" variant="ghost">
            {isPending ? <Loader2 className="animate-spin" /> : <SearchIcon />}
          </Button>
        </div>
      </search>
    </Form>
  );
}
