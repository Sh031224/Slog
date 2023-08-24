'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation'; // usePathname is a hook now imported from navigation
import { type ComponentProps } from 'react';

import { cn, parseURL } from '@/lib/utils';

type Props = Combine<
  { children: React.ReactNode; activeClassName?: string },
  ComponentProps<typeof Link>
>;

const ActiveLink = ({
  children,
  activeClassName,
  className,
  ...rest
}: Props) => {
  const { href } = rest;
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const parsedHref = parseURL(href);
  const currentHref = parseURL({ pathname, query: searchParams.toString() });

  const isActive = currentHref === parsedHref;

  return (
    <Link {...rest} className={cn(className, isActive ? activeClassName : '')}>
      {children}
    </Link>
  );
};

export default ActiveLink;
