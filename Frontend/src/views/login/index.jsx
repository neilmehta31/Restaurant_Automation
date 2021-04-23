import "./styles.css";
import Admin from "../../layouts/Admin.js";
import RTL from "../../layouts/Manager.js";
import {useHistory} from 'react-router-dom';

import React, { Component } from "react";
import Manager from "../../layouts/Manager.js";
import {useState} from 'react';
import Axios from 'axios';

function Login (){
  

  const [container,setContainer]=useState('container');
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');

  const history=useHistory();

  const signUpButton = () => {
    setContainer({ container: "container right-panel-active" });
  };

  const signInButton = () => {
    setContainer({ container: "container" });
  };

  const redirectToCustomer = () => {
    
        Axios.post("http://localhost:5000/api/customer/signin", {
        email,
        password
      }).then((response) => {
        if(response.data.success)
        {
          history.push("/admin/dashboard");
          console.log(email);
          
        }
        console.log(response.data.success);
      }).catch((err) => {
        console.log(err);
      });

      
      };
      
  // const redirectToManager = () => {
  //   history.push("/manager/setMenu");
  // };

  
    return (
      <div className="logincontainer">
        <div>
          <h2 className="loginh2">Restaurant Login </h2>
        </div>

        <div className={container} id="container">
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
                onClick={signUpButton}
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
              <input className="logininput" type="email" placeholder="Email" onChange={(e) =>{
                setEmail(e.target.value);
              }}/>
              <input
                className="logininput"
                type="password"
                placeholder="Password"
                onChange={(e) =>{
                  setPassword(e.target.value);
                }}/>
              <a className="logina" href="#">
                Forgot your password?
              </a>
              <button
                className="buttonclass rounded-pill"
                onClick={redirectToCustomer}
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
                  onClick={signInButton}
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
                  onClick={signInButton}
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


export default Login;

