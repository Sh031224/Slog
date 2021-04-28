import { ICreatePostDTO } from "interface/IPost";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "stores/modules";
import { useBeforeunload } from "react-beforeunload";
import useInterval from "react-useinterval";
import {
  clearPostError,
  createPostThunk,
  getPostInfoThunk,
  modifyPostThunk
} from "stores/modules/post";
import { server } from "config/index.json";
import { getCategoriesThunk } from "stores/modules/category";
import { NotificationManager } from "react-notifications";
import { post } from "lib/api";

const useHandlePost = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const { categories, total } = useSelector((state: RootState) => state.category.data);
  const { user, login } = useSelector((state: RootState) => state.user.data);
  const { data, error } = useSelector((state: RootState) => state.post);

  const { idx } = router.query;

  const [value, setValue] = useState<ICreatePostDTO>({
    title: data.post.title,
    description: data.post.description,
    thumbnail: data.post.thumbnail.replace(`${server}/api/static/`, ""),
    category_idx: data.post.fk_category_idx,
    content: data.post.content,
    is_temp: data.post.is_temp
  });
  const [isPreviewTab, setIsPreviewTab] = useState<boolean>(false);

  const isNew = useMemo(() => idx === "new", [idx]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { value, name } = e.target;

      if (name === "category_idx") {
        setValue((prev) => ({ ...prev, [name]: Number(value) }));
      } else {
        setValue((prev) => ({ ...prev, [name]: value }));
      }
    },
    []
  );

  const handleContentTab = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (textareaRef.current) {
        if (e.key === "Tab" && !e.shiftKey) {
          e.preventDefault();
          const value = textareaRef.current.value;
          const selectionStart = textareaRef.current.selectionStart;
          const selectionEnd = textareaRef.current.selectionEnd;
          textareaRef.current.value =
            value.substring(0, selectionStart) + "  " + value.substring(selectionEnd);
          textareaRef.current.selectionStart = selectionEnd + 2 - (selectionEnd - selectionStart);
          textareaRef.current.selectionEnd = selectionEnd + 2 - (selectionEnd - selectionStart);
        }
        if (e.key === "Tab" && e.shiftKey) {
          e.preventDefault();
          const value = textareaRef.current.value;
          const selectionStart = textareaRef.current.selectionStart;
          const selectionEnd = textareaRef.current.selectionEnd;

          const beforeStart = value.substring(0, selectionStart).split("").reverse().join("");
          const indexOfTab = beforeStart.indexOf("  ");
          const indexOfNewline = beforeStart.indexOf("\n");

          if (indexOfTab !== -1 && indexOfTab < indexOfNewline) {
            textareaRef.current.value =
              beforeStart
                .substring(indexOfTab + 2)
                .split("")
                .reverse()
                .join("") +
              beforeStart.substring(0, indexOfTab).split("").reverse().join("") +
              value.substring(selectionEnd);

            textareaRef.current.selectionStart = selectionStart - 2;
            textareaRef.current.selectionEnd = selectionEnd - 2;
          }
        }
      }
    },
    [textareaRef]
  );

  const handleUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];
      const files: File[] = [file];
      post
        .uploadImage(files)
        .then((res) => {
          setValue((prev) => ({
            ...prev,
            content: prev.content + `\n![image](${res.data.files[0].replace(" ", "%20")})`
          }));
        })
        .catch(() => {
          NotificationManager.error("오류가 발생하였습니다.", "Error");
        });
    }
  }, []);

  const getCategoriesCallback = useCallback(() => {
    if (!total && !categories.length) {
      dispatch(getCategoriesThunk());
    }
  }, []);

  const getPostInfo = useCallback(() => {
    if (Number(idx)) {
      if (data.post.idx !== Number(idx)) dispatch(getPostInfoThunk(Number(idx)));
    } else {
      setValue({
        title: "",
        description: "",
        content: "",
        category_idx: -1,
        is_temp: true,
        thumbnail: ""
      });
    }
  }, [idx, data]);

  const saveCallback = useCallback(
    (isTemp: boolean, createdIdx?: number) => {
      if (isTemp || isNew) {
        router.push(`/handle/${createdIdx || idx}`);
        NotificationManager.success("임시 저장되었습니다.", "Success");
      } else {
        router.push("/post/[idx]", `/post/${idx}`);
        NotificationManager.success("저장되었습니다.", "Success");
      }
    },
    [value, isNew, idx]
  );

  const tempSave = useCallback(() => {
    const params = { ...value, is_temp: true };

    if (params.category_idx === -1) {
      params.category_idx = null;
    }

    if (isNew) {
      dispatch(createPostThunk(params, saveCallback, true));
    } else {
      dispatch(modifyPostThunk(Number(idx), params, saveCallback, true));
    }
  }, [value, isNew, idx, saveCallback]);

  const save = useCallback(() => {
    const params = { ...value, is_temp: false };
    setValue({ ...value, is_temp: false });

    if (params.category_idx === -1) {
      params.category_idx = null;
    }

    if (isNew) {
      dispatch(createPostThunk(params, saveCallback, false));
    } else {
      dispatch(modifyPostThunk(Number(idx), params, saveCallback, false));
    }
  }, [value, isNew, idx, saveCallback]);

  useEffect(() => {
    if (!login || (login && !user.is_admin)) {
      router.push("/");
    }
  }, [login, user]);

  useEffect(() => {
    getCategoriesCallback();
  }, []);

  useEffect(() => {
    if (error && error.response) {
      if (error.response.status === 404) {
        router.push("/");
        NotificationManager.error("해당 게시글이 없습니다.", "Error");
      } else if (error.response.status === 403 || error.response.status === 401) {
        router.push("/");
        NotificationManager.error("권한이 없습니다.", "Error");
      } else if (error.response.status === 400) {
        NotificationManager.warning("빈칸을 입력해주세요.", "Warning");
      } else {
        NotificationManager.error("오류가 발생하였습니다.", "Error");
      }
      dispatch(clearPostError());
    }
  }, [error]);

  useEffect(() => {
    getPostInfo();
  }, [idx]);

  const autoSave = useCallback(() => {
    if (value.title && value.content) {
      tempSave();
    }
  }, [tempSave, value]);

  useInterval(autoSave, 250000);

  useBeforeunload(() => "창을 닫으면 모든 변경사항이 사라집니다.");

  return {
    value,
    handleValue,
    categories,
    isPreviewTab,
    setIsPreviewTab,
    textareaRef,
    handleContentTab,
    handleUpload,
    isNew,
    save,
    tempSave
  };
};

export default useHandlePost;
