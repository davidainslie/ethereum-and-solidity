# Smart Contracts

Think of a `smart contract` as an account controlled by code.

Contract Account:

- balance: Amount of ether this account owns
- storage: Data storage for this contract
- code: Raw machine code for this contract

A `contract account` is only specific to 1 network, whereas external accounts (such as our own) can be used across networks:

```text
Metamask                                 +----+
+--------------------+        +---------->Main|
|                    |        |          +----+
| +---------------+  |        |
| |Account Address|  |        |
| +---------------+  |        |          +-------+
|                    |        +---------->Ropsten|
| +----------+       |        |          +-------+
| |Public Key|       +--------+
| +----------+       |        |
|                    |        |          +-----+
| +-----------+      |        +---------->Kovan|
| |Private Key|      |        |          +-----+
| +-----------+      |        |
|                    |        |
+--------------------+        |          +------------------------------------+
External Account              |          |Rinkeby                             |
                              |          |                                    |
                              |          | +--------+  +--------+  +--------+ |
                              +----------> |Contract|  |Contract|  |Contract| |
                                         | |Account |  |Account |  |Account | |
                                         | +--------+  +--------+  +--------+ |
                                         |                                    |
                                         +------------------------------------+
```

## Solidity

```text
         +--------------------+
         | Contract Definition|
         |     (Solidity)     |
         +---------+----------+
                   |
                   |
           +-------v---------+
           |Solidity Compiler|
           +---+----------+--+
               |          |
               |          |
               |          |
+--------------v--+      +v------------------+
| Byte code ready |      | Application Binary|
|  for deployment |      |  Interface (ABI)  |
+-----------------+      +-------------------+
```

The byte code is deployed onto the blockchain, and the ABI is used by applications to interact with the contract:

```text
+-------------------+           +-----+            +---------+
|Our JavaScript code+-----------> ABI +------------>Bytecode |
+-------------------+           +-----+            +---------+
```

Try out your smart contract with the aid of [Remix](https://remix.ethereum.org).

## Smart Contract Example

```solidity
pragma solidity ^0.8.9;

contract Inbox {
    string public message;
    
    constructor(string memory initialMessage) {
        message = initialMessage;
    }
    
    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
    
    /**
     * +----------------------------------------------------------------------------------+
     * | Common function types                                                            |
     * +-----------+----------------------------------------------------------------------+
     * |           |                                                                      |
     * | public    |   Anyone can call this function                                      |
     * +-----------+----------------------------------------------------------------------+
     * |           |                                                                      |
     * | private   |   Only this contract can call this function                          |
     * +-----------+----------------------------------------------------------------------+
     * |           |                                                                      |
     * | view      |   This function returns data and does not modify the contract's data |
     * +-----------+----------------------------------------------------------------------+
     * |           |                                                                      |
     * | constant  |   This function returns data and does not modify the contract's data |
     * +-----------+----------------------------------------------------------------------+
     * |           |                                                                      |
     * | pure      |   Function will not modify or even read the contract's data          |
     * +-----------+----------------------------------------------------------------------+
     * |           |                                                                      |
     * | payable   |   When someone calls this function they might send ether along       |
     * |           |                                                                      |
     * +-----------+----------------------------------------------------------------------+
     *
     * We don't really need this function, as one is automatically created for the "public message" i.e. a "message" (accessor) function. 
     */
    function getMessage() public view returns (string memory) {
        return message;
    }
}
```

```
+------------------------------------------------------------------+
|                                                                  |
|                 Running Contract Functions                       |
+-------------------------------+----------------------------------+
|                               |                                  |
| "Calling" a function          |         Sending a Transaction    |
|                               |            to a function         |
+-------------------------------+----------------------------------+
|                               |                                  |
|  Cannot modify the            |            Can modify a          |
|  contract's data              |          contract's data         |
+-------------------------------+----------------------------------+
|                               |                                  |
|   Can return data             |          Takes time to execute   |
|                               |                                  |
+-------------------------------+----------------------------------+
|   Runs instantly              |          Returns the transaction |
|                               |                hash              |
+-------------------------------+----------------------------------+
|                               |                                  |
|    Free to do                 |           Costs money            |
|                               |                                  |
+-------------------------------+----------------------------------+
```

1 Ether == 1,000,000,000,000,000,000 Wei

## Accounts

You will most likely have multiple accounts (they could be viewed in MetaMask) e.g.
```
                    +----------+
             +------>Account #1|        Spending money
             |      +----------+
             |
+-----+      |
| You +------+      +----------+
+-----+      +------>Account #2|        Savings
             |      +----------+
             |
             |
             |      +-----------+
             +------>Account # 3|       Business
                    +-----------+
```

But now we have to remember a lot of addresses, public and private keys:
```
                  +------------------------+
+----------+      |Address:    0xcF01971...|
|Account #1+----->|Public:     0xCA744.... |
+----------+      |Private:    0xcF019...  |
                  +------------------------+




                  +------------------------+
+----------+      |Address:    0xcF01971...|
|Account #2+----->|Public:     0xCA744.... |
+----------+      |Private:    0xcF019...  |
                  +------------------------+



                  +------------------------+
+----------+      |Address:    0xcF01971...|
|Account #3+----->|Public:     0xCA744.... |
+----------+      |Private:    0xcF019...  |
                  +------------------------+
```

Instead of just remembering, Ethereum came up with the concept of a `12 word mnemonic`:
```
                                                                           +----------+
                                                                 +--------->Account #1|
                                                                 |         +----------+
                                                                 |
                                                                 |
+-----------------------------+           +--------------+       |         +----------+
|pave cattle recycle grit very|           |BIP39 mnemonic|       +--------->Account #2|
|erupt above team cousin      +----------->algorithm     +-------+         +----------+
|scale mammal sock            |           +--------------+       |
+-----------------------------+                                  |
                                                                 |         +----------+
 12 word mnemonic                                                +--------->Account #3|
                                                                 |         +----------+
                                                                 |
                                                                 |
                                                                 |         +-----+
                                                                 +--------->...  |
                                                                           +-----+
```

We can see how this works at https://iancoleman.io/bip39/

## Getting some more Test Ether

Go to: https://faucets.chain.link/rinkeby

1. Enter your wallet address (testnet account address)
2. Check 0.1 test ETH
3. Uncheck 10 test LINK
4. Check the Im Not a Robot verification
5. Click Send Request

https://faucet.rinkeby.io/ has a lot more test Ether but it is very unstable.

## Truffle

Truffle is a command line tool (CLI):
```
    Truffle

+----------------+
|                |
| +----------+   |
| | Contract |   |
| | creation |   |
| +----------+   |              +----------+
|                +--------------> Rinkeby  |
|                |              +----------+
| +---------+    |
| | Local   |    |
| | testing |    |
| +---------+    |
|                |
|                |
| +------------+ |
| | Deployment | |
| +------------+ |
|                |
+----------------+
```

However, we don't have to use Truffle and indeed we will try not to (at the time of writing, it is a fairly unstable product). Take a look at folder `projects`.