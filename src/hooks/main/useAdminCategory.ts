import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { ICategory } from "interface/ICategory";
import {
  deleteCategoryThunk,
  modifyCategoryOrderThunk,
  modifyCategoryThunk
} from "stores/modules/category";
import { confirmAlert } from "react-confirm-alert";

const useAdminCategory = (item: ICategory) => {
  const dispatch = useDispatch();

  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [value, setValue] = useState<string>(item.name);

  const onClickTitle = useCallback(() => {
    setIsFocus(true);
  }, []);

  const onChangeValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const deleteCategory = useCallback(() => {
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
  }, [item]);

  const modifyCategoryOrder = useCallback(
    (idx: number) => {
      dispatch(modifyCategoryOrderThunk(item.idx, idx));
    },
    [item]
  );

  const modifyCategory = useCallback(async () => {
    if (value !== "") {
      dispatch(modifyCategoryThunk(item.idx, value));
      setIsFocus(false);
    }
  }, [item, value]);

  const onKeyPressHandle = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        modifyCategory();
      }
    },
    [modifyCategory]
  );

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
