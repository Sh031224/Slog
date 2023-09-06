'use client';

import { cn } from '@/lib/utils';

import ActiveLink from '../active-link';

type Props = {
  href: string;
  children: React.ReactNode;
  disabled?: boolean;
};

export default function SideNav({ href, children, disabled }: Props) {
  return (
    <ActiveLink
      href={disabled ? '#' : href}
      className={cn(
        'group hidden items-center rounded-md bg-transparent px-3 py-2 text-sm font-medium text-foreground/60 hover:bg-accent hover:text-accent-foreground md:flex',
        disabled && 'cursor-not-allowed opacity-80'
      )}
      activeClassName="bg-accent text-foreground"
    >
      {children}
    </ActiveLink>
  );
}
