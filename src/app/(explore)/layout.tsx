import { Suspense } from 'react';

import Categories from '@/features/(explore)/components/categories';
import Aside from '@/shared/components/aside';
import Container from '@/shared/components/container';
import { Skeleton } from '@/shared/components/ui/skeleton';

type Props = {
  children: React.ReactNode;
};

export default function ExploreLayout({ children }: Props) {
  return (
    <div className="flex w-full flex-col md:mt-8 md:flex-row">
      <Aside title="Categories">
        <Suspense
          fallback={
            <>
              <Skeleton className="h-8 w-full max-md:h-10 max-md:w-[180px]" />
              <Skeleton className="h-8 w-full max-md:hidden" />
              <Skeleton className="h-8 w-full max-md:hidden" />
            </>
          }
        >
          <Categories />
        </Suspense>
      </Aside>

      <Container>{children}</Container>
    </div>
  );
}
