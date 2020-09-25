import React from "react";
// import classNames from "classnames/bind";
// import { Link, useLocation } from "react-router-dom";
import { useRouter } from "next/router";
const styled = require("./MainCategoryRowItem.scss");

// const cx = classNames.bind(styled);

interface MainCategoryRowItemProps {
  item: CategoryType;
}

interface CategoryType {
  idx: number;
  name: string;
  post_count: number;
}

const MainCategoryRowItem = ({ item }: MainCategoryRowItemProps) => {
  // const { pathname, search } = useRouter();
  const temp = item.idx === -1;
  const isTotal = item.idx === 0;
  const path = `?tab=${item.idx}`;

  return (
    <div>
      {/* // <>
    //   {isTotal ? (
    //     <Link to={"/"}>
    //       <div
    //         className={cx("main-category-row-item", {
    //           "main-category-row-item-active": pathname === "/" && search === ""
    //         })}
    //       >
    //         {item.name}
    //         <span className="main-category-row-item-count">
    //           {" "}
    //           ({item.post_count}){" "}
    //         </span>
    //       </div>
    //     </Link>
    //   ) : (
    //     <>
    //       {temp ? (
    //         <Link to={`/?temp`}>
    //           <div
    //             className={cx("main-category-row-item", {
    //               "main-category-row-item-active":
    //                 pathname === "/" && search === "?temp"
    //             })}
    //           >
    //             {item.name}
    //           </div>
    //         </Link>
    //       ) : (
    //         <Link to={`/${path}`}>
    //           <div
    //             className={cx("main-category-row-item", {
    //               "main-category-row-item-active":
    //                 pathname === "/" && search === path
    //             })}
    //           >
    //             {item.name}
    //             <span className="main-category-row-item-count">
    //               {" "}
    //               ({item.post_count}){" "}
    //             </span>
    //           </div>
    //         </Link>
    //       )}
    //     </>
    //   )}
    // </> */}
    </div>
  );
};

export default MainCategoryRowItem;
