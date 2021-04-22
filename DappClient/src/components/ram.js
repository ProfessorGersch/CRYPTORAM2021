import React, { Component } from "react";
import BuySold from "./buySold";

class Ram extends Component {
  render() {
    if (this.props.ramID >= 192) {
      return (
        <div className="card grey lighten-3">
          <div className="card-content">
            <span className="card-title">
              CryptoRAM ID: <b>{this.props.ramID}</b> <br /> Name :{" "}
              <b>{this.props.ramName}</b>
            </span>
            <div>
              <img src={this.props.ramColor} width="220px" alt="logo" />
            </div>

            <br />

            <div className="card-action">
              <BuySold
                key = {this.props.RamID}
                ramID = {this.props.ramID}
                ramPrice={this.props.ramPrice}
                ramColor={this.props.ramColor}
                ramName={this.props.ramName}
                ramSellable={this.props.ramSellable}
                state={this.props.state}
              />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="card grey lighten-3">
          <div className="card-content">
            <span className="card-title">
              CryptoRAM ID: <b>{this.props.ramID}</b> <br /> Name :{" "}
              <b>{this.props.ramName}</b>
            </span>
            <div
              style={{
                backgroundColor: this.props.ramColor,
                padding: "10px",
                border: "1px solid green",
                width: "220px",
                height: "290px",
                position: "absolute",

                zIndex: "0",
                opacity: "0.5"
              }}
            />
            <div
              style={{
                position: "absolute",
                width: "200px",
                padding: "10px",
                height: "200px",
                zIndex: "1"
              }}
            >
              <img src="RAM_LOGO.png" width="200px" alt="logo" />
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="card-action">
              <BuySold
                key = {this.props.ramID}
                ramID = {this.props.ramID}
                ramPrice={this.props.ramPrice}
                ramColor={this.props.ramColor}
                ramName={this.props.ramName}
                ramSellable={this.props.ramSellable}
                state={this.props.state}
              />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Ram;

