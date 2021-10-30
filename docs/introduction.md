# Introduction

```
For Developers

+----------+                          +--------------------------------------------+
|          |                          |                                            |
| web3.js  +-------------------------->      +------+                              |
|          |                          |      |      |                              |
+----------+                          |      | Node |                              |
                                      |      |      |                              |
                                      |      +-+-+-^+                 +------+     |
                                      |        | | |                  |      |     |
For Consumers                         |        | | +------------------+ Node |     |
                                      |        | |                    |      |     |
+----------+                          |        | |                    +--^---+     |
|          |                          |        | |    +------+           |         |
| Metamask +-------------------------->        | |    |      <-------+   |         |
|          |                          |        | +----> Node |       |   |         |
+----------+                          |        |      |      |      ++---+--+      |
                                      |        |      +-^----+      |       |      |
+--------------+                      |       +v-----+  |           | Node  |      |
|              |                      |       |      |  |           |       |      |
| Mist Browser +---------------------->       | Node +--+           +--^----+      |
|              |                      |       |      |                 |           |
+--------------+                      |       +------+-----------------+           |
                                      |                                            |
                                      |                                            |
                                      +--------------------------------------------+
```

An account on the Ethereum network is made up of an `address`, `public key` and `private key`, all stored as hexadecimal.
- Think of the address as an email address or username.
- The public and private keys can be thought of as making up a password.
- Note that your one account can connect to any Ethereum network (and you can create multiple accounts)

```
                                          MetaMask
                                         +---------------------+
                                         |                     |
                                         | +-----------------+ |
+-----------------------+                | |                 | |                     +-----+
| 0xcf76e194FFC8D899234 <----------------+-+ Account Address | |           +--------> Main |
+-----------------------+                | |                 | |           |         +-----+
                                         | |                 | |           |
                                         | +-----------------+ |           |
                                         |                     |           |
                                         |                     |           |         +-------+
                                         | +-----------------+ |           +--------> Ropsten|
 +---------------------+                 | |                 | |           |         +-------+
 |0x38389237924a423423 <-----------------+-+ Public Key      | +-----------+
 +---------------------+                 | |                 | |           |         +-----+
                                         | +-----------------+ |           +--------> Kovan|
                                         |                     |           |         +-----+
                                         |                     |           |
                                         | +-----------------+ |           |
 +----------------------+                | |                 | |           |         +-------+
 |0xb1c3450u45y79702342 <----------------+-+ Private Key     | |           +--------> Rinkeby|
 +----------------------+                | |                 | |                     +-------+
                                         | +-----------------+ |
                                         |                     |
                                         +---------------------+
```

## Ethereum Blockchain

Go to https://rinkeby-faucet.com/ where we can get some (monopoly) Ether. When we acquire some Ether (0.001 in this case), what actually happens? When we receive this Ether we get the message:

```shell
Your transaction id: 0x7133d694ca3b0c19185673998a3ac66b1e72159709216e0d4846f85975aad230
```

```
Time          +----------------------+
 |            |                      |
 |            |Click "submit" on form|
 |            |                      |
 |            +----------+-----------+
 |                       |
 |            +----------v-------------------+                                           +------------------------------------------------------------------------+
 |            |                              |                                           |Transaction                                                             |
 |            |Address sent to backend server|                                           |                                                                        |
 |            |                              |                                           |nonce       How many times sender has sent a transaction                |
 |            +----------+-------------------+                                           |                                                                        |
 |                       |                                                               |to          Address of account this money is going to                   |
 |            +----------v----------------------+                                        |                                                                        |
 |            |                                 |        +---------------------+         |value       Amount of ether to send to target address                   |
 |            |Backend server used web3 library +--------+What's a transaction?+---------+                                                                        |
 |            |to create a "transaction" object |        +---------------------+         |gasPrice    Amount of ether the sender is willing to pay for transaction|
 |            +----------+----------------------+                                        |                                                                        |
 |                       |                                                               |startGas /  Units of gas that this transaction can consume              |
 |                       |                                                               |gasLimit                                                                |
 |                       |                                                               |                                                                        |
 |            +----------v----------------------+                                        |v           Cryptographic pieces of data that can be used               |
 |            |Backend server sent "transaction"|                                        |r           to generate the sender's account address.                   |
 |            |object to Rinkeby test network   |                                        |s           Generated from the sender's private key.                    |
 |            +----------+----------------------+                                        +------------------------------------------------------------------------+
 |                       |
 |                       |
 |                       |                               +-----------------+
 |            +----------v----------------+              |                 |  Our transaction is sent to some Node in the Ethereum network:
 |            |Backend server waited for  +--------------+Why did we wait? |
 |            |transaction to be confirmed|              |                 |                                    +------------------------+
 |            +----------+----------------+              +-----------------+    (Our) Transaction --------+     | Node                   |
 |                       |                                                                                |     |                        |
 |                       |                                                                                |     | +--------------------+ |
 |                       |                                                                                |     | | Blockchain         | |
 |            +----------v----------------+                                      Other Transaction  ------+---->| | +--+   +--+   +--+ | |
 |            |Backend server sent success|                                                               |     | | |  +--->  +--->  | | |
 v            |message back to browser    |                                                               |     | | +--+   +--+   +--+ | |
              +---------------------------+                                      Another Transaction -----+     | |                    | |
                                                                                                                | +--------------------+ |
                                                                                                                |                        |
                                                                                                                |    +--------+          |
                                                                                                                |    |Our T   |          |
                                                                                                                |    |        |          |
                                                                                                                |    |Other T |Block     |
                                                                                                                |    |        |          |
                                                                                                                |    |Other T |          |
                                                                                                                |    +--------+          |
                                                                                                                |                        |
                                                                                                                +------------------------+

                                                                                                                 We had to wait because the Node
                                                                                                                 has to validate (mine) all the incoming
                                                                                                                 transactions (that will form a block)
```

So each node tries to "find the next hash" and once found, needs to pass that on to all other nodes to verify. This is `block time`.
Bitcoin may look for a hash that starts with four zeros (0000). Ethereum looks for a hash that when converted to base 10 needs to be under some target value:

```
+----+        +-----+         +-----------+      +---------------+       +---------------+
|Data|   +    |Nonce|    =    |Output Hash|      |Hash as base 10|       |Less than 1000?|
+----+        +-----+         +-----------+      +---------------+       +---------------+


 "Hi"           0               a23042b2          1789172                 no



 "Hi"           1               cbc1481           2958928                 no



 "Hi"           2               d9eed91           1393899                 no



 "Hi"           3               0077bbb           100                     yes
```

Ethereum's target block time is `15 seconds`, so the target number keeps changing in an attempt to be around that 15 second mark:

```
+----------+             +----------+          +----------+
|Block #100|             |Block #101|          |Block #102|
|          +------------->          +---------->          |
|          |             |          |          |          |
+----------+             +----------+          +----------+

 Find hash                Find hash             Find hash
 < 1000                   < 10,000              < 5000


 20 seconds               5 seconds             17 seconds
```

## Blockchain Demos

- https://blockchaindemo.io/
- https://www.freecodecamp.org/news/how-does-blockchain-really-work-i-built-an-app-to-show-you-6b70cd4caf7d/
- https://coindemo.io/
- https://www.freecodecamp.org/news/how-does-bitcoin-work-i-built-an-app-to-show-you-f9fcd50bdd0d/
- https://etherscan.io/