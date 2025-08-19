import { getPoster } from '@/lib/image-client/image-client';
import { ImageIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  alt: string;
  category: 'movie' | 'tv' | 'person';
  imagePath?: string;
  id: number;
  info?: string;
  subtitle?: string;
  title: string;
};

export function SearchResultsItem({ alt, category, id, imagePath, info, subtitle, title }: Props) {
  return (
    <Link
      className="bg-muted group flex gap-3 overflow-hidden rounded-2xl transition-shadow hover:shadow-lg"
      href={`/${category}/${id}`}
    >
      <div className="flex h-[138px] w-[92] shrink-0 items-center justify-center overflow-hidden bg-neutral-300 dark:bg-neutral-600">
        {imagePath ? (
          <Image
            alt={alt}
            className="h-full transition-transform group-hover:scale-110 group-hover:-rotate-3"
            height={138}
            src={getPoster({ path: imagePath, size: 92 })}
            width={92}
          />
        ) : (
          <ImageIcon aria-label="No Image Available" size={32} />
        )}
      </div>
      <div className="flex flex-col justify-between gap-2 py-2 pr-2">
        <div>
          <h2
            className="line-clamp-2 text-xl font-semibold tracking-tight first:mt-0"
            title={title}
          >
            {title}
          </h2>
          <p className="text-muted-foreground text-sm font-semibold tracking-tight">{subtitle}</p>
        </div>
        <p className="line-clamp-2 text-sm">{info}</p>
      </div>
    </Link>
  );
}
