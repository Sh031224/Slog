import { inject, observer } from "mobx-react";
import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/common/Header";
import LoginStore from "../../stores/LoginStore";
import axios from "axios";
import {
  ReactFacebookFailureResponse,
  ReactFacebookLoginInfo
} from "react-facebook-login";
import { useCookies } from "react-cookie";
import SweetAlert from "sweetalert2-react";

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

  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
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
        setSuccess(true);
      })
      .catch((err: Error) => {
        setFail(true);
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
      />
      <SweetAlert
        show={success}
        title="환영합니다!"
        text="로그인에 성공하였습니다."
        type="success"
        onConfirm={() => setSuccess(false)}
      />
      <SweetAlert
        show={fail}
        title="오류 !"
        text="로그인에 실패하였습니다."
        type="error"
        onConfirm={() => setFail(false)}
      />
    </>
  );
};

export default inject("store")(observer(HeaderContainer));
