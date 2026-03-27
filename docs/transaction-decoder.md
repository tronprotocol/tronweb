# Transaction Decoder API

TronWeb v6.3.0 introduces built-in transaction decoding — parse smart contract calldata and event logs into human-readable format with automatic TRON base58 address conversion.

This closes a major developer experience gap: ethers.js has had `Interface.parseTransaction()` for years, but TronWeb developers had to manually decode transactions with ~15 lines of boilerplate. Now it's one line.

---

## Table of Contents

- [The Problem](#the-problem)
- [Quick Start](#quick-start)
- [API Reference](#api-reference)
  - [trx.parseTransaction()](#trxparsetransaction)
  - [trx.parseTransactionLogs()](#trxparsetransactionlogs)
  - [Interface class (low-level)](#interface-class-low-level)
- [Types](#types)
- [Examples](#examples)
  - [Parse a TRC-20 Transfer](#parse-a-trc-20-transfer)
  - [Parse a SunSwap V2 Swap](#parse-a-sunswap-v2-swap)
  - [Parse Event Logs](#parse-event-logs)
  - [Use with a Known ABI](#use-with-a-known-abi)
  - [Low-Level Interface Usage](#low-level-interface-usage)
- [TRON-Specific Behavior](#tron-specific-behavior)
- [Error Handling](#error-handling)
- [Migration Guide (Before → After)](#migration-guide)

---

## The Problem

Before this feature, decoding a TRON smart contract transaction required:

```js
// 1. Fetch the transaction
const tx = await tronWeb.trx.getTransaction(txId);

// 2. Dig into the nested structure to get calldata
const data = tx.raw_data.contract[0].parameter.value.data;

// 3. Manually extract the 4-byte function selector
const selector = data.slice(0, 8);

// 4. Manually look up which function this selector maps to
// (no built-in registry — you need to know the ABI)

// 5. Manually specify parameter types
const types = ['address', 'uint256'];
const names = ['to', 'value'];

// 6. Manually decode
const decoded = tronWeb.utils.abi.decodeParams(names, types, '0x' + data.slice(8));

// 7. Manually convert every address from hex to base58
const toAddress = tronWeb.address.fromHex('41' + decoded.to.slice(2));
```

This is tedious, error-prone, and a barrier for developers coming from Ethereum where `iface.parseTransaction()` handles all of this.

---

## Quick Start

```js
import { TronWeb } from 'tronweb';

const tronWeb = new TronWeb({ fullHost: 'https://api.trongrid.io' });

// Parse a transaction by ID — that's it
const parsed = await tronWeb.trx.parseTransaction('abc123def456...');

console.log(parsed.name);       // "transfer"
console.log(parsed.args.to);    // "TLa2f6VPqDg..."  (base58, not hex)
console.log(parsed.args.value); // 1000000n
```

---

## API Reference

### `trx.parseTransaction()`

Parse a smart contract transaction's input data into human-readable format.

```typescript
async parseTransaction(
  txIdOrData: string | { data: string; contractAddress?: string },
  abi?: ContractAbiInterface
): Promise<ParsedTransaction | null>
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `txIdOrData` | `string` | A transaction ID (64-char hex) — fetches the tx and ABI automatically |
| `txIdOrData` | `string` | Raw calldata starting with `0x` — parses directly |
| `txIdOrData` | `{ data, contractAddress? }` | Object with hex calldata and optional contract address for auto ABI fetch |
| `abi` | `ContractAbiInterface` | Optional. Contract ABI array. If omitted, fetched automatically via `getContract()` |

**Returns:** `ParsedTransaction | null` — Returns `null` if the function selector doesn't match any ABI entry.

**Throws:**
- `"Transaction not found"` — if the transaction ID doesn't exist
- `"Transaction is not a smart contract call"` — if the tx type is not `TriggerSmartContract`
- `"Transaction has no calldata"` — if the tx has no `data` field
- `"Contract address is required when ABI is not provided"` — if passing raw data without ABI or contract address
- `"Contract ABI not found"` — if the contract is not verified on-chain

---

### `trx.parseTransactionLogs()`

Parse event logs from a transaction into human-readable format.

```typescript
async parseTransactionLogs(
  txId: string,
  abi?: ContractAbiInterface
): Promise<ParsedLog[]>
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `txId` | `string` | The transaction ID |
| `abi` | `ContractAbiInterface` | Optional. If omitted, fetched per log entry based on the emitting contract address |

**Returns:** `ParsedLog[]` — Array of decoded logs. Logs from unverified contracts are silently skipped.

---

### Interface class (low-level)

The `Interface` class is now publicly available for advanced use cases.

```typescript
import { TronWeb } from 'tronweb';

// Access via utils
const Interface = TronWeb.utils.ethersUtils.Interface;

// Or import directly
import { Interface } from 'tronweb';
```

**Key methods:**

| Method | Description |
|--------|-------------|
| `parseTransaction({ data, value? })` | Decode calldata → `TransactionDescription` |
| `parseLog({ topics, data })` | Decode event log → `LogDescription` |
| `parseError(data)` | Decode revert data → `ErrorDescription` |
| `encodeFunctionData(name, args)` | Encode a function call |
| `encodeEventLog(event, args)` | Encode event log data |
| `getFunction(nameOrSelector)` | Look up function fragment |
| `getEvent(nameOrTopic)` | Look up event fragment |

---

## Types

### ParsedTransaction

```typescript
interface ParsedTransaction {
  /** Function name, e.g. "transfer", "swapExactTokensForTokens" */
  name: string;

  /** Full function signature, e.g. "transfer(address,uint256)" */
  signature: string;

  /** 4-byte function selector, e.g. "0xa9059cbb" */
  selector: string;

  /** Decoded arguments with named keys and TRON base58 addresses */
  args: Record<string, any>;

  /** TRX sent with the call (call_value), in SUN */
  value: bigint;
}
```

### ParsedLog

```typescript
interface ParsedLog {
  /** Event name, e.g. "Transfer", "Swap", "Approval" */
  name: string;

  /** Full event signature, e.g. "Transfer(address,address,uint256)" */
  signature: string;

  /** Decoded event parameters with named keys and TRON base58 addresses */
  args: Record<string, any>;

  /** Contract address that emitted this event (TRON base58 format) */
  address: string;
}
```

---

## Examples

### Parse a TRC-20 Transfer

```js
const parsed = await tronWeb.trx.parseTransaction(txId);

// {
//   name: "transfer",
//   signature: "transfer(address,uint256)",
//   selector: "0xa9059cbb",
//   args: {
//     to: "TLa2f6VPqDgUS9M1X2hNhCEj3JBsb4t3kW",   // base58!
//     value: 1000000n
//   },
//   value: 0n
// }
```

### Parse a SunSwap V2 Swap

```js
const parsed = await tronWeb.trx.parseTransaction(swapTxId);

// {
//   name: "swapExactTokensForTokens",
//   signature: "swapExactTokensForTokens(uint256,uint256,address[],address,uint256)",
//   selector: "0x38ed1739",
//   args: {
//     amountIn: 500000000n,
//     amountOutMin: 475000000n,
//     path: [
//       "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",   // USDT
//       "TNUC9Qb1rRpS5CbWLmNMxXBjyFoydXjWFR"    // WTRX
//     ],
//     to: "TLa2f6VPqDgUS9M1X2hNhCEj3JBsb4t3kW",
//     deadline: 1700000000n
//   },
//   value: 0n
// }
```

### Parse Event Logs

```js
const logs = await tronWeb.trx.parseTransactionLogs(txId);

for (const log of logs) {
  console.log(`${log.name} emitted by ${log.address}`);
  console.log(log.args);
}

// Transfer emitted by TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t
// { from: "TLa2f6VPq...", to: "TQn9Y2khe...", value: 1000000n }
//
// Swap emitted by TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE
// { sender: "TKzxdSv2F...", amount0In: 500000000n, ... }
```

### Use with a Known ABI

Skip the automatic ABI fetch by providing your own:

```js
const myAbi = [
  {
    type: 'function',
    name: 'transfer',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'value', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'bool' }]
  }
];

// From raw calldata
const parsed = await tronWeb.trx.parseTransaction(
  { data: '0xa9059cbb000000000000000000000000...' },
  myAbi
);

// From tx ID with explicit ABI (skips getContract call)
const parsed = await tronWeb.trx.parseTransaction(txId, myAbi);
```

### Low-Level Interface Usage

For full control, use the `Interface` class directly:

```js
const { Interface } = tronWeb.utils.ethersUtils;

const iface = new Interface([
  'function transfer(address to, uint256 value) returns (bool)',
  'event Transfer(address indexed from, address indexed to, uint256 value)',
  'error InsufficientBalance(address account, uint256 balance, uint256 required)'
]);

// Parse calldata
const parsed = iface.parseTransaction({ data: '0xa9059cbb...' });
console.log(parsed.name);  // "transfer"
console.log(parsed.args);  // [address (hex), amount]

// Parse event log
const log = iface.parseLog({ topics: [...], data: '0x...' });
console.log(log.name);     // "Transfer"

// Parse revert error
const error = iface.parseError('0x...');
console.log(error.name);   // "InsufficientBalance"

// Encode a function call
const calldata = iface.encodeFunctionData('transfer', [address, amount]);

// Look up by selector
const fragment = iface.getFunction('0xa9059cbb');
console.log(fragment.name); // "transfer"
```

---

## TRON-Specific Behavior

This decoder handles several TRON-specific quirks automatically:

| Concern | How it's handled |
|---------|-----------------|
| **Address format** | All `address` type values are converted from hex (`0x7e5f...`) to TRON base58 (`TLa2f...`) |
| **Nested addresses** | Address arrays (`address[]`), tuple fields with address type, and nested tuples are all recursively converted |
| **Transaction structure** | Extracts calldata from TRON's `raw_data.contract[0].parameter.value.data` structure |
| **ABI fetch** | Uses `tronWeb.trx.getContract()` to fetch verified contract ABIs on-chain |
| **trcToken type** | The TRON-specific `trcToken` type is mapped to `uint256` during decoding |
| **Log address format** | Log entry addresses (41-prefixed hex) are converted to base58 in results |
| **ABI caching** | When parsing multiple logs from different contracts, ABIs are cached to avoid redundant fetches |

---

## Error Handling

```js
try {
  const parsed = await tronWeb.trx.parseTransaction(txId);
  if (parsed === null) {
    console.log('Function selector not found in ABI');
  }
} catch (e) {
  // Possible errors:
  // - "Transaction not found"
  // - "Transaction is not a smart contract call"
  // - "Transaction has no calldata"
  // - "Contract address is required when ABI is not provided"
  // - "Contract ABI not found. The contract may not be verified."
  console.error(e.message);
}
```

For `parseTransactionLogs()`, logs from contracts with unavailable ABIs are silently skipped (no error thrown). The returned array only contains successfully decoded logs.

---

## Migration Guide

### Before (v6.2.x and earlier)

```js
// Step 1: Fetch the transaction
const tx = await tronWeb.trx.getTransaction(txId);
const contractData = tx.raw_data.contract[0].parameter.value;

// Step 2: Get the contract ABI
const contract = await tronWeb.trx.getContract(contractData.contract_address);
const abi = contract.abi.entrys;

// Step 3: Find the matching function by selector
const selector = contractData.data.slice(0, 8);
const funcAbi = abi.find(entry => {
  if (entry.type !== 'function') return false;
  // ... compute selector from entry and compare
});

// Step 4: Decode parameters
const types = funcAbi.inputs.map(i => i.type);
const names = funcAbi.inputs.map(i => i.name);
const decoded = tronWeb.utils.abi.decodeParams(
  names, types, '0x' + contractData.data.slice(8)
);

// Step 5: Convert addresses manually
if (decoded.to) {
  decoded.to = tronWeb.address.fromHex('41' + decoded.to.slice(2));
}
```

### After (v6.3.0)

```js
const parsed = await tronWeb.trx.parseTransaction(txId);
// Done. All addresses are already in base58.
```
