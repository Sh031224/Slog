import { Skeleton } from '@/shared/components/ui/skeleton';

export default function PostLoading() {
  return (
    <div className="flex w-full flex-col">
      <Skeleton className="max-xs:h-10 h-16 w-full max-md:h-12" />
      <Skeleton className="max-xs:h-10 mt-4 h-16 w-4/5 max-md:h-12" />

      <Skeleton className="mt-10 h-[480px] w-full max-md:mt-6 max-md:h-80 max-sm:h-72" />

      <Skeleton className="max-xs:h-8 mt-6 h-10 w-full max-md:mt-6 max-md:h-9" />
      <Skeleton className="max-xs:h-8 mt-4 h-10 w-3/5 max-md:mt-4 max-md:h-9" />
      <Skeleton className="max-xs:h-8 mt-4 h-10 w-4/5 max-md:mt-4 max-md:h-9" />
    </div>
  );
}
