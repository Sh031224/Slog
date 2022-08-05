import axios, { CancelTokenSource } from "axios";
import { comment } from "lib/api";
import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import { getCommentsAsync, CommentAction } from ".";
import { CommentParamsDTO, ReplyParamsDTO } from "types/post";
import { createCommentAsync, createReplyAsync, deleteCommentAsync } from "./actions";
import { getCommentsCountThunk } from "../post";

let source: CancelTokenSource;

type PrevRequest = {
  idx?: number;
  source?: CancelTokenSource;
};

let prevCommentRequest: PrevRequest = {};
let prevReplyRequest: PrevRequest = {};

export const getCommentsThunk = (
  params: number
): ThunkAction<void, RootState, void, CommentAction> => {
  return async (dispatch) => {
    if (source) {
      source.cancel();
    }

    source = axios.CancelToken.source();

    const { request, success, failure } = getCommentsAsync;
    dispatch(request());

    try {
      const result = await comment.getComments(params, source.token);

      dispatch(success(result));
    } catch (e) {
      if (!axios.isCancel(e)) {
        dispatch(failure(e));
      }
    }
  };
};

export const createCommentThunk = (
  params: CommentParamsDTO,
  init: () => void
): ThunkAction<void, RootState, void, CommentAction> => {
  return async (dispatch) => {
    if (prevCommentRequest.idx === params.post_idx && prevCommentRequest.source) {
      prevCommentRequest.source.cancel();
    }

    prevCommentRequest.idx = params.post_idx;
    prevCommentRequest.source = axios.CancelToken.source();

    const { request, success, failure } = createCommentAsync;
    dispatch(request());

    try {
      await comment.createComment(params, prevCommentRequest.source.token);

      dispatch(success());
      init();
      dispatch(getCommentsThunk(params.post_idx));
      dispatch(getCommentsCountThunk(params.post_idx));
    } catch (e) {
      if (!axios.isCancel(e)) {
        dispatch(failure(e));
      }
    }
  };
};

export const createReplyThunk = (
  params: ReplyParamsDTO,
  init: () => void,
  postIdx: number
): ThunkAction<void, RootState, void, CommentAction> => {
  return async (dispatch) => {
    if (prevReplyRequest.idx === params.comment_idx && prevReplyRequest.source) {
      prevReplyRequest.source.cancel();
    }

    prevReplyRequest.idx = params.comment_idx;
    prevReplyRequest.source = axios.CancelToken.source();

    const { request, success, failure } = createReplyAsync;
    dispatch(request());

    try {
      await comment.createReply(params, prevReplyRequest.source.token);

      dispatch(success());
      init();
      dispatch(getCommentsThunk(postIdx));
      dispatch(getCommentsCountThunk(postIdx));
    } catch (e) {
      if (!axios.isCancel(e)) {
        dispatch(failure(e));
      }
    }
  };
};

export const modifyCommentThunk = (
  commentIdx: number,
  content: string,
  postIdx: number,
  init: () => void
): ThunkAction<void, RootState, void, CommentAction> => {
  return async (dispatch) => {
    const { request, success, failure } = deleteCommentAsync;
    dispatch(request());

    try {
      await comment.modifyComment(commentIdx, content);

      dispatch(success());
      dispatch(getCommentsThunk(postIdx));
      init();
    } catch (e) {
      dispatch(failure(e));
    }
  };
};

export const modifyReplyThunk = (
  replyIdx: number,
  content: string,
  postIdx: number,
  init: () => void
): ThunkAction<void, RootState, void, CommentAction> => {
  return async (dispatch) => {
    const { request, success, failure } = deleteCommentAsync;
    dispatch(request());

    try {
      await comment.modifyReply(replyIdx, content);

      dispatch(success());
      dispatch(getCommentsThunk(postIdx));
      init();
    } catch (e) {
      dispatch(failure(e));
    }
  };
};

export const deleteCommentThunk = (
  commentIdx: number,
  postIdx: number
): ThunkAction<void, RootState, void, CommentAction> => {
  return async (dispatch) => {
    const { request, success, failure } = deleteCommentAsync;
    dispatch(request());

    try {
      await comment.deleteComment(commentIdx);

      dispatch(success());
      dispatch(getCommentsThunk(postIdx));
    } catch (e) {
      dispatch(failure(e));
    }
  };
};

export const deleteReplyThunk = (
  replyIdx: number,
  postIdx: number
): ThunkAction<void, RootState, void, CommentAction> => {
  return async (dispatch) => {
    const { request, success, failure } = deleteCommentAsync;
    dispatch(request());

    try {
      await comment.deleteReply(replyIdx);

      dispatch(success());
      dispatch(getCommentsThunk(postIdx));
    } catch (e) {
      dispatch(failure(e));
    }
  };
};
