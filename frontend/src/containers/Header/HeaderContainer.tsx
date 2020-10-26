import { inject, observer } from "mobx-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import UserStore from "../../stores/UserStore";
import axios from "axios";
import {
  ReactFacebookFailureResponse,
  ReactFacebookLoginInfo
} from "react-facebook-login";
import { NotificationManager } from "react-notifications";
import { useRouter } from "next/router";
import cookies from "js-cookie";
import firebase from "firebase/app";
import option from "../../config/firebase.json";
import "firebase/messaging";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("components/common/Header"));

interface HeaderContainerProps {
  store?: StoreType;
  token?: string;
}

interface StoreType {
  UserStore: UserStore;
}

interface FacebookLoginInfo extends ReactFacebookLoginInfo {
  accessToken: string;
}

interface FacebookFailureResponse extends ReactFacebookFailureResponse {
  accessToken?: string;
}

const HeaderContainer = ({ store, token }: HeaderContainerProps) => {
  const {
    handleUser,
    haldleAdminFalse,
    login,
    handleLoginChange,
    handleLogin,
    handleFcm
  } = store!.UserStore;
  const searchEl = useRef<HTMLElement>(null);
  const inputEl = useRef<HTMLElement>(null);

  const router = useRouter();

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["access_token"] = token;
    } else {
      axios.defaults.headers.common["access_token"] = cookies.get(
        "access_token"
      );
    }
  }, [token]);

  const tryLogin = async (res: FacebookLoginInfo | FacebookFailureResponse) => {
    await handleLogin(res.accessToken!)
      .then(async (response: any) => {
        const today = new Date();
        today.setDate(today.getDate() + 30);
        cookies.set("access_token", response.data.access_token, {
          expires: today,
          path: "/"
        });
        axios.defaults.headers.common["access_token"] =
          response.data.access_token;
        NotificationManager.success("로그인 되었습니다.", "Success");
        handleAll(response.data.access_token);
      })
      .catch(() => {
        haldleAdminFalse();
        NotificationManager.error("로그인에 실패하였습니다.", "Error");
      });
  };

  const tryLogout = useCallback(() => {
    cookies.remove("access_token");
    handleLoginChange(false);
    axios.defaults.headers.common["access_token"] = "";
    haldleAdminFalse();
  }, []);

  const searchSubmit = useCallback(() => {
    if (searchEl.current) {
      if (
        searchEl.current.classList.contains(
          "header-container-main-util-search-active"
        )
      ) {
        if (search !== "") {
          router.push(`/?search=${search}`);
        } else {
          router.push("/");
        }
      }
    }
  }, [search]);

  const getFcmToken = useCallback(async () => {
    if (!firebase.apps.length) {
      firebase.initializeApp(option);
    }
    const token = await firebase.messaging().getToken();
    handleFcm(token);
  }, [handleFcm]);

  const requestNotification = useCallback(() => {
    if ("Notification" in window) {
      try {
        Notification.requestPermission().then(
          (permission: NotificationPermission) => {
            if (permission === "granted") {
              getFcmToken();
            }
          }
        );
      } catch (error) {
        // Safari doesn't return a promise for requestPermissions and it
        // throws a TypeError. It takes a callback as the first argument
        // instead.
        if (error instanceof TypeError) {
          Notification.requestPermission(
            (permission: NotificationPermission) => {
              if (permission === "granted") {
                getFcmToken();
              }
            }
          );
        } else {
          throw error;
        }
      }
    }
  }, [getFcmToken]);

  const handleAll = useCallback(async (access_token: string) => {
    const token = axios.defaults.headers.common["access_token"];
    if (token) {
      await handleUser(access_token).catch((err) => {
        if (err.message === "401") {
          tryLogout();
        }
      });
      requestNotification();
    }
  }, []);

  const handleLoginCallback = useCallback(() => {
    const token = axios.defaults.headers.common["access_token"];

    if (!login) {
      if (token) {
        handleLoginChange(true);
        handleUser(token).catch((err) => {
          if (err.message === "Error: Request failed with status code 401") {
            tryLogout();
          } else {
            NotificationManager.error("오류가 발생하였습니다.", "Error");
          }
        });
        requestNotification();
      }
    }
  }, [login, requestNotification]);

  useEffect(() => {
    handleLoginCallback();
  }, [handleLoginCallback]);

  return (
    <>
      <Header
        search={search}
        setSearch={setSearch}
        searchEl={searchEl}
        inputEl={inputEl}
        login={login}
        tryLogin={tryLogin}
        tryLogout={tryLogout}
        searchSubmit={searchSubmit}
      />
    </>
  );
};

export default inject("store")(observer(HeaderContainer));
