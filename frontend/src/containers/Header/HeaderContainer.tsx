import { inject, observer } from "mobx-react";
import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/common/Header";
import LoginStore from "../../stores/LoginStore";
import UserStore from "../../stores/UserStore";
import axios from "axios";
import {
  ReactFacebookFailureResponse,
  ReactFacebookLoginInfo
} from "react-facebook-login";
import Swal from "sweetalert2";
import { useCookies } from "react-cookie";

interface HeaderContainerProps {
  store?: StoreType;
}

interface StoreType {
  LoginStore: LoginStore;
  UserStore: UserStore;
}

interface FacebookLoginInfo extends ReactFacebookLoginInfo {
  accessToken: string;
}

interface FacebookFailureResponse extends ReactFacebookFailureResponse {
  accessToken?: string;
}

const HeaderContainer = ({ store }: HeaderContainerProps) => {
  const { login, handleLoginChange, handleLogin } = store!.LoginStore;
  const { handleUser, admin } = store!.UserStore;
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
        Swal.fire("환영합니다!", "로그인에 성공하였습니다.", "success");
      })
      .catch((err: Error) => {
        Swal.fire("오류!", "로그인에 실패하였습니다.", "error");
      });
  };

  const tryLogout = () => {
    removeCookie("access_token");
    handleLoginChange(false);
  };

  useEffect(() => {
    if (cookies.access_token) {
      handleLoginChange(true);
      axios.defaults.headers.common["access_token"] = cookies.access_token;
      handleUser();
    }
  }, [login]);

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
      />
    </>
  );
};

export default inject("store")(observer(HeaderContainer));
