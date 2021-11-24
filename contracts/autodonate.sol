// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract autoDonate {
  
// stores the position that tthe donor currently has deposited
struct Position {
  address recipient; // the recipient who will receive the donation
  uint percentDonate; // the share (integer from 0 to 100) of monthly revenues to be donated
  uint balance; // the quantity of token composing the position
  uint shares; // the number of shares a user has in the contract aToken pool (the contract aToken position is the sum of all users' aTokens)
}

// the total number of shares is stored for each aToken. 
// Each position of the contract in aToken is a kind of pool of all the aToken deposited by the users.
mapping (address => uint) public sharesTotal;

// allowed tokens for deposit - only one token allowed for now
address public allowedToken;

// allowed recipient for donation - only one token allowed for now
address public allowedRecipient;

// store the positions with the address of their owner (the DONOR) as key 1 and the address of the TOKEN deposited as key 2
// we do not put the token in the Position struct because it would require to do more looping to retrieve a given position
mapping (address => mapping (address => Position)) public positions;

// the cosntructor will initiate shares of
constructor() {
  sharesTotal[0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984] = 0; // initialize the value to 0 for the allowed token used in tests
  allowedToken = 0x028171bCA77440897B824Ca71D1c56caC55b68A3; // aDai token address on mainnet
  allowedRecipient = 0x750EF1D7a0b4Ab1c97B7A623D7917CcEb5ea779C; // address on mainnet of GiveDirectly https://www.givedirectly.org/
}

// TO DO: actually transfer the tokens from wallet to autoDonate
function createBalance(address token, address recipient, uint shareDonate, uint quantity) public returns (bool) {
  // check that the token  to deposit is allowed
  require(token == allowedToken); // dev: token not allowed
  // check that the recipient to donate to is allowed
  require(recipient == allowedRecipient); // dev: recipient not allowed
  // Will create a balance for the user address, with the donation address associated and the share of revenues to donate
  address donor = msg.sender;
  positions[donor][token] = Position({
    recipient: recipient,
    percentDonate: shareDonate,
    balance: quantity,
    shares: quantity // initial position=0 therefore the initial shares number is equal to the number of aTokens invested
  });
  sharesTotal[token] = sharesTotal[token] + quantity;
  return true;
}

// TO DO: allows to retrieve all tokens from one donor address >> will return an array instead of current
// TO DO: check that the token balance is suficient to create the position (get balance from Aave)
// To DO: allow and transfer the token
function getBalance(address donor, address token) public view 
returns(address recipient, uint balance, uint percentDonate, uint shares) 
{
  recipient = positions[donor][token].recipient;
  balance = positions[donor][token].balance;
  percentDonate = positions[donor][token].percentDonate;
  shares = positions[donor][token].shares;
}

// TO DO: integration with Aave contract
// account: can be either a user (donor or recipient) or the smart contract iteslf (pool)
// token: the aToken
function getAaveBalance(address user, address token) public pure
returns(uint balance)
{
  balance = 1012; // temporary fixed balance for testing, waiting for aave contract integration
}

// computes the revenue of an account since the last donation event
// it is computed as the difference between the current value of the pool owned by the user and the stored user balance which represents the initial allocation.
function computeRevenue(address user, address token) public view
returns (uint revenue)
{
  uint balanceTotalPool = getAaveBalance(address(this),token); // aToken balance of the contract
  uint sharesTotalPool = sharesTotal[token]; // total number of shares for this token in the pool
  uint sharesUser = positions[user][token].shares; // number of shares of this user
  uint balanceUser = positions[user][token].balance; // balance of the user in t0
  revenue = balanceTotalPool * sharesUser / sharesTotalPool - balanceUser;
}

// computes the amount to donate from a given user for a given token
// the amount is computed based on the percentDonate of the position, as a percentage of the revenue generated from this position since the last donation
function computeToDonate(address user, address token) public view
returns (uint toDonate)
{
  uint revenues = computeRevenue(user, token);
  uint percentage = positions[user][token].percentDonate;
  toDonate = revenues * percentage / 100;
}

// TO DO - after reviewing data structure and complement the mapping with an array to allow looping
function distributeDonations(address recipient, address token) public {
  // When called, the real balance of the token (from Aave Smart Contract) is checked against the balance stored in the smart contract (Q: does it uses gas? how will it be executed?). Because it is an aToken, the balance increases regularly

  // if the recipient position does not exist yet, create it with recipient = none
  
  // transfer the balance from the donors to the recipient

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


