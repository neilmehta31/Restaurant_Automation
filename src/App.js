import React, { Component } from "react";

// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";
import Manager from "layouts/Manager.js";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { Login } from "views/login/index";

const hist = createBrowserHistory();

class App extends Component {
  state = {
    comp: Login,
    path: "/login",
  };
  render() {
    return (
      <div>
        <Router history={hist}>
          <Switch>
            <Route path="/login" component={Login} />
            <Redirect from="/" to="/login" />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
