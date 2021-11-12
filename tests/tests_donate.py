import brownie

def test_createBalance():
    contract = autoDonate.deploy({"from": accounts[0]})

