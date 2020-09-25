import dynamic from "next/dynamic";
import React from "react";
import "./PostComment.scss";

const PostCommentContainer = dynamic(
  () => import("../../../containers/Post/PostCommentContainer")
);
const PostCommentCreateContainer = dynamic(
  () => import("../../../containers/Post/PostCommentCreateContainer")
);

interface PostCommentProps {
  comments: CommentType[];
  login: boolean;
  admin: boolean;
  createComment: (
    postIdx: number,
    content: string,
    isPrivate?: boolean | undefined
  ) => Promise<void>;
  postIdx: number;
  getReplies: (commentIdx: number) => Promise<RepliesResponse>;
  userId: number;
  modifyComment: (commentIdx: number, content: string) => Promise<void>;
  deleteComment: (commentIdx: number) => void;
  createReply: (
    commentIdx: number,
    content: string,
    isPrivate?: boolean | undefined
  ) => Promise<void>;
  modifyReply: (replyIdx: number, content: string) => Promise<void>;
  deleteReply: (replyIdx: number) => void;
  commentCount: number;
  adminId: number;
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
  login,
  admin,
  postIdx,
  createComment,
  getReplies,
  userId,
  modifyComment,
  deleteComment,
  createReply,
  modifyReply,
  deleteReply,
  commentCount,
  adminId
}: PostCommentProps) => {
  return (
    <div className="post-comment">
      <div className="post-comment-count">
        댓글 <b>{commentCount}</b>
      </div>
      <PostCommentCreateContainer
        postIdx={postIdx}
        createComment={createComment}
        login={login}
      />
      {comments.map((comment: CommentType) => {
        return (
          <PostCommentContainer
            adminId={adminId}
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
