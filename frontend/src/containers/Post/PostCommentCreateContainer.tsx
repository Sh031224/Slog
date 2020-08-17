import React, { KeyboardEvent, useCallback, useState } from "react";
import PostCommentCreate from "../../components/Post/PostComment/PostCommentCreate";
import { NotificationManager } from "react-notifications";

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

  const commentEnter = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        if (commentInput.replace(" ", "") !== "") {
          createComment(post_idx, commentInput, isPrivate).catch(
            (err: Error) => {
              if (
                err.message === "Error: Request failed with status code 401"
              ) {
                NotificationManager.warning(
                  "로그인 후 작성가능합니다.",
                  "Error"
                );
              } else {
                NotificationManager.error("오류가 발생하였습니다.", "Error");
              }
            }
          );

          setCommentInput("");
          setIsPrivate(false);
        }
      }
    },
    [commentInput, isPrivate]
  );

  const commentCreate = useCallback(async () => {
    if (commentInput.replace(" ", "") !== "") {
      await createComment(post_idx, commentInput, isPrivate).catch(
        (err: Error) => {
          if (err.message === "Error: Request failed with status code 401") {
            NotificationManager.warning("로그인 후 작성가능합니다.", "Error");
          } else {
            NotificationManager.error("오류가 발생하였습니다.", "Error");
          }
        }
      );
      setCommentInput("");
      setIsPrivate(false);
    }
  }, [commentInput, isPrivate]);

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
