import type { Post } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/shared/components/ui/card';

type Props = {
  initialPosts: {
    posts: Post[];
    count: number;
  };
};

export default function Posts({ initialPosts }: Props) {
  return (
    <Link href="/">
      <Card className="border-none p-0">
        <div className="relative pt-[52%]">
          <Image
            className="absolute top-0 rounded border"
            src="https://slog.website/api/static/files-e9e7292e-39be-4b79-8abe-56ad96504381-11_thumbnail.png"
            alt=""
            objectFit="cover"
            layout="fill"
          />
        </div>
        <CardHeader className="px-2 pt-4">
          <CardTitle className="line-clamp-2 text-lg">
            docker-compose를 이용하여 Spring Boot + MariaDB 간단하게 배포하기
          </CardTitle>

          <CardDescription>
            안녕하세요 오늘은 Spring Boot + MariaDB 로 이루어진 프로젝트를
            간편하게 배포하는 방법을 알아보도록 하겠습니다.
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
