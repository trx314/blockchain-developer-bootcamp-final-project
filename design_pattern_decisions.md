# 0xDonate - auto donation contract

## Design Pattern Decisions  

### Decision 1 - Inheritance and Interfaces  
  

The contract ownable.sol from OpenZeppelin is used in order to benefit from the security of using restricting some functions to the owner of the contract, and to be able to change of owner in the safest possible way.
  

On line 4, the following code was inserted:  

`import "OpenZeppelin/openzeppelin-contracts@4.4.0/contracts/access/Ownable.sol";`  
 

### Decision 2 - Access Control Design Patterns

Some functions are using the modifier Ownable() and are therefore restricting their execution to the owner of the contract.

For example, on line 133, the function whitelistToken uses the modifier Ownable():

`function whitelistToken(address token) public onlyOwner() {  
  allowedToken = token;  
}`  


