import React from "react";
import { GoPencil } from "react-icons/go";
import "./MainCreate.scss";

interface MainCreateProps {
  createPost: () => void;
}

const MainCreate = ({ createPost }: MainCreateProps) => {
  return (
    <div onClick={() => createPost()} className="main-create">
      <GoPencil />
    </div>
  );
};

export default React.memo(MainCreate);
