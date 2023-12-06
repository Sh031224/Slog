import React from 'react';

import { Skeleton } from '@/shared/components/ui/skeleton';

export default function PopularSkeletons() {
  const COUNT = 4;

  return (
    <>
      {new Array(COUNT).fill(null).map((_, index) => (
        <div
          key={index}
          className="relative flex flex-col gap-2 rounded border border-muted p-4 shadow"
        >
          <Skeleton className="mb-2 h-6 w-4/5" />

          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-full rounded-sm" />
            <Skeleton className="h-4 w-2/3 rounded-sm" />
          </div>
        </div>
      ))}
    </>
  );
}
