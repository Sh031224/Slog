'use client';
import MarkdownJSX from 'markdown-to-jsx';

import MarkdownCode from './markdown-code';
import MarkdownHeading from './markdown-heading';

type Props = {
  content: string;
};

export default function Markdown({ content }: Props) {
  return (
    // eslint-disable-next-line tailwindcss/no-contradicting-classname
    <section className="w-full break-words break-keep">
      <MarkdownJSX
        options={{
          overrides: {
            h1: {
              component: MarkdownHeading,
              props: {
                as: 'h1',
                className:
                  'mb-4 mt-6 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'
              }
            },
            h2: {
              component: MarkdownHeading,
              props: {
                as: 'h2',
                className:
                  'mb-4 mt-10 scroll-m-20 border-b pb-2 text-3xl font-bold tracking-tight first:mt-0'
              }
            },
            h3: {
              component: MarkdownHeading,
              props: {
                as: 'h3',
                className:
                  'mb-4 mt-6 scroll-m-20 text-2xl font-bold tracking-tight'
              }
            },
            h4: {
              component: MarkdownHeading,
              props: {
                as: 'h4',
                className:
                  'mb-4 mt-6 scroll-m-20 text-xl font-bold tracking-tight'
              }
            },
            h5: {
              component: MarkdownHeading,
              props: {
                as: 'h5',
                className:
                  'mb-4 mt-6 scroll-m-20 text-lg font-semibold tracking-tight'
              }
            },
            h6: {
              component: MarkdownHeading,
              props: {
                as: 'h6',
                className:
                  'mb-4 mt-6 scroll-m-20 text-sm font-semibold tracking-tight'
              }
            },
            p: <p className="mb-4 mt-6 text-base leading-7" />,
            a: (
              <a
                className="font-medium text-primary underline underline-offset-4"
                target="_blank"
              />
            ),
            img: (
              // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
              <img className="mx-auto my-10 h-auto max-w-full rounded dark:brightness-90" />
            ),
            blockquote: <blockquote className="mt-6 border-l-2 pl-6 italic" />,
            table: <table className="block w-max max-w-full overflow-x-auto" />,
            tr: (
              <tr className="m-0 border-t p-0 even:bg-muted even:dark:bg-muted/50" />
            ),
            th: (
              <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right" />
            ),
            td: (
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right" />
            ),
            ul: <ul className="my-6 ml-6 list-disc [&>li]:mt-2" />,
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
