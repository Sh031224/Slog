'use client';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import type { FetchPostsParams } from '@/app/(explore)/actions';

import Card from './card';
import CardSkeletons from './card-skeletons';
import { usePostStore } from '../../stores';
import type { PostParams, PostResponse } from '../../types';

type Props = {
  initialPosts: PostResponse;
  fetchPosts: ({
    categoryId,
    page,
    isTemp
  }: FetchPostsParams) => Promise<PostResponse>;
  params: PostParams;
};

export default function Posts({ initialPosts, params, fetchPosts }: Props) {
  const [ref, inView] = useInView({ threshold: 0.5 });
  const { list: listByClient, page, next, init } = usePostStore();
  const [isFetching, setIsFetching] = useState(false);

  const list = [...initialPosts.posts, ...listByClient];

  const hasMore = list.length < initialPosts.count;

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
      {list.map((data, i) => (
        <Card
          key={i}
          data={data}
          ref={i === list.length - 1 && hasMore ? ref : null}
        />
      ))}

      {isFetching && <CardSkeletons />}
    </>
  );
}
