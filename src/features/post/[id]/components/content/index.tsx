import type { Post } from '@prisma/client';
import Image from 'next/image';

type Props = {
  data: Post;
};

export default function PostContent({ data }: Props) {
  return (
    <div className="flex flex-col">
      <section>
        <h1 className="text-4xl font-extrabold tracking-tight max-md:text-3xl">
          {data.title}
        </h1>

        {data.thumbnail && <Image src={data.thumbnail} alt={data.title} fill />}
      </section>
    </div>
  );
}
