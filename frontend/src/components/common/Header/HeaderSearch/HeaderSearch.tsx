import React, {
  ChangeEvent,
  Dispatch,
  MutableRefObject,
  KeyboardEvent
} from "react";
import searchImg from "../../../../assets/images/search.svg";

interface HeaderSearchProps {
  searchEl: MutableRefObject<any>;
  inputEl: MutableRefObject<any>;
  search: string;
  setSearch: Dispatch<React.SetStateAction<string>>;
  searchSubmit: () => void;
}

const HeaderSearch = ({
  searchEl,
  inputEl,
  search,
  setSearch,
  searchSubmit
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
        onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            searchSubmit();
          }
        }}
        type="text"
        className="header-container-main-util-search-input"
        placeholder="검색어를 입력해주세요."
      />
      <img onClick={searchSubmit} src={searchImg} alt="search" />
    </div>
  );
};

export default HeaderSearch;
