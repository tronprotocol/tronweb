## What is TronWeb?

TronWeb aims to deliver a unified, seamless development experience influenced by Ethereum's [Web3](https://github.com/ethereum/web3.js/) implementation. We have taken the core of [Web3](https://github.com/ethereum/web3.js/) and expanded upon it to unlock the functionality of TRON's unique feature set along with offering new tools for integrating DApps in the browser, Node.js and IoT devices.

## Compatibility
- Version built for Node.js v6 and above
- Version built for browsers with more than 0.25% market share

You can access either version specifically from the `dist/` folder.

TronWeb is also compatible with frontend frameworks such as Angular, React and Vue.

You can also ship TronWeb in a Chrome extension.

## Installation

```
npm install tronweb
```

## Example

To look at the examples, first clone this repo, install the dependencies and run the example:
```
git clone https://github.com/tronprotocol/tron-web.git
cd tron-web
yarn
yarn build -d
yarn example
```
The example is at `examples/server/index.js`.

## TRON provides a private network to test with

* Full Node - https://api.trongrid.io
* Solidity Node - https://api.trongrid.io
* Event Server - https://api.trongrid.io
* Block Explorer - https://explorer.trongrid.io

* You can also set up your own private network, but you need to solve cross-domain CORS. The following example in Node reads from a full node listening on 16667 and a solidity node listening on 16668, and exposes the ports 8090 and 8091 with the needed headers.

```
var express = require('express');
var proxy = require('http-proxy-middleware');

function onProxyRes(proxyRes, req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Accept')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  console.log(req.originalUrl)
}

var fullnode = express();
fullnode.use('/', proxy({
  target: 'http://127.0.0.1:16667',
  changeOrigin: true,
  onProxyRes
}));
fullnode.listen(8090);

var soliditynode = express();
soliditynode.use('/', proxy({
  target: 'http://127.0.0.1:16668',
  changeOrigin: true,
  onProxyRes,
  onError
}));
soliditynode.listen(8091);
```


## Creating an Instance

First off, in your javascript file, define TronWeb:

```js
const TronWeb = require('TronWeb')
```
Specify the API endpoints:
```js
const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider('https://api.trongrid.io:8090'); // Full node http endpoint
const solidityNode = new HttpProvider('https://api.trongrid.io:8091'); // Solidity node http endpoint
const eventServer = 'https://api.trongrid.io/'; // Contract events http endpoint
```
The provider above is optional, you can just use a url for the nodes instead, like here:

```js
const fullNode = 'https://api.trongrid.io:8090';
const solidityNode = 'https://api.trongrid.io:8091';
const eventServer = 'https://api.trongrid.io/';
```
Now, instance a tronWeb object:
```js
const privateKey = 'da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0';

const tronWeb = new TronWeb(
    fullNode,
    solidityNode,
    eventServer,
    privateKey
);
```
#### A full example:
```js
const TronWeb = require('TronWeb')

const HttpProvider = TronWeb.providers.HttpProvider; // This provider is optional, you can just use a url for the nodes instead
const fullNode = new HttpProvider('https://api.trongrid.io'); // Full node http endpoint
const solidityNode = new HttpProvider('https://api.trongrid.io'); // Solidity node http endpoint
const eventServer = 'https://api.trongrid.io/'; // Contract events http endpoint

const privateKey = 'da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0';

const tronWeb = new TronWeb(
    fullNode,
    solidityNode,
    eventServer,
    privateKey
);


async function getBalance() {

    const address = 'TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY';

    // The majority of the function calls are asynchronus,
    // meaning that they cannot return the result instantly.
    // These methods therefore return a promise, which you can await.
    const balance = await tronWeb.trx.getBalance(address);
    console.log({balance});

    // You can also bind a `then` and `catch` method.
    tronWeb.trx.getBalance(address).then(balance => {
        console.log({balance});
    }).catch(err => console.error(err));

    // If you'd like to use a similar API to Web3, provide a callback function.
    tronWeb.trx.getBalance(address, (err, balance) => {
        if (err)
            return console.error(err);

        console.log({balance});
    });
}

getBalance();

```


### Documentation for TronBox 1.0

