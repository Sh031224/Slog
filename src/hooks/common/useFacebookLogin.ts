import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "stores/modules";
import { createFcmTokenThunk, getUserInfoThunk, logout, tryLoginThunk } from "stores/modules/user";
import { appId } from "config/index.json";
import { getToken, removeToken } from "lib/token";
import { NotificationManager } from "react-notifications";
import { IFacebookFailureResponse, IFacebookLoginInfo } from "interface/IFacebook";
import firebase from "firebase/app";
import option from "../../config/firebase.json";
import "firebase/messaging";

const useFacebookLogin = () => {
  const dispatch = useDispatch();

  const { error } = useSelector((state: RootState) => state.user);
  const { login, user } = useSelector((state: RootState) => state.user.data);

  const isInitialMount = useRef<boolean>(true);

  const getFcmToken = useCallback(async () => {
    if (!firebase.apps.length) {
      firebase.initializeApp(option);
    }
    const token = await firebase.messaging().getToken();
    dispatch(createFcmTokenThunk(token));
  }, []);

  const requestNotification = useCallback(() => {
    if ("Notification" in window) {
      try {
        Notification.requestPermission().then((permission: NotificationPermission) => {
          if (permission === "granted") {
            getFcmToken();
          }
        });
      } catch (error) {
        // Safari doesn't return a promise for requestPermissions and it
        // throws a TypeError. It takes a callback as the first argument
        // instead.
        if (error instanceof TypeError) {
          Notification.requestPermission((permission: NotificationPermission) => {
            if (permission === "granted") {
              getFcmToken();
            }
          });
        }
      }
    }
  }, [getFcmToken]);

  const getUserInfoCallback = useCallback(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;

      if (login) {
        requestNotification();
      } else if (!error && getToken() && !user.name) {
        dispatch(getUserInfoThunk(requestNotification));
      }
    } else {
      if (!error && !login && getToken() && !user.name) {
        dispatch(getUserInfoThunk(requestNotification));
      }
    }
  }, [error, login, user, requestNotification]);

  const loginSuccess = useCallback(() => {
    NotificationManager.success("로그인 되었습니다.", "Success");
    getUserInfoCallback();
  }, [getUserInfoCallback]);

  const tryLogin = useCallback(
    (res: IFacebookLoginInfo | IFacebookFailureResponse) => {
      if (res.accessToken) {
        dispatch(tryLoginThunk(res.accessToken, loginSuccess));
      } else {
        NotificationManager.error("오류가 발생하였습니다.", "Error");
      }
    },
    [dispatch, loginSuccess]
  );

  const tryLogout = useCallback(() => {
    removeToken();
    dispatch(logout());
  }, []);

  useEffect(() => {
    getUserInfoCallback();
  }, [error, login]);

  useEffect(() => {
    if (error && error.response) {
      if (error.response.status !== 401) {
        NotificationManager.error("오류가 발생하였습니다.", "Error");
      }
    }
  }, [error]);

  return { login, appId, tryLogout, tryLogin };
};

export default useFacebookLogin;
