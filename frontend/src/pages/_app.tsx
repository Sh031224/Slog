import React from "react";
import App from "next/app";
import { useStaticRendering, Provider } from "mobx-react";
import { NotificationContainer } from "react-notifications";
import Head from "next/head";
import stores from "../stores";
import "react-confirm-alert/src/react-confirm-alert.css";
import "react-notifications/lib/notifications.css";
import "../util/util.scss";

const isServer = typeof window === "undefined";
useStaticRendering(isServer);

class MyApp extends App {
  componentDidMount() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .catch((err) => {
          console.error("Service worker registration failed", err);
        });
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Provider store={stores}>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, user-scalable=no"
          />
          <title>Slog</title>
        </Head>
        <NotificationContainer />
        <Component {...pageProps} />
      </Provider>
    );
  }
}
export default MyApp;
