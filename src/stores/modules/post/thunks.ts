import axios, { CancelTokenSource } from "axios";
import { post } from "lib/api";
import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import { getPostInfosAsync } from ".";
import { PostAction } from "./types";
import createAsyncThunk from "lib/createAsyncThunk";
import { clearPostError, deletePostAsync, getHitPostsAsync } from "./actions";

let source: CancelTokenSource;

export const getPostInfoThunk = (
  params: number
): ThunkAction<void, RootState, void, PostAction> => {
  return async (dispatch) => {
    if (source) {
      source.cancel();
    }

    source = axios.CancelToken.source();

    const { request, success, failure } = getPostInfosAsync;
    dispatch(request());

    try {
      const result = await post.getPost(params, source.token);

      dispatch(success(result.post));
    } catch (e) {
      if (!axios.isCancel(e)) {
        dispatch(failure(e));
        dispatch(clearPostError());
      }
    }
  };
};

export const deletePostThunk = createAsyncThunk(deletePostAsync, post.deletePost);
export const getHitPostsThunk = createAsyncThunk(getHitPostsAsync, post.getHitPosts);
