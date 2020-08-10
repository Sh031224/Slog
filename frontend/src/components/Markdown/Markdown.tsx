import React from "react";
import MarkDown from "markdown-to-jsx";
import "prismjs/themes/prism.css";
import "./Markdown.scss";

interface MarkdownProps {
  children: string;
}

const Markdown = ({ children }: MarkdownProps) => {
  return (
    <div className="markdown-code">
      <MarkDown options={{ forceBlock: true }}>{children}</MarkDown>
    </div>
  );
};

export default Markdown;
