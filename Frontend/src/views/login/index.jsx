import "./styles.css";
import Admin from "../../layouts/Admin.js";
import RTL from "../../layouts/Manager.js";
import { withRouter } from "react-router-dom";

import React, { Component } from "react";
import Manager from "../../layouts/Manager.js";

class Login extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    container: "container",
  };

  signUpButton = () => {
    this.setState({ container: "container right-panel-active" });
  };

  signInButton = () => {
    this.setState({ container: "container" });
  };

  redirectToCustomer = () => {
    console.log("meow");
    this.props.history.push("/admin/dashboard");
  };
  redirectToManager = () => {
    this.props.history.push("/manager/setMenu");
  };

  render() {
    return (
      <div className="logincontainer">
        <div>
          <h2 className="loginh2">Restaurant Login </h2>
        </div>

        <div className={this.state.container} id="container">
          <div className="form-container sign-up-container">
            <form className="loginform" action="#">
              <h1 className="colorCreateAccount loginh1">Create Account</h1>

              {/* <div className="social-container">
                <a href="#" className="social logina">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social logina">
                  <i className="fab fa-google-plus-g"></i>
                </a>
                <a href="#" className="social logina">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div> */}
              <span className="loginspan">
                or use your email for registration
              </span>
              <input className="logininput" type="text" placeholder="Name" />
              <input className="logininput" type="email" placeholder="Email" />
              <input
                className="logininput"
                type="password"
                placeholder="Password"
              />

              <button
                className="buttonclass rounded-pill m-2"
                onClick={this.redirectToManager}
              >
                Sign Up
              </button>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form className="loginform" action="#">
              <h1 className="colorCreateAccount loginh1">Sign in</h1>
              {/* <div className="social-container">
                <a href="#" className="social logina">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social logina">
                  <i className="fab fa-google-plus-g"></i>
                </a>
                <a href="#" className="social logina">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div> */}
              <span className="loginspan">or use your account</span>
              <input className="logininput" type="email" placeholder="Email" />
              <input
                className="logininput"
                type="password"
                placeholder="Password"
              />
              <a className="logina" href="#">
                Forgot your password?
              </a>
              <button
                className="buttonclass rounded-pill"
                onClick={this.redirectToCustomer}
              >
                Sign In
              </button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1 className="loginh1">Welcome Back!</h1>
                <p className="loginp">
                  To keep connected with us please login with your personal info
                </p>
                <button
                  className="buttonclass ghost rounded-pill"
                  id="signIn"
                  onClick={this.signInButton}
                >
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1 className="loginh1">Hello, Friend!</h1>
                <p className="loginp">
                  Enter your personal details and start journey with us
                </p>
                <button
                  className=" buttonclass ghost rounded-pill "
                  id="signUp"
                  onClick={this.signUpButton}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
