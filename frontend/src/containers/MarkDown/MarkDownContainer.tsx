import React, { useEffect, useRef } from "react";
import Markdown from "../../components/Markdown";
import hljs from "highlight.js";

interface MarkDownContainerProps {
  className?: string;
  children: string;
}

const MarkDownContainer = ({ children, className }: MarkDownContainerProps) => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (rootRef.current) {
      const selected = rootRef.current.querySelectorAll(
        "pre code"
      ) as NodeListOf<HTMLElement>;
      selected.forEach((block: HTMLElement) => {
        hljs.highlightBlock(block);
      });
    }
  }, [children, rootRef]);

  return (
    <>
      {className ? (
        <div className={className}>
          <Markdown rootRef={rootRef}>
            {typeof children === "string" ? children : ""}
          </Markdown>
        </div>
      ) : (
        <Markdown rootRef={rootRef}>{children}</Markdown>
      )}
    </>
  );
};

export default MarkDownContainer;
