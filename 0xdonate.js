console.log("0xdonate.js loaded")

// smart contract address on Ropsten
const contractAddress = "0xD41EE86285FB37DB9228717518739A0640916ab7"

// smart contract interface
const ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "shareDonate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			}
		],
		"name": "createBalance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "distributeDonations",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "donor",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			}
		],
		"name": "getBalance",
		"outputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "shareDonate",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "positions",
		"outputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "shareDonate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "toWhitelist",
				"type": "address"
			}
		],
		"name": "whitelistDonation",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "toRemove",
				"type": "address"
			}
		],
		"name": "whitelistRemove",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "toWithdraw",
				"type": "address"
			}
		],
		"name": "withdrawal",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
const mmDetected = document.getElementById("mmDetected");
const mmConnectButton = document.getElementById('mmConnect');
let mmCurrentAccount = String;
const getBalanceButton = document.getElementById('getBalance');

// detect if Metamask is installed
if(typeof window.ethereum !== 'undefined') {
    console.log("metamask ok");
    mmDetected.innerHTML = "MM has been detected";
} else {
    console.log("no metamask");
    alert("you meed to install metamask");
}

// set Metamask as provider
const provider = new ethers.providers.Web3Provider(window.ethereum);
console.log("-- provider:");
console.log(provider);

// set the contract object
const myContract = new ethers.Contract(contractAddress, ABI, provider);
console.log("-- contract:");
console.log(myContract)

// button connect to Metamask will conenct to MM and retrieve informations from the current account
mmConnectButton.onclick = async ()=> {
    // connect to Metamask
	await ethereum.request({ method: 'eth_requestAccounts'} );
    // hide the button
	mmConnect.style.display = "none";
	// retrieve current account
	await getMMAccount().catch(e => {
		mmDetected.innerHTML = "There was an error retrieving your account: " + e.message;
	});
	// display the current account
	display_account();
}

// button Get Balance will get the token address and get the balance for the current account and token
// uniswap token for tests: 0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984
getBalanceButton.onclick = async ()=> {
	const tokenAddress = document.getElementById('tokenAddress').value;
	console.log("tokenAddress: " +  tokenAddress);
	// retrieve the balance
	balanceOf(mmCurrentAccount, tokenAddress)
}

// button will get the information from the form in order to create a new position. 
// It will send the tx with the current address and the information filled in the form: 
// token, recipient address, share of revenue to donate
createPosButton.onclick = async ()=> {
	// define MM as the signer
	const signer = provider.getSigner()
	// connect the contract to the signer
	const myContractWithSigner = myContract.connect(signer);
	console.log(myContractWithSigner);
	create_pos(myContractWithSigner);
}

// get all information from the form "Create a Position"
async function create_pos(myContractWithSigner) {
		// retrieve the address of token to supply
		const tokenAddress_create = document.getElementById('tokenAddress_create').value;
		// retrieve the quantity of token to supply
		let q = document.getElementById('quantity_create').value;
		const quantity_create = ethers.utils.parseUnits(q,18);
		console.log("quantity is: " + quantity_create);
		// retrieve the recipient address
		let recipient_create = document.getElementById('recipient_create').value;
		console.log("recipient is: " + recipient_create);
		// retrieve the share of revenue to donate in %
		let share_create = document.getElementById('share_create').value;
		console.log("share to donate is: " + share_create);
		// execute smart contract function to create the position
		const tx_create = await myContractWithSigner.createBalance(tokenAddress_create, recipient_create, share_create, quantity_create)
		console.log("tx_create: " + tx_create);
}


// retrieve the current account (see doc https://docs.metamask.io/guide/ethereum-provider.html#using-the-provider)
async function getMMAccount() {
	let connectedAccounts = await ethereum.request({ method: 'eth_accounts' })
	mmCurrentAccount = connectedAccounts[0];
	console.log("mmCurrentAccount: " + connectedAccounts);
}

// display the current account
function display_account() {
    mmDetected.innerHTML += " - your connected account is: " + mmCurrentAccount;
}

// retrieve balance from the contract for a given donor and token
async function balanceOf(donor, token) {
	const balance = await myContract.getBalance(donor, token);
	console.log("recipient: " +  balance.recipient);
	console.log("balance: " +  balance.balance);
	console.log("share to donate: " +  balance.shareDonate + "%");
	const dispBalances = document.getElementById("dispBalances");
	dispBalances.style.display = "block";
	let balanceField = document.getElementById("balanceField");
	let recipientField = document.getElementById("recipientField");
	let shareField = document.getElementById("shareField");
	balanceField.innerHTML = "balance: " +  balance.balance / 1000000000000000000;
	recipientField.innerHTML = "recipient: " +  balance.recipient;
	shareField.innerHTML = "share to donate: " +  balance.shareDonate + "%";
}



