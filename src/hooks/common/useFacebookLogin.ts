/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NotificationManager } from "react-notifications";
import firebase from "firebase/app";

import type { RootState } from "stores/modules";
import { createFcmTokenThunk, getUserInfoThunk, logout, tryLoginThunk } from "stores/modules/user";

import { getToken, removeToken } from "lib/token";
import type { FacebookFailureResponse, FacebookLoginInfo } from "types/facebook";

import option from "../../config/firebase.json";
import "firebase/messaging";

const useFacebookLogin = () => {
  const dispatch = useDispatch();

  const { error } = useSelector((state: RootState) => state.user);
  const { login, user } = useSelector((state: RootState) => state.user.data);

  const isInitialMount = useRef<boolean>(true);

  const getFcmToken = async () => {
    if (!firebase.apps.length) {
      firebase.initializeApp(option);
    }
    const token = await firebase.messaging().getToken();
    dispatch(createFcmTokenThunk(token));
  };

  const requestNotification = () => {
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
  };

  const getUserInfoCallback = () => {
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
  };

  const loginSuccess = () => {
    NotificationManager.success("로그인 되었습니다.", "Success");
    getUserInfoCallback();
  };

  const tryLogin = (res: FacebookLoginInfo | FacebookFailureResponse) => {
    if (res.accessToken) {
      dispatch(tryLoginThunk(res.accessToken, loginSuccess));
    } else {
      NotificationManager.error("오류가 발생하였습니다.", "Error");
    }
  };

  const tryLogout = () => {
    removeToken();
    dispatch(logout());
  };

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

  return { login, appId: process.env.NEXT_PUBLIC_APP_ID, tryLogout, tryLogin };
};

export default useFacebookLogin;
