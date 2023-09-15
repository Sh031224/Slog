import type { Post } from '@prisma/client';
import Image from 'next/image';

import { calculateReadingTime, prettyFormatter } from '@/lib/utils';

type Props = {
  data: Post;
};

export default function PostHeader({ data }: Props) {
  const { title, thumbnail, content, createdAt } = data;

  const formattedDate = prettyFormatter(createdAt);
  const readingTime = calculateReadingTime(content ?? '');

  return (
    <section className="flex w-full flex-col">
      <h1 className="text-[42px] font-extrabold tracking-tight max-md:text-3xl">
        {title}
      </h1>

      <div className="mt-2 flex items-center gap-4">
        <span className="text-lg text-muted-foreground">{formattedDate}</span>
        <hr className="m-0 h-4 w-[1px] bg-muted-foreground" />
        <span className="text-lg text-muted-foreground">{`${readingTime} min read`}</span>
      </div>

      {thumbnail && (
        <Image
          className="mt-10 h-auto w-full align-middle max-md:mt-6"
          src={thumbnail}
          alt={title}
          width={896}
          height={466}
          priority
        />
      )}
    </section>
  );
}
