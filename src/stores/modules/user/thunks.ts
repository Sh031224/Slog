import { user } from "lib/api";
import createAsyncThunk from "lib/createAsyncThunk";
import { setToken } from "lib/token";
import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import { createFcmTokenAsync, getUserInfoAsync, tryLoginAsync } from "./actions";
import { UserAction } from "./types";

export const createFcmTokenThunk = createAsyncThunk(createFcmTokenAsync, user.createFcmToken);

export const getUserInfoThunk = (
  callback?: () => void
): ThunkAction<void, RootState, void, UserAction> => {
  return async (dispatch) => {
    const { request, success, failure } = getUserInfoAsync;
    dispatch(request());

    try {
      const result = await user.getUserInfo();

      dispatch(success(result.user));
      if (callback) {
        callback();
      }
    } catch (e) {
      dispatch(failure(e));
    }
  };
};

export const tryLoginThunk = (
  params: string,
  callback: () => void
): ThunkAction<void, RootState, void, UserAction> => {
  return async (dispatch) => {
    const { request, success, failure } = tryLoginAsync;
    dispatch(request());

    try {
      const result = await user.tryLogin(params);

      setToken(result.access_token);
      dispatch(success());
      callback();
    } catch (e) {
      dispatch(failure(e));
    }
  };
};
