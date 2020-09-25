import React from "react";
import App from "next/app";
import { useStaticRendering, Provider } from "mobx-react";
import firebase from "firebase";
import option from "../config/firebase.json";
import stores from "../stores";
import "react-notifications/lib/notifications.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import "prismjs/themes/prism.css";
import "../util/util.scss";

const isServer = typeof window === "undefined";
useStaticRendering(isServer);

if (!firebase.app.length) {
  firebase.initializeApp(option);
}

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Provider store={stores}>
        <Component {...pageProps} />
      </Provider>
    );
  }
}
export default MyApp;
