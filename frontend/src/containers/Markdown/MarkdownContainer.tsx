import React from "react";
import dynamic from "next/dynamic";

const Markdown = dynamic(() => import("components/Markdown"));

interface MarkdownContainerProps {
  className?: string;
  children: string;
}

const MarkdownContainer = ({ children, className }: MarkdownContainerProps) => {
  return (
    <div className={className}>
      <Markdown>{typeof children === "string" ? children : ""}</Markdown>
    </div>
  );
};

export default React.memo(MarkdownContainer);
