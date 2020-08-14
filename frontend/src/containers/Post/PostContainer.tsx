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
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

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

interface GetPostInfoResponse {
  status: number;
  message: string;
  data: {
    post: PostInfoType;
  };
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

interface GetPostCommentCountResponse {
  status: number;
  message: string;
  data: {
    total_count: number;
  };
}

const PostContainer = ({ match, store }: PostContainerProps) => {
  const history = useHistory();
  const { idx } = match.params;

  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);

  const {
    getPostInfo,
    hit_posts,
    handleHitPosts,
    deletePost,
    getPostCommentCount
  } = store!.PostStore;
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
    admin,
    login,
    userId,
    adminId,
    handleLoginChange,
    handleAdminProfile
  } = store!.UserStore;

  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(false);
  const [handler, setHandler] = useState<boolean>(false);
  const [commentCount, setCommentCount] = useState<number>(0);
  const [post_info, setPostInfo] = useState<
    PostInfoType | SetStateAction<PostInfoType | any>
  >({});

  const getPostInfoCallback = useCallback(
    async (idx: number) => {
      await getPostInfo(idx).then((response: GetPostInfoResponse) => {
        setPostInfo(response.data.post);
        setCommentCount(response.data.post.comment_count);
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
    [idx, login]
  );

  const getHitPostsCallback = useCallback(async () => {
    const query: PostParmsType = {
      page: 1,
      limit: 5,
      order: "hit"
    };
    await handleHitPosts(query);
  }, [idx]);

  const getAllContent = useCallback(async () => {
    setLoading(true);
    axios.defaults.headers.common["access_token"] = cookies.access_token;
    try {
      await getHitPostsCallback();
      await getPostInfoCallback(Number(idx));
      await handleAdminProfile().catch((err: Error) => {
        console.log(err);
      });
      setLoading(false);
    } catch (err) {
      if (err.message === "Error: Request failed with status code 404") {
        NotificationManager.warning("해당 게시글이 없습니다.", "Error");
        history.push("/");
      } else {
        NotificationManager.error("오류가 발생하였습니다.", "Error");
      }
    }
  }, [idx]);

  const createComment = useCallback(
    async (post_idx: number, content: string, is_private?: boolean) => {
      try {
        await commentCreate(post_idx, content, is_private);
        await getCommentsCallback(post_idx);
        await getPostCommentCount(post_idx).then(
          (res: GetPostCommentCountResponse) => {
            setCommentCount(res.data.total_count);
          }
        );
      } catch (err) {
        if (err.message === "Error: Request failed with status code 401") {
          removeCookie("access_token", { path: "/" });
          handleLoginChange(false);
          NotificationManager.warning("로그인 후 작성가능합니다.", "Error");
        } else {
          NotificationManager.error("오류가 발생하였습니다.", "Error");
        }
      }
    },
    [login]
  );

  const modifyComment = useCallback(
    async (comment_idx: number, content: string) => {
      try {
        await commentModify(comment_idx, content).then(
          (res: PostCommentResponse) => {
            if (res.status === 200) {
              NotificationManager.success("댓글을 수정하였습니다.", "Success");
            }
          }
        );
        await getCommentsCallback(Number(idx));
      } catch (err) {
        if (err.message === "Error: Request failed with status code 403") {
          NotificationManager.warning("권한이 없습니다.", "Error");
        } else if (
          err.message === "Error: Request failed with status code 401"
        ) {
          removeCookie("access_token", { path: "/" });
          handleLoginChange(false);
          NotificationManager.warning("로그인 후 작성가능합니다.", "Error");
        } else {
          NotificationManager.error("오류가 발생하였습니다.", "Error");
        }
      }
    },
    [login, idx]
  );

  const deleteCommentCallback = useCallback(
    async (comment_idx: number) => {
      try {
        await commentDelete(comment_idx).then((res: PostCommentResponse) => {
          if (res.status === 200) {
            NotificationManager.success("댓글을 삭제하였습니다.", "Success");
          }
        });
        await getCommentsCallback(Number(idx));
        await getPostCommentCount(Number(idx)).then(
          (res: GetPostCommentCountResponse) => {
            setCommentCount(res.data.total_count);
          }
        );
      } catch (err) {
        if (err.message === "Error: Request failed with status code 403") {
          NotificationManager.warning("권한이 없습니다.", "Error");
        } else if (
          err.message === "Error: Request failed with status code 401"
        ) {
          removeCookie("access_token", { path: "/" });
          NotificationManager.warning("로그인 시간이 만료되었습니다.", "Error");
        } else {
          NotificationManager.error("오류가 발생하였습니다.", "Error");
        }
      }
    },
    [login, idx]
  );

  const deleteComment = useCallback(
    async (comment_idx: number) => {
      confirmAlert({
        title: "Warning",
        message: "정말로 삭제하시겠습니까?",
        buttons: [
          {
            label: "Yes",
            onClick: () => deleteCommentCallback(comment_idx)
          },
          {
            label: "No",
            onClick: () => {
              return;
            }
          }
        ]
      });
    },
    [deleteCommentCallback]
  );

  const createReply = useCallback(
    async (comment_idx: number, content: string, is_private?: boolean) => {
      try {
        await replyCreate(comment_idx, content, is_private);
        await getCommentsCallback(Number(idx));
        await getPostCommentCount(Number(idx)).then(
          (res: GetPostCommentCountResponse) => {
            setCommentCount(res.data.total_count);
          }
        );
      } catch (err) {
        if (err.message === "Error: Request failed with status code 403") {
          NotificationManager.warning("권한이 없습니다.", "Error");
        } else if (
          err.message === "Error: Request failed with status code 401"
        ) {
          removeCookie("access_token", { path: "/" });
          handleLoginChange(false);
          NotificationManager.warning("로그인 후 작성가능합니다.", "Error");
        } else {
          NotificationManager.error("오류가 발생하였습니다.", "Error");
        }
      }
    },
    [login]
  );

  const modifyReply = useCallback(
    async (reply_idx: number, content: string) => {
      try {
        await replyModify(reply_idx, content).then(
          (res: PostCommentResponse) => {
            if (res.status === 200) {
              NotificationManager.success("댓글을 수정하였습니다.", "Success");
            }
          }
        );
        await getCommentsCallback(Number(idx));
      } catch (err) {
        if (err.message === "Error: Request failed with status code 403") {
          NotificationManager.warning("권한이 없습니다.", "Error");
        } else if (
          err.message === "Error: Request failed with status code 401"
        ) {
          removeCookie("access_token", { path: "/" });
          handleLoginChange(false);
          NotificationManager.warning("로그인 후 작성가능합니다.", "Error");
        } else {
          NotificationManager.error("오류가 발생하였습니다.", "Error");
        }
      }
    },
    [login]
  );

  const deleteReplyCallback = useCallback(
    async (reply_idx: number) => {
      try {
        await replyDelete(reply_idx).then((res: PostCommentResponse) => {
          if (res.status === 200) {
            NotificationManager.success("댓글을 삭제하였습니다.", "Success");
          }
        });
        await getCommentsCallback(Number(idx));
        await getPostCommentCount(Number(idx)).then(
          (res: GetPostCommentCountResponse) => {
            setCommentCount(res.data.total_count);
          }
        );
      } catch (err) {
        if (err.message === "Error: Request failed with status code 403") {
          NotificationManager.warning("권한이 없습니다.", "Error");
        } else if (
          err.message === "Error: Request failed with status code 410"
        ) {
          removeCookie("access_token", { path: "/" });
          NotificationManager.warning("로그인 시간이 만료되었습니다.", "Error");
        } else {
          NotificationManager.error("오류가 발생하였습니다.", "Error");
        }
      }
    },
    [login]
  );

  const deleteReply = useCallback(
    (reply_idx: number) => {
      confirmAlert({
        title: "Warning",
        message: "정말로 삭제하시겠습니까?",
        buttons: [
          {
            label: "Yes",
            onClick: () => deleteReplyCallback(reply_idx)
          },
          {
            label: "No",
            onClick: () => {
              return;
            }
          }
        ]
      });
    },
    [deleteReplyCallback]
  );

  const editPost = useCallback(() => {
    history.push(`/handle/${Number(idx)}`);
  }, [idx]);

  const deletePostCallback = useCallback(() => {
    deletePost(Number(idx))
      .then((res) => {
        history.push("/");
        NotificationManager.success("게시글을 삭제하였습니다.", "Success");
      })
      .catch((err: Error) => {
        NotificationManager.error("오류가 발생하였습니다.", "Error");
      });
  }, [idx]);

  const deletePostAlert = useCallback(() => {
    confirmAlert({
      title: "Warning",
      message: "정말로 삭제하시겠습니까?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deletePostCallback()
        },
        {
          label: "No",
          onClick: () => setHandler(false)
        }
      ]
    });
  }, [idx]);

  useEffect(() => {
    getAllContent();
  }, [getAllContent]);

  useEffect(() => {
    getCommentsCallback(Number(idx));
  }, [getCommentsCallback]);

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
        adminId={adminId}
        commentCount={commentCount}
        deletePostAlert={deletePostAlert}
        handler={handler}
        setHandler={setHandler}
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
        editPost={editPost}
      />
    </>
  );
};

export default inject("store")(observer(withRouter(PostContainer)));
