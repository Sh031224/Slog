import React from "react";
import MarkdownContainer from "../../containers/Markdown/MarkdownContainer";
import "./Post.scss";
import PostComment from "./PostComment";
import PostHeader from "./PostHeader";
import PostHit from "./PostHit/PostHit";
import PostLoading from "./PostLoading";

interface PostProps {
  loading: boolean;
  comments: CommentType[];
  post: PostInfoType;
  hit_posts: PostType[];
  login: boolean;
  admin: boolean;
  createComment: (
    post_idx: number,
    content: string,
    is_private?: boolean | undefined
  ) => Promise<void>;
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
  handler: boolean;
  setHandler: React.Dispatch<React.SetStateAction<boolean>>;
  deletePostAlert: () => void;
  editPost: () => void;
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

interface PostInfoType {
  idx: number;
  title: string;
  description: string;
  content: string;
  view: number;
  is_temp: boolean;
  fk_category_idx: number | null;
  thumbnail: string | null;
  created_at: Date;
  updated_at: Date;
  comment_count: number;
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

interface PostType {
  idx: number;
  title: string;
  view?: number;
  comment_count?: number;
  thumbnail?: string;
  description?: string;
  created_at: Date;
}

const Post = ({
  loading,
  comments,
  post,
  hit_posts,
  login,
  admin,
  createComment,
  getReplies,
  userId,
  modifyComment,
  deleteComment,
  createReply,
  modifyReply,
  deleteReply,
  handler,
  setHandler,
  deletePostAlert,
  editPost,
  commentCount,
  adminId
}: PostProps) => {
  return (
    <div className="post">
      <div className="post-box">
        {loading ? (
          <PostLoading />
        ) : (
          <>
            <PostHeader
              editPost={editPost}
              deletePostAlert={deletePostAlert}
              handler={handler}
              setHandler={setHandler}
              admin={admin}
              thumbnail={post.thumbnail}
              title={post.title}
              created_at={post.created_at}
              updated_at={post.updated_at}
            />

            <MarkdownContainer className="post-content">
              {post.content}
            </MarkdownContainer>
            <PostHit hit_posts={hit_posts} post_idx={post.idx} />
            <PostComment
              adminId={adminId}
              commentCount={commentCount}
              createComment={createComment}
              deleteComment={deleteComment}
              modifyComment={modifyComment}
              createReply={createReply}
              modifyReply={modifyReply}
              deleteReply={deleteReply}
              userId={userId}
              getReplies={getReplies}
              post_idx={post.idx}
              admin={admin}
              login={login}
              count={post.comment_count}
              comments={comments}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Post;
