import dynamic from "next/dynamic";
import React from "react";
import CommentType from "types/CommentType";
import { PostInfoType, PostType } from "types/PostType";
import { GetRepliesResponse } from "types/Response";
import MarkdownContainer from "../../containers/Markdown/MarkdownContainer";
import "./Post.scss";

const PostComment = dynamic(() => import("./PostComment"));
const PostHeader = dynamic(() => import("./PostHeader"));
const PostHit = dynamic(() => import("./PostHit"));
const PostLoading = dynamic(() => import("./PostLoading"));

interface PostProps {
  loading: boolean;
  comments: CommentType[];
  post: PostInfoType;
  postInfo: PostInfoType | null;
  hitPosts: PostType[];
  login: boolean;
  admin: boolean;
  createComment: (
    postIdx: number,
    content: string,
    isPrivate?: boolean | undefined
  ) => Promise<void>;
  getReplies: (commentIdx: number) => Promise<GetRepliesResponse>;
  userId: number;
  modifyComment: (commentIdx: number, content: string) => Promise<void>;
  deleteComment: (commentIdx: number) => void;
  createReply: (
    commentIdx: number,
    content: string,
    isPrivate?: boolean | undefined
  ) => Promise<void>;
  modifyReply: (reply_idx: number, content: string) => Promise<void>;
  deleteReply: (reply_idx: number) => void;
  handler: boolean;
  setHandler: React.Dispatch<React.SetStateAction<boolean>>;
  deletePostAlert: () => void;
  editPost: () => void;
  commentCount: number;
}

const Post = ({
  loading,
  comments,
  post,
  postInfo,
  hitPosts,
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
  commentCount
}: PostProps) => {
  return (
    <div className="post">
      <div className="post-box">
        {!post.idx && loading ? (
          <PostLoading />
        ) : (
          <>
            <PostHeader
              editPost={editPost}
              deletePostAlert={deletePostAlert}
              handler={handler}
              setHandler={setHandler}
              admin={admin}
              thumbnail={post.thumbnail || postInfo.thumbnail}
              title={post.title || postInfo.title}
              createdAt={post.created_at || postInfo.created_at}
              updatedAt={post.updated_at || postInfo.updated_at}
            />

            <MarkdownContainer className="post-content">
              {post.content || postInfo.content}
            </MarkdownContainer>
            {!loading && (
              <>
                <PostHit hitPosts={hitPosts} />
                <PostComment
                  commentCount={commentCount}
                  createComment={createComment}
                  deleteComment={deleteComment}
                  modifyComment={modifyComment}
                  createReply={createReply}
                  modifyReply={modifyReply}
                  deleteReply={deleteReply}
                  userId={userId}
                  getReplies={getReplies}
                  postIdx={post.idx || postInfo.idx}
                  admin={admin}
                  login={login}
                  comments={comments}
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Post;
