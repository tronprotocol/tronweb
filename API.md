# The TronWeb 2 API


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



