/*
To run/deploy:
node deploy.js
*/

const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

const provider = new HDWalletProvider(
  // Metamask Mnemonic for environment variable - I've set this (and exported) in my shell profile.
  // Remember the mnemonic gives us access to our public and private keys.
  process.env.METAMASK_MNEMONIC,
  // Which network do we want to connect to?
  // We'll use an Infura link (that includes a token) once signed up, but again as an environment variable
  process.env.INFURA_API
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  
  const firstAccount = accounts[0];
  console.log("Attempting to deploy from account", firstAccount);

  const contract = await new web3.eth.Contract(interface)
    .deploy({
      data: bytecode,
      arguments: ["Well howdy do?"]
    }).send({
      from: firstAccount,
      gas: "1000000"
    });

  console.log("Contract deployed to", contract.options.address);
  provider.engine.stop();
};

deploy();