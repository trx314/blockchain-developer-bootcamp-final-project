# Auto Donation Contract
(blockchain-developer-bootcamp-final-project)

*note: this is a new idea, totally different from the one uploaded previously (The ReBalancer)

#### concept
An application allowing to automatically donate monthly a part of the revenues generated on Aave deposits.
The idea is to send Aave deposit tokens (aTokens) into a contract which will allocate a proportion of the monthly gains to a pre-defined eth address (charity, public good project, etc.).

#### components

web application for the front end
- At start, to avoid security risks, the donation addresses will be whitelisted (function to add an address by owner).
- The user chooses one of the addresses, and the amount of the aToken he wants to "stake", and the % of revenues he wants to donate
- The transaction is built by the front send
- The user approves the use of the token by the smart contract

smart contract
- The contract receives the transaction, create a balance for the user address, with the donation address associated (balance, ownerAddress, donationAdress)
- Each Month, the real balance of the token (from Aave Smart Contract) is checked against the balance stored in the smart contract (Q: does it uses gas? how will it be executed?). Because it is an aToken, the balance increases regularly
- The contract attributes the % of the monthly revenues to the donation address (increasing its balance). We do not send directly to avoid gas cost and security risks.
- The balance of the user is updated (+  revenues - donation)
- Withdrawals: any user including the donation addresses can withdraw at any moment

### conclusion
Implementation should be quite simple thanks to aTokens unique propoerty of increasing balances, avoiding to have to perform onchain valuation or call any oracle.

