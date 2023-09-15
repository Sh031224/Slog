'use client';
import MarkdownJSX from 'markdown-to-jsx';

import MarkdownCode from './markdown-code';

type Props = {
  content: string;
};

export default function Markdown({ content }: Props) {
  return (
    <section className="">
      <MarkdownJSX
        options={{
          overrides: {
            // h1: CustomMarkdownH1,
            // h2: CustomMarkdownH2,
            // h3: CustomMarkdownH3,
            // h4: CustomMarkdownH4,
            // h5: CustomMarkdownH5,
            // h6: CustomMarkdownH6,
            // a: CustomMarkdownA,
            code: MarkdownCode
          },
          forceBlock: true
        }}
      >
        {content}
      </MarkdownJSX>
    </section>
  );
}
