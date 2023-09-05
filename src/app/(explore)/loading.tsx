import CardSkeletons from '@/features/(explore)/components/posts/card-skeletons';

export default function ExploreLoading() {
  return (
    <div className="grid w-full grid-cols-1 gap-x-3 gap-y-8 pb-10 md:grid-cols-2 lg:grid-cols-3">
      <CardSkeletons />
    </div>
  );
}
