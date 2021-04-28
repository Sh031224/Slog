import { AxiosError } from "axios";
import { IPost, IPostInfo } from "interface/IPost";
import { ResponseType } from "interface/IResponse";
import { createAction, createAsyncAction } from "typesafe-actions";

export const CLEAR_ERROR = "post/CLEARERROR" as const;

export const GET_COMMENTS_COUNT = "comment/GET_COMMENTS_COUNT" as const;
export const GET_COMMENTS_COUNT_SUCCESS = "comment/GET_COMMENTS_COUNT_SUCCESS" as const;
export const GET_COMMENTS_COUNT_FAILURE = "comment/GET_COMMENTS_COUNT_FAILURE" as const;

export const GET_POST_INFO = "post/GET_POST_INFO" as const;
export const GET_POST_INFO_SUCCESS = "post/GET_POST_INFO_SUCCESS" as const;
export const GET_POST_INFO_FAILURE = "post/GET_POST_INFO_FAILURE" as const;

export const DELETE_POST = "post/DELETE_POST" as const;
export const DELETE_POST_SUCCESS = "post/DELETE_POST_SUCCESS" as const;
export const DELETE_POST_FAILURE = "post/DELETE_POST_FAILURE" as const;

export const GET_HIT_POSTS = "post/GET_HIT_POSTS" as const;
export const GET_HIT_POSTS_SUCCESS = "post/GET_HIT_POSTS_SUCCESS" as const;
export const GET_HIT_POSTS_FAILURE = "post/GET_HIT_POSTS_FAILURE" as const;

export const CREATE_POST = "post/CREATE_POST" as const;
export const CREATE_POST_SUCCESS = "post/CREATE_POST_SUCCESS" as const;
export const CREATE_POST_FAILURE = "post/CREATE_POST_FAILURE" as const;

export const MODIFY_POST = "post/MODIFY_POST" as const;
export const MODIFY_POST_SUCCESS = "post/MODIFY_POST_SUCCESS" as const;
export const MODIFY_POST_FAILURE = "post/MODIFY_POST_FAILURE" as const;

export const clearPostError = createAction(CLEAR_ERROR)();

export const getPostInfosAsync = createAsyncAction(
  GET_POST_INFO,
  GET_POST_INFO_SUCCESS,
  GET_POST_INFO_FAILURE
)<void, IPostInfo, AxiosError<ResponseType>>();

export const deletePostAsync = createAsyncAction(
  DELETE_POST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE
)<void, void, AxiosError<ResponseType>>();

export const getHitPostsAsync = createAsyncAction(
  GET_HIT_POSTS,
  GET_HIT_POSTS_SUCCESS,
  GET_HIT_POSTS_FAILURE
)<void, IPost[], AxiosError<ResponseType>>();

export const getCommentsCountAsync = createAsyncAction(
  GET_COMMENTS_COUNT,
  GET_COMMENTS_COUNT_SUCCESS,
  GET_COMMENTS_COUNT_FAILURE
)<void, number, AxiosError<ResponseType>>();

export const createPostAsync = createAsyncAction(
  CREATE_POST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE
)<void, void, AxiosError<ResponseType>>();

export const modifyPostAsync = createAsyncAction(
  MODIFY_POST,
  MODIFY_POST_SUCCESS,
  MODIFY_POST_FAILURE
)<void, void, AxiosError<ResponseType>>();
