import { Analytics } from '@vercel/analytics/react';
import type { Metadata, Viewport } from 'next';

import { fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { Footer } from '@/shared/components/footer';
import { Header } from '@/shared/components/header';
import { ThemeProvider } from '@/shared/components/theme-provider';
import { Toaster } from '@/shared/components/ui/toaster';

import '@/styles/globals.css';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ],
};

export const metadata: Metadata = {
  title: {
    template: '%s | Slog',
    default: 'Slog'
  },
  description:
    "This is sh031224's tech blog mainly about front-end technology.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL),
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: 'Slog',
    description:
      "This is sh031224's tech blog mainly about front-end technology.",
    url: process.env.NEXT_PUBLIC_APP_URL,
    images: ['/opengraph-image.svg']
  },
  twitter: {
    title: 'Slog',
    description:
      "This is sh031224's tech blog mainly about front-end technology.",
    images: ['/opengraph-image.svg'],
    card: 'summary_large_image'
  }
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <meta property="fb:app_id" content="329919202694502" />
      </head>
      <body className={cn('font-sans antialiased', fontSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="relative min-h-screen">
            <Header />

            <div className="flex w-full justify-center">
              <main className="container relative">{children}</main>
            </div>

            <Footer />
          </div>

          <Toaster />
        </ThemeProvider>

        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  );
}
