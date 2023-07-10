import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full border-t bg-background/95">
      <div className="container flex h-auto w-full flex-col items-center justify-between py-10 text-sm text-muted-foreground">
        <span className="inline-block">
          © 2023.{' '}
          <Link
            href="https://github.com/Sh031224"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Sh031224.
          </Link>{' '}
          All rights reserved.
        </span>

        <p className="mt-1 text-sm">
          Powered by{' '}
          <Link
            href="https://vercel.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Vercel.
          </Link>
        </p>

        <Link
          href="/privacy"
          className="mt-4 text-base text-muted-foreground underline"
        >
          개인정보 처리방침
        </Link>
      </div>
    </footer>
  );
}
