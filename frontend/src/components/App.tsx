import React from "react";
import { Switch, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import PostPage from "../pages/PostPage";

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
