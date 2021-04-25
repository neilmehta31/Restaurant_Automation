import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "App";
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import allReducers from "redux/reducers/index";

import "assets/css/material-dashboard-react.css?v=1.9.0";

const mystore = createStore(allReducers);
const hist = createBrowserHistory();

ReactDOM.render(<Provider store={mystore} ><App /></Provider>, document.getElementById("root"));
