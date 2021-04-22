const { expect } = require('chai');
const { waffle } = require("hardhat");
const { deployContract } = waffle;
const provider = waffle.provider;

describe("CryptoRam NFT", function () {
    // Mocha has four functions that let you hook into the the test runner's
    // lifecyle. These are: `before`, `beforeEach`, `after`, `afterEach`.

    // They're very useful to setup the environment for test, and to clean it
    // up after they run.

    // A common pattern is to declare some variables, and assign them in the
    // `before` and `beforeEach` callbacks.

    const _name = 'CryptoRam Token 2021';
    const _symbol = 'CRYPTORAM2021';

    let CRF;
    let CRInstance;
    let alice;
    let bob;



    // `beforeEach` will run before each test, re-deploying the contract every
    // time. It receives a callback, which can be async.

    beforeEach(async function () {
        [alice, bob] = await ethers.getSigners();
        CRF = await ethers.getContractFactory("CryptoRam");
        CRInstance = await CRF.deploy();
    });

    describe('token attributes', function() {

        it("Should make first account an owner", async () => {
            const owner = await CRInstance.owner();
            console.log(owner);
            expect(owner).to.equal(alice.address);
        });

        it('has the correct name', async () => {
            const n = await(CRInstance.name());
            expect(n).to.equal(_name);
        });

        it("has the correct symbol", async () => {
          const symbol = await CRInstance.symbol();
          expect(symbol).to.equal(_symbol);
        });
    });

    describe("mint", () => {
        it("creates token with specified metadata", async () => {
            const token = await CRInstance.mint(bob.address, 0, 100, "blue", "testRam");
            const ramData = await CRInstance.getRamData(0);
            expect(ramData.ramPrice).to.equal(100);
            expect(ramData.ramColor).to.equal('blue');
            expect(ramData.ramName).to.equal('testRam');
        });
        it("should not let bob buy a RAM as sender of transaction", async () => {
            await expect (CRInstance.connect(bob).mint(alice.address, 0, 100, "red", "failure")).to.be.reverted;
        })
    });

    describe("contract ownership", () => {
        it("should transfer contract from alice to bob", async () => {
            let owner = await CRInstance.owner();
            expect(owner).to.equal(alice.address);
            await CRInstance.transferOwnership(bob.address, {from: alice.address});
            owner = await CRInstance.owner();
            expect(owner).to.equal(bob.address);
        });
        it("should transfer to cryptoramSales contract", async () => {
            let owner = await CRInstance.owner();
            expect(owner).to.equal(alice.address);
            console.log("CR Address", CRInstance.address);
            console.log("Alice address", alice.address);
            RSF = await ethers.getContractFactory("CryptoRamSale");
            RSInstance = await RSF.deploy(alice.address, CRInstance.address);
            console.log("RS Address", RSInstance.address);
            await CRInstance.transferOwnership(RSInstance.address, {from: alice.address});
            owner = await CRInstance.owner();
            console.log("new owner", owner);
            expect(owner).to.equal(RSInstance.address);
        })
    });
});
