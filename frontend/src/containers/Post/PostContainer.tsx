import { inject, observer } from "mobx-react";
import React, { useCallback, useEffect, useState, SetStateAction } from "react";
import { RouteComponentProps, useHistory, withRouter } from "react-router-dom";
import PostStore from "../../stores/PostStore";
import CommentStore from "../../stores/CommentStore";
import Post from "../../components/Post";

interface PostContainerProps extends RouteComponentProps<MatchType> {
  store?: StoreType;
}

interface StoreType {
  PostStore: PostStore;
  CommentStore: CommentStore;
}

interface MatchType {
  idx: string;
}

interface PostParmsType {
  page: number;
  limit: number;
  order?: string;
  category?: number;
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
}

const PostContainer = ({ match, store }: PostContainerProps) => {
  const history = useHistory();
  const { idx } = match.params;

  const { getPostInfo, hit_posts, handleHitPosts } = store!.PostStore;
  const { getComments, comments } = store!.CommentStore;

  const [loading, setLoading] = useState(false);
  const [post_info, setPostInfo] = useState<
    PostInfoType | SetStateAction<PostInfoType | any>
  >({});

  const getPostInfoCallback = useCallback(
    async (idx: number) => {
      await getPostInfo(idx).then((response: any) => {
        setPostInfo(response.data.post);
      });
    },
    [idx]
  );

  const getCommentsCallback = useCallback(
    async (post_idx: number) => {
      await getComments(post_idx);
    },
    [idx]
  );

  const getHitPostsCallback = useCallback(async () => {
    const query: PostParmsType = {
      page: 1,
      limit: 5,
      order: "hit"
    };
    await handleHitPosts(query);
  }, [idx]);

  const getAllContent = async () => {
    setLoading(true);
    try {
      await getHitPostsCallback();
      await getPostInfoCallback(Number(idx));
      await getCommentsCallback(Number(idx));
      setLoading(false);
    } catch (err) {
      alert("해당 게시글이 없습니다.");
      history.push("/");
    }
  };

  useEffect(() => {
    getAllContent();
    return () => setLoading(false);
  }, [idx]);

  return (
    <>
      <Post
        loading={loading}
        comments={comments}
        post={post_info}
        hit_posts={hit_posts}
      />
    </>
  );
};

export default inject("store")(observer(withRouter(PostContainer)));
