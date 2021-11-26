# 0xDonate - auto donation contract

## Avoiding Common Attacks

### Measure 1 - Proper Use of Require, Assert and Revert  

The require functions must be used validation of inputs, external call returns and variables before state changes. They should be used more often and towards the beginning of functions.

For example, in line 51 and 52, we are using the require fucntions to control that the inputs of the function createBalance are correct:

`  require(token == allowedToken); // dev: token not allowed  
  require(recipient == allowedRecipient); // dev: recipient not allowed`  


### Measure 2 - Pull Over Push  

Most of the functions of the contract are designed to be executed by external agents, instead of executed by the contract itself. The responsibility of correct execution and gas cost is therefore on the external side, which protects the contract from being misused.

For example, all the computations and balance transfers are done via external calls. The transfer from the donor to the recipients are actually performed only whenb calling the functions withdrawal or distributeDonations, which can be called by anyone. 
Note: these functions have not been implemented yet.

