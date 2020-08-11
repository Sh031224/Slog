import React from "react";
import MarkdownContainer from "../../../../containers/Markdown/MarkdownContainer";
import "./HandlePostContent.scss";
import { FiCode, FiEye } from "react-icons/fi";
import { AiOutlinePicture } from "react-icons/ai";
import HandlePostUpload from "../HandlePostUpload";

interface HandlePostContentProps {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  isUpload: boolean;
  setIsUpload: React.Dispatch<React.SetStateAction<boolean>>;
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  uploadFilesCallback: (files: File[]) => Promise<void>;
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
}

const HandlePostContent = ({
  content,
  setContent,
  setFiles,
  isUpload,
  setIsUpload,
  uploadFilesCallback,
  textAreaRef
}: HandlePostContentProps) => {
  const toggleClass = (idx: number) => {
    setIsUpload(false);
    if (idx === 0) {
      document
        .getElementsByClassName("handle-post-content-box-header-change-item")[0]
        .classList.add("handle-post-content-box-header-active");
      document
        .getElementsByClassName("handle-post-content-box-header-change-item")[1]
        .classList.remove("handle-post-content-box-header-active");

      document
        .getElementsByClassName("handle-post-content-preview")[0]
        .classList.remove("handle-post-content-selected");
      document
        .getElementsByClassName("handle-post-content-box-textarea")[0]
        .classList.add("handle-post-content-selected");
    } else {
      document
        .getElementsByClassName("handle-post-content-box-header-change-item")[1]
        .classList.add("handle-post-content-box-header-active");
      document
        .getElementsByClassName("handle-post-content-box-header-change-item")[0]
        .classList.remove("handle-post-content-box-header-active");

      document
        .getElementsByClassName("handle-post-content-preview")[0]
        .classList.add("handle-post-content-selected");
      document
        .getElementsByClassName("handle-post-content-box-textarea")[0]
        .classList.remove("handle-post-content-selected");
    }
  };

  return (
    <div className="handle-post-content">
      <div className="handle-post-content-box">
        <div className="handle-post-content-box-header">
          <div className="handle-post-content-box-header-change">
            <div
              onClick={() => toggleClass(0)}
              className="handle-post-content-box-header-active handle-post-content-box-header-change-item"
            >
              <FiCode className="handle-post-content-box-header-change-item-icon" />
              Edit Content
            </div>
            <div
              onClick={() => toggleClass(1)}
              className="handle-post-content-box-header-change-item"
            >
              <FiEye className="handle-post-content-box-header-change-item-icon" />
              Preview
            </div>
          </div>
          <div className="handle-post-content-box-header-image">
            <AiOutlinePicture onClick={() => setIsUpload(!isUpload)} />
          </div>
        </div>
        {isUpload && (
          <HandlePostUpload
            setFiles={setFiles}
            uploadFilesCallback={uploadFilesCallback}
          />
        )}
        <textarea
          className="handle-post-content-box-textarea handle-post-content-selected"
          ref={textAreaRef}
          value={content}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setContent(e.target.value)
          }
          onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (textAreaRef.current) {
              if (e.keyCode === 9) {
                e.preventDefault();
                const { selectionStart, selectionEnd } = e.currentTarget;
                setContent(
                  content.substring(0, selectionStart) +
                    "  " +
                    content.substring(selectionEnd)
                );
                textAreaRef.current.selectionStart = textAreaRef.current.selectionEnd =
                  selectionStart + 1;
              }
            }
          }}
        />
        <MarkdownContainer className="handle-post-content-preview">
          {content}
        </MarkdownContainer>
      </div>
    </div>
  );
};

export default HandlePostContent;
