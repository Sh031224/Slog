import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import CategoryStore from "../../stores/CategoryStore";
import PostStore from "../../stores/PostStore";
import UserStore from "../../stores/UserStore";
import { NotificationManager } from "react-notifications";
import { inject, observer } from "mobx-react";
import { useHistory } from "react-router-dom";
import HandlePost from "../../components/common/HandlePost";

interface CreateContainerProps {
  store?: StoreType;
}

interface StoreType {
  CategoryStore: CategoryStore;
  UserStore: UserStore;
  PostStore: PostStore;
}

interface GetProfileResponse {
  status: number;
  message: string;
  data: {
    user: {
      idx: number;
      name: string;
      is_admin: boolean;
      created_at: Date;
    };
  };
}

const CreateContainer = ({ store }: CreateContainerProps) => {
  const { categoryList, handleCategoryList } = store!.CategoryStore;
  const { handleUser, login, handleLoginChange } = store!.UserStore;

  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [categoryIdx, setCategoryIdx] = useState<number>(-1);
  const [thumbnail, setThumbnail] = useState<string>("");

  const history = useHistory();

  const validateAdmin = () => {
    try {
      axios.defaults.headers.common["access_token"] = cookies.access_token;
      if (cookies.access_token !== undefined) {
        handleLoginChange(true);
        handleUser(cookies.access_token)
          .then((res: GetProfileResponse) => {
            if (!res.data.user.is_admin) {
              history.push("/");
            }
          })
          .catch((err) => {
            if (err.message === "401") {
              removeCookie("access_token", { path: "/" });
              handleLoginChange(false);
              axios.defaults.headers.common["access_token"] = "";
            }
          });
      } else {
        history.push("/");
        handleLoginChange(false);
      }
    } catch (err) {
      NotificationManager.error("오류가 발생하였습니다.", "Error");
    }
  };

  useEffect(() => {
    validateAdmin();
  }, [login]);

  useEffect(() => {
    handleCategoryList().catch((err) => {
      NotificationManager.error("오류가 발생하였습니다.", "Error");
    });
  }, []);

  return (
    <>
      <HandlePost
        edit={false}
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
        textAreaRef={textAreaRef}
      />
    </>
  );
};

export default inject("store")(observer(CreateContainer));
