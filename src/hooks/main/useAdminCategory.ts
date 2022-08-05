/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import { Category } from "types/category";
import {
  deleteCategoryThunk,
  modifyCategoryOrderThunk,
  modifyCategoryThunk
} from "stores/modules/category";

const useAdminCategory = (item: Category) => {
  const dispatch = useDispatch();

  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [value, setValue] = useState<string>(item.name);

  const onClickTitle = () => {
    setIsFocus(true);
  };

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const deleteCategory = () => {
    confirmAlert({
      title: "Warning",
      message: "정말로 삭제하시겠습니까?",
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(deleteCategoryThunk(item.idx))
        },
        {
          label: "No",
          onClick: () => {
            return;
          }
        }
      ]
    });
  };

  const modifyCategoryOrder = (idx: number) => {
    dispatch(modifyCategoryOrderThunk(item.idx, idx));
  };

  const modifyCategory = async () => {
    if (value !== "") {
      dispatch(modifyCategoryThunk(item.idx, value));
      setIsFocus(false);
    }
  };

  const onKeyPressHandle = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      modifyCategory();
    }
  };

  return {
    isFocus,
    value,
    onClickTitle,
    onChangeValue,
    onKeyPressHandle,
    modifyCategoryOrder,
    deleteCategory
  };
};

export default useAdminCategory;
