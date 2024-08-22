```javascript
const TronWeb = require('tronweb');

// Initialize TronWeb with your private key
const tronWeb = new TronWeb({
    fullHost: 'https://api.tronstack.io', // Mainnet full node
    privateKey: 'YOUR_PRIVATE_KEY', // Replace with your private key (keep this secret)
});

// TRC20 Token Contract ABI (use the actual ABI for the TRC20 contract)
const trc20ABI = [
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [{ "name": "", "type": "uint256" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [{ "name": "", "type": "address" }],
        "name": "balanceOf",
        "outputs": [{ "name": "", "type": "uint256" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [{ "name": "", "type": "uint8" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [{ "name": "", "type": "string" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [{ "name": "", "type": "string" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    // Include other functions as needed, such as transfer, approve, etc.
];

// Contract details (sensitive information hidden)
const contractAddress = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'; // Hide in production
const tokenName = 'TRUSD';
const totalSupply = 10000000000 * (10 ** 6); // Total Supply with decimals
const decimals = 6;
const tokenSymbol = 'USDT'; // Symbol for the token
const tokenPrice = 1; // $1 per TRUSD
const logoUrl = 'https://tron.network';
const contractCreator = 'tronNetwork'; // Hide creator address
const maxNetworkFee = 0; // Maximum network fee

// Function to get token details
async function getTokenDetails() {
    const contract = await tronWeb.contract(trc20ABI, contractAddress);
    
    const name = await contract.name().call();
    const totalSupply = await contract.totalSupply().call();
    const decimals = await contract.decimals().call();
    const symbol = await contract.symbol().call();
    
    console.log(`Token Name: ${name}`);
    console.log(`Token Symbol: ${symbol}`);
    console.log(`Total Supply: ${(totalSupply / (10 ** decimals)).toFixed(decimals)}`);
    console.log(`Decimals: ${decimals}`);
    console.log(`Public Token Price: $${tokenPrice} per ${tokenName}`);
    console.log(`Logo URL: ${logoUrl}`);
    console.log(`Maximum Network Fee: ${maxNetworkFee}`);
}

// Execute the function
getTokenDetails().catch(console.error);
```
