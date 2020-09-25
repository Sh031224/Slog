import React, { useEffect } from "react";
import Prism from "prismjs";
import dynamic from "next/dynamic";

const Markdown = dynamic(() => import("../../components/Markdown"));

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
