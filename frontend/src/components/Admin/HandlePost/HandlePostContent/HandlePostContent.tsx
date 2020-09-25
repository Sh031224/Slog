import React from "react";
import MarkdownContainer from "../../../../containers/Markdown/MarkdownContainer";
import "./HandlePostContent.scss";
import { FiCode, FiEye } from "react-icons/fi";
import { AiOutlinePicture } from "react-icons/ai";

interface HandlePostContentProps {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  uploadFilesCallback: (files: File[]) => Promise<void>;
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
}

const HandlePostContent = ({
  content,
  setContent,
  uploadFilesCallback,
  textAreaRef
}: HandlePostContentProps) => {
  const toggleClass = (idx: number) => {
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
            <label htmlFor="file_upload">
              <AiOutlinePicture />
            </label>
            <input
              type="file"
              id="file_upload"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files && e.target.files.length) {
                  const file = e.target.files[0];
                  const files: File[] = [file];
                  uploadFilesCallback(files);
                }
              }}
            />
          </div>
        </div>
        <textarea
          onClick={() => toggleClass(0)}
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
          autoFocus
        />
        <MarkdownContainer className="handle-post-content-preview">
          {content}
        </MarkdownContainer>
      </div>
    </div>
  );
};

export default HandlePostContent;
