import brownie

# test01: contract has been correctly deployed
# right token allowed and the total number of shares initiated to 0
def test_deploy(donor1, contract, token):
    assert contract.sharesTotal(token) == 0 and contract.allowedToken.call() == token

# test02: createBalance with wrong token
def test_wrongToken(donor1, contract, recipient):
    wrongToken = '0x6b175474e89094c44da98b954eedeac495271d0f' # Dai instead of aDai
    with brownie.reverts('dev: token not allowed'):
        contract.createBalance(wrongToken, recipient, 25, 1000, {'from': donor1})

# test03: createBalance with wrong recipient
def test_wrongRecipient(donor1, contract, token):
    wrongRecipient = '0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE' # Binance address instead of GiveDirectly
    with brownie.reverts('dev: recipient not allowed'):
        contract.createBalance(token, wrongRecipient, 25, 1000, {'from': donor1})

# test04: sharesTotal is the sum of the shares of the donors (donor1 deposits 1000 & donor2 deposits 2000)
def test_sharesTotal(donor1, donor2, contract, token, recipient):
    contract.createBalance(token, recipient, 25, 1000, {'from': donor1})
    contract.createBalance(token, recipient, 30, 2000, {'from': donor2})
    assert contract.sharesTotal(token) == 3000 # sharesTotal 3000 = 1000 + 2000

# test05: getBalance returns the correct data for both donors
def test_getBalance(donor1, donor2, contract, token, recipient):
    contract.createBalance(token, recipient, 25, 1000, {'from': donor1})
    contract.createBalance(token, recipient, 30, 2000, {'from': donor2})
    assert contract.getBalance(donor1, token) == (recipient, 1000, 25, 1000) and \
        contract.getBalance(donor2, token) == (recipient, 2000, 30, 2000)

# test06: computeToDonate returns the correct data for both donors
def test_computeToDonate(donor1, donor2, contract, token, recipient):
    contract.createBalance(token, recipient, 25, 1000, {'from': donor1})
    contract.createBalance(token, recipient, 30, 2000, {'from': donor2})
    # with balance Aave = 3012 => donor1 should donate 0.25*(1000/3000)*(3012-3000) = 1
    # donor2 should donate 0.30*(2000/3000)*(3012-3000) = 2.4
    assert contract.computeToDonate(donor1, token) == 1 and \
        contract.computeToDonate(donor2, token) == 2

