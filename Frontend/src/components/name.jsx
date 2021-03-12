import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../App.css';

class Name extends React.Component {
    
    render() { 
        return(
            <form>
                <div class='login-page'>
                <h1>Login Page</h1>
                <br />
                <br />
                <br />
                <div>
            <h6>Name</h6>
            <input type='text' />
            </div>
            <br />
                <br />
            <div>
                <h6>Email Id</h6>
                <input type='Email' />
            </div>
            <br />
                <br />
            <div>
                <h6>Password</h6>
                <input type='password' />
            </div>
            <br />
            <br />
            <div>
                <button>Submit</button>
                </div>
            </div>
            </form>
        ); 
    }
}
ReactDOM.render(<Name />,document.getElementById('root'));
 
export default Name;