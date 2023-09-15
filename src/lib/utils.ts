import { type ClassValue, clsx } from 'clsx';
import dayjs from 'dayjs';
import { compiler as markdownCompiler } from 'markdown-to-jsx';
import { parse as DOMParse } from 'node-html-parser';
import type { UrlObject } from 'node:url';
import reactElementToJSXString from 'react-element-to-jsx-string';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function buildKey(...tag: string[]) {
  return [...tag];
}

export function parseURL(input: string | UrlObject) {
  const url = new URL(process.env.NEXT_PUBLIC_APP_URL);

  if (typeof input === 'string') {
    url.pathname = input;

    return decodeURIComponent(url.toString());
  }

  url.pathname = input.pathname || '';
  url.search =
    typeof input.query === 'object'
      ? new URLSearchParams(input.query as Record<string, string>).toString()
      : input.query ?? '';

  return decodeURIComponent(url.toString());
}

export function prettyFormatter(date: Date) {
  const parsedDate = dayjs(date);

  return dayjs().year() === parsedDate.year()
    ? parsedDate.format('MMM D')
    : parsedDate.format('YYYY MMM D');
}

export function findImageCount(content: string) {
  return (
    content.match(/!\[[^\]]*\]\((.*?)\s*("(?:.*[^"])")?\s*\)/g)?.length ?? 0
  );
}

export function strip(html: string) {
  return DOMParse(html, {
    comment: true
  }).textContent;
}

export function calculateReadingTime(content: string, wpm = 225) {
  const imageCount = findImageCount(content);
  const parsedContent = strip(
    reactElementToJSXString(
      markdownCompiler(
        content.replaceAll(/!\[[^\]]*\]\((.*?)\s*("(?:.*[^"])")?\s*\)/g, '')
      )
    )
  );

  const wordCount = parsedContent
    .trim()
    .replace(/\s{2,}/gi, ' ')
    .split(' ').length;

  return Math.ceil(wordCount / wpm + imageCount * 0.17) || 1;
}
