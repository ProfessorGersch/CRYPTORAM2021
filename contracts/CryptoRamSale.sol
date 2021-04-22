pragma solidity ^0.6.0;

import 'openzeppelin-solidity/contracts/token/ERC721/ERC721.sol';
import './CryptoRam.sol';



contract CryptoRamSale {

    CryptoRam public cryptoRam;
    address public wallet;

    constructor (
        address _wallet,
        CryptoRam _cryptoRam
        // ERC20 _ramCoin
    )
    public {
        wallet = _wallet;
        cryptoRam = _cryptoRam;
        // ramCoin = _ramCoin;
    }

    function buyRam (address _purchaser, uint256 _ramID, uint16 _ramPrice, string memory _ramColor, string memory _ramName) public {
        //uint256 ramPrice;
        //string memory ramColor;
        //string memory ramName;
        //bool ramPremium;

        //require(msg.sender != address(0) && msg.sender != address(this));

        //uint16 price put in logic to check if account has enough RamCoins
        //require(msg.value >= currentPrice);
        cryptoRam.mint(_purchaser, _ramID, _ramPrice, _ramColor, _ramName);

    }
}

