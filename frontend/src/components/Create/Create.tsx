import React from "react";
import MarkdownContainer from "../../containers/Markdown/MarkdownContainer";
import "./Create.scss";

interface CreateProps {
  source: string;
  setSource: React.Dispatch<React.SetStateAction<string>>;
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
}

const Create = ({ source, setSource, textAreaRef }: CreateProps) => {
  return (
    <>
      <textarea
        ref={textAreaRef}
        value={source}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setSource(e.target.value)
        }
        onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
          if (textAreaRef.current) {
            if (e.keyCode === 9) {
              e.preventDefault();
              const { selectionStart, selectionEnd } = e.currentTarget;
              setSource(
                source.substring(0, selectionStart) +
                  "  " +
                  source.substring(selectionEnd)
              );
              textAreaRef.current.selectionStart = textAreaRef.current.selectionEnd =
                selectionStart + 1;
            }
          }
        }}
      />
      <MarkdownContainer>{source}</MarkdownContainer>
    </>
  );
};

export default Create;
