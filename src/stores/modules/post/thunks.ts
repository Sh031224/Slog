import axios, { CancelTokenSource } from "axios";
import { post } from "lib/api";
import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import { getPostInfosAsync } from ".";
import { PostAction } from "./types";
import createAsyncThunk from "lib/createAsyncThunk";
import {
  createPostAsync,
  deletePostAsync,
  getCommentsCountAsync,
  getHitPostsAsync,
  modifyPostAsync
} from "./actions";
import { ICreatePostDTO } from "interface/IPost";
import { getCategoriesThunk } from "../category";

let getPostSource: CancelTokenSource;

export const getPostInfoThunk = (
  params: number
): ThunkAction<void, RootState, void, PostAction> => {
  return async (dispatch) => {
    if (getPostSource) {
      getPostSource.cancel();
    }

    getPostSource = axios.CancelToken.source();

    const { request, success, failure } = getPostInfosAsync;
    dispatch(request());

    try {
      const result = await post.getPost(params, getPostSource.token);

      dispatch(success(result.post));
    } catch (e) {
      if (!axios.isCancel(e)) {
        dispatch(failure(e));
      }
    }
  };
};

let createPostSource: CancelTokenSource;

export const createPostThunk = (
  params: ICreatePostDTO,
  callback: (isTemp: boolean, createdIdx?: number) => void,
  isTemp: boolean
): ThunkAction<void, RootState, void, PostAction> => {
  return async (dispatch) => {
    if (createPostSource) {
      createPostSource.cancel();
    }

    createPostSource = axios.CancelToken.source();

    const { request, success, failure } = createPostAsync;
    dispatch(request());

    try {
      const data = await post.createPost(params, createPostSource.token);

      dispatch(success());
      dispatch(getCategoriesThunk());
      callback(isTemp, data.data.idx);
    } catch (e) {
      if (!axios.isCancel(e)) {
        dispatch(failure(e));
      }
    }
  };
};

let modifyPostSource: CancelTokenSource;

export const modifyPostThunk = (
  idx: number,
  params: ICreatePostDTO,
  callback: (isTemp: boolean, createdIdx?: number) => void,
  isTemp: boolean
): ThunkAction<void, RootState, void, PostAction> => {
  return async (dispatch) => {
    if (modifyPostSource) {
      modifyPostSource.cancel();
    }

    modifyPostSource = axios.CancelToken.source();

    const { request, success, failure } = modifyPostAsync;
    dispatch(request());

    try {
      await post.modifyePost(idx, params, modifyPostSource.token);

      dispatch(success());
      dispatch(getPostInfoThunk(idx));
      dispatch(getCategoriesThunk());
      callback(isTemp);
    } catch (e) {
      if (!axios.isCancel(e)) {
        dispatch(failure(e));
      }
    }
  };
};

export const deletePostThunk = createAsyncThunk(
  deletePostAsync,
  post.deletePost,
  getCategoriesThunk
);
export const getHitPostsThunk = createAsyncThunk(getHitPostsAsync, post.getHitPosts);
export const getCommentsCountThunk = createAsyncThunk(getCommentsCountAsync, post.getCommentsCount);
