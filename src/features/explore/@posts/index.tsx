'use client';
import type { Post } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import Card from './components/card';
import CardLoading from './components/card-loading';
import type { FetchPostsParams } from '../../../app/explore/@posts/actions';

type Props = {
  initialPosts: {
    posts: Post[];
    count: number;
  };
  fetchPosts: ({ categoryId, page, isTemp }: FetchPostsParams) => Promise<{
    posts: Post[];
    count: number;
  }>;
};

export default function Posts({ initialPosts, fetchPosts }: Props) {
  const [ref, inView] = useInView({ threshold: 0.5 });
  const [list, setList] = useState([...initialPosts.posts]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

  const hasMore = list.length < initialPosts.count;

  const loadMore = async (nextPage: number) => {
    if (!isFetching) {
      try {
        setIsFetching(true);

        const { posts } = await fetchPosts({ page: nextPage });

        setPage(nextPage);
        setList(prev => [...prev, ...posts]);
      } finally {
        setIsFetching(false);
      }
    }
  };

  useEffect(() => {
    if (inView && hasMore) {
      loadMore(page + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, hasMore]);

  return (
    <div className="grid w-full grid-cols-1 gap-x-3 gap-y-8 pb-10 md:grid-cols-2 lg:grid-cols-3">
      {list.map((data, i) => (
        <Card key={i} data={data} ref={i === list.length - 1 ? ref : null} />
      ))}

      {isFetching && <CardLoading />}
    </div>
  );
}
