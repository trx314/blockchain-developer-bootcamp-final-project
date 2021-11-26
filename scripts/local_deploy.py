from brownie import *

token = '0x028171bca77440897b824ca71d1c56cac55b68a3' # aDai token address on mainnet

def main():
    
    # deploy the contract with account[0]
    autoDonate.deploy({'from': accounts[0]})

    # create a balance: 
    # token 0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984 (uniswap)
    # recipient address:0xb6b3c46931Edab108DeE11513ffE6669CA2773FB (account[1] from ganache cli local)
    # quantity of token 1000
    # percent to donate 25%
    # from account[0]: 0x76341e4c14385e0BFCbE1c8Be666cE909377cE7A
    autoDonate[0].createBalance(token, '0x750EF1D7a0b4Ab1c97B7A623D7917CcEb5ea779C', 25, 1000, {'from': accounts[0]})
   
    # whitelist a token
    autoDonate[0].whitelistToken('0x028171bca77440897b824ca71d1c56cac55b68a9', {'from': accounts[1]})

    return autoDonate[0]