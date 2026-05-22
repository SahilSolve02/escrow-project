// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Escrow {
    address public buyer;
    address public seller;
    bool public isApproved;

    constructor(address _seller) {
        buyer = msg.sender;
        seller = _seller;
    }

    // deposit money into contract
    function deposit() public payable {}

    // release payment to seller
    function approve() public {
        require(msg.sender == buyer, "Only buyer can approve");
        payable(seller).transfer(address(this).balance);
        isApproved = true;
    }

    // refund money to buyer
    function refund() public {
        require(msg.sender == buyer, "Only buyer can refund");
        payable(buyer).transfer(address(this).balance);
    }
}