import dynamic from "next/dynamic";
import React from "react";
import PostLoading from "../../Post/PostLoading";
import "./HandlePost.scss";

const HandlePostCategory = dynamic(() => import("./HandlePostCategory"));
const HandlePostContent = dynamic(() => import("./HandlePostContent"));
const HandlePostFooter = dynamic(() => import("./HandlePostFooter"));
const HandlePostHeader = dynamic(() => import("./HandlePostHeader"));
const HandlePostThumbnail = dynamic(() => import("./HandlePostThumbnail"));

interface HandlePostProps {
  categoryList: CategoryType[];
  loading: boolean;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  categoryIdx: number;
  setCategoryIdx: React.Dispatch<React.SetStateAction<number>>;
  thumbnail: string;
  setThumbnail: React.Dispatch<React.SetStateAction<string>>;
  uploadFilesCallback: (files: File[]) => Promise<void>;
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
  savePostHandle: () => void;
  tempPostHandle: () => void;
  isTemp: boolean;
  cancelBtn: () => void;
}

interface CategoryType {
  idx: number;
  name: string;
  post_count: number;
}

const HandlePost = ({
  categoryList,
  loading,
  title,
  setTitle,
  description,
  setDescription,
  content,
  setContent,
  categoryIdx,
  setCategoryIdx,
  thumbnail,
  setThumbnail,
  uploadFilesCallback,
  textAreaRef,
  savePostHandle,
  isTemp,
  tempPostHandle,
  cancelBtn
}: HandlePostProps) => {
  return (
    <div className="handle-post">
      <div className="handle-post-box">
        {loading ? (
          <PostLoading />
        ) : (
          <>
            <HandlePostHeader
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
            />
            <div className="handle-post-box-util">
              <HandlePostThumbnail
                thumbnail={thumbnail}
                setThumbnail={setThumbnail}
              />
              <HandlePostCategory
                categoryList={categoryList}
                categoryIdx={categoryIdx}
                setCategoryIdx={setCategoryIdx}
              />
            </div>
            <HandlePostContent
              textAreaRef={textAreaRef}
              content={content}
              setContent={setContent}
              uploadFilesCallback={uploadFilesCallback}
            />
            <HandlePostFooter
              cancelBtn={cancelBtn}
              isTemp={isTemp}
              savePostHandle={savePostHandle}
              tempPostHandle={tempPostHandle}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default HandlePost;
