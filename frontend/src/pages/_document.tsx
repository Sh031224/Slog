import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
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
