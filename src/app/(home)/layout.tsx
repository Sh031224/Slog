import type { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  category: React.ReactNode;
}>;

export default function HomeLayout({ children, category }: Props) {
  return (
    <div className="flex h-full w-full flex-col md:flex-row md:pt-8">
      {category}

      <div className="min-h-[calc(100vh-14rem)]">{children}</div>
    </div>
  );
}
