'use client';

import type { Category } from '@prisma/client';
import { useSearchParams, useRouter } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/shared/components/ui/select';

type Props = {
  categories: Category[];
};

export default function CategorySelectBox({ categories }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    <Select
      onValueChange={value =>
        router.push(`/${!!value ? '?categoryId=' + value : ''}`)
      }
      value={searchParams.get('categoryId') || ''}
      defaultValue=""
    >
      <SelectTrigger className="w-[180px] md:hidden">
        <SelectValue placeholder="Select Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          <SelectItem value="">All</SelectItem>

          {categories.map(category => (
            <SelectItem value={category.id.toString()} key={category.id}>
              {category.title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
