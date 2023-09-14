import type { Post } from '@prisma/client';
import Image from 'next/image';

type Props = {
  data: Post;
};

export default function PostContent({ data }: Props) {
  return (
    <div className="flex flex-col">
      <section>
        <h1 className="text-[42px] font-extrabold tracking-tight max-md:text-3xl">
          {data.title}
        </h1>

        {data.thumbnail && (
          <Image
            className="mt-10 h-auto w-full align-middle max-md:mt-6"
            src={data.thumbnail}
            alt={data.title}
            width={896}
            height={466}
            priority
          />
        )}
      </section>
    </div>
  );
}
