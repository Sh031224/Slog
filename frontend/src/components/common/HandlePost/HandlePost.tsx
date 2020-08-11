import React from "react";
import PostLoading from "../../Post/PostLoading";
import "./HandlePost.scss";
import HandlePostContent from "./HandlePostContent";

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
  textAreaRef
}: HandlePostProps) => {
  return (
    <div className="handle-post">
      <div className="handle-post-box">
        {loading ? (
          <PostLoading />
        ) : (
          <HandlePostContent
            textAreaRef={textAreaRef}
            content={content}
            setContent={setContent}
          ></HandlePostContent>
        )}
      </div>
    </div>
  );
};

export default HandlePost;
