const assert = require("assert");

const ganache = require("ganache-cli");

// Capitalised informing us it is a constructor function to be used to create instances
const Web3 = require("web3");

const web3 = new Web3(ganache.provider());

const { interface, bytecode } = require("../compile");

let accounts;
let inbox;

beforeEach(async () => {
  // Get a list of all accounts, then use one of those accounts to deploy the contract
  accounts = await web3.eth.getAccounts();

  // Instantiate an instance of our (inbox) contract and deploy with some account:
  inbox = await new web3.eth.Contract(interface)
    .deploy({
      data: bytecode,
      arguments: ["My initial inbox message"]
    }).send({
      from: accounts[0],
      gas: "1000000"
    });
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    console.log(inbox);
  });
});