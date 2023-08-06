const { ethers, JsonRpcProvider } = require('ethers');

const ADDR = "0xA9Ff47984a4A5C4a370D18646DC98DAcdAB3daD3";   // your contract address
const ABI =  [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "wallet",
          "type": "address"
        },
        {
          "internalType": "address[]",
          "name": "tokenAddresses",
          "type": "address[]"
        }
      ],
      "name": "getBalances",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "token",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "balance",
              "type": "uint256"
            }
          ],
          "internalType": "struct TokenBalanceRetriever.TokenBalance[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

const address = "0x455E5AA18469bC6ccEF49594645666C587A3a71B"; // some wallet address with token balance
const tokens = [    // token contract addresses
	"0xbb9462adF05A98EB84f35aDEaB66b65e9c3Ca513"
]

// you can use your own RPC provider url (no need to deploy to mainnet)
const provider = new JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/V8hxIpjjxhqyPW4q5oGmlFFSjIG5mKZj"); 

const test = async () => {
	const contract = new ethers.Contract(ADDR, ABI, provider);
	const balances = await contract.getBalances(address, tokens);
	const formattedBalances = balances.map(balance => ({
		token: balance.token,
		balance: balance.balance.toString()
	}));
	
	return formattedBalances;
};

test().then(console.log);