import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState
} from "react";
import AdminCategory from "../../components/Admin/AdminCategory";
import { NotificationManager } from "react-notifications";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

interface AdminCategoryContainerProps {
  categoryList: CategoryType[];
  setCategoryEdit: Dispatch<SetStateAction<boolean>>;
  modifyOrderCategory: (
    category_idx: number,
    order_number: number
  ) => Promise<unknown>;
  handleCategoryList: () => Promise<unknown>;
  modifyCategoryName: (category_idx: number, name: string) => Promise<unknown>;
  deleteCategory: (category_idx: number) => Promise<unknown>;
  createCategory: (name: string) => Promise<unknown>;
  handlePosts: (query: PostParmsType) => Promise<unknown>;
}

interface PostParmsType {
  page: number;
  limit: number;
  order?: string;
  category?: number;
}

interface CategoryType {
  idx: number;
  name: string;
  post_count: number;
}

const AdminCategoryContainer = ({
  setCategoryEdit,
  categoryList,
  modifyOrderCategory,
  handleCategoryList,
  modifyCategoryName,
  deleteCategory,
  createCategory
}: AdminCategoryContainerProps) => {
  const escFunction = (e: KeyboardEvent) => {
    if (e.keyCode === 27) {
      setCategoryEdit(false);
    }
  };

  const [input, setInput] = useState("");

  const modifyOrderNumber = async (
    category_idx: number,
    order_number: number
  ) => {
    if (!(order_number < 1) && !(order_number > categoryList.length)) {
      await modifyOrderCategory(category_idx, order_number).catch(
        (err: Error) => {
          NotificationManager.error("오류가 발생하였습니다.", "Error");
        }
      );
      handleCategoryList().catch(() => {
        NotificationManager.error("오류가 발생하였습니다.", "Error");
      });
    }
  };

  const modifyName = async (category_idx: number, name: string) => {
    if (name !== "") {
      await modifyCategoryName(category_idx, name).catch((err: Error) => {
        NotificationManager.error("오류가 발생하였습니다.", "Error");
      });
      handleCategoryList().catch(() => {
        NotificationManager.error("오류가 발생하였습니다.", "Error");
      });
    }
  };

  const removeCategoryCallback = useCallback(async (category_idx: number) => {
    await deleteCategory(category_idx);
    history.go(0);
    handleCategoryList().catch(() => {
      NotificationManager.error("오류가 발생하였습니다.", "Error");
    });
  }, []);

  const removeCategory = (category_idx: number) => {
    confirmAlert({
      title: "Warning",
      message: "정말로 삭제하시겠습니까?",
      buttons: [
        {
          label: "Yes",
          onClick: () => removeCategoryCallback(category_idx)
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

  const createTempCategory = async () => {
    await createCategory("이름을 입력하세요.").catch((err: Error) => {
      NotificationManager.error("오류가 발생하였습니다.", "Error");
    });
    handleCategoryList().catch(() => {
      NotificationManager.error("오류가 발생하였습니다.", "Error");
    });
  };

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  return (
    <>
      <AdminCategory
        createTempCategory={createTempCategory}
        removeCategory={removeCategory}
        setInput={setInput}
        input={input}
        categoryList={categoryList}
        modifyOrderNumber={modifyOrderNumber}
        modifyName={modifyName}
        setCategoryEdit={setCategoryEdit}
      />
    </>
  );
};

export default AdminCategoryContainer;
