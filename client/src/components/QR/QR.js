import React, { Component } from "react";
import QrReader from "react-qr-reader";
import { withRouter } from "react-router-dom";

class QRRead extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    result: "No result",
  };
  scanQr = () => {
    this.props.history.push("/qr");
  };

  redirectto = () => {
    if (this.state.result !== ("No result" || "http://localhost:3000/qr")) {
      this.props.history.push("/customer/dashboard");
    }
  };

  handleScan = (data) => {
    if (data) {
      this.setState({
        result: data,
      });
    }
    console.log(this.state.result);
    if(this.state.result==='https://github.com/neilmehta31/Restaurant_Automation')
    {
      this.props.history.push('/admin');
    }
    
  };
  handleError = (err) => {
    console.error(err);
  };
  render() {
    return (
      <div>
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: "100%" }}
        />
        <p>{this.state.result}</p>
      </div>
    );
  }
}

export default QRRead;
