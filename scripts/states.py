from brownie import *

token = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'

def main():

    # display account[0]
    print('accounts[0]: ', accounts[0])

    # display autoDonate[0]
    print('autoDonate[0]: ', autoDonate[0])

    # display the allowed token
    call = autoDonate[0].allowedToken.call()
    print('allowedToken: ', call)

    # getBalance function
    call = autoDonate[0].getBalance(accounts[0], token)
    print("getBalance: ", call)

    # sharesTotal
    call = autoDonate[0].sharesTotal(token)
    print("sharesTotal: ", call)

    # getAaveBalance function
    call = autoDonate[0].getAaveBalance(autoDonate[0], token)
    print('getAaveBalance: ', call)

    # revenue generated
    call = autoDonate[0].computeRevenue(accounts[0], token)
    print('computeRevenue: ', call)

    # pending donation
    call = autoDonate[0].computeToDonate(accounts[0], token)
    print('computeToDonate: ', call)