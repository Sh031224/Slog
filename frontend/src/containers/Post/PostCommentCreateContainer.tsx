import React, { KeyboardEvent, useState } from "react";
import PostCommentCreate from "../../components/Post/PostComment/PostCommentCreate";

interface PostCommentCreateContainerProps {
  createComment: (
    post_idx: number,
    content: string,
    is_private?: boolean | undefined
  ) => Promise<void>;
  login: boolean;
  post_idx: number;
}

const PostCommentCreateContainer = ({
  createComment,
  login,
  post_idx
}: PostCommentCreateContainerProps) => {
  const [commentInput, setCommentInput] = useState<string>("");
  const [isPrivate, setIsPrivate] = useState<boolean>(false);

  const commentEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      createComment(post_idx, commentInput, isPrivate).catch(() =>
        alert("로그인 후 작성 가능합니다.")
      );
      setCommentInput("");
      setIsPrivate(false);
    }
  };

  const commentCreate = async () => {
    await createComment(post_idx, commentInput, isPrivate).catch(() =>
      alert("로그인 후 작성 가능합니다.")
    );
    setCommentInput("");
    setIsPrivate(false);
  };

  return (
    <>
      <PostCommentCreate
        isPrivate={isPrivate}
        setIsPrivate={setIsPrivate}
        login={login}
        commentCreate={commentCreate}
        commentInput={commentInput}
        setCommentInput={setCommentInput}
        commentEnter={commentEnter}
      />
    </>
  );
};

export default PostCommentCreateContainer;
