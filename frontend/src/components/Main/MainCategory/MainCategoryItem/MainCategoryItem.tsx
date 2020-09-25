import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames/bind";
const styled = require("./MainCategoryItem.scss");

const cx = classNames.bind(styled);

interface MainCategoryItemProps {
  item: CategoryType;
}

interface CategoryType {
  idx: number;
  name: string;
  post_count: number;
}

const MainCategoryItem = ({ item }: MainCategoryItemProps) => {
  const { pathname, asPath, query } = useRouter();
  const isTotal = item.idx === 0;
  const temp = item.idx === -1;
  const path = `?tab=${item.idx}`;

  return (
    <>
      {isTotal ? (
        <Link href={`/`}>
          <a>
            <div
              className={cx("main-category-item", {
                "main-category-item-active":
                  query && !query.tab && !query.search
              })}
            >
              {item.name}
              <span className="main-category-item-count">
                {" "}
                ({item.post_count}){" "}
              </span>
            </div>
          </a>
        </Link>
      ) : (
        <>
          {temp ? (
            <Link href={`/?temp`}>
              <a>
                <div
                  className={cx("main-category-item", {
                    "main-category-item-active":
                      pathname &&
                      asPath &&
                      pathname === "/" &&
                      asPath === "/?temp"
                  })}
                >
                  {item.name}
                </div>
              </a>
            </Link>
          ) : (
            <Link href={`/${path}`}>
              <a>
                <div
                  className={cx("main-category-item", {
                    "main-category-item-active":
                      pathname &&
                      asPath &&
                      pathname === "/" &&
                      asPath === `/${path}`
                  })}
                >
                  {item.name}
                  <span className="main-category-item-count">
                    {" "}
                    ({item.post_count}){" "}
                  </span>
                </div>
              </a>
            </Link>
          )}
        </>
      )}
    </>
  );
};

export default MainCategoryItem;
