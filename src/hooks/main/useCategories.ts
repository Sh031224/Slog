/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import objectUtils from "lib/objectUtils";
import type { RootState } from "stores/modules";
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

  const createCategory = () => {
    dispatch(createCategoryThunk("새로운 카테고리."));
  };

  const onClickEdit = () => {
    setIsEdit(true);
  };

  const onCloseEdit = () => {
    setIsEdit(false);
  };

  const getIsActive = (idx: number | string) => {
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
  };

  const onArrowClick = () => {
    setIsArrowActive((prev) => !prev);
  };

  const getCategoriesCallback = () => {
    if (!total && !categories.length && !error) {
      dispatch(getCategoriesThunk());
    }
  };

  useEffect(() => {
    getCategoriesCallback();
  }, [error]);

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
