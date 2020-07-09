import React, { useRef, useState, RefObject } from "react";
import Header from "../../components/common/Header";

const HeaderContainer = () => {
  const searchEl = useRef<HTMLElement>(null);
  const inputEl = useRef<HTMLElement>(null);

  const [search, setSearch] = useState("");

  return (
    <Header
      search={search}
      setSearch={setSearch}
      searchEl={searchEl}
      inputEl={inputEl}
    />
  );
};

export default HeaderContainer;
