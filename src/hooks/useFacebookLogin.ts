import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "stores/modules";
import { getUserInfoThunk, logout, tryLoginThunk } from "stores/modules/user";
import { appId } from "config/index.json";
import { getToken, removeToken } from "lib/token";
import { NotificationManager } from "react-notifications";
import { IFacebookFailureResponse, IFacebookLoginInfo } from "interface/IFacebook";

const useFacebookLogin = () => {
  const dispatch = useDispatch();

  const { error } = useSelector((state: RootState) => state.user);
  const { login, user } = useSelector((state: RootState) => state.user.data);

  const tryLogin = useCallback(
    (res: IFacebookLoginInfo | IFacebookFailureResponse) => {
      if (res.accessToken) {
        dispatch(tryLoginThunk(res.accessToken));
        NotificationManager.success("로그인 되었습니다.", "Success");
      } else {
        NotificationManager.error("오류가 발생하였습니다.", "Error");
      }
    },
    [dispatch]
  );

  const tryLogout = useCallback(() => {
    removeToken();
    dispatch(logout());
  }, []);

  const getUserInfoCallback = useCallback(() => {
    if (!error && !login && getToken() && !user.name) {
      dispatch(getUserInfoThunk());
    }
  }, [error, login, user]);

  useEffect(() => {
    getUserInfoCallback();
  }, [error, login]);

  useEffect(() => {
    if (error) {
      if (!error.message.includes("401")) {
        NotificationManager.error("오류가 발생하였습니다.", "Error");
      }
    }
  }, [error]);

  return { login, appId, tryLogout, tryLogin };
};

export default useFacebookLogin;
