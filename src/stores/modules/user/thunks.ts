import { user } from "lib/api";
import createAsyncThunk from "lib/createAsyncThunk";
import { setToken } from "lib/token";
import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import { getUserInfoAsync, tryLoginAsync } from "./actions";
import { UserAction } from "./types";

export const getUserInfoThunk = createAsyncThunk(getUserInfoAsync, user.getUserInfo);
export const tryLoginThunk = (params: string): ThunkAction<void, RootState, void, UserAction> => {
  return async (dispatch) => {
    const { request, success, failure } = tryLoginAsync;
    dispatch(request());

    try {
      const result = await user.tryLogin(params);

      setToken(result.access_token);
      dispatch(success());
    } catch (e) {
      dispatch(failure(e));
    }
  };
};
