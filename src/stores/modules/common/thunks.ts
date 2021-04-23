import axios, { CancelTokenSource } from "axios";
import { post } from "lib/api";
import { ThunkAction } from "redux-thunk";
import { IPostParmsDTO } from "interface/IPost";
import { RootState } from "..";
import { getPostsAsync, getSearchPostsAsync, getTempPostsAsync } from "./actions";
import { CommonAction } from "./types";

let source: CancelTokenSource;

export const getPostsThunk = (
  params: IPostParmsDTO
): ThunkAction<void, RootState, void, CommonAction> => {
  return async (dispatch) => {
    if (source) {
      source.cancel();
    }

    source = axios.CancelToken.source();

    const { request, success, failure } = getPostsAsync;
    dispatch(request());

    try {
      const result = await post.getPosts(params, source.token);

      dispatch(success(result));
    } catch (e) {
      if (!axios.isCancel(e)) {
        dispatch(failure(e));
      }
    }
  };
};

export const getTempPostsThunk = (): ThunkAction<void, RootState, void, CommonAction> => {
  return async (dispatch) => {
    if (source) {
      source.cancel();
    }

    source = axios.CancelToken.source();

    const { request, success, failure } = getTempPostsAsync;
    dispatch(request());

    try {
      const result = await post.getTempPosts(source.token);

      dispatch(success(result));
    } catch (e) {
      if (!axios.isCancel(e)) {
        dispatch(failure(e));
      }
    }
  };
};

export const getSearchPostsThunk = (
  query: string
): ThunkAction<void, RootState, void, CommonAction> => {
  return async (dispatch) => {
    if (source) {
      source.cancel();
    }

    source = axios.CancelToken.source();

    const { request, success, failure } = getSearchPostsAsync;
    dispatch(request());

    try {
      const result = await post.getSearchPosts(query, source.token);

      dispatch(success(result));
    } catch (e) {
      if (!axios.isCancel(e)) {
        dispatch(failure(e));
      }
    }
  };
};
