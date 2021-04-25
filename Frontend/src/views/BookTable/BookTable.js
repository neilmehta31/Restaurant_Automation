import "./styles.css";
import React, { Component } from "react";
import Table  from "./table";

export class TableLayout extends Component {
  state = {};

  render() {
    return (
      <div>
        <div className="outersize">
          <div className="row">
            <div className="col" id="1">
              <Table />
            </div>
            <div className="col" id="2">
              <Table />
            </div>
            <div className="col" id="3">
              <Table />
            </div>
          </div>
          <div className="row marginleftright">
            <div className="col" id="4">
              <Table />
            </div>
            <div className="col" id="5">
              <Table />
            </div>
          </div>
          <div className="row">
            <div className="col" id ="6">
              <Table />
            </div>
            <div className="col" id="7">
              <Table />
            </div>
            <div className="col" id="8">
              <Table />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
