import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const useHeader = () => {
  const router = useRouter();

  const [search, setSearch] = useState<string>("");
  const [isToggle, setIsToggle] = useState<boolean>(false);

  const searchEl = useRef<HTMLInputElement>(null);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmitSearch = () => {
    if (isToggle) {
      if (search !== "") router.push(`/?search=${search}`);
      else router.push("/");
    }
  };

  const onKeypressSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmitSearch();
    }
  };

  const changeIsToggle = () => {
    setIsToggle(true);
  };

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
