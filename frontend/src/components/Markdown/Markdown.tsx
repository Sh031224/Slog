import React from "react";
import MarkDown from "markdown-to-jsx";
import "./Markdown.scss";

interface MarkdownProps {
  children: string;
}

const markedH1 = ({ children, ...props }: { children: string }) => {
  return <h1 id={children.toString().replace(/\ /g, "-")}>{children}</h1>;
};

const markedH2 = ({ children, ...props }: { children: string }) => {
  return <h2 id={children.toString().replace(/\ /g, "-")}>{children}</h2>;
};

const markedH3 = ({ children, ...props }: { children: string }) => {
  return <h3 id={children.toString().replace(/\ /g, "-")}>{children}</h3>;
};

const markedH4 = ({ children, ...props }: { children: string }) => {
  return <h4 id={children.toString().replace(/\ /g, "-")}>{children}</h4>;
};

const markedH5 = ({ children, ...props }: { children: string }) => {
  return <h5 id={children.toString().replace(/\ /g, "-")}>{children}</h5>;
};

const markedH6 = ({ children, ...props }: { children: string }) => {
  return <h6 id={children.toString().replace(/\ /g, "-")}>{children}</h6>;
};

const markedA = ({ children, ...props }: { children: string }) => {
  return (
    <a {...props} target="_blank">
      {children}
    </a>
  );
};

const Markdown = ({ children }: MarkdownProps) => {
  return (
    <div className="markdown-code">
      <MarkDown
        options={{
          overrides: {
            h1: markedH1,
            h2: markedH2,
            h3: markedH3,
            h4: markedH4,
            h5: markedH5,
            h6: markedH6,
            a: markedA
          },
          forceBlock: true
        }}
      >
        {children}
      </MarkDown>
    </div>
  );
};

export default Markdown;
