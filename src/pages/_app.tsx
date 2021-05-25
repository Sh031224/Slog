import React, { useEffect } from "react";
import { AppContext, AppInitialProps, AppProps } from "next/app";
import { NotificationContainer } from "react-notifications";
import Head from "next/head";
import { useRouter } from "next/router";
import * as gtag from "lib/ga/gtag";
import { NextComponentType } from "next";
import wrapper from "../stores";
import "react-confirm-alert/src/react-confirm-alert.css";
import "react-notifications/lib/notifications.css";
import "style/font.scss";
import { lightTheme } from "style/theme";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "style/GlobalStyle";
import cookies from "next-cookies";
import { removeToken, setToken } from "lib/token";
import MainTemplate from "components/common/template/MainTemplate";
import axios from "axios";

const App: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
  Component,
  pageProps
}) => {
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
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Slog</title>
      </Head>
      <NotificationContainer />
      <ThemeProvider theme={lightTheme}>
        <MainTemplate>
          <Component {...pageProps} />
        </MainTemplate>
        <GlobalStyle />
      </ThemeProvider>
    </>
  );
};

App.getInitialProps = async ({ Component, ctx }: AppContext): Promise<AppInitialProps> => {
  let pageProps = {};

  const isServer = typeof window === "undefined";

  if (isServer) {
    const allCookies = cookies(ctx);
    const accessToken = allCookies["access_token"];
    if (accessToken !== undefined) {
      setToken(accessToken);
      axios.defaults.headers.common["Cookie"] = accessToken;
    } else {
      removeToken();
    }
  }

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
};

export default wrapper.withRedux(App);
