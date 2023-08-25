import type { ComponentProps } from 'react';

import ActiveLink from '@/shared/components/active-link';
import { buttonVariants } from '@/shared/components/ui/button';

type Props = {
  href: ComponentProps<typeof ActiveLink>['href'];
  children: React.ReactNode;
};

export default function CategoryButton({ href, children }: Props) {
  return (
    <ActiveLink
      href={href}
      className={buttonVariants({
        variant: 'ghost',
        className: 'h-fit w-full justify-start hidden md:inline-flex'
      })}
      activeClassName={buttonVariants({
        variant: 'secondary',
        className: 'justify-start hidden md:inline-flex'
      })}
    >
      {children}
    </ActiveLink>
  );
}
