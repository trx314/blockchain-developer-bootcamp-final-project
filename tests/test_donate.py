import brownie
import pytest


def test_createBalance(autoDonate, accounts):
    contract = autoDonate.deploy({"from": accounts[0]})
    contract.createBalance(accounts[0], accounts[1], 10, 1000000)
