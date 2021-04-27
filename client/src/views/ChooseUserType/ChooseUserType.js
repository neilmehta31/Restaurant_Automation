import React from 'react';
import {Redirect, useHistory} from 'react-router-dom';
import {useState} from 'react';
import './styles.css';

function ChooseUserType(){
    
    const [conName,setConName]=useState("ztype1");

    const history=useHistory();

    const redirectToCustomer=()=>{
        history.push("/login");
    }
    const redirectToEmployee=()=>{
        history.push("/employeeLogin");
    }
    const redirectToManager=()=>{
        history.push("/managerLogin");
    }



    const changeopacity=()=>{
        setConName("ztype2");
    }

    return(
    <div className = "whole" >
        <div>
        <p classname="ztype1" style = {{fontSize:50, color:'black'}}>Choose Your User Type</p>
        <br></br>
        <br></br>
        <div className="changetoflex">
        <button
        className=" buttonclass  rounded-pill m-2"
        id="customer"
        onClick={redirectToCustomer}
        >
        Customer
        </button>
        <button
        className=" buttonclass  rounded-pill m-2"
        id="customer"
        onClick={redirectToEmployee}
        >
        Employee
        </button>
        <button
        className=" buttonclass  rounded-pill m-2"
        id="customer"
        onClick={redirectToManager}
        >
        Manager
        </button>
        </div>
        </div>
    </div>
        );
    
}

export default ChooseUserType;