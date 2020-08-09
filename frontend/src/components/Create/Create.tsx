import React from "react";
import ReactMarkdown from "react-markdown";
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
      ></textarea>
      <ReactMarkdown source={source} />
    </>
  );
};

export default Create;
