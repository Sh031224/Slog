import React from "react";
import PostApi from "../../assets/api/Post";
import dynamic from "next/dynamic";

const MainTemplate = dynamic(
  () => import("../../components/common/Template/MainTemplate")
);
const PostContainer = dynamic(
  () => import("../../containers/Post/PostContainer")
);

interface PostProps {
  post: PostInfoType;
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
  static async getInitialProps({ req }: any) {
    const isServer = typeof window === "undefined";

    if (isServer) {
      const postIdx = req.url.replace("/post/", "");
      const data = await PostApi.GetPostInfo(Number(postIdx)).catch(
        (err: Error) => {
          return { post: {} };
        }
      );
      return { post: data.data.post };
    }
    return { post: {} };
  }

  render() {
    return (
      <MainTemplate>
        <PostContainer post={this.props.post || null} />
      </MainTemplate>
    );
  }
}

export default Post;
