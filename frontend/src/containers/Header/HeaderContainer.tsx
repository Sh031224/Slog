import { inject, observer } from "mobx-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Header from "../../components/common/Header";
import UserStore from "../../stores/UserStore";
import axios from "axios";
import {
  ReactFacebookFailureResponse,
  ReactFacebookLoginInfo
} from "react-facebook-login";
import { useCookies } from "react-cookie";
import { firebaseCloudMessaging } from "../../lib/firebaseCloudMessaging";
import { NotificationManager } from "react-notifications";
import { useRouter } from "next/router";

interface HeaderContainerProps {
  store?: StoreType;
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

const HeaderContainer = ({ store }: HeaderContainerProps) => {
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

  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);

  const tryLogin = async (res: FacebookLoginInfo | FacebookFailureResponse) => {
    await handleLogin(res.accessToken!)
      .then(async (response: any) => {
        const today = new Date();
        today.setDate(today.getDate() + 30);
        setCookie("access_token", response.data.access_token, {
          path: "/",
          expires: today
        });
        axios.defaults.headers.common["access_token"] =
          response.data.access_token;
        NotificationManager.success("로그인 되었습니다.", "Success");
        handleAll(response.data.access_token);
      })
      .catch((err: Error) => {
        haldleAdminFalse();
        NotificationManager.error("로그인에 실패하였습니다.", "Error");
      });
  };

  const tryLogout = useCallback(() => {
    removeCookie("access_token", { path: "/" });
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
    axios.defaults.headers.common["access_token"] = cookies.access_token;

    const token = await firebaseCloudMessaging.init();
    if (token) {
      handleFcm(token);
    }
  }, []);

  const requestNotification = useCallback(() => {
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
        Notification.requestPermission((permission: NotificationPermission) => {
          if (permission === "granted") {
            getFcmToken();
          }
        });
      } else {
        throw error;
      }
    }
  }, [getFcmToken]);

  const handleAll = useCallback(async (access_token: string) => {
    if (cookies.access_token !== undefined) {
      axios.defaults.headers.common["access_token"] = cookies.access_token;
      await handleUser(access_token).catch((err) => {
        if (err.message === "401") {
          removeCookie("access_token", { path: "/" });
          handleLoginChange(false);
          axios.defaults.headers.common["access_token"] = "";
          haldleAdminFalse();
        }
      });
      requestNotification();
    }
  }, []);

  const handleLoginCallback = useCallback(() => {
    if (!login) {
      if (cookies.access_token !== undefined) {
        axios.defaults.headers.common["access_token"] = cookies.access_token;
        handleLoginChange(true);
        handleUser(cookies.access_token).catch((err) => {
          if (err.message === "Error: Request failed with status code 401") {
            removeCookie("access_token", { path: "/" });
            handleLoginChange(false);
            axios.defaults.headers.common["access_token"] = "";
          } else {
            NotificationManager.error("오류가 발생하였습니다.", "Error");
          }
        });
        requestNotification();
      }
    }
  }, [login, cookies, requestNotification]);

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
