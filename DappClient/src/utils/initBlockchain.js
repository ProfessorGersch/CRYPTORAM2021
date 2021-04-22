import CryptoRam from "../contract_ABI/CryptoRam.sol/CryptoRam.json";
import CryptoRamSale from "../contract_ABI/CryptoRamSale.sol/CryptoRamSale.json";
import RamCoin from "../contract_ABI/RamCoin.sol/RamCoin.json";
import { ethers } from "ethers";

//
//  set up the blockchain shadow contract, user address.
//

const initBlockchain = async () => {

    let provider;
    window.ethereum.enable().then(provider = new ethers.providers.Web3Provider(window.ethereum));

    // The provider also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, we need the account signer...

    const signer = await provider.getSigner();
    console.log("signer", signer);
    const userAddress =  await signer.getAddress();
    console.log("user address", userAddress);

    let CR = null;
    console.log("READ CryptoRam ABI");
    const CRabi = CryptoRam.abi;
    console.log(CRabi);
    CR = new ethers.Contract('0x8B65E3A583b11EA68032bf606Bb3bA9599509CF8', CRabi, signer);

    let CS = null;
    console.log("READ CryptoRamSale ABI");
    const CSabi = CryptoRamSale.abi;
    console.log(CSabi);
    CS = new ethers.Contract('0x6116796A0931B6Bf32D1744AfF7A6C616b87E3D1', CSabi, signer);

    let RC = null;
    console.log("READ RamCoin ABI");
    const RCabi = RamCoin.abi;
    console.log(RCabi);
    RC = new ethers.Contract('0x6F9B6Af1486746d847a5F42C8b7AfdbA524fab5c', RCabi, signer);

    let data = {
        CR,
        CS,
        RC,
        CSDeployedAddress: '0x6116796A0931B6Bf32D1744AfF7A6C616b87E3D1',
        userAddress // shorthand
    };

    return data;
}

export default initBlockchain;
