import type { Category } from '@prisma/client';

import ActiveLink from '@/shared/components/active-link';
import { buttonVariants } from '@/shared/components/ui/button';

type Props = {
  categories: Category[];
};

export default function Category({ categories }: Props) {
  return (
    <>
      <ActiveLink
        href="/explore"
        className="inline-flex h-fit w-full justify-start"
        activeClassName={buttonVariants({
          variant: 'secondary',
          className: 'justify-start'
        })}
      >
        All
      </ActiveLink>

      {categories.map(category => (
        <ActiveLink
          key={category.id}
          href={{ pathname: '/explore', query: { category: category.id } }}
          className="inline-flex h-fit w-full justify-start"
          activeClassName={buttonVariants({
            variant: 'secondary',
            className: 'justify-start'
          })}
        >
          {category.title}
        </ActiveLink>
      ))}
    </>
  );
}
