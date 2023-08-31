import { type ClassValue, clsx } from 'clsx';
import type { UrlObject } from 'node:url';
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

    return url.toString();
  }

  url.pathname = input.pathname || '';
  url.search =
    typeof input.query === 'object'
      ? new URLSearchParams(input.query as Record<string, string>).toString()
      : input.query ?? '';

  return url.toString();
}
