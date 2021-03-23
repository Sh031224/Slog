import { inject, observer } from "mobx-react";
import React, { useCallback, useEffect, useState, SetStateAction } from "react";
import { useRouter } from "next/router";
import cookies from "js-cookie";
import { NotificationManager } from "react-notifications";
import { confirmAlert } from "react-confirm-alert";
import Head from "next/head";
import dynamic from "next/dynamic";
import useStore from "lib/hooks/useStore";
import { PostInfoType, PostParmsType } from "types/PostType";
import { GetPostCommentCountResponse, GetPostInfoResponse, ResponseType } from "types/Response";

const Post = dynamic(() => import("components/Post"));

interface PostContainerProps {
  post: PostInfoType;
}

const PostContainer = ({ post }: PostContainerProps) => {
  const router = useRouter();
  const { store } = useStore();
  const { idx } = router.query;

  const { handlePrevUrl, prevUrl } = store.HistoryStore;
  const { getPostInfo, hitPosts, handleHitPosts, deletePost, getPostCommentCount } = store.PostStore;
  const {
    comments,
    initComments,
    getComments,
    getReplies,
    commentCreate,
    commentModify,
    commentDelete,
    replyCreate,
    replyModify,
    replyDelete
  } = store.CommentStore;
  const { admin, login, userId, handleLoginChange } = store.UserStore;

  const [loading, setLoading] = useState(true);
  const [handler, setHandler] = useState<boolean>(false);
  const [commentCount, setCommentCount] = useState<number>(0);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [postInfo, setPostInfo] = useState<PostInfoType | SetStateAction<PostInfoType | any>>({});

  const getPostInfoCallback = useCallback(
    async (idx: number) => {
      if (!isNaN(idx)) {
        await getPostInfo(idx).then((response: GetPostInfoResponse) => {
          setPostInfo(response.data.post);
          setCommentCount(response.data.post.comment_count);
        });
      }
    },
    [idx]
  );

  const getCommentsCallback = useCallback(
    async (postIdx: number) => {
      if (!isNaN(postIdx)) {
        await getComments(postIdx).catch((err: Error) => {
          if (err.message !== "Error: Request failed with status code 404") {
            NotificationManager.error("오류가 발생하였습니다.", "Error");
          }
        });
      }
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
    if (!isNaN(Number(idx))) {
      try {
        if (!post.idx) {
          //csr
          await getPostInfoCallback(Number(idx));
        } else {
          // ssr
          setPostInfo(post);
          setCommentCount(post.comment_count);
        }
        await getHitPostsCallback();
        setLoading(false);
      } catch (err) {
        if (err.message === "Error: Request failed with status code 404") {
          NotificationManager.warning("해당 게시글이 없습니다.", "Error");
          router.push("/");
        } else {
          router.push("/");
          NotificationManager.error("오류가 발생하였습니다.", "Error");
        }
      }
    }
  }, [idx]);

  const createComment = useCallback(
    async (postIdx: number, content: string, isPrivate?: boolean) => {
      if (!isSaving) {
        setIsSaving(true);
        try {
          await commentCreate(postIdx, content, isPrivate);
          await getCommentsCallback(postIdx);
          await getPostCommentCount(postIdx).then((res: GetPostCommentCountResponse) => {
            setCommentCount(res.data.total_count);
          });
          setIsSaving(false);
        } catch (err) {
          if (err.message === "Error: Request failed with status code 401") {
            cookies.remove("access_token", { path: "/" });
            handleLoginChange(false);
            NotificationManager.warning("로그인 후 작성가능합니다.", "Error");
          } else {
            NotificationManager.error("오류가 발생하였습니다.", "Error");
          }
          setIsSaving(false);
        }
      }
    },
    [login, isSaving]
  );

  const modifyComment = useCallback(
    async (commentIdx: number, content: string) => {
      if (!isSaving) {
        setIsSaving(true);
        try {
          await commentModify(commentIdx, content).then((res: ResponseType) => {
            if (res.status === 200) {
              NotificationManager.success("댓글을 수정하였습니다.", "Success");
            }
          });
          await getCommentsCallback(Number(idx));
          setIsSaving(false);
        } catch (err) {
          if (err.message === "Error: Request failed with status code 403") {
            NotificationManager.warning("권한이 없습니다.", "Error");
          } else if (err.message === "Error: Request failed with status code 401") {
            cookies.remove("access_token", { path: "/" });
            handleLoginChange(false);
            NotificationManager.warning("로그인 후 작성가능합니다.", "Error");
          } else {
            NotificationManager.error("오류가 발생하였습니다.", "Error");
          }
          setIsSaving(false);
        }
      }
    },
    [login, idx]
  );

  const deleteCommentCallback = useCallback(
    async (commentIdx: number) => {
      try {
        await commentDelete(commentIdx).then((res: ResponseType) => {
          if (res.status === 200) {
            NotificationManager.success("댓글을 삭제하였습니다.", "Success");
          }
        });
        await getCommentsCallback(Number(idx));
        await getPostCommentCount(Number(idx)).then((res: GetPostCommentCountResponse) => {
          setCommentCount(res.data.total_count);
        });
      } catch (err) {
        if (err.message === "Error: Request failed with status code 403") {
          NotificationManager.warning("권한이 없습니다.", "Error");
        } else if (err.message === "Error: Request failed with status code 401") {
          cookies.remove("access_token", { path: "/" });
          NotificationManager.warning("로그인 시간이 만료되었습니다.", "Error");
        } else {
          NotificationManager.error("오류가 발생하였습니다.", "Error");
        }
      }
    },
    [login, idx]
  );

  const deleteComment = useCallback(
    async (commentIdx) => {
      confirmAlert({
        title: "Warning",
        message: "정말로 삭제하시겠습니까?",
        buttons: [
          {
            label: "Yes",
            onClick: () => deleteCommentCallback(commentIdx)
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
    async (commentIdx: number, content: string, isPrivate?: boolean) => {
      if (!isSaving) {
        setIsSaving(true);
        try {
          await replyCreate(commentIdx, content, isPrivate);
          await getCommentsCallback(Number(idx));
          await getPostCommentCount(Number(idx)).then((res: GetPostCommentCountResponse) => {
            setCommentCount(res.data.total_count);
          });
          setIsSaving(false);
        } catch (err) {
          if (err.message === "Error: Request failed with status code 403") {
            NotificationManager.warning("권한이 없습니다.", "Error");
          } else if (err.message === "Error: Request failed with status code 401") {
            cookies.remove("access_token", { path: "/" });
            handleLoginChange(false);
            NotificationManager.warning("로그인 후 작성가능합니다.", "Error");
          } else {
            NotificationManager.error("오류가 발생하였습니다.", "Error");
          }
          setIsSaving(false);
        }
      }
    },
    [login, isSaving]
  );

  const modifyReply = useCallback(
    async (replyIdx: number, content: string) => {
      if (!isSaving) {
        setIsSaving(true);
        try {
          await replyModify(replyIdx, content).then((res: ResponseType) => {
            if (res.status === 200) {
              NotificationManager.success("댓글을 수정하였습니다.", "Success");
            }
          });
          await getCommentsCallback(Number(idx));
          setIsSaving(false);
        } catch (err) {
          if (err.message === "Error: Request failed with status code 403") {
            NotificationManager.warning("권한이 없습니다.", "Error");
          } else if (err.message === "Error: Request failed with status code 401") {
            cookies.remove("access_token", { path: "/" });
            handleLoginChange(false);
            NotificationManager.warning("로그인 후 작성가능합니다.", "Error");
          } else {
            NotificationManager.error("오류가 발생하였습니다.", "Error");
          }
          setIsSaving(false);
        }
      }
    },
    [login]
  );

  const deleteReplyCallback = useCallback(
    async (replyIdx: number) => {
      try {
        await replyDelete(replyIdx).then((res: ResponseType) => {
          if (res.status === 200) {
            NotificationManager.success("댓글을 삭제하였습니다.", "Success");
          }
        });
        await getCommentsCallback(Number(idx));
        await getPostCommentCount(Number(idx)).then((res: GetPostCommentCountResponse) => {
          setCommentCount(res.data.total_count);
        });
      } catch (err) {
        if (err.message === "Error: Request failed with status code 403") {
          NotificationManager.warning("권한이 없습니다.", "Error");
        } else if (err.message === "Error: Request failed with status code 410") {
          cookies.remove("access_token", { path: "/" });
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
    router.push(`/handle/${Number(idx)}`);
  }, [idx]);

  const deletePostCallback = useCallback(() => {
    deletePost(Number(idx))
      .then(() => {
        router.push("/");
        NotificationManager.success("게시글을 삭제하였습니다.", "Success");
      })
      .catch(() => {
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
    handlePrevUrl();
    return () => handlePrevUrl();
  }, [prevUrl]);

  useEffect(() => {
    getAllContent();
  }, [getAllContent]);

  useEffect(() => {
    initComments();
    getCommentsCallback(Number(idx));
  }, [getCommentsCallback]);

  return (
    <>
      {(postInfo.idx || (post && post.idx)) && (!postInfo.is_temp || !post.is_temp) && (
        <Head>
          <title>{post.title || postInfo.title}</title>
          <meta
            name="description"
            content={
              post.description
                ? post.description.replace(/ +/g, " ").replace(/#+ |-+ |!+\[+.*\]+\(+.*\)|\`|\>+ |\[!+\[+.*\]+\(+.*\)|\<br+.*\>|\[.*\]\(.*\)/g, "")
                : postInfo.description
                    .replace(/ +/g, " ")
                    .replace(/#+ |-+ |!+\[+.*\]+\(+.*\)|\`|\>+ |\[!+\[+.*\]+\(+.*\)|\<br+.*\>|\[.*\]\(.*\)/g, "") || ""
            }
          />
          <meta property="og:url" content={`https://slog.website/post/${post.idx || postInfo.idx}`} />
          <meta property="og:title" content={post.title || postInfo.title} />
          <meta
            property="og:description"
            content={
              post.description
                ? post.description.replace(/ +/g, " ").replace(/#+ |-+ |!+\[+.*\]+\(+.*\)|\`|\>+ |\[!+\[+.*\]+\(+.*\)|\<br+.*\>|\[.*\]\(.*\)/g, "")
                : postInfo.description
                    .replace(/ +/g, " ")
                    .replace(/#+ |-+ |!+\[+.*\]+\(+.*\)|\`|\>+ |\[!+\[+.*\]+\(+.*\)|\<br+.*\>|\[.*\]\(.*\)/g, "") || ""
            }
          />
          <meta property="twitter:title" content={post.title || postInfo.title} />
          <meta
            property="twitter:description"
            content={
              post.description
                ? post.description.replace(/ +/g, " ").replace(/#+ |-+ |!+\[+.*\]+\(+.*\)|\`|\>+ |\[!+\[+.*\]+\(+.*\)|\<br+.*\>|\[.*\]\(.*\)/g, "")
                : postInfo.description || ""
            }
          />
          {post.title || postInfo.thumbnail ? (
            <>
              <meta property="og:image" content={post.title || postInfo.thumbnail} />
              <meta property="twitter:image" content={post.thumbnail || postInfo.thumbnail} />
            </>
          ) : (
            <>
              <meta property="og:image" content={"https://data.slog.website/public/op_logo.png"} />
              <meta property="twitter:image" content={"https://data.slog.website/public/op_logo.png"} />
            </>
          )}
        </Head>
      )}
      <Post
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
        postInfo={postInfo}
        post={post || null}
        hitPosts={hitPosts}
        editPost={editPost}
      />
    </>
  );
};

export default observer(PostContainer);
