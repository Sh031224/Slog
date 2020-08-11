import React from "react";
import MarkdownContainer from "../../../../containers/Markdown/MarkdownContainer";
import "./HandlePostContent.scss";

interface HandlePostContentProps {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
}

const HandlePostContent = ({
  content,
  setContent,
  textAreaRef
}: HandlePostContentProps) => {
  return (
    <div className="handle-post-content">
      <div className="handle-post-content-box">
        <div className="handle-post-content-box-header">
          <div className="handle-post-content-box-header-change">
            <div className="handle-post-content-box-header-active handle-post-content-box-header-change-item">
              Edit
            </div>
            <div className="handle-post-content-box-header-change-item">
              Preview
            </div>
          </div>
        </div>
        <textarea
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
        <MarkdownContainer>{content}</MarkdownContainer>
      </div>
    </div>
  );
};

export default HandlePostContent;
