import type { Metadata } from 'next';

import { fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { Footer } from '@/shared/components/footer';
import { Header } from '@/shared/components/header';
import { ThemeProvider } from '@/shared/components/theme-provider';
import { Toaster } from '@/shared/components/ui/toaster';

import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Slog',
    default: 'Slog'
  },
  description:
    "This is sh031224's tech blog mainly about front-end technology.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL),
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ],
  openGraph: {
    title: 'Slog',
    description:
      "This is sh031224's tech blog mainly about front-end technology.",
    url: process.env.NEXT_PUBLIC_APP_URL,
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

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script
          src="https://polyfill.io/v3/polyfill.js?features=IntersectionObserver"
          defer
        ></script>
      </head>
      <body
        className={cn('min-h-screen font-sans antialiased', fontSans.variable)}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />

          <div className="flex w-full justify-center">
            <main className="container relative">{children}</main>
          </div>

          <Footer />

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
