import type { PropsWithChildren } from "react";

type Props = {
  category: React.ReactNode;
  posts: React.ReactNode;
};

export default function HomeLayout({ category, posts }: Props) {
  return (
    <div className="flex h-full w-full flex-col md:flex-row md:pt-8">
      {category}

      <div className="min-h-[calc(100vh-14rem)]">{posts}</div>
    </div>
  );
}
