import React from "react";
import PostApi from "../../assets/api/Post";
import GetCookie from "lib/GetCookie";
import { DocumentContext } from "next/document";
import dynamic from "next/dynamic";
import MainTemplate from "components/common/Template/MainTemplate";
import { PostInfoType } from "types/PostType";

const PostContainer = dynamic(() => import("containers/Post/PostContainer"));

interface PostProps {
  post: PostInfoType;
  token?: string;
}

class Post extends React.Component<PostProps> {
  static async getInitialProps(ctx: DocumentContext) {
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
      const data = await PostApi.GetPostInfo(Number(postIdx)).catch((err: Error) => {
        return { post: {}, token: token.toString() };
      });
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
