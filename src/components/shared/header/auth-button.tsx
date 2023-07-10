import Link from 'next/link';

import { cn } from '@/lib/utils';

import { buttonVariants } from '../ui/button';

export function AuthButton() {
  return (
    <Link
      href="/sign-in"
      className={cn(
        buttonVariants({ variant: 'outline', size: 'sm' }),
        'ml-4 mr-2 min-w-fit shrink-0'
      )}
    >
      Sign in
    </Link>
  );
}
