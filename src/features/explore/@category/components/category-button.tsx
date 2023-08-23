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
        className: 'inline-flex h-fit w-full justify-start'
      })}
      activeClassName={buttonVariants({
        variant: 'secondary',
        className: 'justify-start'
      })}
    >
      {children}
    </ActiveLink>
  );
}
