import { Skeleton } from '@/shared/components/ui/skeleton';

export default function CommentSkeletons() {
  return (
    <div className="flex w-full flex-col">
      <div className="mt-4 flex w-full flex-col gap-4 pt-4">
        <div className="flex items-center gap-4">
          <Skeleton className="h-8 w-8 rounded-full sm:h-10 sm:w-10" />
          <Skeleton className="h-6 w-28" />
        </div>

        <Skeleton className="h-6 w-4/5" />
        <Skeleton className="h-6 w-2/5" />
      </div>
    </div>
  );
}
