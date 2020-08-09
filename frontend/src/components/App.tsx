import React from "react";
import { Switch, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import PostPage from "../pages/PostPage";
import firebase from "firebase";
import CreatePage from "../pages/CreatePage";
const config = require("../config/firebase.json");

firebase.initializeApp(config);

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/post/:idx" component={PostPage} />
        <Route path="/create" component={CreatePage} />
      </Switch>
    </div>
  );
};

export default App;
