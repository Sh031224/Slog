import type { Metadata } from 'next';

import { fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { Footer } from '@/shared/components/footer';
import { Header } from '@/shared/components/header';
import { ThemeProvider } from '@/shared/components/theme-provider';

import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Slog',
  description:
    "This is sh031224's tech blog mainly about front-end technology.",
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
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
        className={cn('min-h-screen font-sans antialiased', fontSans.variable)}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />

          <div className="flex w-full justify-center">
            <main className="container relative min-h-[calc(100vh-15rem)] overflow-hidden">
              {children}
            </main>
          </div>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
