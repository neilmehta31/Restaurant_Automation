import "./styles.css";
import React, { Component } from "react";
import { Table } from "./table";

export class TableLayout extends Component {
  state = {};

  render() {
    return (
      <div>
        <div className="outersize">
          <div className="row">
            <div className="col">
              <Table />
            </div>
            <div className="col">
              <Table />
            </div>
            <div className="col">
              <Table />
            </div>
            <div className="col">
              <Table />
            </div>
          </div>
          <div className="row marginleftright">
            <div className="col ">
              <Table />
            </div>
            <div className="col">
              <Table />
            </div>
            <div className="col">
              <Table />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Table />
            </div>
            <div className="col">
              <Table />
            </div>
            <div className="col">
              <Table />
            </div>
            <div className="col">
              <Table />
            </div>
          </div>
        </div>
        <footer>
          <p className="centertext">
            <span className="tablebookedcolor m-2 heightx textsize">
              booked
            </span>
            <span className="tablereservedcolor m-2 heightx textsize">
              reserved
            </span>
            <span className="tableavailablecolor m-2 heightx textsize">
              available
            </span>
          </p>
        </footer>
      </div>
    );
  }
}
