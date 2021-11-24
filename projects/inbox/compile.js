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
    contract: {
      content: source
    }
  },
  settings: {
    optimizer: {
      enabled: true
    },
    evmVersion: "byzantium",
    outputSelection: {
      "*": {
        "": [
          "legacyAST",
          "ast"
        ],
        "*": [
          "abi",
          "evm.bytecode.object",
          "evm.bytecode.sourceMap",
          "evm.deployedBytecode.object",
          "evm.deployedBytecode.sourceMap",
          "evm.gasEstimates"
        ]
      },
    }
  }
};

solcInput = JSON.stringify(solcInput);

var contractObject = solc.compile(solcInput);
console.log("===>");
console.log(contractObject);
contractObject = JSON.parse(contractObject);
console.log("===>");
console.log(contractObject);

// module.exports = contractObject;

// Or if we only have 1 contract we can do:
module.exports = contractObject.contracts.contract[":Inbox"];
