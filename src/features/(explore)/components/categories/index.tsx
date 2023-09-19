import { fetchCategories } from '@/app/(explore)/actions';
import SegmentNav from '@/shared/components/side-nav';

import CategorySelectBox from './category-select-box';

export default async function Categories() {
  const categories = await fetchCategories();

  return (
    <>
      <SegmentNav href="/">All</SegmentNav>

      {categories.map(category => (
        <SegmentNav key={category.id} href={`/?categoryId=${category.id}`}>
          {category.title}
        </SegmentNav>
      ))}

      {/* mobile */}
      <CategorySelectBox categories={categories} />
    </>
  );
}
