import { AxiosError } from "axios";
import { Post } from "types/post";
import { ResponseType } from "types/response";
import { createAction, createAsyncAction } from "typesafe-actions";

export const CLEAR_ERROR = "common/CLEAR_ERROR" as const;

export const GET_POSTS = "common/GET_POSTS" as const;
export const GET_POSTS_SUCCESS = "common/GET_POSTS_SUCCESS" as const;
export const GET_POSTS_FAILURE = "common/GET_POSTS_FAILURE" as const;

export const GET_TEMP_POSTS = "common/GET_TEMP_POSTS" as const;
export const GET_TEMP_POSTS_SUCCESS = "common/GET_TEMP_POSTS_SUCCESS" as const;
export const GET_TEMP_POSTS_FAILURE = "common/GET_TEMP_POSTS_FAILURE" as const;

export const GET_SEARCH_POSTS = "common/GET_SEARCH_POSTS" as const;
export const GET_SEARCH_POSTS_SUCCESS = "common/GET_SEARCH_POSTS_SUCCESS" as const;
export const GET_SEARCH_POSTS_FAILURE = "common/GET_SEARCH_POSTS_FAILURE" as const;

export const INCREASE_PAGE = "common/INCREASE_PAGE" as const;
export const RESET_PAGE = "common/RESET_PAGE" as const;

export const clearCommonError = createAction(CLEAR_ERROR)();

export const getPostsAsync = createAsyncAction(GET_POSTS, GET_POSTS_SUCCESS, GET_POSTS_FAILURE)<
  number,
  { posts: Post[]; total: number; notfound: boolean },
  AxiosError<ResponseType>
>();

export const getTempPostsAsync = createAsyncAction(
  GET_TEMP_POSTS,
  GET_TEMP_POSTS_SUCCESS,
  GET_TEMP_POSTS_FAILURE
)<void, Post[], AxiosError<ResponseType>>();

export const getSearchPostsAsync = createAsyncAction(
  GET_SEARCH_POSTS,
  GET_SEARCH_POSTS_SUCCESS,
  GET_SEARCH_POSTS_FAILURE
)<void, Post[], AxiosError<ResponseType>>();

export const increasePage = createAction(INCREASE_PAGE)();
export const resetPage = createAction(RESET_PAGE)();
