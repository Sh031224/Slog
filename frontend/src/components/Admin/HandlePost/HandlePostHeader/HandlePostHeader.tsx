import React from "react";
import "./HandlePostHeader.scss";

interface HandlePostHeaderProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
}

const HandlePostHeader = ({
  title,
  setTitle,
  description,
  setDescription
}: HandlePostHeaderProps) => {
  return (
    <div className="handle-post-header">
      <input
        type="text"
        placeholder="제목을 입력하세요."
        maxLength={255}
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
        autoFocus
      />
      <input
        type="text"
        placeholder="설명을 입력하세요."
        maxLength={255}
        value={description}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setDescription(e.target.value)
        }
      />
    </div>
  );
};

export default HandlePostHeader;
