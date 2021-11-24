from brownie import *

token = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'

def main():
    
    # deploy the contract with account[0]
    autoDonate.deploy({'from': accounts[0]})

    # create a balance: 
    # token 0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984 (uniswap)
    # recipient address:0xb6b3c46931Edab108DeE11513ffE6669CA2773FB (account[1] from ganache cli local)
    # quantity of token 1000
    # percent to donate 25%
    # from account[0]: 0x76341e4c14385e0BFCbE1c8Be666cE909377cE7A
    autoDonate[0].createBalance(token, '0xb6b3c46931Edab108DeE11513ffE6669CA2773FB', 25, 1000, {'from': accounts[0]})
   
    return autoDonate[0]