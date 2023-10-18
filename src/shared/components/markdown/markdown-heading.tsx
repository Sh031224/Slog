import { LinkIcon } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

type HeadingElementKeys = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type Props<T extends HeadingElementKeys> = Combine<
  {
    children?: string;
    as: T;
  },
  React.HTMLAttributes<HTMLHeadingElement>
>;

export default function MarkdownHeading<T extends HeadingElementKeys>({
  children,
  as,
  className,
  ...props
}: Props<T>) {
  const Element = as as React.ElementType;
  const id = children?.toString().replace(/ /g, '-');

  const isPriority = as === 'h1' || as === 'h2';

  return (
    <Element {...props} className={cn(className, 'group relative')} id={id}>
      {children}
      <Link
        href={`#${id}`}
        className={cn(
          'absolute right-full top-[50%] flex translate-y-[-50%] items-center justify-center max-lg:hidden group-hover:[&_*]:block',
          isPriority ? 'h-10 w-10' : 'h-8 w-8'
        )}
      >
        <LinkIcon
          className={cn('hidden', isPriority ? 'h-6 w-6' : 'h-4 w-4')}
        />
      </Link>
    </Element>
  );
}
