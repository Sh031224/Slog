import React, { Dispatch, SetStateAction, useState } from "react";
import {
  RiArrowDropUpLine,
  RiArrowDropDownLine,
  RiDeleteBin6Line
} from "react-icons/ri";
import classNames from "classnames/bind";
import { CategoryType } from "types/PostType";

const styled = require("./AdminCategoryItem.scss");
const cx = classNames.bind(styled);

interface AdminCategoryItemProps {
  category: CategoryType;
  index: number;
  last: number;
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  modifyOrderNumber: (category_idx: number, order_number: number) => void;
  modifyName: (category_idx: number, name: string) => void;
  removeCategory: (category_idx: number) => void;
}

const AdminCategoryItem = ({
  category,
  index,
  last,
  modifyOrderNumber,
  input,
  setInput,
  modifyName,
  removeCategory
}: AdminCategoryItemProps) => {
  const [isModified, setIsModified] = useState(false);

  const modifyNameInput = () => {
    setInput(category.name);
    setIsModified(true);
  };

  const focusOut = () => {
    modifyName(category.idx, input);
    setIsModified(false);
  };

  const save = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      focusOut();
      modifyName(category.idx, input);
      setIsModified(false);
      setInput("");
    }
  };

  return (
    <div className="admin-category-item">
      <span
        onClick={() => modifyNameInput()}
        className={cx({ "admin-category-item-active": isModified })}
      >
        {category.name}
      </span>
      <input
        type="text"
        className="admin-category-item-input"
        onChange={({ target: { value } }) => setInput(value)}
        onKeyPress={save}
        onBlur={focusOut}
        value={input}
        max-length="50"
      />
      <div className="admin-category-item-icon">
        <RiDeleteBin6Line
          onClick={() => removeCategory(category.idx)}
          className="admin-category-item-icon-delete"
        />
        <div className="admin-category-item-arrow">
          <RiArrowDropUpLine
            onClick={() => modifyOrderNumber(category.idx, index)}
            className={cx({ "admin-category-item-arrow-last": index === 0 })}
          />
          <RiArrowDropDownLine
            onClick={() => modifyOrderNumber(category.idx, index + 2)}
            className={cx({ "admin-category-item-arrow-last": index === last })}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminCategoryItem;
