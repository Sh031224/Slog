import Link from 'next/link';

import { fetchPosts } from '@/app/(explore)/actions';

import { isExternalPost } from '../../helpers';

export default async function PopularContent() {
  const { posts } = await fetchPosts({ limit: 5, page: 1, order: 'view' });

  return (
    <ul>
      {posts.map(post => {
        const isExternal = isExternalPost(post);

        const href = isExternal ? post.url : `/post/${post.id}`;
        const target = isExternal ? '_blank' : '_self';

        return (
          <li key={post.id}>
            <Link href={href} target={target} rel="noreferrer">
              <p>{post.title}</p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
