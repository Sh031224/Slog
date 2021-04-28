import objectUtils from "lib/objectUtils";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "stores/modules";
import { createCategoryThunk, getCategoriesThunk } from "stores/modules/category";

const useCategories = () => {
  const dispatch = useDispatch();
  const {
    data: { total, categories },
    error
  } = useSelector((state: RootState) => state.category);

  const router = useRouter();
  const { query, pathname } = router;

  const [isArrowActive, setIsArrowActive] = useState<boolean>(true);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const createCategory = useCallback(() => {
    dispatch(createCategoryThunk("새로운 카테고리."));
  }, []);

  const onClickEdit = useCallback(() => {
    setIsEdit(true);
  }, []);

  const onCloseEdit = useCallback(() => {
    setIsEdit(false);
  }, []);

  const getIsActive = useCallback(
    (idx: number | string) => {
      if (typeof idx === "string" && pathname === "/" && objectUtils.isEmpty(query)) {
        return true;
      }
      if (idx === -1 && query.temp) {
        return true;
      }
      if (idx.toString() === query.tab) {
        return true;
      }
      return false;
    },
    [query, pathname]
  );

  const onArrowClick = useCallback(() => {
    setIsArrowActive((prev) => !prev);
  }, []);

  const getCategoriesCallback = useCallback(() => {
    if (!total && !categories.length && !error) {
      dispatch(getCategoriesThunk());
    }
  }, [error]);

  useEffect(() => {
    getCategoriesCallback();
  }, [getCategoriesCallback]);

  return {
    total,
    categories,
    getIsActive,
    isArrowActive,
    onArrowClick,
    isEdit,
    onClickEdit,
    onCloseEdit,
    createCategory
  };
};

export default useCategories;
