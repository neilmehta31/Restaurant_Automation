import React, { Component } from "react";

export class Table extends Component {
  state = { tableid: 0, bookingstate: 0, _classname: "tableshape " };

  bookTable = () => {
    //color yellow
    if (this.state.bookingstate === 0) {
      this.setState({
        bookingstate: 1,
        _classname: "tableshape tablebookedcolor",
      });
    } else {
      this.setState({ bookingstate: 0, _classname: "tableshape" });
    }
  };

  reserveTable = () => {
    //color red
    if (this.state.bookingstate === 0) {
      this.setState({
        bookingstate: 2,
        _classname: "tableshape tablereservedcolor",
      });
    } else {
      this.setState({ bookingstate: 0, _classname: "tableshape" });
    }
  };

  render() {
    return (
      <div
        onClick={() => this.reserveTable()}
        className={this.state._classname}
      ></div>
    );
  }
}
