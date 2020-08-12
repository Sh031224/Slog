import React from "react";
import PostLoading from "../../Post/PostLoading";
import "./HandlePost.scss";
import HandlePostContent from "./HandlePostContent";
import HandlePostHeader from "./HandlePostHeader";
import HandlePostThumbnail from "./HandlePostThumbnail";

interface HandlePostProps {
  edit: boolean;
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
}

const HandlePost = ({
  edit,
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
  textAreaRef
}: HandlePostProps) => {
  return (
    <div className="handle-post">
      <div className="handle-post-box">
        {loading ? (
          <PostLoading />
        ) : (
          <>
            <HandlePostHeader />
            {/* <HandlePostThumbnail /> */}
            <HandlePostContent
              textAreaRef={textAreaRef}
              content={content}
              setContent={setContent}
              setFiles={setFiles}
              isUpload={isUpload}
              setIsUpload={setIsUpload}
              uploadFilesCallback={uploadFilesCallback}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default HandlePost;
