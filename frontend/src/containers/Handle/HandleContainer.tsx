import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import cookies from "js-cookie";
import { NotificationManager } from "react-notifications";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import useInterval from "react-useinterval";
import { useBeforeunload } from "react-beforeunload";
import Head from "next/head";
import dynamic from "next/dynamic";
import { PostInfoType } from "types/PostType";
import useStore from "lib/hooks/useStore";
import { CreateTempPostResponse, GetPostInfoResponse, GetProfileResponse, UploadFilesResponse } from "types/Response";

const HandlePost = dynamic(() => import("components/Admin/HandlePost"));

const HandleContainer = () => {
  const { store } = useStore();
  const { categoryList, handleCategoryList } = store.CategoryStore;
  const { handleUser, login, handleLoginChange } = store.UserStore;
  const { getPostInfo, uploadFiles, createTempPost, modifyPost, createPost } = store.PostStore;

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [categoryIdx, setCategoryIdx] = useState<number>(-1);
  const [thumbnail, setThumbnail] = useState<string>("");
  const [isNew, setIsNew] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isTemp, setIsTemp] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [post_info, setPostInfo] = useState<PostInfoType | React.SetStateAction<PostInfoType | any>>({});

  const router = useRouter();
  const { idx } = router.query;

  const createTempPostCallback = useCallback(async () => {
    if (title !== "") {
      await createTempPost(title, description, content, thumbnail, categoryIdx)
        .then((res: CreateTempPostResponse) => {
          router.push(`/handle/[idx]`, `/handle/${res.data.idx}`);
          NotificationManager.success("임시저장 되었습니다.", "Success");
        })
        .catch(() => {
          NotificationManager.error("오류가 발생하였습니다.", "Error");
        });
    } else {
      NotificationManager.warning("제목을 입력하세요.", "Warning");
    }
    setIsSaving(false);
  }, [title, description, content, categoryIdx, thumbnail]);

  const modifyTempPostCallback = useCallback(async () => {
    if (!isNaN(Number(idx))) {
      if (title !== "") {
        const body: {
          title: string;
          description: string | null;
          content: string | null;
          thumbnail: string | null;
          category_idx?: number;
          is_temp?: boolean;
        } = {
          title,
          description,
          content,
          thumbnail,
          category_idx: categoryIdx
        };

        if (content === "") {
          body.content = "임시 저장";
        }
        if (categoryIdx === -1) {
          delete body.category_idx;
        }
        if (description === "") {
          body.description = "임시저장 글입니다.";
        }

        if (thumbnail === "") {
          body.thumbnail = null;
        }

        await modifyPost(Number(idx), body)
          .then(() => {
            if (content === "") {
              setContent("임시 저장");
            }
            if (description === "") {
              setDescription("임시저장 글입니다.");
            }
            if (!isTemp) {
              router.push(`/post/${idx}`);
            }
            NotificationManager.success("저장 되었습니다.", "Success");
          })
          .catch(() => {
            NotificationManager.error("오류가 발생하였습니다.", "Error");
          });
      } else {
        NotificationManager.warning("제목을 입력하세요.", "Warning");
      }
      setIsSaving(false);
    }
  }, [title, description, content, categoryIdx, thumbnail]);

  const createPostCallback = useCallback(async () => {
    if (title === "") {
      NotificationManager.warning("제목을 입력하세요.", "Warning");
    } else if (categoryIdx === -1) {
      NotificationManager.warning("카테고리를 입력하세요.", "Warning");
    } else if (content === "") {
      NotificationManager.warning("내용을 입력하세요.", "Warning");
    } else if (description === "") {
      NotificationManager.warning("설명을 입력하세요.", "Warning");
    } else {
      const body: {
        title: string;
        description: string;
        content: string;
        thumbnail: string | null;
        category_idx: number;
      } = {
        title,
        description,
        content,
        thumbnail,
        category_idx: categoryIdx
      };

      if (thumbnail === "") {
        body.thumbnail = null;
      }

      await createPost(body).catch(() => {
        NotificationManager.error("오류가 발생하였습니다.", "Error");
      });
      router.push(`/`);
      NotificationManager.success("저장 되었습니다.", "Success");
    }
    setIsSaving(false);
  }, [title, description, content, categoryIdx, thumbnail]);

  const modifyPostCallback = useCallback(async () => {
    if (title !== "") {
      if (categoryIdx === -1) {
        NotificationManager.warning("카테고리를 입력하세요.", "Warning");
      }
      if (description === "") {
        NotificationManager.warning("설명을 입력하세요.", "Warning");
      }
      if (content === "") {
        NotificationManager.warning("내용을 입력하세요.", "Warning");
      }
      if (content !== "" && categoryIdx !== -1 && description !== "") {
        const body: {
          title: string;
          description: string | null;
          content: string | null;
          thumbnail: string | null;
          category_idx?: number;
          is_temp?: boolean;
        } = {
          title,
          description,
          content,
          thumbnail,
          category_idx: categoryIdx,
          is_temp: false
        };

        if (post_info.is_temp) {
          if (content === "") {
            body.content = null;
          }
          if (categoryIdx === -1) {
            delete body.category_idx;
          }
          if (description === "") {
            body.description = "";
          }
        }

        if (thumbnail === "") {
          body.thumbnail = null;
        }

        await modifyPost(Number(idx), body)
          .then(() => {
            router.push(`/post/${idx}`);
            NotificationManager.success("저장 되었습니다.", "Success");
          })
          .catch(() => {
            NotificationManager.error("오류가 발생하였습니다.", "Error");
          });
      }
    } else {
      NotificationManager.warning("제목을 입력하세요.", "Warning");
    }
    setIsSaving(false);
  }, [title, description, content, categoryIdx, thumbnail, idx]);

  const uploadFilesCallback = useCallback(async (files: File[]) => {
    await uploadFiles(files)
      .then((res: UploadFilesResponse) => {
        setContent((content) => content + `\n![image](${res.data.files[0].replace(" ", "%20")})`);
        NotificationManager.success("사진이 업로드 되었습니다.", "Success");
      })
      .catch(() => {
        NotificationManager.error("오류가 발생하였습니다.", "Error");
      });
  }, []);

  const validateAdmin = useCallback(() => {
    try {
      let token = axios.defaults.headers.common["access_token"];
      if (token) {
        handleLoginChange(true);
        handleUser(token)
          .then((res: GetProfileResponse) => {
            if (!res.data.user.is_admin) {
              router.push("/");
            }
          })
          .catch((err) => {
            if (err.message === "401") {
              cookies.remove("access_token", { path: "/" });
              handleLoginChange(false);
              axios.defaults.headers.common["access_token"] = "";
            }
          });
      } else {
        router.push("/");
        handleLoginChange(false);
      }
    } catch (err) {
      NotificationManager.error("오류가 발생하였습니다.", "Error");
    }
  }, [login]);

  const checkIsNewCallback = useCallback(() => {
    if (idx === "new") {
      setIsNew(true);
      setIsTemp(true);
    } else {
      setIsNew(false);
    }
  }, [idx]);

  const handleCategoryListCallback = useCallback(() => {
    handleCategoryList().catch(() => NotificationManager.error("오류가 발생하였습니다.", "Error"));
  }, []);

  const getPostInfoCallback = useCallback(() => {
    if (!isNew) {
      getPostInfo(Number(idx))
        .then((res: GetPostInfoResponse) => {
          setLoading(false);
          setPostInfo(res.data.post);
          setIsTemp(res.data.post.is_temp);
          setTitle(res.data.post.title);
          if (res.data.post.content !== null) {
            setContent(res.data.post.content);
          }
          if (res.data.post.description !== null) {
            setDescription(res.data.post.description);
          }
          if (res.data.post.fk_category_idx !== null) {
            setCategoryIdx(res.data.post.fk_category_idx);
          }
          if (res.data.post.thumbnail !== null) {
            setThumbnail(res.data.post.thumbnail.replace("https://data.slog.website/public/", ""));
          }
        })
        .catch(() => {
          router.push("/");
          NotificationManager.error("오류가 발생하였습니다.", "Error");
        });
    }
  }, [isNew]);

  const cancelBtn = () => {
    router.back();
  };

  const savePostHandle = useCallback(() => {
    if (!isSaving) {
      setIsSaving(true);
      if (isNew) {
        createPostCallback();
      } else {
        modifyPostCallback();
      }
    }
  }, [createPostCallback, modifyPostCallback, isNew]);

  const tempPostHandle = useCallback(() => {
    if (!isSaving) {
      setIsSaving(true);
      if (isNew) {
        createTempPostCallback();
      } else {
        modifyTempPostCallback();
      }
    }
  }, [createTempPostCallback, modifyTempPostCallback, isNew]);

  useEffect(() => {
    validateAdmin();
  }, [validateAdmin]);

  useEffect(() => {
    checkIsNewCallback();
  }, [checkIsNewCallback]);

  useEffect(() => {
    getPostInfoCallback();
  }, [getPostInfoCallback]);

  useEffect(() => {
    handleCategoryListCallback();
  }, [handleCategoryListCallback]);

  const autoSaveCallback = useCallback(() => {
    if (isTemp) {
      if (title !== "") {
        tempPostHandle();
      }
    }
  }, [title, isTemp, content, thumbnail, categoryIdx, description]);

  useInterval(autoSaveCallback, 250000);

  useBeforeunload(() => "창을 닫으면 모든 변경사항이 사라집니다.");

  return (
    <>
      <Head>
        <title>{"Slog"}</title>
        <meta name="description" content="많은 사람들에게 유용한 정보를 제공하기 위해 제작한 Slog입니다." />
        <meta property="og:title" content="Slog" />
        <meta property="og:description" content="많은 사람들에게 유용한 정보를 제공하기 위해 제작한 Slog입니다." />
        <meta property="og:image" content="https://data.slog.website/public/op_logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Slog" />
        <meta name="twitter:description" content="많은 사람들에게 유용한 정보를 제공하기 위해 제작한 Slog입니다." />
        <meta name="twitter:image" content="https://data.slog.website/public/op_logo.png" />
      </Head>
      {isNew ? (
        <HandlePost
          cancelBtn={cancelBtn}
          categoryList={categoryList}
          loading={false}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          content={content}
          setContent={setContent}
          categoryIdx={categoryIdx}
          setCategoryIdx={setCategoryIdx}
          thumbnail={thumbnail}
          setThumbnail={setThumbnail}
          uploadFilesCallback={uploadFilesCallback}
          textAreaRef={textAreaRef}
          tempPostHandle={tempPostHandle}
          savePostHandle={savePostHandle}
          isTemp={isTemp}
        />
      ) : (
        <HandlePost
          cancelBtn={cancelBtn}
          categoryList={categoryList}
          loading={loading}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          content={content}
          setContent={setContent}
          categoryIdx={categoryIdx}
          setCategoryIdx={setCategoryIdx}
          thumbnail={thumbnail}
          setThumbnail={setThumbnail}
          uploadFilesCallback={uploadFilesCallback}
          textAreaRef={textAreaRef}
          savePostHandle={savePostHandle}
          isTemp={isTemp}
          tempPostHandle={tempPostHandle}
        />
      )}
    </>
  );
};

export default observer(HandleContainer);
