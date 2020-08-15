import React from "react";
import "./HandlePostThumbnail.scss";

interface HandlePostThumbnailProps {
  thumbnail: string;
  setThumbnail: React.Dispatch<React.SetStateAction<string>>;
}

const HandlePostThumbnail = ({
  thumbnail,
  setThumbnail
}: HandlePostThumbnailProps) => {
  return (
    <input
      placeholder="미리보기 이미지를 넣어주세요."
      className="handle-post-thumbnail"
      type="text"
      value={thumbnail}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setThumbnail(e.target.value)
      }
    />
  );
};

export default HandlePostThumbnail;
