'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import { cn } from '@/lib/utils';

import { buttonVariants } from '../ui/button';

export function SignInButton() {
  const pathname = usePathname();
  const search = useSearchParams();

  const callbackUrl = useMemo(() => {
    const basePath = (pathname !== '/sign-in' && pathname) || '/';
    const originSearch = new URLSearchParams(search?.toString());

    originSearch.delete('from');

    const query = originSearch.toString() ? `?${originSearch.toString()}` : '';

    return basePath + query;
  }, [pathname, search]);

  return (
    <Link
      href={{
        pathname: '/sign-in',
        query: {
          from: callbackUrl
        }
      }}
      className={cn(
        buttonVariants({ variant: 'outline', size: 'sm' }),
        'mr-1 min-w-fit shrink-0 sm:mr-2'
      )}
    >
      로그인
    </Link>
  );
}