Are you still using TronBox 1. You can find documentation here:
* [English](http://doc.tron.network/en)
* [Chinese](http://doc.tron.network/)


## The TronBox 2 API


### _Core_
***


### setFullNode
Sets the full node, assigning a new provider.

__Params__

1. `string|HttpProvider` - The Tron full node.

__Returns__

`undefined`

__Example__

```
tronWeb.setFullNode(new HttpProvider('https://api.trongrid.io:8090'))
```


***


### setSolidityNode
Sets the solidity node, assigning a new provider. The solidity node must be synced with the full node.

__Params__

1. `string|HttpProvider` - The Tron solidity node.

__Returns__

`undefined`

__Example__

```
tronWeb.setSolidityNode(new HttpProvider('https://api.trongrid.io:8091'))
```

***


### setEventServer
Sets the event server.

__Params__

1. `string|HttpProvider` - The event server.

__Returns__

`undefined`

__Example__

```
tronWeb.setEventServer('https://api.trongrid.io')
```

***

### isConnected
Verify if full node, solidity node and event server are listening as expected.

__Returns__

`boolean`

__Example__

```
tronWeb.isConnected()
    .then(is => {
        console.log(is) // { fullNode: true, solidityNode: true, eventServer: true }
    })
```

***

### currentProviders
Lists the current providers (full node and solidity node)

__Returns__

`object` containing three properties: `HttpProvider` fullNode, `HttpProvider` solidityNode, `string` eventServer

__Example__
```
var providers = tronWeb.currentProviders()
console.log(providers.fullNode.host) // https://api.trongrid.io:8091

```

***

### currentProvider
It is an alias of currentProviders.

***

### toHex
Converts mixed data to an hexadecimal string:

__Params__

`boolean|BigNumber|object|string|number`

__Returns__

`string`

__Example__
```
var hex = tronWeb.toHex('something red')
console.log(hex) // 736f6d657468696e6720726564
```


***

### toAscii
Convert an exadecimal string to an Ascii string

__Params__

`string`

__Returns__

`string`

__Example__

```
var str = tronWeb.toAscii('736f6d657468696e6720726564')
console.log(str) // something red
```

***

### fromAscii(string)
.


***

### toDecimal(hex)
.


***

### fromDecimal(number)
.


***

### fromSun(sun)
.


***

### toSun(trx)
.


***

### toBigNumber(amount)
.


***

### isAddress(address)
.


***

### createAccount()
.


***

### setPrivateKey(privateKey)
.


***

### setAddress(address)
.


***

### setDefaultBlock(blockID)
.


***

### defaultPrivateKey
.


***

### defaultAddress
.


***

### defaultBlock
.


***

### sha3(string, options)
.


***

### getEventResult(contractAddress, eventName, blockNumber)
.


***

### getEventByTransactionID(transactionID)

Address
.


***

### fromHex(address)
.


***

### toHex(address)
.


***

### fromPrivateKey(privateKey)

TRX
.


***

### ~~defaultAccount `This should be moved to the root TronWeb class?`~~
.


***

### ~~defaultBlock `This should be moved to the root TronWeb class?`~~
.


***

### getAccount(address)
.


***

### getBalance(address)
.


***

### getBandwidth(address)
.


***

### getBlock(blockIdentifier)
.


***

### getBlockTransactionCount(blockIdentifier)
.


***

### getTransaction(transactionHash)
.


***

### getTransactionsFromAddress(address, limit = 30, offset = 0)
.


***

### getTransactionsToAddress(address, limit = 30, offset = 0)
.


***

### getTransactionsRelated(address, direction = 'all', limit = 30, offset = 0)
.


***

### getTokensIssuedByAddress(address)
.


***

### getTokenFromID(assetID)
.


***

### listNodes()
.


***

### getBlockRange(start = 0, end = 30)
.


***

### listSuperRepresentatives()
.


***

### listTokens()
.


***

### timeUntilNextVoteCycle()
.


***

### getContract(contractAddress)
.


***

### sendTransaction(to, amount, privateKey)
.


***

### send(), sendTrx() -> **aliases of sendTransaction()**
.


***

### sendToken(to, amount, assetID, privateKey)
.


***

### sendAsset() -> **alias of sendToken()**
.


***

### sendRawTransaction(signedTransaction)
.


***

### broadcast() -> **alias of sendRawTransaction()**
.


***

### sign(transaction, privateKey)
.


***

### signTransaction() -> **alias of sign()**
.


***

### contract(abiArray) -> **alias of `new TronWeb.Contract(abiArray)`**
.


***

### getTransactionFromBlock(blockIdentifier, index)

**__Note: The VM returns / expects addresses to be prefixed with `0x` as opposed to `41`.__**

Witness _(Not a priority. Should be added after all other functionality is complete)_
- [ ] apply(privateKey)
- [ ] submitVotes(votes)
- [ ] withdraw(privateKey)

Transaction Builder (Using Node API)
.


***

### sendTrx(to, amount, from)
.


***

### sendToken(to, amount, assetID, from)
.


***

### sendAsset() -> **alias of sendToken()**
.


***

### purchaseToken(tokenIssuer, assetID, amount, buyer)
.


***

### purchaseAsset() -> **alias of purchaseToken()**
.


***

### freezeBalance(address, amount, duration)
.


***

### unfreezeBalance(address)
.


***

### vote(votes, address)
.


***

### applyForSR(address, url)
.


***

### withdrawBlockRewards(address)
.


***

### createSmartContract({ abi, bytecode, feeLimit, callValue, bandwidthLimit }, issuerAddress)
.


***

### triggerSmartContract(contractAddress, functionSelector, callValue, feeLimit, parameters = [], issuerAddress)
.


***

### createToken(tokenObject)
.


***

### updateToken(tokenObject)
.


***

### createAsset() -> **alias of createToken()**
.


***

### updateAsset() -> **alias of updateToken()**

**Methods Not Possible**
- [ ] getTransactionCount(address)
- [ ] compile(soliditySource)

While the `compile` method _could_ be implemented I have chosen not to at the moment. This would require changing the functionality of the function based on whether the user is running the node build or browser build. The browser build requires `browser-solc` whilst node requires `solc`. 

At the moment - similar to Web3 - it's up to the user to compile smart contracts.



