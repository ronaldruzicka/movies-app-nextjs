import type { PropsWithChildren } from 'react';

export function SearchResultsGrid({ children }: PropsWithChildren) {
  return (
    <div className="xs:grid-cols-2 grid grid-cols-1 gap-4 lg:grid-cols-3 xl:grid-cols-4">
      {children}
    </div>
  );
}
