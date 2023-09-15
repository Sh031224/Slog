import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

type Props = Combine<
  {
    children: string;
  },
  React.HTMLAttributes<HTMLElement>
>;

export default function MarkdownCode({ children, ...props }: Props) {
  const match = /lang-(\w+)/.exec(props.className || '');

  return match ? (
    <SyntaxHighlighter
      language={match[1]}
      PreTag="div"
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      style={dracula as any}
      {...props}
    >
      {children}
    </SyntaxHighlighter>
  ) : (
    <code {...props}>{children}</code>
  );
}
