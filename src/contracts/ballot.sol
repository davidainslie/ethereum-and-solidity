// SPDX-License-Identifier: MIT

/*
Account addresses                             Roles

0xca35b7d915458ef540ade6068dfe2f44e8fa733c    Chairperson and voter (weight = 2)

0x14723a09acff6d2a60dcdf7aa4aff308fddc160c    Voter (weight = 1)

0x4b0897b0513fdc7c541b6d9d7e929c4e5364d2d     Voter (weight = 1)

0x583031d1113ad414f02576bd6afabfb302140225    Voter (weight = 1)

0xdD870fA1b7C4700F2BD7f44238821C26f7392148    Yet another voter
*/

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