import React from "react";
import ReactMarkdown from "react-markdown";
import "./Post.scss";
import PostComment from "./PostComment";
import PostHeader from "./PostHeader";
import PostHit from "./PostHit/PostHit";
import PostLoading from "./PostLoading";

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

interface PostProps {
  loading: boolean;
  comments: CommentType[];
  post: PostInfoType;
  hit_posts: PostType[];
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

interface PostType {
  idx: number;
  title: string;
  view: number;
  comment_count: number;
  thumbnail?: string;
  description?: string;
  created_at: Date;
}

const Post = ({ loading, comments, post, hit_posts }: PostProps) => {
  return (
    <div className="post">
      <div className="post-box">
        {loading ? (
          <PostLoading />
        ) : (
          <>
            <PostHeader
              thumbnail={post.thumbnail}
              title={post.title}
              created_at={post.created_at}
              updated_at={post.updated_at}
            />
            <ReactMarkdown className="post-content" source={post.content} />
            <PostHit hit_posts={hit_posts} post_idx={post.idx} />
            <PostComment count={post.comment_count} comments={comments} />
          </>
        )}
      </div>
    </div>
  );
};

export default Post;
