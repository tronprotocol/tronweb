Change Log
=========

__6.0.0-beta.4__
- Replace `ethers@v5/abi` with abiCoder of `ethers@v6`.
- Bump ethers from v6.11.1 to v6.13.1.
- Export all Types and enum objects.
- Move `typescript` and other dev dependencies into `devDependencies` field in package.json.
- Change headers type in TronWeb constructor.

__6.0.0-beta.3__
- Support recovering transaction signer address by `trx.ecRecover`.
- Support both base58 format and hex format address field in keys of `updateAccountPermissions` params.
- Support type for contract instance.

__6.0.0-beta.2__
- Bump ethers from 6.8.0 to 6.11.1
- Bump ethereum-cryptography from 2.1.2 to 2.1.3
- Bump axios from 1.6.2 to 1.6.8

__6.0.0-beta.1__
- Support [TIP586](https://github.com/tronprotocol/tips/blob/master/tip-586.md) with `trx.getBandwidthPrices` and `trx.getEnergyPrices`.
- Support custom block header info when creating transaction.

__6.0.0-beta.0__
- Add full type definition for Typescript.
- Change Default exports to Named exports.
- Change `TronWeb.createRandom(options)` to `TronWeb.createRandom(password, path, wordlist)`.
- Change `TronWeb.fromMnemonic(mnemonic, path, wordlist)` to `TronWeb.fromMnemonic(mnemonic, path, password, wordlist)`.
- All methods in `Trx` and `TransactionBuilder` perform an strict check for type and position of parameters.
- All methods in TronWeb will throw an `Error` instance instead of a string. `e.message` should be used to access error information.
- Update `TronWeb#event` API with new backend service([#422](https://github.com/tronprotocol/tronweb/issues/422)).
- Remove `Contract#watch()` method.
- Support multi-dimension address array parameters in `TransactionBuilder#triggerSmartContract()`([#433](https://github.com/tronprotocol/tronweb/issues/433)).

__5.3.2__
- Add custom block header argument for building transactions locally in `transactionBuilder` lib
- Support [TIP586](https://github.com/tronprotocol/tips/blob/master/tip-586.md) by `trx.getBandwidthPrices` and `trx.getEnergyPrices`
- Support recover transaction signer address by `trx.ecRecover`
- Support multi-dimension address array such as `address[][]` for ABI params encoding  in `triggerSmartContract` and `createSmartContract`  [#433](https://github.com/tronprotocol/tronweb/issues/433)
- Fix error when `triggerSmartContract` with error address due to the undefined callback [#429](https://github.com/tronprotocol/tronweb/issues/429)
- Bump axios from 0.26.1 to 1.6.2 [#445](https://github.com/tronprotocol/tronweb/issues/445)

__5.3.1__
-   Fix `getBlockRange()` error for range of 1 ([#398](https://github.com/tronprotocol/tronweb/issues/398)).
-  Add support for `estimateenergy` in  `TransactionBuilder#deployConstantContract()` API.

__5.3.0__
- Replace `elliptic` with `ethereum-cryptography/secp256k1` 
- Bump ethers to ^6.6.0
- Optimize argument validation for `createToken`, `updateToken` and `applyForSR` 
- callValue can be 0 when the contract constructor is payable
- Support shouldPollResponse to customize poll times ([#368](https://github.com/tronprotocol/tronweb/issues/368))
- Support [Tip541](https://github.com/tronprotocol/tips/issues/541) by `transactionBuilder.cancelUnfreezeBalanceV2`
- Support [Tip542](https://github.com/tronprotocol/tips/issues/542) by adding a parameter in `transactionBuilder.delegateResource`
- Support estimate the energy used in contract deployment by `transactionBuilder.deployConstantContract`

__5.2.0__
- Support build transactions locally with protobuf 
- Support multi-sign for `setAccountId`, `updateBrokerage`, `clearABI`, `updateAccountPermissions` function in `transactionBuilder` lib

__5.1.0__
- Add `freezeBalanceV2`, `unfreezeBalanceV2`, `delegateResource`, `undelegateResource` and `withdrawExpireUnfreeze` function in transactiobBuiler lib to support stakeV2 
- Support `tronWeb.transactionBuilder.estimateEnergy` to estimate energy for triggersmartcontract transaction
- Add `getDelegatedResourceV2`, `getDelegatedResourceAccountIndexV2`, `getCanDelegatedMaxSize`, `getAvailableUnfreezeCount` and `getCanWithdrawUnfreezeAmount` function to query account resource info

__5.0.0__
- Add `tronWeb.utils.transaction` lib to serialize and deserialize transaction 
- Add `tronWeb.utils.transaction.txJsonToPb` function to convert transaction json to protobuf
- Add `tronWeb.utils.transaction.txPbToTxID` function to get txID from transaction protobuf
- Support new transaction builder `createAccount` 

__4.4.0__
- Support `createRandom` and `fromMnemonic` function
- Add `tronWeb.utils.message` lib, which includes `hashMessage`, `signMessage` and `verifyMessage`
- Add `signMessageV2` and `verifyMessageV2` in `tronWeb.trx` lib which can support plain text signature and verification
- Add `size` filter for event watch 

__4.3.0__
- Support `_signTypedData`

__4.2.0__
- Add the name key when the `call()` and `send()` methods has only one return value
- Optimize the `TriggerConstantContract()` method
- Update `axios` to version 0.26.1
- Update `karma` to version 6.3.17
- Update `puppeteer` to version 13.5.1

__4.1.0__
- Add `encodeParamsV2ByABI` and `decodeParamsV2ByABI` functions in `tronWeb.utils.abi` lib
- Support abi v2 for `triggerSmartContract`, `createSmartContract`, `call` and `send` methods
- Update `validator` to version 13.7.0
- Update `axios` to version 0.24.0
- Update discord group link

__4.0.1__
- Set _isConstant as true for call method
- Ignore max feeLimit check
- Change git repository url

__4.0.0__
- Support `broadcastHex` method
- Ignore fullnode version check when calling `createToken` method
- Update dependencies version
- Add strict mode for `pkToAddress` method

__3.2.7__
- Add options `rawParameter` that format of the parameters method and args when creating or triggering a contract
- Update `elliptic` to the latest version 6.5.4
- Update `validator` to the latest version 13.6.0

__3.2.6__
- Add setHeader function

__3.2.5__
- Set feeLimit max value as 5000 TRX

__3.2.4__
- Set feeLimit default value as 150 TRX

__3.2.3__
- Support triggerSmartContract function with empty character functionSelector and empty array parameters
- The triggerSmartContract function Support for anonymous contract parameter incoming

__3.2.2__
- Set feeLimit default value as 40 TRX
- The `createToken` method supports 0 in its precision

__3.1.0__
- Update `elliptic` to the latest version 6.5.3
- Update `ethers` to the latest version 5.0.8
- Fix `loadAbi()`

__3.0.0__
- Support sidechain for SunNetwork
- Set feeLimit default value as 20 TRX

__2.10.2__
- Support toHex function with a space and empty character as parameter
- The sign function supports visible as true.
- Fix delete the private key in test files
- Fix start method returned from watch is undefined #45

__2.10.1__
* Fix `trx.listExchangesPaginated`

__2.10.0__
* Fix `trx.getTokenListByName`

__2.9.0__
* Support smart contracts with function that requires an array of addresses as a parameter, included the constructor during the deployment

__2.8.1__
* Add options `keepTxID` to show also the txID when triggering a contract with `shouldPollResponse`

__2.8.0__
* Improve in the plugin architecture allows someone to implement a full lib at the same level of Trx and TransactionBuilder

__2.7.4__
* Fix bugs of trx.getBrokerage and trx.getReward function

__2.7.3__
* Support new apis related to Java-Tron 3.6.5
* Original withdrawBlockRewards method support to withdraw user's reward

__2.6.8__
* Support extension of transaction expiration
* Allow to add data to the transaction
* Many minor changes and fixes

__2.6.3__
* Support get unconfirmed transaction function

__2.6.0__
* Support trigger constant contract, clear abi and add account by id
* Add permission id option in functions related to creating transaction
* Support multi-sign without permission id

__2.5.6__
* Reverse PR #6

__2.5.5__
* Ignore `receiverAddress` during `freezeBalance` and `unfreezeBalance` if it is equal to the owner address

__2.5.4__
* Adds cache in Trx to cache Contracts locally and make the process more efficient

__2.5.2__
* Adds static methods `Trx.signString` and `Trx.verifySignature`

__2.5.0__
* Allows freeBandwidth, freeBandwidthLimit, frozenAmount and frozenDuration to be zero

__2.3.7__
* Get rid of jssha to reduce the size of the package a little bit.

__2.3.6__
* Supports `/wallet/getapprovedlist` and `/wallet/getsignweight` JavaTron API.
* Adds test for multi-sign workflow.

__2.3.5__
* Fixes a typo in `#event.getEventsByContractAddress` naming.

__2.3.4__
* Adds options to `#plugin.register` to pass parameters to `pluginInterface`.

__2.3.3__
* Adds filters during event watching.

__2.3.2__
* Removes mixed approach instantiating tronWeb. Before you could pass the servers as an object, and the privateKey as a separate parameter. Now, you pass them either in the options object or in the params.

__2.3.1__
* Adds support for not-tld domain, like http://localhost
* Improve the new format, allow passing the privateKey as a property in the option object

__2.3.0__
* Introduces new format to instantiate tronWeb, passing an options object instead that `fullNode`, `solidityNode` and `eventServer` as separate params
* Fixes bug in `_watch` which causes a continuous update of the `since` parameter
