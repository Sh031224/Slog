import { inject, observer } from "mobx-react";
import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/common/Header";
import LoginStore from "../../stores/LoginStore";
import {
  ReactFacebookFailureResponse,
  ReactFacebookLoginInfo
} from "react-facebook-login";
import { useCookies } from "react-cookie";

interface HeaderContainerProps {
  store?: StoreType;
}

interface StoreType {
  LoginStore: LoginStore;
}

interface FacebookLoginInfo extends ReactFacebookLoginInfo {
  accessToken: string;
}

interface FacebookFailureResponse extends ReactFacebookFailureResponse {
  accessToken?: string;
}

const HeaderContainer = ({ store }: HeaderContainerProps) => {
  const { login, handleLoginChange, handleLogin } = store!.LoginStore;
  const searchEl = useRef<HTMLElement>(null);
  const inputEl = useRef<HTMLElement>(null);

  const [search, setSearch] = useState("");

  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);

  const tryLogin = (res: FacebookLoginInfo | FacebookFailureResponse) => {
    handleLogin(res.accessToken!)
      .then((response: any) => {
        const today = new Date();
        today.setDate(today.getDate() + 7);
        setCookie("access_token", response.data.access_token, {
          expires: today
        });
      })
      .catch((err: Error) => {
        alert("[Error] 로그인에 실패하였습니다.");
      });
  };

  const tryLogout = () => {
    removeCookie("access_token");
    handleLoginChange(false);
  };

  useEffect(() => {
    if (cookies.access_token) {
      handleLoginChange(true);
    }
  }, []);

  return (
    <Header
      search={search}
      setSearch={setSearch}
      searchEl={searchEl}
      inputEl={inputEl}
      login={login}
      tryLogin={tryLogin}
      tryLogout={tryLogout}
    />
  );
};

export default inject("store")(observer(HeaderContainer));
