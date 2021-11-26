# 0xDonate - auto donation contract
(blockchain-developer-bootcamp-final-project)

## Concept

No-loss donations: an application allowing to automatically donate a part of the revenues generated on Aave deposits.

The idea is to send Aave deposit tokens (aTokens) into a contract which will allocate a proportion of the yields to a pre-defined eth address (charity, public good project, etc.).

The capital deposited is not affected (no-loss), and only a portion of choice of the yields is donated.

We are using aTokens because their balance automatically increases with the yield, which makes it easier to handle without the need of any valuation of the position (it is enough the track the increase in balance, no need for a price Oracle).

Example: you have aDai token generating 10% yields in your wallet, you can deposit a certain amount and determine that 20% of the yields are going to be distributed to the Ethereum address of GiveDirectly organization. At any moment you can withdraw and get back the capital + the portion of yields not donated. At any moment, the recipient of the donations can withdraw the donations, or simply let them accrue.

## Frontend guide

#### URL

The application is available at the following address:
https://nifty-varahamihira-f2c736.netlify.app/

#### Your first transaction

Requirements: Metamask installed and connected to the network KOVAN, with some test Ether.

step 1: connect your Metamask account

step 2: fill the "Create a position" form

- address of the token to deposit: for this MVP, the only token authorized is aDai 0x028171bca77440897b824ca71d1c56cac55b68a3
- quantity of the token to deposit: any quantity. For this MVP, you do not need to actually have the token in your wallet.
- address of the recipient: for this MVP, the only recipient allowed is GiveDirectly (https://www.givedirectly.org/) 0x750EF1D7a0b4Ab1c97B7A623D7917CcEb5ea779C
- share of the revenues: enter a number, for example 25 for 25% of the yield to donate
- click on "Create the position" button, it should trigger the Metamask request for validation

step 3: retrieve your balances

- enter the token to retrieve: for this MVP, the only token authorized is aDai 0x028171bca77440897b824ca71d1c56cac55b68a3
- click on the "Get Balance" button


## Technical Documentation

#### Introduction

The project was developped with Brownie https://eth-brownie.readthedocs.io/en/stable/ , using ganache-cli and one contracted imported from OpenZeppelin (Ownable()). 

The github repository is https://github.com/trx314/blockchain-developer-bootcamp-final-project 

#### Local Deployment

1. ganache-cli

Brownie requires ganache-cli to be installed. During the development of this project, I encountered an issue with the latest node.js version and had to roll-back to the **16.13.0** version.

2. python

Brownie requires Python to be installed. The Python version used for this project is 3.8.10. 

3. folders creation

- create a folder to deploy the project
- cd to this folder
- create a Python virtual environment (recommended):
`python3 -m venv venv`
- activate the virtual environment:
`source venv/bin/activate`

4. Brownie installation

`pip install eth-brownie`

5. Github repo cloning (faster alternative: download the files manually)

`git clone https://github.com/trx314/blockchain-developer-bootcamp-final-project`

6. OpenZeppelin contracts installation

`brownie pm install OpenZeppelin/openzeppelin-contracts@4.4.0`

7. Contract compilation and tests execution

- go to the project folder:
`cd blockchain-developer-bootcamp-final-project`
- launch ganache-cli:
`ganache-cli`
- launch brownie tests from within the project folder:
`brownie test`


#### Directory structure

The folder **contracts** contains the Solidity smart contract *autodonate.sol*.

The folder **scripts** contains 2 scripts used to facilitate the deployment (*local_deploy.py*)and increase the visibility of the state variables (*states.py*) during the development.

The folder **tests** contains the test files: *conftest.py* to list the fixtures used in the tests, and *test_bascics.py* the actual test file.

The folder **web** contains the files running the frontend: *index.html* and *0xdonate.js*.

In the **root** folder, the files *README.md*, *deployed_address.txt*, *design_pattern_decisions.md*, *avoiding_common_attacks.md* are available.


## Screencast

https://www.loom.com/share/ec48be5515e04cc9905ce1c55727b488


