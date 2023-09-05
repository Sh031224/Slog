import { Skeleton } from '@/shared/components/ui/skeleton';

export default function CardSkeletons() {
  return (
    <>
      {new Array(6).fill(0).map((_, i) => (
        <div className="flex flex-col gap-4" key={i}>
          <div className="relative pt-[60%]">
            <Skeleton className="absolute top-0 h-full w-full rounded" />
          </div>

          <Skeleton className="h-8 w-full" />
          <div className="relative flex w-full flex-col gap-2">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-[40%]" />
          </div>
        </div>
      ))}
    </>
  );
}
