import React from "react";
import { Switch, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import PostPage from "../pages/PostPage";
import firebase from "firebase/app";
import CreatePage from "../pages/CreatePage";
import { option } from "../config/firebase.json";

firebase.initializeApp(option);

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
