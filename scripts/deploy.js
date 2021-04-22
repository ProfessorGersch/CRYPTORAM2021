async function main() {

    const [deployer] = await ethers.getSigners("localhost:8545");

    console.log(
        "Deploying contract_ABI with the account:",
        deployer.address
    );

    console.log("Account balance:", (await deployer.getBalance()).toString());

    // deploy the CRYPTORAM contract

    const CRF = await ethers.getContractFactory("CryptoRam");
    const CR = await CRF.deploy();
    console.log("CryptoRam contract address:", CR.address);

    // deploy the CRYPTORAMSALE contract with its constructor variables

    const RSF = await ethers.getContractFactory("CryptoRamSale");
    const RS = await RSF.deploy(deployer.address, CR.address);
    console.log("CryptoRamSale contract address:", RS.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });

/*
npx hardhat run --network rinkeby scripts/deploy.js
Deploying contract_ABI with the account: 0x4327D8b79AB0499F81dD801db4365CdC914d6f3f
Account balance: 6001343520775582807
CryptoRam contract address: 0x214f9D29aA3ECc93e5c7A93d43CF27BE03661b56
CryptoRamSale contract address: 0xFc203CcF56e2CFfB3e8fAf3Ad19fFe40F3C75F36


March 25

npx hardhat run --network rinkeby scripts/deploy.js
Deploying contract_ABI with the account: 0x4327D8b79AB0499F81dD801db4365CdC914d6f3f
Account balance: 5998749690775582807
CryptoRam contract address: 0x8B65E3A583b11EA68032bf606Bb3bA9599509CF8
CryptoRamSale contract address: 0x6116796A0931B6Bf32D1744AfF7A6C616b87E3D1
(base) Macbook-Pro:CryptoRam2021 jgersch$

 */