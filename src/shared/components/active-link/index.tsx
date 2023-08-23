'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation'; // usePathname is a hook now imported from navigation
import { useMemo, type ComponentProps } from 'react';

import { cn } from '@/lib/utils';

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

  const parsedHref = useMemo(() => {
    const url = new URL(process.env.NEXT_PUBLIC_APP_URL);

    if (typeof href === 'string') {
      url.pathname = href;

      return url;
    }

    url.pathname = href.pathname ?? pathname;
    url.search = new URLSearchParams(
      (href.query as Record<string, string>) ?? ''
    ).toString();

    return url;
  }, [href, pathname]);

  const currentHref = useMemo(() => {
    const url = new URL(pathname, process.env.NEXT_PUBLIC_APP_URL);

    url.search = searchParams.toString();

    return url;
  }, [pathname, searchParams]);

  const isActive = currentHref.toString() === parsedHref.toString();

  return (
    <Link {...rest} className={cn(className, isActive ? activeClassName : '')}>
      {children}
    </Link>
  );
};

export default ActiveLink;
