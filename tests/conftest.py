import pytest

@pytest.fixture
def token():
    return '0x028171bca77440897b824ca71d1c56cac55b68a3' # aDai token address on mainnet

@pytest.fixture
def recipient():
    return '0x750EF1D7a0b4Ab1c97B7A623D7917CcEb5ea779C' # ETH address on mainet of GiveDirectly https://www.givedirectly.org/

@pytest.fixture
def donor1(accounts):
    return accounts[0]

@pytest.fixture
def donor2(accounts):
    return accounts[1]

@pytest.fixture
def contract(accounts, autoDonate):
    return autoDonate.deploy({'from': accounts[0]})