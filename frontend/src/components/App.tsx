import React from "react";
import { Switch, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import PostPage from "../pages/PostPage";
import firebase from "firebase";
const config = require("../config/firebase.json");

firebase.initializeApp(config);

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/post/:idx" component={PostPage} />
      </Switch>
    </div>
  );
};

export default App;
