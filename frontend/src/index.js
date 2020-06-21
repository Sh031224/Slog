import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import stores from "./stores";
import { Provider } from "mobx-react";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

import "util/utils.scss";

ReactDOM.render(
  <Provider store={stores}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
