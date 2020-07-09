import React, { RefObject } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import logo from "../../../assets/images/logo.svg";
import HeaderSearch from "./HeaderSearch";

interface HeaderProps {
  searchEl: HTMLElement | any;
  inputEl: HTMLElement | any;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const Header = ({ searchEl, inputEl, search, setSearch }: HeaderProps) => {
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
            <Link to="/login">
              <span className="header-container-main-util-login">로그인</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
