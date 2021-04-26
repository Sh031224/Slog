import { AxiosError } from "axios";
import { IComment } from "interface/IPost";
import { ResponseType } from "interface/IResponse";
import { createAction, createAsyncAction } from "typesafe-actions";

export const CLEAR_ERROR = "comment/CLEARERROR" as const;

export const GET_COMMENTS = "comment/GET_COMMENTS" as const;
export const GET_COMMENTS_SUCCESS = "comment/GET_COMMENTS_SUCCESS" as const;
export const GET_COMMENTS_FAILURE = "comment/GET_COMMENTS_FAILURE" as const;

export const CREATE_COMMENT = "comment/CREATE_COMMENT" as const;
export const CREATE_COMMENT_SUCCESS = "comment/CREATE_COMMENT_SUCCESS" as const;
export const CREATE_COMMENT_FAILURE = "comment/CREATE_COMMENT_FAILURE" as const;

export const CREATE_REPLY = "comment/CREATE_REPLY" as const;
export const CREATE_REPLY_SUCCESS = "comment/CREATE_REPLY_SUCCESS" as const;
export const CREATE_REPLY_FAILURE = "comment/CREATE_REPLY_FAILURE" as const;

export const DELETE_COMMENT = "comment/DELETE_COMMENT" as const;
export const DELETE_COMMENT_SUCCESS = "comment/DELETE_COMMENT_SUCCESS" as const;
export const DELETE_COMMENT_FAILURE = "comment/DELETE_COMMENT_FAILURE" as const;

export const DELETE_REPLY = "comment/DELETE_REPLY" as const;
export const DELETE_REPLY_SUCCESS = "comment/DELETE_REPLY_SUCCESS" as const;
export const DELETE_REPLY_FAILURE = "comment/DELETE_REPLY_FAILURE" as const;

export const clearCommentError = createAction(CLEAR_ERROR)();

export const getCommentsAsync = createAsyncAction(
  GET_COMMENTS,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAILURE
)<void, IComment[], AxiosError<ResponseType>>();

export const createCommentAsync = createAsyncAction(
  CREATE_COMMENT,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAILURE
)<void, void, AxiosError<ResponseType>>();

export const createReplyAsync = createAsyncAction(
  CREATE_REPLY,
  CREATE_REPLY_SUCCESS,
  CREATE_REPLY_FAILURE
)<void, void, AxiosError<ResponseType>>();

export const deleteCommentAsync = createAsyncAction(
  DELETE_COMMENT,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE
)<void, void, AxiosError<ResponseType>>();

export const deleteReplyAsync = createAsyncAction(
  DELETE_REPLY,
  DELETE_REPLY_SUCCESS,
  DELETE_REPLY_FAILURE
)<void, void, AxiosError<ResponseType>>();
