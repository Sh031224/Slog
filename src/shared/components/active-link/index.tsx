'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // usePathname is a hook now imported from navigation
import type { ComponentProps } from 'react';

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
  const pathName = usePathname();

  const isActive = pathName === href;

  return (
    <Link {...rest} className={cn(className, isActive ? activeClassName : '')}>
      {children}
    </Link>
  );
};

export default ActiveLink;
