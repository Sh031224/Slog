import React from "react";
import PostCommentContainer from "../../../containers/Post/PostCommentContainer";
import PostCommentCreateContainer from "../../../containers/Post/PostCommentCreateContainer";
import "./PostComment.scss";

interface PostCommentProps {
  comments: CommentType[];
  count: number;
  login: boolean;
  admin: boolean;
  createComment: (
    post_idx: number,
    content: string,
    is_private?: boolean | undefined
  ) => Promise<void>;
  post_idx: number;
  getReplies: (comment_idx: number) => Promise<RepliesResponse>;
  userId: number;
  modifyComment: (comment_idx: number, content: string) => Promise<void>;
  deleteComment: (comment_idx: number) => void;
  createReply: (
    comment_idx: number,
    content: string,
    is_private?: boolean | undefined
  ) => Promise<void>;
  modifyReply: (reply_idx: number, content: string) => Promise<void>;
  deleteReply: (reply_idx: number) => void;
  commentCount: number;
}

interface RepliesResponse {
  status: number;
  message: string;
  data: {
    replies: ReplyType[];
  };
}

interface ReplyType {
  idx: number;
  content: string;
  is_private: boolean;
  fk_user_idx: number | undefined;
  fk_user_name: string | undefined;
  fk_comment_idx: number;
  created_at: Date;
  updated_at: Date;
}

interface CommentType {
  idx: number;
  content: string;
  is_private: boolean;
  fk_user_idx: number | undefined;
  fk_user_name: string | undefined;
  fk_post_idx: number;
  created_at: Date;
  updated_at: Date;
  reply_count: number;
}

const PostComment = ({
  comments,
  count,
  login,
  admin,
  post_idx,
  createComment,
  getReplies,
  userId,
  modifyComment,
  deleteComment,
  createReply,
  modifyReply,
  deleteReply,
  commentCount
}: PostCommentProps) => {
  return (
    <div className="post-comment">
      <div className="post-comment-count">
        댓글 <b>{commentCount}</b>
      </div>
      <PostCommentCreateContainer
        post_idx={post_idx}
        createComment={createComment}
        login={login}
      />
      {comments.map((comment: CommentType) => {
        return (
          <PostCommentContainer
            createReply={createReply}
            modifyReply={modifyReply}
            deleteReply={deleteReply}
            login={login}
            deleteComment={deleteComment}
            modifyComment={modifyComment}
            userId={userId}
            getReplies={getReplies}
            key={comment.idx}
            comment={comment}
            admin={admin}
          />
        );
      })}
    </div>
  );
};

export default PostComment;
