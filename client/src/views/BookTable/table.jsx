import React, { Component } from "react";
import {useState} from 'react';
import Axios from 'axios';

function Table() {
  // state = { tableid: 0, bookingstate: 0, _classname: "tableshape " };

  const [tableid,setTableid]=useState(0);
  const [bookingstate,setBookingstate]=useState(0);
  const [available,setAvailable]=useState(0);
  const [_classname,set_classname]=useState("tableshape");

  const bookTable = () => {
    //color yellow
    if (bookingstate === 0) {
      // this.setState({
      //   bookingstate: 1,
      //   _classname: "tableshape tablebookedcolor",
      // });
      setBookingstate(1);
      setAvailable(1);
      set_classname("tableshape tablebookedcolor");
    } else {
      // this.setState({ bookingstate: 0, _classname: "tableshape" });
      setBookingstate(0);
      setAvailable(0);
      set_classname("tableshape");
    }

    Axios.post('http://rest-auto-api.herokuapp.com/api/customer/tableSelection',{
      tableid,
      available
      
    }).then((response) => {
      
        console.log(response);
      // console.log(response.data.success);
    }).catch((err) => {
      console.log(err);
    });
  };

  const reserveTable = () => {
    //color red
    if (bookingstate === 0) {
      // this.setState({
      //   bookingstate: 2,
      //   _classname: "tableshape tablereservedcolor",
      // });
      setBookingstate(2);
      setAvailable(1);
      set_classname("tableshape tablereservedcolor");
    } else {
      // this.setState({ bookingstate: 0, _classname: "tableshape" });
      setBookingstate(0);
      setAvailable(0);
      set_classname("tableshape");
    }
    Axios.post('http://rest-auto-api.herokuapp.com/api/customer/tableSelection',{
      tableid,
      available
      
    }).then((response) => {
      
        console.log(response);
      // console.log(response.data.success);
    }).catch((err) => {
      console.log(err);
    });
  };

  
    return (
      <div
        onClick={() => bookTable()}
        className={_classname}
      ></div>
    );
  
}

export default Table;