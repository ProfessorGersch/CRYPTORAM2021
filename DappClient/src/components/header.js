import React, { Component } from "react";
class Header extends Component {
  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <a href="#" className="brand-logo center">
              CryptoRAM Sales Center
            </a>
          </div>
        </nav>

        <div className="center">
            <br />
            <h3>The most awesome collectibles in the whole wide universe!</h3>
            <h4>
              {" "}
              On sale now! <br />
              Press the <i>Purchase</i> button of the CryptoRAM you want to buy,{" "}
              <br /> then approve the metamask transaction.
            </h4>
          <br />
        </div>
      </div>
    );
  }
}

export default Header;
