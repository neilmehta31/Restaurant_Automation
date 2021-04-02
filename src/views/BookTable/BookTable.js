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
      </div>
    );
  }
}
