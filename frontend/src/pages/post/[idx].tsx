import MainTemplate from "components/common/Template/MainTemplate";
import PostContainer from "containers/Post/PostContainer";
import React from "react";
import PostApi from "../../assets/api/Post";
import GetCookie from "lib/GetCookie";

interface PostProps {
  post: PostInfoType;
  token?: string;
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

class Post extends React.Component<PostProps> {
  static async getInitialProps(ctx: any) {
    const isServer = typeof window === "undefined";
    let token = [];

    if (isServer) {
      if (ctx.req.headers.cookie) {
        const cookies = await GetCookie(ctx);

        token = cookies.filter((val: string) => {
          return val !== "";
        });
      }

      const postIdx = ctx.req.url.replace("/post/", "");
      const data = await PostApi.GetPostInfo(Number(postIdx)).catch(
        (err: Error) => {
          return { post: {}, token: token.toString() };
        }
      );
      if (data && data.data && data.data.post) {
        return { post: data.data.post, token: token.toString() };
      }
      return { post: {}, token: token.toString() };
    }
    return { post: {}, token: token.toString() };
  }

  render() {
    const { token, post } = this.props;

    return (
      <MainTemplate token={token}>
        <PostContainer post={post || null} />
      </MainTemplate>
    );
  }
}

export default Post;
