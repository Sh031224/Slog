import React from "react";
import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";
import { ga_tracking } from "config/index.json";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />)
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }
  render() {
    return (
      <Html lang="ko">
        <Head>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${ga_tracking}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ga_tracking}', {
                page_path: window.location.pathname,
              });
          `
            }}
          />
          <link rel="icon" href="/images/logo512.png" />
          <meta name="theme-color" content="#000000" />
          <link rel="apple-touch-icon" href="/images/logo192.png" />
          <link rel="shortcut icon" href="/images/favicon.ico" />
          <link rel="manifest" href="/images/manifest.json" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
