import { inject, observer } from "mobx-react";
import React, { useCallback, useEffect, useState, SetStateAction } from "react";
import { RouteComponentProps, useHistory, withRouter } from "react-router-dom";
import PostStore from "../../stores/PostStore";
import CommentStore from "../../stores/CommentStore";
import UserStore from "../../stores/UserStore";
import Post from "../../components/Post";
import { Helmet } from "react-helmet-async";
import { useCookies } from "react-cookie";
import axios from "axios";
import { NotificationManager } from "react-notifications";

interface PostContainerProps extends RouteComponentProps<MatchType> {
  store?: StoreType;
}

interface StoreType {
  PostStore: PostStore;
  CommentStore: CommentStore;
  UserStore: UserStore;
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
  comment_count: number;
}

interface PostCommentResponse {
  status: number;
  message: string;
}

interface CommentTypeResponse {
  status: number;
  message: string;
  data: {
    comments: CommentType[];
  };
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

const PostContainer = ({ match, store }: PostContainerProps) => {
  const history = useHistory();
  const { idx } = match.params;

  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);

  const { getPostInfo, hit_posts, handleHitPosts } = store!.PostStore;
  const {
    getComments,
    getReplies,
    commentCreate,
    commentModify,
    commentDelete,
    replyCreate,
    replyModify,
    replyDelete
  } = store!.CommentStore;
  const {
    handleUser,
    admin,
    login,
    userId,
    handleLoginChange
  } = store!.UserStore;

  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(false);
  const [post_info, setPostInfo] = useState<
    PostInfoType | SetStateAction<PostInfoType | any>
  >({});

  useEffect(() => {
    getAllContent();
  }, [idx]);

