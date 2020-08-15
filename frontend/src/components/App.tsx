import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import firebase from "firebase/app";
import { option } from "../config/firebase.json";
<<<<<<< HEAD
import NotfoundPage from "../pages/NotfoundPage";
=======
import loadable from "@loadable/component";

const MainPage = loadable(() =>
  import(/* webpackChunkName: "Header" */ "../pages/MainPage")
);
const PostPage = loadable(() =>
  import(/* webpackChunkName: "Header" */ "../pages/PostPage")
);
const HandlePage = loadable(() =>
  import(/* webpackChunkName: "Header" */ "../pages/HandlePage")
);
const NotfoundPage = loadable(() =>
  import(/* webpackChunkName: "Header" */ "../pages/NotfoundPage")
);
>>>>>>> 3cb1b1f2e41c3812a8e4138bb716201311f262ae

firebase.initializeApp(option);

const App = () => {
  return (
    <React.Fragment>
      <div className="App">
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/post/:idx" component={PostPage} />
          <Route path="/handle/:idx" component={HandlePage} />
          <Route path="/handle" component={HandlePage} />
          <Route component={NotfoundPage} />
          <Redirect to="/notfound" />
        </Switch>
      </div>
    </React.Fragment>
  );
};

export default App;
