import { inject, observer } from "mobx-react";
import React, { useEffect } from "react";
import Main from "../../components/Main";
import CategoryStore from "../../stores/CategoryStore";

interface MainContainerProps {
  store?: StoreType;
}

interface StoreType {
  CategoryStore: CategoryStore;
}

const MainContainer = ({ store }: MainContainerProps) => {
  const { total_post, categoryList, handleCategoryList } = store!.CategoryStore;

  useEffect(() => {
    handleCategoryList();
  }, []);

  return <Main categoryList={categoryList} total_post={total_post} />;
};

export default inject("store")(observer(MainContainer));