  useEffect(() => {
    try {
      axios.defaults.headers.common["access_token"] = cookies.access_token;
      if (cookies.access_token !== undefined) {
        handleLoginChange(true);
        handleUser(cookies.access_token).catch((err) => {
          if (err.message === "401") {
            removeCookie("access_token", { path: "/" });
            handleLoginChange(false);
            axios.defaults.headers.common["access_token"] = "";
          }
        });
      } else {
        handleLoginChange(false);
      }
      getCommentsCallback(Number(idx));
    } catch (err) {
      NotificationManager.error("오류가 발생하였습니다.", "Error");
    }
  }, [login]);

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
      await getComments(post_idx)
        .then((res: CommentTypeResponse) => {
          setComments(res.data.comments);
        })
        .catch((err: Error) => {
          if (err.message !== "Error: Request failed with status code 404") {
            NotificationManager.error("오류가 발생하였습니다.", "Error");
          }
        });
    },
    [idx, post_info]
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
    axios.defaults.headers.common["access_token"] = cookies.access_token;
    try {
      await getHitPostsCallback();
      await getPostInfoCallback(Number(idx));
      await getCommentsCallback(Number(idx));
      setLoading(false);
    } catch (err) {
      if (err.message === "Error: Request failed with status code 404") {
        NotificationManager.warning("해당 게시글이 없습니다.", "Error");
        history.push("/");
      } else {
        NotificationManager.error("오류가 발생하였습니다.", "Error");
      }
    }
  };

  const createComment = async (
    post_idx: number,
    content: string,
    is_private?: boolean
  ) => {
    try {
      axios.defaults.headers.common["access_token"] = cookies.access_token;
      await commentCreate(post_idx, content, is_private);
      await getCommentsCallback(post_idx);
    } catch (err) {
      if (err.message === "Error: Request failed with status code 401") {
        removeCookie("access_token", { path: "/" });
        handleLoginChange(false);
        NotificationManager.warning("로그인 후 작성가능합니다.", "Error");
      } else {
        NotificationManager.error("오류가 발생하였습니다.", "Error");
      }
    }
  };

  const modifyComment = async (comment_idx: number, content: string) => {
    try {
      axios.defaults.headers.common["access_token"] = cookies.access_token;
      await commentModify(comment_idx, content).then(
        (res: PostCommentResponse) => {
          if (res.status === 200) {
            NotificationManager.success("댓글을 수정하였습니다.", "Success");
          }
        }
      );
    } catch (err) {
      if (err.message === "Error: Request failed with status code 403") {
        NotificationManager.warning("권한이 없습니다.", "Error");
      } else if (err.message === "Error: Request failed with status code 401") {
        removeCookie("access_token", { path: "/" });
        handleLoginChange(false);
        NotificationManager.warning("로그인 후 작성가능합니다.", "Error");
      } else {
        NotificationManager.error("오류가 발생하였습니다.", "Error");
      }
    }
  };

  const deleteComment = async (comment_idx: number) => {
    try {
      axios.defaults.headers.common["access_token"] = cookies.access_token;
      await commentDelete(comment_idx).then((res: PostCommentResponse) => {
        if (res.status === 200) {
          NotificationManager.success("댓글을 삭제하였습니다.", "Success");
        }
      });
    } catch (err) {
      if (err.message === "Error: Request failed with status code 403") {
        NotificationManager.warning("권한이 없습니다.", "Error");
      } else if (err.message === "Error: Request failed with status code 401") {
        removeCookie("access_token", { path: "/" });
        NotificationManager.warning("로그인 시간이 만료되었습니다.", "Error");
      } else {
        NotificationManager.error("오류가 발생하였습니다.", "Error");
      }
    }
  };

  const createReply = async (
    comment_idx: number,
    content: string,
    is_private?: boolean
  ) => {
    try {
      axios.defaults.headers.common["access_token"] = cookies.access_token;
      await replyCreate(comment_idx, content, is_private);
      await getCommentsCallback(post_info.idx);
    } catch (err) {
      if (err.message === "Error: Request failed with status code 403") {
        NotificationManager.warning("권한이 없습니다.", "Error");
      } else if (err.message === "Error: Request failed with status code 401") {
        removeCookie("access_token", { path: "/" });
        handleLoginChange(false);
        NotificationManager.warning("로그인 후 작성가능합니다.", "Error");
      } else {
        NotificationManager.error("오류가 발생하였습니다.", "Error");
      }
    }
  };

  const modifyReply = async (reply_idx: number, content: string) => {
    try {
      axios.defaults.headers.common["access_token"] = cookies.access_token;
      await replyModify(reply_idx, content).then((res: PostCommentResponse) => {
        if (res.status === 200) {
          NotificationManager.success("댓글을 수정하였습니다.", "Success");
        }
      });
      await getCommentsCallback(post_info.idx);
    } catch (err) {
      if (err.message === "Error: Request failed with status code 403") {
        NotificationManager.warning("권한이 없습니다.", "Error");
      } else if (err.message === "Error: Request failed with status code 401") {
        removeCookie("access_token", { path: "/" });
        handleLoginChange(false);
        NotificationManager.warning("로그인 후 작성가능합니다.", "Error");
      } else {
        NotificationManager.error("오류가 발생하였습니다.", "Error");
      }
    }
  };

  const deleteReply = async (reply_idx: number) => {
    try {
      axios.defaults.headers.common["access_token"] = cookies.access_token;
      await replyDelete(reply_idx).then((res: PostCommentResponse) => {
        if (res.status === 200) {
          NotificationManager.success("댓글을 삭제하였습니다.", "Success");
        }
      });
      await getCommentsCallback(post_info.idx);
    } catch (err) {
      if (err.message === "Error: Request failed with status code 403") {
        NotificationManager.warning("권한이 없습니다.", "Error");
      } else if (err.message === "Error: Request failed with status code 410") {
        removeCookie("access_token", { path: "/" });
        NotificationManager.warning("로그인 시간이 만료되었습니다.", "Error");
      } else {
        NotificationManager.error("오류가 발생하였습니다.", "Error");
      }
    }
  };

  return (
    <>
      {!post_info.is_temp && (
        <Helmet
          title={post_info.title}
          meta={[
            { property: "og:type", content: "article" },
            {
              property: "og:title",
              content: `${post_info.description}`
            },
            { property: "og:image", content: `${post_info.thumbnail}` },
            {
              property: "og:url",
              content: `http://example.com/post/${post_info.idx}`
            }
          ]}
        />
      )}
      <Post
        createComment={createComment}
        modifyComment={modifyComment}
        deleteComment={deleteComment}
        createReply={createReply}
        modifyReply={modifyReply}
        deleteReply={deleteReply}
        userId={userId}
        getReplies={getReplies}
        admin={admin}
        login={login}
        loading={loading}
        comments={comments}
        post={post_info}
        hit_posts={hit_posts}
      />
    </>
  );
};

export default inject("store")(observer(withRouter(PostContainer)));
