import React from "react";
import PostCommentCreateContainer from "../../../containers/Post/PostCommentCreateContainer";
import "./PostComment.scss";

interface PostCommentProps {
  comments: CommentType[];
  count: number;
  userName: string;
  login: boolean;
  admin: boolean;
  createComment: (
    post_idx: number,
    content: string,
    is_private?: boolean | undefined
  ) => Promise<void>;
  post_idx: number;
}

interface CommentType {
  idx: number;
  content: string;
  is_private: boolean;
  fk_user_idx: string | undefined;
  fk_user_name: string | undefined;
  fk_post_idx: number;
  created_at: Date;
  updated_at: Date;
  reply_count: number;
}

const PostComment = ({
  comments,
  count,
  userName,
  login,
  admin,
  post_idx,
  createComment
}: PostCommentProps) => {
  return (
    <div className="post-comment">
      <div className="post-comment-count">
        댓글 <b>{count}</b>
      </div>
      <PostCommentCreateContainer
        post_idx={post_idx}
        createComment={createComment}
        login={login}
      />
    </div>
  );
};

export default PostComment;
