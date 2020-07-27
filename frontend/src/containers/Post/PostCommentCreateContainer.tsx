import React, { useRef, useState } from "react";
import PostCommentCreate from "../../components/Post/PostComment/PostCommentCreate";

interface PostCommentCreateContainerProps {
  createComment: (
    post_idx: number,
    content: string,
    is_private?: boolean | undefined
  ) => Promise<void>;
  login: boolean;
}

const PostCommentCreateContainer = ({
  createComment,
  login
}: PostCommentCreateContainerProps) => {
  const [commentInput, setCommentInput] = useState<string>("");

  const isPrivate = useRef<boolean>(false);

  return (
    <>
      <PostCommentCreate
        isPrivate={isPrivate}
        login={login}
        createComment={createComment}
        commentInput={commentInput}
        setCommentInput={setCommentInput}
      />
    </>
  );
};

export default PostCommentCreateContainer;
