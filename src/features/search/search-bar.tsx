'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Film, FolderSearch, Loader2, SearchIcon, Tv } from 'lucide-react';
import { useState } from 'react';

import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

function getSelectedValue(value: ContentType) {
  switch (value) {
    case 'movies':
      return <Film />;
    case 'tv-shows':
      return <Tv />;
    case 'all':
      return <FolderSearch />;
  }
}

function getSelectedValueTooltip(value: ContentType) {
  switch (value) {
    case 'movies':
      return 'movies';
    case 'tv-shows':
      return 'TV shows';
    case 'all':
      return 'movies and TV shows';
  }
}

export type ContentType = 'movies' | 'tv-shows' | 'all';

type Props = {
  formAction: (payload: FormData) => void;
  isPending: boolean;
};

export function SearchBar({ formAction, isPending }: Props) {
  const [contentType, setContentType] = useState<ContentType>('all');

  return (
    <form action={formAction}>
      <search className="mx-auto my-52 flex h-16 w-2/3 items-center gap-2 rounded-4xl bg-white px-4">
        <Select
          defaultValue={contentType}
          name="contentType"
          onValueChange={(value) => {
            return setContentType(value as ContentType);
          }}
        >
          <SelectTrigger>
            <SelectValue asChild>{getSelectedValue(contentType)}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="movies">
              <Film /> Movies
            </SelectItem>
            <SelectItem value="tv-shows">
              <Tv /> TV Shows
            </SelectItem>
            <SelectItem value="all">
              <FolderSearch /> All
            </SelectItem>
          </SelectContent>
        </Select>

        <Separator className="h-9 bg-neutral-200" orientation="vertical" />

        <Input className="shadow-none" name="search" placeholder="Search" type="text" />

        <Separator className="h-9 bg-neutral-200" orientation="vertical" />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="rounded-full" disabled={isPending} type="submit" variant="ghost">
              {isPending ? <Loader2 className="animate-spin" /> : <SearchIcon />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Search for {getSelectedValueTooltip(contentType)}</p>
          </TooltipContent>
        </Tooltip>
      </search>
    </form>
  );
}
