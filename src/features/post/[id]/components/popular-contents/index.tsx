import Link from 'next/link';

import { fetchPosts } from '@/app/(explore)/actions';

import { isExternalPost } from '../../helpers';

export default async function PopularContents() {
  const { posts } = await fetchPosts({ limit: 4, page: 1, order: 'view' });

  return (
    <>
      {posts.map(post => {
        const isExternal = isExternalPost(post);

        const href = isExternal ? post.url : `/post/${post.id}`;
        const target = isExternal ? '_blank' : '_self';

        return (
          <Link
            href={href}
            target={target}
            rel="noreferrer"
            key={post.id}
            className="group flex flex-col gap-2 rounded border border-muted p-4 shadow"
          >
            <h3 className="truncate text-lg font-medium leading-snug text-blue-400 group-hover:text-blue-500 dark:text-blue-500 dark:group-hover:text-blue-400">
              {post.title}
            </h3>

            <span className="line-clamp-2 text-sm text-muted-foreground">
              {post.description}
            </span>
          </Link>
        );
      })}
    </>
  );
}
