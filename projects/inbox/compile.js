// RUN:
// node compile.js

const path = require("path");
const fs = require("fs");
const solc = require("solc");

const inboxPath = path.resolve(__dirname, "contracts", "inbox.sol");
const source = fs.readFileSync(inboxPath, "utf8");

var solcInput = {
  language: "Solidity",
  sources: {
    "inbox.sol": {
      content: source
    }
  },
  settings: {
    outputSelection: {
      "*": {
        "*": [ "*" ]
      }
    }
  }
};

const output = JSON.parse(solc.compile(JSON.stringify(solcInput)));

const interface = output.contracts["inbox.sol"].Inbox.abi;
const bytecode = output.contracts["inbox.sol"].Inbox.evm.bytecode.object;

module.exports = {
  interface,
  bytecode,
};
