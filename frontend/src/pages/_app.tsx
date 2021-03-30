import React, { useEffect } from "react";
import { AppProps } from "next/app";
import { useStaticRendering, Provider } from "mobx-react";
import { NotificationContainer } from "react-notifications";
import Head from "next/head";
import stores from "../stores";
import "react-confirm-alert/src/react-confirm-alert.css";
import "react-notifications/lib/notifications.css";
import "lib/prism/prism-okaidia.css";
import "util/util.scss";
import { useRouter } from "next/router";
import * as gtag from "lib/ga/gtag";

const isServer = typeof window === "undefined";
useStaticRendering(isServer);

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/firebase-messaging-sw.js").catch((err) => {
        console.error("Service worker registration failed", err);
      });
    }
  }, []);

  return (
    <Provider store={stores}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
        <title>Slog</title>
      </Head>
      <NotificationContainer />
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;
