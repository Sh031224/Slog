import React from "react";
import MarkDown from "markdown-to-jsx";
import "./Markdown.scss";
import "prismjs/themes/prism.css";

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
