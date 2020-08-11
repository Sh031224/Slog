import React from "react";
import ImageUploader from "react-images-upload";
import "./HandlePostUpload.scss";

interface HandlePostUploadProps {
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  uploadFilesCallback: (files: File[]) => Promise<void>;
}

const HandlePostUpload = ({
  setFiles,
  uploadFilesCallback
}: HandlePostUploadProps) => {
  const onDrop = (file: File[], pictures: string[]) => {
    setFiles(file);
    uploadFilesCallback(file);
  };

  return (
    <>
      <ImageUploader
        className="upload-image"
        withIcon={true}
        onChange={onDrop}
        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
        maxFileSize={5242880}
      />
    </>
  );
};

export default HandlePostUpload;
