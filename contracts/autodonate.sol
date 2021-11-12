// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract autoDonate {
  constructor() public {
  }

// stores the position that tthe donor currently has deposited
struct Position {
  address recipient; // the recipient who will receive the donation
  uint shareDonate; // the share (integer from 0 to 100) of monthly revenues to be donated
  uint balance; // the quantity of token composing the position
}

// store the positions with the address of their owner (the donor) as key 1 and the address of the token deposited as key 2
mapping (address => mapping (address => Position)) public positions;

function createBalance(address token, address recipient, uint shareDonate, uint quantity) public returns (bool) {
  // Will create a balance for the user address, with the donation address associated and the share of revenues to donate
  address donor = msg.sender;
  positions[donor][token] = Position({
    recipient: recipient,
    shareDonate: shareDonate,
    balance: quantity
  });
  return true;
}

// TO DO: allows to retrieve all tokens from one donor address >> will return an array instead of current
function getBalance(address donor, address token) public view 
returns(address recipient, uint balance, uint shareDonate) 
{
  recipient = positions[donor][token].recipient;
  balance = positions[donor][token].balance;
  shareDonate = positions[donor][token].shareDonate;

  return(recipient, balance, shareDonate);
}

function distributeDonations() public {
  // Each Month, the real balance of the token (from Aave Smart Contract) is checked against the balance stored in the smart contract (Q: does it uses gas? how will it be executed?). Because it is an aToken, the balance increases regularly
  // Do not distribute the balances of donation addresses
}

function withdrawal(address toWithdraw) public {
  // Withdrawals: any user including the donation addresses can withdraw at any moment *- requires being the msg.sender of the correspoonding address
}

function whitelistDonation(address toWhitelist) public {
  // adds a new address to list of addresses of donation - only contract owner can execute
  // adds a balance for the new address, with a NULL/or whatever donation address
}

function whitelistRemove(address toRemove) public {
  // removes and address from the list of addresses of donation - only contract owner can execute
}



}


