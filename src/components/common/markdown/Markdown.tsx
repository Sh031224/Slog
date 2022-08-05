import MarkdownJSX from "markdown-to-jsx";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import styled from "styled-components";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";

type Props = {
  content: string;
};

const Markdown: React.FC<Props> = ({ content }) => {
  return (
    <MarkdownContainer>
      <MarkdownJSX
        options={{
          overrides: {
            h1: CustomMarkdownH1,
            h2: CustomMarkdownH2,
            h3: CustomMarkdownH3,
            h4: CustomMarkdownH4,
            h5: CustomMarkdownH5,
            h6: CustomMarkdownH6,
            a: CustomMarkdownA,
            code: CustomMarkdownCode
          },
          forceBlock: true
        }}
      >
        {content}
      </MarkdownJSX>
    </MarkdownContainer>
  );
};

const MarkdownContainer = styled.div`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.ftMarkdownBlack};
  line-height: 1.7;
  letter-spacing: -0.004em;
  word-break: keep-all;
  overflow-wrap: break-word;
  ${({ theme }) => theme.device.tablet} {
    font-size: 1rem;
  }
  p + a,
  a {
    color: ${({ theme }) => theme.colors.ftBlue};
    &:hover {
      text-decoration: underline;
    }
  }
  p + h1,
  p + h2,
  p + h3,
  p + h4 {
    margin-top: 2.5rem;
    ${({ theme }) => theme.device.tablet} {
      margin-top: 2rem;
    }
  }
  h1,
  h2,
  h3,
  h4 {
    line-height: 1.5;
    margin-bottom: 1rem;
    ${({ theme }) => theme.device.tablet} {
      margin-bottom: 0.75rem;
    }
  }
  h1 {
    font-size: 2.5rem;
    ${({ theme }) => theme.device.tablet} {
      font-size: 2.25rem;
    }
  }
  h2 {
    font-size: 2rem;
    ${({ theme }) => theme.device.tablet} {
      font-size: 1.75rem;
    }
  }
  h3 {
    font-size: 1.5rem;
    ${({ theme }) => theme.device.tablet} {
      font-size: 1.25rem;
    }
  }
  h4 {
    font-size: 1.125rem;
    ${({ theme }) => theme.device.tablet} {
      font-size: 1rem;
    }
  }
  hr {
    height: 1px;
    width: 100%;
    margin-top: 2rem;
    margin-bottom: 2rem;
    border-width: initial;
    border-style: none;
    border-color: initial;
    border-image: initial;
    background: ${({ theme }) => theme.colors.bgUnderLineWhite};
  }
  blockquote {
    margin-top: 2rem;
    margin-bottom: 2rem;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    margin-left: 0px;
    margin-right: 0px;
    color: ${({ theme }) => theme.colors.ftLightBlack};
    border-left: ${({ theme }) => theme.colors.bdBlue} 4px solid;
    background-color: ${({ theme }) => theme.colors.bgLightGray};
    padding: 1rem 1rem 1rem 2rem;
    & :first-child {
      margin-top: 0px;
    }
    & :last-child {
      margin-bottom: 0px;
    }
  }
  pre {
    & > div {
      font-family: "Fira Mono", source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
      overflow-x: auto;
      letter-spacing: 0px;
      border-radius: 5px;
      line-height: 1.5 !important;
      overflow-x: auto !important;
      letter-spacing: 0px !important;
      padding: 1rem !important;
      border-radius: 5px !important;
      font-size: 0.875rem;
      ${({ theme }) => theme.device.tablet} {
        font-size: 0.75rem;
      }
      & > code {
        background: none !important;
      }
    }
  }
  :not(pre) > code[class*="language-"],
  pre[class*="language-"] {
    background: none !important;
  }
  code {
    font-family: "Fira Mono", source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
  }
  p > code {
    background: ${({ theme }) => theme.colors.bgCode};
    padding: 0.2em 0.4em;
    border-radius: 5px;
    font-size: 85%;
  }
  img {
    max-width: 100%;
    height: auto;
    display: block;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }
  p > img {
    display: block;
    max-width: 100%;
    margin: 3rem auto;
  }
  table {
    border-collapse: collapse;
    display: block;
    width: 100%;
    width: -webkit-max-content;
    width: -moz-max-content;
    width: max-content;
    max-width: 100%;
    overflow: auto;
    tr:nth-child(2n) {
      background-color: ${({ theme }) => theme.colors.bgTableWhite};
    }
    tr {
      background-color: ${({ theme }) => theme.colors.bgWhite};
      border-top: 1px solid ${({ theme }) => theme.colors.bdTrWhite};
    }
    td,
    th {
      padding: 6px 13px;
      border: 1px solid ${({ theme }) => theme.colors.bdTdWhite};
    }
  }
`;

const CustomMarkdownH1 = ({ children }: { children: string }) => {
  return <h1 id={children.toString().replace(/ /g, "-")}>{children}</h1>;
};

const CustomMarkdownH2 = ({ children }: { children: string }) => {
  return <h2 id={children.toString().replace(/ /g, "-")}>{children}</h2>;
};

const CustomMarkdownH3 = ({ children }: { children: string }) => {
  return <h3 id={children.toString().replace(/ /g, "-")}>{children}</h3>;
};

const CustomMarkdownH4 = ({ children }: { children: string }) => {
  return <h4 id={children.toString().replace(/ /g, "-")}>{children}</h4>;
};

const CustomMarkdownH5 = ({ children }: { children: string }) => {
  return <h5 id={children.toString().replace(/ /g, "-")}>{children}</h5>;
};

const CustomMarkdownH6 = ({ children }: { children: string }) => {
  return <h6 id={children.toString().replace(/ /g, "-")}>{children}</h6>;
};

const CustomMarkdownA = ({ children, ...props }: { children: string }) => {
  return (
    <a {...props} target="_blank">
      {children}
    </a>
  );
};

const CustomMarkdownCode = ({ children, ...props }) => {
  const match = /lang-(\w+)/.exec(props.className || "");
  return match ? (
    <SyntaxHighlighter language={match[1]} PreTag="div" style={dracula} {...props}>
      {children}
    </SyntaxHighlighter>
  ) : (
    <code {...props}>{children}</code>
  );
};

export default Markdown;
