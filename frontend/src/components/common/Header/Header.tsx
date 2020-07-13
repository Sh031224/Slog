import React, { Dispatch, MutableRefObject } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import logo from "../../../assets/images/logo.svg";
import HeaderSearch from "./HeaderSearch";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { appId } from "../../../config/index.json";
import {
  ReactFacebookFailureResponse,
  ReactFacebookLoginInfo
} from "react-facebook-login";

interface HeaderProps {
  searchEl: MutableRefObject<any>;
  inputEl: MutableRefObject<any>;
  search: string;
  setSearch: Dispatch<React.SetStateAction<string>>;
  login: boolean;
  tryLogin: (res: FacebookLoginInfo | FacebookFailureResponse) => void;
  tryLogout: () => void;
}

interface FacebookLoginInfo extends ReactFacebookLoginInfo {
  accessToken: string;
}

interface FacebookFailureResponse extends ReactFacebookFailureResponse {
  accessToken?: string;
}

const Header = ({
  searchEl,
  inputEl,
  search,
  setSearch,
  login,
  tryLogout,
  tryLogin
}: HeaderProps) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-container-main">
          <Link to="/">
            <img className="header-container-main-logo" src={logo} alt="logo" />
          </Link>
          <div className="header-container-main-util">
            <HeaderSearch
              search={search}
              setSearch={setSearch}
              searchEl={searchEl}
              inputEl={inputEl}
            />
            {login ? (
              <span
                onClick={tryLogout}
                className="header-container-main-util-login"
              >
                로그아웃
              </span>
            ) : (
              <FacebookLogin
                appId={appId}
                fields="name,email"
                callback={tryLogin}
                render={(renderProps: any) => {
                  return (
                    <div
                      className="login-container-button"
                      onClick={renderProps.onClick}
                    >
                      <span className="header-container-main-util-login">
                        로그인
                      </span>
                    </div>
                  );
                }}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
