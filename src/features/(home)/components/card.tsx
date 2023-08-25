import type { Post } from '@prisma/client';
import Image from 'next/image';
import { forwardRef } from 'react';

type Props = {
  data: Post;
};

const Card = forwardRef<HTMLDivElement, Props>(({ data }, ref) => (
  <div className="border-none bg-card text-card-foreground" ref={ref}>
    <div className="relative pt-[52%]">
      {!!data.thumbnail ? (
        <Image
          className="absolute top-0 rounded border object-cover dark:brightness-90"
          src={data.thumbnail}
          alt={data.title}
          fill
          priority
        />
      ) : (
        <div className="absolute top-0 h-full w-full rounded border bg-muted-foreground" />
      )}
    </div>

    <div className="mt-4 flex flex-col space-y-1.5 px-2">
      <h3 className="line-clamp-2 text-lg font-semibold leading-none tracking-tight">
        {data.title}
      </h3>

      <p className="line-clamp-3 text-sm text-muted-foreground">
        {data.description}
      </p>

      <p className="text-xs text-muted-foreground/50">7일 전</p>
    </div>
  </div>
));

Card.displayName = 'Card';

export default Card;
