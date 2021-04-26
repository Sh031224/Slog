import { AxiosError } from "axios";
import { IPost, IPostInfo } from "interface/IPost";
import { ResponseType } from "interface/IResponse";
import { createAction, createAsyncAction } from "typesafe-actions";

export const CLEAR_ERROR = "post/CLEARERROR" as const;

export const GET_POST_INFO = "post/GET_POST_INFO" as const;
export const GET_POST_INFO_SUCCESS = "post/GET_POST_INFO_SUCCESS" as const;
export const GET_POST_INFO_FAILURE = "post/GET_POST_INFO_FAILURE" as const;

export const DELETE_POST = "post/DELETE_POST" as const;
export const DELETE_POST_SUCCESS = "post/DELETE_POST_SUCCESS" as const;
export const DELETE_POST_FAILURE = "post/DELETE_POST_FAILURE" as const;

export const GET_HIT_POSTS = "post/GET_HIT_POSTS" as const;
export const GET_HIT_POSTS_SUCCESS = "post/GET_HIT_POSTS_SUCCESS" as const;
export const GET_HIT_POSTS_FAILURE = "post/GET_HIT_POSTS_FAILURE" as const;

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
