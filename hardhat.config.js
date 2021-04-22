require("@nomiclabs/hardhat-waffle");

const INFURA_PROJECT_ID = "something";
const RINKEBY_PRIVATE_KEY = "secret";

task("accounts", "Prints the list of accounts", async () => {
    const accounts = await ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});


module.exports = {
    paths: {
        sources: "./contract_ABI",
        artifacts: "./artifacts"
    },
    solidity: "0.6.0",
    networks: {
        rinkeby: {
            url: `https://rinkeby.infura.io/v3/${INFURA_PROJECT_ID}`,
            accounts: [`0x${RINKEBY_PRIVATE_KEY}`]
        }
    }
};


// to deploy dapp to CSU with content security policy you have to
// INLINE_RUNTIME_CHUNK=false npm run build
// or else you get inline script policy violations and it won't work