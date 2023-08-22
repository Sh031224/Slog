import type { Category } from '@prisma/client';

import ActiveLink from '@/shared/components/active-link';
import { buttonVariants } from '@/shared/components/ui/button';

type Props = {
  categories: Category[];
};

export default function Category({ categories }: Props) {
  return (
    <aside className="w-60 shrink-0 space-y-1 pr-7">
      <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
        Categories
      </h2>

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
    </aside>
  );
}
