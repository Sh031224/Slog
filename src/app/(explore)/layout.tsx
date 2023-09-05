import { Suspense } from 'react';

import Category from '@/features/(explore)/components/category';
import { Skeleton } from '@/shared/components/ui/skeleton';

type Props = {
  children: React.ReactNode;
};

export default function ExploreLayout({ children }: Props) {
  return (
    <div className="flex h-full w-full flex-col md:flex-row md:pt-8">
      <aside className="sticky top-[3.5rem] z-10  h-fit w-full space-y-1 pb-4 max-md:bg-background/95 max-md:pt-4 max-md:backdrop-blur md:top-[5.5rem] md:w-56 md:shrink-0 md:pb-0 md:pr-7">
        <h2 className="mb-2 hidden px-4 text-lg font-semibold tracking-tight md:block">
          Categories
        </h2>

        <div className="max-md:!mt-0 md:max-h-[80vh] md:space-y-2 md:overflow-y-auto md:pb-4">
          <Suspense
            fallback={
              <>
                <Skeleton className="h-8 w-full max-md:h-10 max-md:w-[180px]" />
                <Skeleton className="h-8 w-full max-md:hidden" />
                <Skeleton className="h-8 w-full max-md:hidden" />
              </>
            }
          >
            <Category />
          </Suspense>
        </div>
      </aside>

      <div className="min-h-[calc(100vh-14rem)] w-full">{children}</div>
    </div>
  );
}
