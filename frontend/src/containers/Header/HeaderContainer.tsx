import { inject, observer } from "mobx-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Header from "../../components/common/Header";
import UserStore from "../../stores/UserStore";
import axios from "axios";
import {
  ReactFacebookFailureResponse,
  ReactFacebookLoginInfo
} from "react-facebook-login";
import Swal from "sweetalert2";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import firebase from "firebase";

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

  const history = useHistory();

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
        axios.defaults.headers.common["access_token"] = cookies.access_token;
        Swal.fire("환영합니다!", "로그인에 성공하였습니다.", "success");
        handleAll(response.data.access_token);
      })
      .catch((err: Error) => {
        haldleAdminFalse();
        Swal.fire("오류!", "로그인에 실패하였습니다.", "error");
      });
  };

  const tryLogout = () => {
    removeCookie("access_token", { path: "/" });
    handleLoginChange(false);
    axios.defaults.headers.common["access_token"] = "";
    haldleAdminFalse();
  };

  const searchSubmit = useCallback(() => {
    if (searchEl.current) {
      if (
        searchEl.current.classList.contains(
          "header-container-main-util-search-active"
        )
      ) {
        if (search !== "") {
          history.push(`/?search=${search}`);
        } else {
          history.push("/");
        }
      }
    }
  }, [search]);

  const getFcmToken = useCallback(async () => {
    const messaging = firebase.messaging();

    await messaging.requestPermission().then(() => {
      messaging.getToken().then((res: string) => {
        handleFcm(res);
      });
    });
  }, []);

  const handleAll = async (access_token: string) => {
    await handleUser(access_token);
    axios.defaults.headers.common["access_token"] = cookies.access_token;
    if (Notification.permission === "granted") {
      getFcmToken();
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(
        (permission: NotificationPermission) => {
          if (permission === "granted") {
            getFcmToken();
          }
        }
      );
    }
  };

  useEffect(() => {
    if (cookies.access_token !== undefined) {
      handleLoginChange(true);
      handleAll(cookies.access_token);
    }
  }, []);

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
