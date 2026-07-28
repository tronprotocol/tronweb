markdown
# Testing TRC-20 Tokens on Shasta Testnet

This guide provides everything you need to test TRC-20 token interactions on Shasta testnet.

## 📝 Contract Source Code

The Mock USDT contract is already deployed at:

```
TWy36p1Ghn5rqRcdink7XPWyRakwtxjpie
```

Here is the full source code for reference:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MockUSDT {
    string public name = "Mock USDT";
    string public symbol = "mUSDT";
    uint8 public decimals = 18;
    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    constructor() {
        totalSupply = 1000000000 * 10**uint256(decimals);
        balanceOf[msg.sender] = totalSupply;
        emit Transfer(address(0), msg.sender, totalSupply);
    }

    function transfer(address to, uint256 value) external returns (bool) {
        require(balanceOf[msg.sender] >= value, "Insufficient balance");
        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;
        emit Transfer(msg.sender, to, value);
        return true;
    }

    function approve(address spender, uint256 value) external returns (bool) {
        allowance[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }

    function transferFrom(address from, address to, uint256 value) external returns (bool) {
        require(balanceOf[from] >= value, "Insufficient balance");
        require(allowance[from][msg.sender] >= value, "Not approved");
        balanceOf[from] -= value;
        balanceOf[to] += value;
        allowance[from][msg.sender] -= value;
        emit Transfer(from, to, value);
        return true;
    }

    function mint(address to, uint256 value) external {
        balanceOf[to] += value;
        totalSupply += value;
        emit Transfer(address(0), to, value);
    }
}
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install tronweb dotenv
```

### 2. Set Up Environment

Create a `.env` file:

```bash
PRIVATE_KEY=your_private_key_here
WALLET_ADDRESS=TYourWalletAddress
```

⚠️ Never commit your .env file!

### 3. Get Test TRX

Visit the Shasta faucet: https://www.trongrid.io/shasta

### 4. Use the Contract

Contract Address:
```javascript
const MOCK_USDT = 'TWy36p1Ghn5rqRcdink7XPWyRakwtxjpie';
```

## 📊 Complete Test Script

```javascript
const TronWeb = require('tronweb');
require('dotenv').config();

const tronWeb = new TronWeb({
  fullHost: 'https://api.shasta.trongrid.io',
  privateKey: process.env.PRIVATE_KEY
});

const MOCK_USDT = 'TWy36p1Ghn5rqRcdink7XPWyRakwtxjpie';
const wallet = process.env.WALLET_ADDRESS;

async function getBalance(address) {
  const contract = await tronWeb.contract().at(MOCK_USDT);
  const decimals = await contract.decimals().call();
  const balance = await contract.balanceOf(address).call();
  return balance / 10 ** decimals;
}

async function transferTokens(to, amount) {
  const contract = await tronWeb.contract().at(MOCK_USDT);
  const decimals = await contract.decimals().call();
  return await contract.transfer(to, amount * 10 ** decimals).send({
    feeLimit: 150_000_000,
    shouldPollResponse: true
  });
}

async function mintTokens(to, amount) {
  const contract = await tronWeb.contract().at(MOCK_USDT);
  const decimals = await contract.decimals().call();
  return await contract.mint(to, amount * 10 ** decimals).send({
    feeLimit: 100_000_000,
    shouldPollResponse: true
  });
}

async function test() {
  console.log('💰 Balance:', await getBalance(wallet));
  await mintTokens(wallet, 100);
  console.log('💰 New balance:', await getBalance(wallet));
  await transferTokens('TRecipientAddress', 1);
  console.log('✅ Transfer complete!');
}

test();
```

## 🔍 Functions Explained

| Function | Description | Parameters |
|----------|-------------|------------|
| `balanceOf(address)` | Check token balance | Address to check |
| `transfer(to, amount)` | Send tokens | Recipient, amount |
| `approve(spender, amount)` | Allow spending | Spender address, amount |
| `transferFrom(from, to, amount)` | Transfer with approval | From, to, amount |
| `mint(to, amount)` | Create new tokens (test only) | Recipient, amount |

## ⚡ Energy Management

Set appropriate `feeLimit`:
- **Transfer:** `150_000_000` (150 TRX)
- **Mint:** `100_000_000` (100 TRX)
- **Approve:** `100_000_000` (100 TRX)

## 🔐 Security Notes

- ✅ Never hardcode private keys
- ✅ Test on Shasta first
- ✅ Keep .env file secure
- ✅ Check balances before transfers

## 📚 References

- [TronWeb Docs](https://tronweb.network/docu/)
- [Shasta Faucet](https://www.trongrid.io/shasta)
- [Shasta TronScan](https://shasta.tronscan.org/)

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| "Out of energy" | Increase `feeLimit` or stake TRX |
| "Invalid address" | Address must start with 'T' (34 chars) |
| "Insufficient balance" | Mint more tokens or get TRX from faucet |
| Connection timeout | Check internet or use different RPC URL |
