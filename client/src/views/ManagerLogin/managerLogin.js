import "./styles.css";
import {useHistory} from 'react-router-dom';

import React from "react";
import {useState} from 'react';
import Axios from 'axios';

function ManagerLogin (){
  

  const [containername,setContainer]=useState({containername:'container'});
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[password_confirmation,setPasswordConfirmation]=useState('');
  const[firstname,setFirstName]=useState('');
  const[surname,setLastName]=useState('');
  const[phoneNo,setPhoneNumber]=useState('');



  const history=useHistory();

  const signUpButton = () => {
    setContainer({ containername: "container right-panel-active" });
  };

  const signInButton = () => {
    setContainer({ containername: "container" });
  };

  const redirectToManagerSignin = () => {
    
        Axios.post("http://rest-auto-api.herokuapp.com/api/manager/signin", {
        email,
        password
      }).then((response) => {
        if(response.data.success)
        {
          history.push("/manager");
          console.log(email);
          
        }
        console.log(response.data.success);
      }).catch((err) => {
        console.log(err);
      });

      
      };
      

      const redirectToCustomerSignup = () => {
    
        Axios.post("http://rest-auto-api.herokuapp.com/api/customer/signup", {
        firstname,
        surname ,
        phoneNo,
        email,
        password,
        password_confirmation
      }).then((response) => {
        if(response)
        { 
          console.log(response);
          history.push("/admin/dashboard");
         
          
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
      <div className = "wholeContainer">
      <div className="logincontainer">
        <div>
          <h2 className="loginh2">Manager Login </h2>
        </div>

        <div className={containername.containername} id="container">
          {/* <div className="form-container sign-up-container">
            <form className="loginform" action="#">
              <h1 className="colorCreateAccount loginh1">Create Account</h1>

               <div className="social-container">
                <a href="#" className="social logina">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social logina">
                  <i className="fab fa-google-plus-g"></i>
                </a>
                <a href="#" className="social logina">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div> 
              <span className="loginspan">
                or use your email for registration
              </span>
              <input className="logininput" type="text" placeholder=" First Name"  onChange={(e) =>{
                  setFirstName(e.target.value);
                }} />
              <input className="logininput" type="text" placeholder=" Last Name"  onChange={(e) =>{
                  setLastName(e.target.value);
                }} />
              <input className="logininput" type="email" placeholder="Email"  onChange={(e) =>{
                  setEmail(e.target.value);
                }} />
              <input className="logininput" type="text" placeholder=" Phone Number"  onChange={(e) =>{
                  setPhoneNumber(e.target.value);
                }} />
              <input
                className="logininput"
                type="password"
                placeholder="Password"
                
                onChange={(e) =>{
                  setPassword(e.target.value);
                  
                }}
              />
              <input
                className="logininput"
                type="password"
                placeholder="Confirm Password"
                
                onChange={(e) =>{
                  setPasswordConfirmation(e.target.value);
                }}
              />
              

              <button
                className="buttonclass rounded-pill m-2"
                onClick={redirectToCustomerSignup}
              >
                Sign Up
              </button>
            </form>
          </div> */}
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
                onClick={redirectToManagerSignin}
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
                <h1 className="loginh1">Hello, Manager!</h1>
                <p className="loginp">
                  Welcome back Manager
                </p>
                {/* <button
                  className=" buttonclass ghost rounded-pill "
                  id="signUp"
                  onClick={signUpButton}
                >
                  Sign Up
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }


export default ManagerLogin;

