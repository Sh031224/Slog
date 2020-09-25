import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import classNames from "classnames/bind";
const styled = require("./MainCategoryItem.scss");

// const cx = classNames.bind(styled);

interface MainCategoryItemProps {
  item: CategoryType;
}

interface CategoryType {
  idx: number;
  name: string;
  post_count: number;
}

const MainCategoryItem = ({ item }: MainCategoryItemProps) => {
  // const { pathname, search } = useLocation();
  const isTotal = item.idx === 0;
  const temp = item.idx === -1;
  const path = `?tab=${item.idx}`;

  return (
    <div>
      {/* <>
      {isTotal ? (
        <Link to={`/`}>
          <div
            className={cx("main-category-item", {
              "main-category-item-active": pathname === "/" && search === ""
            })}
          >
            {item.name}
            <span className="main-category-item-count">
              {" "}
              ({item.post_count}){" "}
            </span>
          </div>
        </Link>
      ) : (
        <>
          {temp ? (
            <Link to={`/?temp`}>
              <div
                className={cx("main-category-item", {
                  "main-category-item-active":
                    pathname === "/" && search === "?temp"
                })}
              >
                {item.name}
              </div>
            </Link>
          ) : (
            <Link to={`/${path}`}>
              <div
                className={cx("main-category-item", {
                  "main-category-item-active":
                    pathname === "/" && search === path
                })}
              >
                {item.name}
                <span className="main-category-item-count">
                  {" "}
                  ({item.post_count}){" "}
                </span>
              </div>
            </Link>
          )}
        </>
      )}
    </> */}
    </div>
  );
};

export default MainCategoryItem;
