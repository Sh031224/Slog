import React from "react";
import MarkDown from "markdown-to-jsx";
import "highlight.js/styles/magula.css";
import "./Markdown.scss";

interface MarkdownProps {
  children: string;
  rootRef: React.RefObject<HTMLDivElement>;
}

const Markdown = ({ rootRef, children }: MarkdownProps) => {
  return (
    <div className="markdown-code" ref={rootRef}>
      <MarkDown options={{ forceBlock: true }}>{children}</MarkDown>
    </div>
  );
};

export default Markdown;
