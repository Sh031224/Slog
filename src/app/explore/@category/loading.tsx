import { Skeleton } from '@/shared/components/ui/skeleton';

export default function CategoryLoading() {
  return (
    <>
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
    </>
  );
}
