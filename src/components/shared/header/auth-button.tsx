'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import { cn } from '@/lib/utils';

import { buttonVariants } from '../ui/button';

export function AuthButton() {
  const pathname = usePathname();
  const search = useSearchParams();

  return (
    <Link
      href={{
        pathname: '/sign-in',
        query: {
          callback: `${pathname || '/'}${
            search?.toString() && '?' + search?.toString()
          }`
        }
      }}
      className={cn(
        buttonVariants({ variant: 'outline', size: 'sm' }),
        'ml-4 mr-2 min-w-fit shrink-0'
      )}
    >
      Sign in
    </Link>
  );
}
