import React, { useEffect } from "react";
import Markdown from "../../components/Markdown";
import Prism from "prismjs";

interface MarkdownContainerProps {
  className?: string;
  children: string;
}

const MarkdownContainer = ({ children, className }: MarkdownContainerProps) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [children]);

  return (
    <div className={className}>
      <Markdown>{typeof children === "string" ? children : ""}</Markdown>
    </div>
  );
};

export default MarkdownContainer;
