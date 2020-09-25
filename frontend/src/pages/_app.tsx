import React from "react";
import App from "next/app";
import { useStaticRendering, Provider } from "mobx-react";
import Head from "next/head";
import stores from "../stores";
import "react-notifications/lib/notifications.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import "prismjs/themes/prism.css";
import "../util/util.scss";

const isServer = typeof window === "undefined";
useStaticRendering(isServer);

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Provider store={stores}>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, user-scalable=no"
          />
        </Head>
        <Component {...pageProps} />
      </Provider>
    );
  }
}
export default MyApp;
