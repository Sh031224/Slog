import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";

const useHeader = () => {
  const router = useRouter();

  const [search, setSearch] = useState<string>("");
  const [isToggle, setIsToggle] = useState<boolean>(false);

  const searchEl = useRef<HTMLInputElement>(null);

  const onChangeSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  const onSubmitSearch = useCallback(() => {
    if (isToggle) {
      if (search !== "") router.push(`/?search=${search}`);
      else router.push("/");
    }
  }, [search, router, isToggle]);

  const onKeypressSearch = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        onSubmitSearch();
      }
    },
    [onSubmitSearch]
  );

  const changeIsToggle = useCallback(() => {
    setIsToggle(true);
  }, [searchEl]);

  useEffect(() => {
    if (searchEl.current && isToggle) {
      searchEl.current.focus();
    }
  }, [searchEl, isToggle]);

  return {
    search,
    isToggle,
    searchEl,
    changeIsToggle,
    onChangeSearch,
    onSubmitSearch,
    onKeypressSearch
  };
};

export default useHeader;
