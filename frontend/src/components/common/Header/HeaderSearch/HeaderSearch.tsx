import React, { ChangeEvent, Dispatch, MutableRefObject } from "react";
import searchImg from "../../../../assets/images/search.svg";

interface HeaderSearchProps {
  searchEl: MutableRefObject<any>;
  inputEl: MutableRefObject<any>;
  search: string;
  setSearch: Dispatch<React.SetStateAction<string>>;
}

const HeaderSearch = ({
  searchEl,
  inputEl,
  search,
  setSearch
}: HeaderSearchProps) => {
  return (
    <div
      ref={searchEl}
      className="header-container-main-util-search"
      onClick={() => {
        searchEl.current.classList.add(
          "header-container-main-util-search-active"
        );
        inputEl.current.focus();
      }}
    >
      <input
        ref={inputEl}
        value={search}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setSearch(e.target.value);
        }}
        type="text"
        className="header-container-main-util-search-input"
        placeholder="검색어를 입력해주세요."
      />
      <img src={searchImg} alt="search" />
    </div>
  );
};

export default HeaderSearch;
