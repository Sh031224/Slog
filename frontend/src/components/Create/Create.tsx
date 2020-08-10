import React from "react";
import MarkdownContainer from "../../containers/Markdown/MarkdownContainer";
import "./Create.scss";

interface CreateProps {
  source: string;
  setSource: React.Dispatch<React.SetStateAction<string>>;
}

const Create = ({ source, setSource }: CreateProps) => {
  return (
    <>
      <textarea
        value={source}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setSource(e.target.value)
        }
      />
      <MarkdownContainer>{source}</MarkdownContainer>
    </>
  );
};

export default Create;
