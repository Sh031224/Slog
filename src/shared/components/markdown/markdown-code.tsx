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
      className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      style={dracula as any}
      {...props}
    >
      {children}
    </SyntaxHighlighter>
  ) : (
    <code
      {...props}
      className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
    >
      {children}
    </code>
  );
}