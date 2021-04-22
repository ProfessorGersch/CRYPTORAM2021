import React, { Component } from "react";
import { Row } from "react-materialize";

class PurchaserInventory extends Component {
  render() {
    return (
      <div>
        Your account address: {this.props.state.purchaserAddress}
        <br />
        You own {this.props.state.purchaserRamCount} CryptoRAM(s).
        <br />
        You own {this.props.state.purchaserRamCoinCount} RAMCoins you can use to
        buy CryptoRAMs.
        <br /> <br />
        It may take 10 seconds or more to display the inventory before you can
        purchase a CryptoRAM. <b>You will have to approve two metamask
        transactions: one to transfer RAMcoins, one to mint the cryptoRAM.</b> These
        will be separated by 15 to 30 seconds or even more if Rinkeby chain is slow, so be patient!
        <br />
        After purchasing a CryptoRAM, you MUST refresh the browser once or twice to see your
        purchase.
        <br /> <br />
        <div>
          <Row>{this.props.state.purchasedRamsTable}</Row>
        </div>
      </div>
    );
  }
}

export default PurchaserInventory;
