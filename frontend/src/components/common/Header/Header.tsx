import React, { Dispatch, MutableRefObject } from "react";
import HeadRoom from "react-headroom";
import "./Header.scss";
import logo from "../../../assets/images/logo.png";
import ScrollToTop from "react-scroll-to-top";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { appId } from "../../../config/index.json";
import { GrLinkTop } from "react-icons/gr";
import {
  ReactFacebookFailureResponse,
  ReactFacebookLoginInfo
} from "react-facebook-login";
import HeaderSearch from "./HeaderSearch";

interface HeaderProps {
  searchEl: MutableRefObject<any>;
  inputEl: MutableRefObject<any>;
  search: string;
  setSearch: Dispatch<React.SetStateAction<string>>;
  login: boolean;
  tryLogin: (res: FacebookLoginInfo | FacebookFailureResponse) => void;
  tryLogout: () => void;
  searchSubmit: () => void;
  clickLogo: () => void;
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
  tryLogin,
  searchSubmit,
  clickLogo
}: HeaderProps) => {
  return (
    <>
      <HeadRoom>
        <header className="header">
          <div className="header-container">
            <div className="header-container-main">
                <img
                  className="header-container-main-logo"
                  src={logo}
                  alt="logo"
                  onClick={clickLogo}
                />
              <div className="header-container-main-util">
                <HeaderSearch
                  search={search}
                  setSearch={setSearch}
                  searchEl={searchEl}
                  inputEl={inputEl}
                  searchSubmit={searchSubmit}
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
                    disableMobileRedirect={true}
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
      </HeadRoom>
      <ScrollToTop smooth component={<GrLinkTop />} />
    </>
  );
};

export default Header;
