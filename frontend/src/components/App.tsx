import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import MainPage from "../pages/MainPage";
import PostPage from "../pages/PostPage";
import firebase from "firebase/app";
import HandlePage from "../pages/HandlePage";
import { option } from "../config/firebase.json";
import NotfoundPage from "../pages/NotfoundPage";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";

firebase.initializeApp(option);

const App = () => {
  return (
    <React.Fragment>
      <div className="App">
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/post/:idx" component={PostPage} />
          <Route path="/handle/:idx" component={HandlePage} />
          <Route component={NotfoundPage} />
          <Redirect to="/notfound" />
        </Switch>
        <NotificationContainer />
      </div>
    </React.Fragment>
  );
};

export default App;
