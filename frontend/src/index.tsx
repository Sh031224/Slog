import React from "react";
import { hydrate } from "react-dom";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "mobx-react";
import { BrowserRouter } from "react-router-dom";
import stores from "./stores";
import "./util/util.scss";
// import { HelmetProvider } from "react-helmet-async";
import { loadableReady } from "@loadable/component";

loadableReady(() => {
  const rootElement = document.getElementById("root");
  hydrate(
    <Provider store={stores}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    rootElement
  );
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
