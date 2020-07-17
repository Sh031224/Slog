import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Swal from "sweetalert2";
import AdminCategory from "../../components/Admin/AdminCategory";

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
          Swal.fire("Error !", "오류가 발생하였습니다.", "error");
        }
      );
      handleCategoryList().catch(() => alert("서버가 불안정합니다."));
    }
  };

  const modifyName = async (category_idx: number, name: string) => {
    if (name !== "") {
      await modifyCategoryName(category_idx, name).catch((err: Error) => {
        Swal.fire("Error !", "오류가 발생하였습니다.", "error");
      });
      handleCategoryList().catch(() => alert("서버가 불안정합니다."));
    }
  };

  const removeCategory = (category_idx: number) => {
    Swal.fire({
      title: "정말 삭제하시겠습니까?",
      text: "해당 카테고리의 게시글도 함께 삭제됩니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소"
    }).then(async (result) => {
      if (result.value) {
        await deleteCategory(category_idx);
        handleCategoryList().catch(() => alert("서버가 불안정합니다."));
      }
    });
  };

  const createTempCategory = async () => {
    await createCategory("이름을 입력하세요.").catch((err: Error) => {
      Swal.fire("Error !", "오류가 발생하였습니다.", "error");
    });
    handleCategoryList().catch(() => alert("서버가 불안정합니다."));
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
