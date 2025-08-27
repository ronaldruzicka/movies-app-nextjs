import type { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

const variants = cva('', {
  variants: {
    variant: {
      h1: 'text-4xl font-extrabold tracking-tight text-balance',
      h2: 'text-3xl font-semibold lg:text-4xl',
      h3: 'text-2xl font-semibold lg:text-3xl',
      h4: 'text-xl font-semibold lg:text-2xl',
      h5: 'text-lg font-semibold lg:text-xl',
      h6: 'text-base font-semibold lg:text-lg',
    },
  },
});

type Variants = NonNullable<VariantProps<typeof variants>['variant']>;

type Props = {
  as?: Variants;
  className?: string;
  variant: Variants;
};

export function Heading({ as, children, className, variant }: PropsWithChildren<Props>) {
  const Comp = as ?? variant;

  return <Comp className={cn(variants({ variant }), className)}>{children}</Comp>;
}
