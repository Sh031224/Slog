import type { Metadata } from 'next';

import { Footer } from '@/components/shared/footer';
import { Header } from '@/components/shared/header';
import { ThemeProvider } from '@/components/shared/theme-provider';
import { fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';

import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Slog',
  description:
    "This is sh031224's tech blog mainly about front-end technology.",
  metadataBase: new URL('http://localhost:3000'),
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ],
  openGraph: {
    title: 'Slog',
    description:
      "This is sh031224's tech blog mainly about front-end technology.",
    url: 'https://slog.website',
    images: ['/og.svg']
  },
  twitter: {
    title: 'Slog',
    description:
      "This is sh031224's tech blog mainly about front-end technology.",
    images: ['/og.svg'],
    card: 'summary_large_image'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head />
      <body
        suppressHydrationWarning
        className={cn('min-h-screen font-sans antialiased', fontSans.variable)}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />

          <div className="flex w-full justify-center">
            <main className="container relative min-h-[calc(100vh-15rem)]">
              {children}
            </main>
          </div>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
