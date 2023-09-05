'use client';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import Card from './card';
import CardSkeletons from './card-skeletons';
import { usePostStore } from '../../stores';
import type { FetchPostsResponse, FetchPostsParams } from '../../types';

type Props = {
  initialPosts: FetchPostsResponse;
  fetchPosts: (params: FetchPostsParams) => Promise<FetchPostsResponse>;
  params: FetchPostsParams;
};

export default function Posts({ initialPosts, params, fetchPosts }: Props) {
  const [ref, inView] = useInView({ threshold: 0.5 });
  const { list: listByClient, page, next, init } = usePostStore();
  const [isFetching, setIsFetching] = useState(false);

  const list = [...initialPosts.posts, ...listByClient];

  const hasMore = list.length < initialPosts.count;
  const isNotFound = initialPosts.count === 0;

  useEffect(() => {
    init(params);
  }, [init, params]);

  useEffect(() => {
    const loadMore = async () => {
      try {
        setIsFetching(true);

        const response = await fetchPosts({ page: page + 1 });

        next(response);
      } finally {
        setIsFetching(false);
      }
    };

    if (inView && hasMore && !isFetching) {
      loadMore();
    }
  }, [inView, hasMore, isFetching, page, fetchPosts, next]);

  return (
    <>
      {isNotFound ? (
        <div className="flex h-full w-full flex-col items-center justify-center">
          {params.search && (
            <p className="text-center text-xl font-normal tracking-tight text-muted-foreground max-md:text-lg">
              Search results for
              <strong className="text-primary">{` "${params.search}"`}</strong>
            </p>
          )}

          <p className="text-center text-xl font-normal tracking-tight text-muted-foreground max-md:text-lg">
            There are no posts that match the criteria.
          </p>
        </div>
      ) : (
        <div className="grid w-full grid-cols-1 gap-x-3 gap-y-8 pb-10 md:grid-cols-2 lg:grid-cols-3">
          {list.map((data, i) => (
            <Card
              key={i}
              data={data}
              ref={i === list.length - 1 && hasMore ? ref : null}
            />
          ))}

          {isFetching && <CardSkeletons />}
        </div>
      )}
    </>
  );
}
