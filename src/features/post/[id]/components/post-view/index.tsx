'use client';

import { useEffect } from 'react';

type Props = {
  ip: string;
  postId: number;
  createPostView: (postId: number, ip: string) => Promise<boolean>;
};

export default function PostView({ ip, postId, createPostView }: Props) {
  useEffect(() => {
    createPostView(postId, ip);
  }, [ip, postId, createPostView]);

  return null;
}
