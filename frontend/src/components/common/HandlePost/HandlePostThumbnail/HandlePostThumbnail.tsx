import React from "react";
import "./HandlePostThumbnail.scss";

interface HandlePostThumbnailProps {
  thumbnail: string;
  setThumbnail: React.Dispatch<React.SetStateAction<string>>;
  isUpload: boolean;
  setIsUpload: React.Dispatch<React.SetStateAction<boolean>>;
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  uploadFilesCallback: (files: File[]) => Promise<void>;
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
}

const HandlePostThumbnail = ({
  thumbnail,
  setThumbnail
}: HandlePostThumbnailProps) => {
  return <div className="handle-post-content"></div>;
};

export default HandlePostThumbnail;
