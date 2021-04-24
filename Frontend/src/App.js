import React, { Component } from "react";

// core components
import Admin from "layouts/Admin.js";
import Manager from "layouts/Manager.js";
import Chef from "layouts/Chef.js";
import Waiter from "layouts/Waiter";
import Cashier from "layouts/Cashier";
import BusBoy from "layouts/BusBoy";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import Login from "views/login/index";
import ManagerLogin from "views/ManagerLogin/managerLogin.js";
import QRRead from "components/QR/QR";
import EmplLogin from "views/EmployeeLogin/EmployeeLogin";
import EmployeeLogin from "views/EmployeeLogin/EmployeeLogin";

const hist = createBrowserHistory();

class App extends Component {
  state = {};
  render() {
    return (
      <div>
        <Router history={hist}>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/admin" component={Admin} />
            <Route path="/manager" component={Manager} />
            <Route path="/qr" component={QRRead} />
            <Route path="/chef" component={Chef} />
            <Route path="/waiter" component={Waiter} />
            <Route path="/cashier" component={Cashier} />
            <Route path="/busboy" component={BusBoy} />
            <Route path="/managerLogin" component={ManagerLogin} />
            <Route path="/employeeLogin" component={EmployeeLogin} />
            <Redirect from="/" to="/login" />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
