import React, { Component } from "react";

import initBlockchain from "./utils/initBlockchain";

import Ram from "./components/ram";
import Header from "./components/header";
import PurchaserInventory from "./components/PurchaserInventory";

import buildRamTable from "./helpers/buildRamTable";

import { Col, Container, Pagination } from "react-materialize";

// ******************************************************************************************************
//
//  The main CRYPTORAMs React GUI to the two smart contract_ABI:  CryptoRams and CryptoRamSales.
//
//  Note:  this is a horrible combination of REACT with smart contract_ABI.  I publish this as a way NOT to do things
//
//         this system has too many loopholes.  Decisions (such as 2 token limit) are made by the GUI, not the smart contract
//         Worse: the contract doesn't take Ramcoins directly, it takes 2 separate transactions.  This can easily be gamed.
//
//         so... don't write code like this!
//
// *****************************************************************************************************

class App extends Component {
  state = {
    CR: {},
    CS: {},
    RC: {},

    loading: false,
    value: "",
    message: "",

    ramsTable: [],
    purchasedRamsTable: [],

    purchaserAddress: "",
    purchaserRamCount: 0,
    purchaserRamCoinCount: 0,
    walletAddress: "0xBd08bbd472750F6755feA4369C71fa79CBAA48f8",  // Joe 3 account

    numPages: 13,
    activePage: 1,
    NUMRAMS: 204
  };

  // **************************************************************************
  //
  // React will call this routine only once when App page loads; do initialization here
  //
  // **************************************************************************

  componentDidMount = async () => {
    //
    // Get network provider and web3 instance for CryptoRam and CryptoRamSale and RamCoin contract_ABI
    //

    try {
      try {
          // Connect to blockchain
          const data = await initBlockchain(); // get contract instance and user address
          this.setState({
              CR: data.CR,
              CS: data.CS,
              RC: data.RC,
              CSDeployedAddress: data.CSDeployedAddress,
              purchaserAddress: data.userAddress
          });
      } catch (error) {
          // Catch any errors for any of the above operations.
          alert(
              `Failed to load accounts, or contract. Check console for details.`
          );
          console.log("initblockchain error", error);
      }
      console.log("state after initBlockchain", this.state);

      //  log basic info to show we are alive
      const mySym = await this.state.CR.symbol();
      console.log("my symbol", mySym);

        // get number of RAMs and RAMCOINS purchaser already owns

      let purchaserRamCount = await this.state.CR.balanceOf(this.state.purchaserAddress)
        purchaserRamCount = purchaserRamCount.toString();
      let purchaserRamCoinCount = await this.state.RC.balanceOf(this.state.purchaserAddress)
          purchaserRamCoinCount = purchaserRamCoinCount.toString();
      console.log('ram coins', purchaserRamCoinCount, 'crypto rams', purchaserRamCount);
      purchaserRamCoinCount /= 1e18;

      // build table of CryptoRams owned by this account

      let purchasedRamsTable = [];

      for (var i = 0; i < purchaserRamCount; i++) {
        let myRam = await this.state.CR.ownedTokens(this.state.purchaserAddress, i);
        myRam = myRam.toString()
        let metaData = await this.state.CR.getRamData(myRam);
        console.log("we got a ram", metaData, myRam);
        purchasedRamsTable.push(
          <Col>
            <Ram
              key={myRam}
              ramID={myRam}
              ramName={metaData.ramName}
              ramColor={metaData.ramColor}
              ramPrice={metaData.ramPrice}
              ramSellable={false}
            />
          </Col>
        );
      }

      // Write all other info to the state

      this.setState({
        purchaserRamCount,
        purchaserRamCoinCount,
        purchasedRamsTable,
      });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        "Failed to load accounts or contract. Check console for details."
      );

      console.log("yo we got a problem", error);
    }
    console.log("new state", this.state);

    // build table of rams for this active page; existance table indicates item has been created (purchased)

    let existanceTable = await this.buildExistanceTable(1);
    let ramTable = buildRamTable(this.state, 1, existanceTable);

    // one-time operation to transfer ownership of CryptoRam to CryptoRamSale from the original creator
    // This only works for original creator (and owner) of the CryptoRam contract

      let CROwner = await this.state.CR.owner();
      console.log("CryptoRam Owner is", CROwner);
      console.log("Crypto Sales Address is", this.state.CSDeployedAddress);
      console.log("Purchaser", this.state.purchaserAddress);
        let RCOwner = await this.state.RC.owner();
        console.log("RAMCOIN Owner", RCOwner);
      if (CROwner !== this.state.CSDeployedAddress) {
        console.log("transferring CR ownership to CS contract");
        await this.state.CR
          .transferOwnership(this.state.CSDeployedAddress);
      } else {
        console.log("CS already owns CR contract");
      }

    this.setState({ramTable});

  };

  // ***********************************************************************************
  //
  //  utility routines and select button handler
  //
  // ***********************************************************************************

  // 16 at a time for each page

  buildExistanceTable = async page => {
    let existanceTable = [];
    for (let i = 0; i < 16; i++) {
      let ramID = (page - 1) * 16 + i;
      existanceTable[i] = await this.state.CR.exists(ramID);
    }
    return existanceTable;
  };

  //   button handler for selecting new pages

  onSelectHandler = async event => {
    const activePage = await event;
    let existanceTable = await this.buildExistanceTable(activePage);
    let ramTable = buildRamTable(this.state, activePage, existanceTable);
    this.setState({ activePage, ramTable, existanceTable });
  };

  // *************************************************************************
  //
  // main render routine for App component
  //
  // **************************************************************************

  render() {
    return (
      <div>
        <Header />
        <hr />
        <Container>
          <div>
            <PurchaserInventory state={this.state} />
          </div>
          <hr />
        </Container>
        <h2> CryptoRAM Inventory </h2>
        <Pagination
          activePage={this.state.activePage}
          items={13}
          onSelect={this.onSelectHandler}
        />
        {/* {this.state.allRamsTable}*/}
        <div>{this.state.ramTable}</div>
      </div>
    );
  }
}

export default App;
