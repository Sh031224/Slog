import React from "react";
import PostLoading from "../../Post/PostLoading";
import "./HandlePost.scss";
import HandlePostCategory from "./HandlePostCategory";
import HandlePostContent from "./HandlePostContent";
import HandlePostFooter from "./HandlePostFooter";
import HandlePostHeader from "./HandlePostHeader";
import HandlePostThumbnail from "./HandlePostThumbnail";

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
  isUpload: boolean;
  setIsUpload: React.Dispatch<React.SetStateAction<boolean>>;
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
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
  isUpload,
  setIsUpload,
  setFiles,
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
              setFiles={setFiles}
              isUpload={isUpload}
              setIsUpload={setIsUpload}
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
