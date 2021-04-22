pragma solidity ^0.6.0;

import 'openzeppelin-solidity/contracts/token/ERC721/ERC721.sol';

contract CryptoRam is ERC721 {
    string public constant name = "CryptoRam Token 2021";
    string public constant symbol = "CRYPTORAM2021";
    uint16 public totalSupply = 0;

    struct MetaData {
        uint16 ramPrice;
        string ramColor;
        string ramName;
    }

    mapping (uint256 => MetaData) public ramData;

    mapping (address => uint256[]) public ownedTokens;  // note: someday should put in array code for transfer & burn

    function getRamData( uint _ramID ) public view returns (uint16 ramPrice, string memory ramColor, string memory ramName) {
        MetaData memory _ram = ramData[_ramID];
        ramPrice = _ram.ramPrice;
        ramColor = _ram.ramColor;
        ramName  = _ram.ramName;
    }

    function mint(address _purchaser, uint256 _ramID, uint16 _ramPrice, string memory _ramColor, string memory _ramName) public payable onlyOwner {
        MetaData memory _ram = MetaData({ ramPrice: _ramPrice, ramColor: _ramColor, ramName: _ramName });
        ramData[_ramID] = _ram;
        //uint _ramID = ramData.push(_ram) - 1;
        _mint(_purchaser, _ramID);
        totalSupply += 1;
        ownedTokens[_purchaser].push(_ramID);
    }

    function exists( uint _ramID) public view returns (bool) {
        return _exists(_ramID);
    }

}