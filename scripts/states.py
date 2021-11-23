from brownie import *

def main():

    # display account[0]
    print('accounts[0]: ', accounts[0])

    # display autoDonate[0]
    print('autoDonate[0]: ', autoDonate[0])

    # getBalance function
    call = autoDonate[0].getBalance('0x76341e4c14385e0bfcbe1c8be666ce909377ce7a', '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984')
    print("getBalance: ", call)

    # sharesTotal
    call = autoDonate[0].sharesTotal('0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984')
    print("sharesTotal: ", call)

    # getAaveBalance function
    call = autoDonate[0].getAaveBalance('0x76341e4c14385e0bfcbe1c8be666ce909377ce7a', '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984')
    print('getAaveBalance: ', call)