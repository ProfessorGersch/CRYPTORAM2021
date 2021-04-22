import React, { Component } from "react";
import { ethers } from "ethers";

class BuySold extends Component {
  handleClick = async event => {
    event.preventDefault();

    // avoid atomic transaction problems for now; otherwise code gets complex

    try {
      // This is NOT the best way to do this, but I'll make it a separate transaction anyway...
      // get the ramcoins first, then mint the token.  In real life the contract would do all of this

      var amount = ethers.utils.parseEther(this.props.ramPrice.toString()); // * 1e18;
      console.log ("amount", amount.toString());

      await this.props.state.RC
        .transfer(this.props.state.walletAddress, amount);

      console.log("RamCoin tokens transferred to owner wallet");

      try {
        console.log("CS", this.props.state.CS);
        console.log(
          "purchaser",
          this.props.state.purchaserAddress,
          this.props.ramID,
          this.props.ramPrice,
          this.props.ramColor,
          this.props.ramName
        );
        await this.props.state.CS.buyRam(
            this.props.state.purchaserAddress,
            this.props.ramID,
            this.props.ramPrice,
            this.props.ramColor,
            this.props.ramName
          );
        console.log("sale succeeded");
      } catch {
        console.log("sales transfer failed");
      }
    } catch {
      console.log("the sale didn't work.  do you have enough ramCoins?");
    }
  };

  render() {
    if (!this.props.ramSellable) {
      return (
        <a href="#" className="waves-effect waves-light disabled btn">
          &nbsp; Sold: {this.props.ramPrice}
          RamCoins
        </a>
      )
    } else if (this.props.state.purchaserRamCount >= 2) {
      return (
        <a href="#" className="waves-effect waves-light disabled btn">
          &nbsp; At Limit: {this.props.ramPrice} RamCoins
        </a>
      )
    } else {
      return (
        <a
          href="#"
          className="waves-effect waves-light  btn"
          onClick={this.handleClick}
        >
          Price: {this.props.ramPrice} RamCoins
        </a>
      );
    }
  }
}
export default BuySold;
