import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import ExamplePage from "./pages/ExamplePage";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ExamplePage} />
        <Route component={NotFoundPage} />
        <Redirect to="/notfound" />
      </Switch>
    </div>
  );
}

export default App;
