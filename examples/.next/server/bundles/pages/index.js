module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../src/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__("axios");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_help__ = __webpack_require__("../src/utils/help.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__private__ = __webpack_require__("../src/private.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_account__ = __webpack_require__("../src/utils/account.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_account___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__utils_account__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_crypto__ = __webpack_require__("../src/utils/crypto.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_crypto___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__utils_crypto__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ethers__ = __webpack_require__("ethers");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ethers___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_ethers__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_bignumber_js__ = __webpack_require__("bignumber.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_bignumber_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_bignumber_js__);








class TronWeb {
    constructor(apiUrl = false, infuraUrl = 'http://52.44.75.99:18889') {
        if(!apiUrl)
            console.debug('Warning: No Fullnode API provided. Functionality may be limited');

        if(!infuraUrl)
            console.debug('Warning: No infura url provided. Functionality may be limited');

        this.apiUrl = apiUrl;
        this.infuraUrl = infuraUrl;

        this.defaultAccount = false;
        this.defaultPrivateKey = false;
    }

    toHex(str) {
        // For converting addresses
        if(str.length == 34 && str.charAt(0) === 'T')
            return Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(str);

        return Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["d" /* stringUtf8toHex */])(str);
    }

    fromHex(shex) {
        // For converting addresses
        if(shex.length == 42 && shex.substr(0, 2) === '41')
            return Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["b" /* hexString2Address */])(shex);
        return Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["c" /* hexString2Utf8 */])(shex);
    }

    // TODO: Ideally you would parse the URL to make sure it's valid
    setFullNodeServer(apiUrl = false) {
        if(!apiUrl)
            console.debug('Warning: No Fullnode API provided. Functionality may be limited');

        this.apiUrl = apiUrl;
    }

    // TODO: Ideally you would parse the URL to make sure it's valid
    setEventServer(infuraUrl = false) {
        if(!infuraUrl)
            console.debug('Warning: No infura url provided. Functionality may be limited');

        this.infuraUrl = infuraUrl;
    }

    /**
     * Returns the associated address attached to a private key
     * @param {string} privateKey
     * @return {string} address
     **/
    privateKeyToAddress(privateKey) {
        return Object(__WEBPACK_IMPORTED_MODULE_4__utils_crypto__["pkToAddress"])(privateKey);
    }

    /**
     * Queries the node to fetch an account's balance
     * @param {string} address
     * @return {object}
     **/
    async getBalance(address) {
        const { data } = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/getaccount`, {
            address: Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(address)
        });

        return data;
    }

    /**
     * Query the latest block
     * @return {object}
     **/
    async latestBlockNumber() {
        const { data } = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/getnowblock`);
        return data;
    }

    /**
     * Query the block by hashString or blockNumber
     * @param {string|number} blockIdentifier Either a block hash or block number 
     * @return {object}
     **/
    async getBlock(blockIdentifier) {
        if(isNaN(blockIdentifier)) {
            const { data } = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/getblockbyid`, { value: blockIdentifier });
            return data;
        }

        const { data } = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/getblockbynum`, { num: parseInt(blockIdentifier) });
        return data;
    }

    async getBlockByHash(blockHash) {
        const { data } = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/getblockbyid`, { value: blockHash });
        return data;
    }

    async getBlockByNumber(blockNumber) {
        const { data } = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/getblockbynum`, { num: parseInt(blockNumber) });
        return data;
    }

    /**
     * Query the count of transaction in a block by hashString or blockNumber
     * @param {string|number} blockIdentifier Either a block hash or block number 
     * @return {object}
     **/
    async getBlockTransactionCount(blockIdentifier) {
        const { transactions } = await this.getBlock(blockIdentifier);

        if(!transactions)
            return 0;

        return transactions.length;
    }

    /**
     * Fetches a transaction given its IT
     * @param {string|number} transactionID 
     * @return {object}
     **/
    async getTransaction(transactionID) {
        const { data } = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/gettransactionbyid`, { value: transactionID });
        return data;
    }
    /**
     * Fetch total amount of transactions on the blockchain
     * @returns {number} Total amount of transactions found
     **/
    async getTransactionCount() {
        let {data} = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/totaltransaction`);
        return data.num;
    }
    
    /**
     * Creates and broadcasts a TRX transfer transaction
     * @param {string} from The address of the sender
     * @param {string} to The address of the recipient
     * @param {number} amount The amount of TRX to send (in SUN)
     * @param {string} [privateKey] The private key to sign the transaction with, defaults to this.defaultPrivateKey
     * @return {object} Returns the response and the signed transaction
     **/
    async sendTransaction(from, to, amount, privateKey = this.defaultPrivateKey) {
        if(!privateKey)
            throw new Error('Missing private key');

        const transaction = await this.createTransaction(to, from, amount)
        const signedTransaction = await this.signTransaction(transaction, privateKey, 0);
        const response = await this.sendRawTransaction(signedTransaction);
        
        return Object.assign(response, signedTransaction);
    }

    /**
     * Creates an unsigned TRX transfer transaction
     * @param {string} from The address of the sender
     * @param {string} to The address of the recipient
     * @param {number} amount The amount of TRX to send (in SUN)
     * @return {object} transaction
     **/
    async createTransaction(from, to, amount) {
        const { data } = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/createtransaction`,{
            to_address: Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(to),
            owner_address: Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(from),
            amount
        });

        return data;
    }

    /**
     * Signs a transaction given a privateKey
     * @param {object} transaction The transaction to sign
     * @param {string} privateKey The private key to sign the transaction with
     * @return {object} transaction
     **/
    async signTransaction(transaction, privateKey) {
        const address = this.privateKeyToAddress(privateKey);

        if(address !== this.fromHex(transaction.raw_data.contract[0].parameter.value.owner_address))
            throw new Error('Provided private key does not match the transaction');

        return Object(__WEBPACK_IMPORTED_MODULE_4__utils_crypto__["signTransaction"])(privateKey, transaction);
    }

    /**
     * Broadcasts a signed transaction
     * @param {object} signedTransaction Signed transaction object
     * @return {object}
     **/
    async sendRawTransaction(signedTransaction) {
        const { data } = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/broadcasttransaction`, signedTransaction);
        return data;
    }

    /**
     * Change the account name (only once)
     * @param {string} address The address of the name to change
     * @param {string} newName The new name for the account
     * @return {object}
     **/
    async changeAccountName(address, newName) {
        const { data } = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/updateaccount`, {
            account_name: Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["d" /* stringUtf8toHex */])(newName),
            owner_address: Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(address)
        });

        return data;
    }

    /**
     * Creates and broadcasts a vote transaction for Super Representatives
     * @param {string} address The address of the account that is voting
     * @param {object} votes The votes for the SRs, in the format { [srAddress]: voteCountInTronPower }
     **/
    async voteWitnessAccount(address, votes) {
        votes = Object.entries(votes).map(([ srAddress, voteCount ]) => ({
            vote_address: Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(srAddress),
            vote_count: voteCount
        }));
        
        const { data } = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/votewitnessaccount`, {
            owner_address: Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(address),
            votes
        });

        return data;
    }

    /**
     * Creates and publishes a token
     * @param {object} token {
     *   "owner_address": "41e552f6487585c2b58bc2c9bb4492bc1f17132cd0",
     *   "name": "0x6173736574497373756531353330383934333132313538",
     *   "abbr": "0x6162627231353330383934333132313538",
     *   "total_supply": 4321,
     *   "trx_num": 1,
     *   "num": 1,
     *   "start_time": 1530894315158,
     *   "end_time": 1533894312158,
     *   "description": "007570646174654e616d6531353330363038383733343633",
     *   "url": "007570646174654e616d6531353330363038383733343633",
     *   "free_asset_net_limit": 10000,
     *   "public_free_asset_net_limit": 10000,
     *   "frozen_supply": { "frozen_amount": 1, "frozen_days": 2 }
     * }
     **/
    async createToken(token) {
        let {
            owner_address,
            name,
            abbr,
            total_supply,
            trx_num,
            num,
            start_time,
            end_time,
            description,
            url,
            free_asset_net_limit,
            public_free_asset_net_limit,
            frozen_supply
        } = token;

        const { data } = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/createassetissue`, {
            owner_address: Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(owner_address),
            name: Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["d" /* stringUtf8toHex */])(name),
            abbr: Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["d" /* stringUtf8toHex */])(abbr),
            description: Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["d" /* stringUtf8toHex */])(description),
            url: Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["d" /* stringUtf8toHex */])(url),
            total_supply,
            trx_num,
            num,
            start_time,
            end_time,
            free_asset_net_limit,
            public_free_asset_net_limit,
            frozen_supply
        });

        return data;

    }

    /**
     * Registers a new account on the network 
     * @param {string} address The address of an activated account
     * @param {string} newAccountAddress The address of the new account to register
     **/
    async registerAccount(address, newAccountAddress) {
        const { data } = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/createaccount`,{
            owner_address: Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(address),
            account_address: Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(newAccountAddress)
        });

        return data;
    }

    /**
     * Applies to become a super representative. This costs 9,999 TRX.
     * @param {string} address The address of the account that is applying
     * @param {string} url The homepage URL for the Super Representative
     * @return {object} transaction
     **/
    async applyForSuperRepresentative(address, url) {
        const { data } = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/createwitness`,{
            owner_address: Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(address),
            url: Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["d" /* stringUtf8toHex */])(url)
        });

        return data;
    }

    /**
     * Returns an unsigned asset transfer transaction
     * @param {string} from The address of the sender
     * @param {string} to The address of the recipient
     * @param {string} assetID The ID (name) of the asset to send
     * @param {number} amount The amount of TRX to send (in SUN)
     * @return {object}
     **/
    async createSendAssetTransaction(from, to, assetID, amount) {
        const { data } = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/transferasset`, {
            owner_address: Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(from),
            to_address: Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(to),
            asset_name: Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["d" /* stringUtf8toHex */])(assetID),
            amount
        });

        return data;
    }

    /**
     * Creates and broadcasts a TRX transfer transaction using a password
     * @param {string} to The address of the recipient
     * @param {number} amount The amount of TRX to send (in SUN)
     * @param {string} password The password of the sender's account
     * @return {object}
     **/
    async sendTransactionByPassword(to, amount, password) {
        const { data } = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/easytransfer`, {
            passPhrase: Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["d" /* stringUtf8toHex */])(password),
            toAddress: Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(to),
            amount
        });

        return data;
    }

    /**
     * Create an address with a password. Only use in secured environments.
     * @param {string} password The password of the account
     * @return {object}
     **/
    async createAddressWithPassword(password) {
        const { data } = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/createaddress`, {
            value: Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["d" /* stringUtf8toHex */])(password)
        });

        return data;
    }

    /**
     * Creates an asset purchase transaction
     * @param {string} tokenIssuer The address of the owner of the asset
     * @param {string} address The address of the purchaser
     * @param {number} amount The amount of the asset to purchase
     * @param {string} assetID The asset's ID (name) to purchase
     * @return {object}
     **/
    async createPurchaseAssetTransaction(tokenIssuer, address, amount, assetID) {
        const { data } = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/participateassetissue`, {
            to_address: Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(tokenIssuer),
            owner_address: Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(address),
            asset_name: Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["d" /* stringUtf8toHex */])(assetID),
            amount
        });

        return data;
    }

    /**
     * Creates a freeze balance transaction
     * @param {string} address The address of the account that is requesting the freeze
     * @param {number} amount The amount of TRX to freeze (in SUN)
     * @param {number} duration The duration to freeze the TRX for (minimum of 3, in days)
     * @return {object} transaction
     **/
    async createFreezeBalanceTransaction(address, amount, duration = 3) {
        const { data } = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/freezebalance`, {
            owner_address: Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(address),
            frozen_balance: amount,
            frozen_duration: duration
        });

        return data;
    }

    /**
     * Creates an unfreeze freeze balance transaction
     * @param {string} address The address of the account requesting the unfreeze
     * @return {object} transaction
     **/
    async createUnfreezeBalanceTransaction(address) {
        const { data } = __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/unfreezebalance`, {
            owner_address: Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(address)
        });

        return data;
    }

    /**
     * Creates an unfreeze asset transaction (used for accounts that have created a frozen asset)
     * @param {string} address The address of the account requesting the unfreeze
     * @return {object} transaction
     **/
    async createUnfreezeAssetTransaction(address) {
        const { data } = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/unfreezeasset`, {
            owner_address: Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(address)
        });

        return data;
    }

    /**
     * Creates a transaction for SRs to withdraw their block rewards
     * @param {string} address Address of the account requesting the withdraw
     * @return {object} transaction
     **/
    async createWithdrawBlockRewardTransaction(address) {
        const { data } = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/withdrawbalance`, {
            owner_address: Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(address)
        });

        return data;
    }

    /**
     * Creates a transaction for modifying an asset's meta information
     * @param {string} address The address of the token issuer
     * @param {string} description The description of the token
     * @param {string} url The homepage URL for the token
     * @param {number} [bandwidthLimit=0] Optional bandwidth limit for token holders, paid by the token issuer
     * @param {number} [freeBandwidthLimit=0] Optional free bandwidth limit that token holders can use for free 
     * @return {object} transaction
     **/
    async createUpdateAssetTransaction(address, description, url, bandwidthLimit = 0, freeBandwidthLimit = 0) {
        const { data } = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/updateasset`,{
            owner_address: Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(address),
            description: Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["d" /* stringUtf8toHex */])(description),
            url: Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["d" /* stringUtf8toHex */])(url),
            new_limit: bandwidthLimit,
            new_public_limit: freeBandwidthLimit
        });

        return data;
    }

    /**
     * Fetches a list of nodes that the current node is connected to
     * @return {object Array}
     **/
    async listNodes() {
        const { data } = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/listnodes`);
        return data;
    }

    /**
     * Attempts to find a token given the account address that issued it
     * @param {string} address Address of the account to check
     * @return {object}
     **/
    async getTokenFromAddress(address) {
        const { data } = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/getassetissuebyaccount`, {
            address: Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(address)
        });

        return data;
    }

    /**
     * Fetches the available bandwidth amount for a specific account
     * @param {string} address
     * @return {object}
     **/
    async getAccountBandwidth(address) {
        const { data } = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/getaccountnet`, { 
            address: Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(address)
        });

        return data;
    }

    /**
     * Attempts to find a token given its name
     * @param {string} name The name of the token
     * @return {object}
     **/
    async getAssetIssueFromName(name) {
        const { data } = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/getassetissuebyname`, {
            value: Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["d" /* stringUtf8toHex */])(name)
        });

        return data;
    }
   
    /**
     * Fetches a list of blocks in a specific range
     * @param {number} startBlock The starting block number
     * @param {number} endBlock The ending block number
     * @return {object}
     **/
    async getBlocksInRange(startBlock, endBlock) {
        const { data } = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/getblockbylimitnext`, {
            startNum: startBlock,
            endNum: endBlock
        });

        return data;
    }

    /**
     * Fetches a list of the latest blocks
     * @param {number} [limit=1] The maximum amount of blocks to retrieve
     * @return {object}
     **/
    async getLatestBlocks(limit = 1) {
        const { data } = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/getblockbylatestnum`, {
            num: limit 
        });

        return data;
    }
   

    /**
     * Fetches a list of Super Representatives
     * @returns {Array}
     **/
    async listSuperRepresentatives() {
        const { data } = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/listwitnesses`);
        return data;
    }

    /**
     * Fetches a list of issued tokens
     * @returns {Array}
     **/
    async listAssets() {
        const { data } = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/getassetissuelist`);
        return data;
    }

    /**
     * Fetches a paginated list of issued tokens
     * @param {number} limit The amount of tokens to return
     * @param {number} [offset=0] The offset of the pagination
     * @returns {Array} 
     **/
    async listAssetsPaginated(limit, offset = 0) {
        const { data } = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/getpaginatedassetissuelist`, {
            limit,
            offset
        });

        return data;
    }
    
    /**
     * Returns the time in milliseconds until the next SR vote count will occur
     * @returns {object} { num: timestamp }
     **/
    async timeUntilNextVoteCycle() {
        const { data } = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/getnextmaintenancetime`);
        return data;
    }

    /**
     * Generates an account locally, giving it's private key and address.
     * @return {object}
     **/
    async generateAccount() {
        return Object(__WEBPACK_IMPORTED_MODULE_3__utils_account__["generateAccount"])();
    }

    /**
     * Validates an address
     * @param {string} address
     * @return {object}
     **/
    async validateAddress(address) {
        const { data } = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/validateaddress`, { address });
        return data;
    }

    /**
     * Creates a transaction for deploying a contract
     * @param {string} abi The contract's ABI
     * @param {string} bytecode The contract's bytecode
     * @param {string} feeLimit Maximum TRX consumption in SUN
     * @param {string} address Address of the contract's issuer
     * @param {number} [callValue=0] Optional amount of TRX in SUN to pay into the contract
     * @param {number} [bandwidthLimit=0] Optional percentage of the issuer's bandwidth that users of the contract can use
     * @return {object} transaction
     **/
    async deployContract(abi, bytecode, feeLimit, address, callValue = 0, bandwidthLimit = 0) {
        const payable = JSON.parse(abi).some(v => {
            if(v.type=='constructor' && v.payable)
                return v.payable
        });
        if(feeLimit > 1000000000)
            throw new Error('fee_limit must not be greater than 1000000000');

        if(payable && callValue == 0)
            throw new Error('call_value must be greater than 0 if contract is type payable');
        
        if(!payable && callValue>0)
            throw new Error('call_value can only equal to 0 if contract type isn‘t payable');

        const { data } = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/deploycontract`, {
            owner_address: Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(address),            
            fee_limit: feeLimit,
            call_value: callValue,
            consume_user_resource_percent: bandwidthLimit,
            abi,
            bytecode,
        });

        return data;
    }

    // This is not documented
    async getContract(contractAddress) {
        const { data } = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/getcontract`, {
            value: Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(contractAddress)
        });

        return data;
    }

    /**
     * Creates a transaction for triggering a smart contract
     * @param {string} contractAddress The address of the smart contract
     * @param {string} functionSelector The signature of the function to trigger
     * @param {number} callValue The amount of TRX in SUN to pay into the contract
     * @param {number} feeLimit Maximum TRX consumption in SUN 
     * @param {string} address The address of the account issuing the trigger
     * @param {array} [parameters=[]] Optional parameters to pass to the function
     * @return {object} transaction
     **/
    async triggerSmartContract(contractAddress, functionSelector, callValue, feeLimit, address, parameters = []) {
        let coder = new __WEBPACK_IMPORTED_MODULE_5_ethers__["utils"].AbiCoder();
        let parameter;
        functionSelector = functionSelector.replace(/\s*/g, '');
        if(parameters && parameters.length) {
            const encoder = new __WEBPACK_IMPORTED_MODULE_5_ethers__["utils"].AbiCoder();
            const [ types, values ] = parameters;
            types && types.forEach((itemType, index ) => {
                if(itemType == 'address')
                    values[index] = Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(values[index]).replace(/^(41)/, '0x');
            });
            parameter = encoder.encode(parameters[0], parameters[1]).replace(/^(0x)/, '');
        }

        const { data } = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/triggersmartcontract`,{
            contract_address: Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(contractAddress),
            owner_address: Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(address),
            function_selector: functionSelector,
            parameter,
            fee_limit: feeLimit,
            call_value: callValue
        });

        return data;
    }

    /**
     * Queries the Infura server for an event's result
     * @param {string} [contractAddress] The address of the smart contract
     * @param {string} [eventName] The name of the event to find
     * @param {number} [blockNumber] The number the event was fired from
     * @param {number} [transactionID] The transaction ID for the event trigger
     * @return {object} event
     **/
    async getEventResult(contractAddress = false, eventName = false, blockNumber = false, transactionID = false) {
        let requestUrl = `${this.infuraUrl}/event/contract`;

        if(contractAddress)
            requestUrl += `/${contractAddress}`;

        if(eventName)
            requestUrl += `/${eventName}`;

        if(blockNumber)
            requestUrl += `/${blockNum}`;

        if(transactionID)
            requestUrl = `${this.infuraUrl}/event/transaction/${transactionID}`;

        return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(requestUrl);
    }

    contract(abiArray) {
        let _this = this;

        return {
            abi: abiArray,
            at: async function(address) {
                if (!address)
                    return {};
                    
                const {
                    contract_address, 
                    origin_address
                } = await _this.getContract(address);

                const abiObj = __WEBPACK_IMPORTED_MODULE_2__private__["a" /* parseAbi */].call(_this, abiArray, {
                    owner_address: _this.defaultAccount,
                    contract_address                        
                });

                return Object.assign({ address: contract_address},abiObj);
            },
            new: async function(options, pk) {
                const bytecode = options.data;
                const owner_address = options.from || _this.defaultAccount;
                const fee_limit = options.fee_limit;
                const call_value = options.call_value;
                const consume_user_resource_percent = options.consume_user_resource_percent;
                const abi =JSON.stringify(abiArray);
                const res = await _this.deployContract(abi,bytecode,fee_limit,owner_address,call_value,consume_user_resource_percent);
                if(res) {
                    const returnRes = { 
                        transactionHash: res.txID, 
                        address: res.contract_address 
                    };

                    if(Object.keys(res).indexOf('txID')>-1) {
                        const signTransaction = await _this.signTransaction(res, pk);
                        const result = await _this.sendRawTransaction(signTransaction);

                        if(result)
                            returnRes.broadCast = true;
                    }

                    return Object.assign(await this.at(returnRes.address),returnRes); 
                }
                return res;      
            }
        }
    }

    toBigNumber(str) {
        return Object(__WEBPACK_IMPORTED_MODULE_6_bignumber_js__["BigNumber"])(str);
    }

    // This is used for internal testing and is not approved for public use.
    // You can find the chrome extension here: https://github.com/1119756420/Treasure
    sendTransactionByWallet(options, callback) {
        let {to,amount,transaction} = options;
        if(document) {
            let oTronWallet = document.getElementById("oTronWallet");
            let oWalletTransationResult = document.getElementById('transaction_wallet_result');
            if (oTronWallet) {
                console.log('Chrome extension is installed!');
                var open_wallet = document.createEvent('Event');
                open_wallet.initEvent('open_wallet', true, true);
                oTronWallet.innerText=JSON.stringify({
                    to:to,
                    amount:amount||0,
                    data:transaction
                });
                oTronWallet.dispatchEvent(open_wallet);
                oWalletTransationResult.value = '';
                let timer = setInterval(async ()=>{
                    if(oWalletTransationResult.value) {
                        let walletResult = JSON.parse(oWalletTransationResult.value);
                        if(!walletResult.success) {
                            callback&&callback('Failed')
                        }else{
                            let transactionid = walletResult.transaction.txID;
                            let validResult = await this.getTransaction(transactionid);
                            if(Object.keys(validResult).length==0) {
                                callback&&callback('Failed')
                            }else{
                                callback&&callback('success')
                            }
                        }
                        clearInterval(timer);
                    }
                }, 500);
            }
            else {
                let returnWarn = 'Chrome extention is not installed yet...';
                console.log(returnWarn);
                return returnWarn;
            }
        }
    }

    /**
     * Freeze TRX, gain bandwidth, gain voting rights or energy
     * @param {string} owner_address,{float} frozen_balance,{int} frozen_duration,{string} resource
     * @return {object} transaction
     * */
    async freezeBalance(owner_address,frozen_balance,frozen_duration,resource='BANDWIDTH'){
        owner_address = Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(owner_address);
        let {data} = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/freezebalance`,{
            owner_address,
            frozen_balance,
            frozen_duration,
            resource
        })
        return data;
    }

    trxToSun(trxCount) {
        return Math.abs(trxCount) * Math.pow(10, 6);
    }

    sunToTrx(sunCount) {
        return Math.abs(sunCount) / Math.pow(10, 6);
    }

}
/* harmony default export */ __webpack_exports__["a"] = (TronWeb);




/***/ }),

/***/ "../src/lib/base58.js":
/***/ (function(module, exports) {

var ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
var ALPHABET_MAP = {}
for(var i = 0; i < ALPHABET.length; i++) {
  ALPHABET_MAP[ALPHABET.charAt(i)] = i
}
var BASE = 58;

/**
 *
 * @param buffer
 * @returns {string}
 */
function encode58(buffer) {
  if (buffer.length === 0) return '';

  var i, j, digits = [0];
  for (i = 0; i < buffer.length; i++) {
    for (j = 0; j < digits.length; j++) digits[j] <<= 8

    digits[0] += buffer[i];

    var carry = 0;
    for (j = 0; j < digits.length; ++j) {
      digits[j] += carry;

      carry = (digits[j] / BASE) | 0;
      digits[j] %= BASE
    }

    while (carry) {
      digits.push(carry % BASE);

      carry = (carry / BASE) | 0
    }
  }

  // deal with leading zeros
  for (i = 0; buffer[i] === 0 && i < buffer.length - 1; i++) digits.push(0)

  return digits.reverse().map(function(digit) { return ALPHABET[digit] }).join('');
}

/**
 * @param string
 * @returns number[]
 */
function decode58(string) {
  if (string.length === 0) return []

  var i, j, bytes = [0]
  for (i = 0; i < string.length; i++) {
    var c = string[i]
    if (!(c in ALPHABET_MAP)) throw new Error('Non-base58 character')

    for (j = 0; j < bytes.length; j++) bytes[j] *= BASE
    bytes[0] += ALPHABET_MAP[c]

    var carry = 0
    for (j = 0; j < bytes.length; ++j) {
      bytes[j] += carry

      carry = bytes[j] >> 8
      bytes[j] &= 0xff
    }

    while (carry) {
      bytes.push(carry & 0xff)

      carry >>= 8
    }
  }

  // deal with leading zeros
  for (i = 0; string[i] === '1' && i < string.length - 1; i++) {
    bytes.push(0)
  }

  return bytes.reverse();
}

module.exports = {
  encode58,
  decode58,
};


/***/ }),

/***/ "../src/lib/code.js":
/***/ (function(module, exports) {

/* eslint-disable */
function bin2String(array) {
  return String.fromCharCode.apply(String, array);
}

//比较两个byteArray是否相等
function arrayEquals(array1, array2) {
  if (array1.length != array2.length) {
    return false;
  }
  var i;
  for (i = 0; i < array1.length; i++) {
    if (array1[i] != array2[i]) {
      return false;
    }
  }
  return true;
}

//字符串转byteArray数据格式
function stringToBytes(str) {
  var bytes = new Array();
  var len, c;
  len = str.length;
  for (var i = 0; i < len; i++) {
    c = str.charCodeAt(i);
    if (c >= 0x010000 && c <= 0x10FFFF) {
      bytes.push(((c >> 18) & 0x07) | 0xF0);
      bytes.push(((c >> 12) & 0x3F) | 0x80);
      bytes.push(((c >> 6) & 0x3F) | 0x80);
      bytes.push((c & 0x3F) | 0x80);
    } else if (c >= 0x000800 && c <= 0x00FFFF) {
      bytes.push(((c >> 12) & 0x0F) | 0xE0);
      bytes.push(((c >> 6) & 0x3F) | 0x80);
      bytes.push((c & 0x3F) | 0x80);
    } else if (c >= 0x000080 && c <= 0x0007FF) {
      bytes.push(((c >> 6) & 0x1F) | 0xC0);
      bytes.push((c & 0x3F) | 0x80);
    } else {
      bytes.push(c & 0xFF);
    }
  }
  return bytes;

}

//byteArray数据格式转字符串
function bytesToString(arr) {
  if (typeof arr === 'string') {
    return arr;
  }
  var str = '',
      _arr = arr;
  for (var i = 0; i < _arr.length; i++) {
    var one = _arr[i].toString(2),
        v = one.match(/^1+?(?=0)/);
    if (v && one.length == 8) {
      var bytesLength = v[0].length;
      var store = _arr[i].toString(2).slice(7 - bytesLength);
      for (var st = 1; st < bytesLength; st++) {
        store += _arr[st + i].toString(2).slice(2);
      }
      str += String.fromCharCode(parseInt(store, 2));
      i += bytesLength - 1;
    } else {
      str += String.fromCharCode(_arr[i]);
    }
  }
  return str;
}

function hextoString(hex) {
  var arr = hex.split("")
  var out = ""
  for (var i = 0; i < arr.length / 2; i++) {
    var tmp = "0x" + arr[i * 2] + arr[i * 2 + 1]
    var charValue = String.fromCharCode(tmp);
    out += charValue
  }
  return out
}

/* Convert a hex char to value */
function hexChar2byte(c) {
  var d = 0;
  if (c >= 'A' && c <= 'F') {
    d = c.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
  }
  else if (c >= 'a' && c <= 'f') {
    d = c.charCodeAt(0) - 'a'.charCodeAt(0) + 10;
  }
  else if (c >= '0' && c <= '9') {
    d = c.charCodeAt(0) - '0'.charCodeAt(0);
  }
  return d;
}

/* Check if a char is hex char */
function isHexChar(c) {
  if ((c >= 'A' && c <= 'F') ||
      (c >= 'a' && c <= 'f') ||
      (c >= '0' && c <= '9')) {
    return 1;
  }
  return 0;
}

/* Convert HEX string to byte array */

//16进制的ASCII字符串转为byteArray格式。
function hexStr2byteArray(str) {
  var byteArray = Array();
  var d = 0;
  var j = 0;
  var k = 0;

  for (let i = 0; i < str.length; i++) {
    var c = str.charAt(i);
    if (isHexChar(c)) {
      d <<= 4;
      d += hexChar2byte(c);
      j++;
      if (0 === (j % 2)) {
        byteArray[k++] = d;
        d = 0;
      }
    }
  }
  return byteArray;
}


/* Convert a byte to string */
function byte2hexStr(byte) {
  var hexByteMap = "0123456789ABCDEF";
  var str = "";
  str += hexByteMap.charAt(byte >> 4);
  str += hexByteMap.charAt(byte & 0x0f);
  return str;
}

/* Convert byte arry to HEX string */

//byteArray格式数据转为16进制的ASCII字符串。
function byteArray2hexStr(byteArray) {
  var str = "";
  for (var i = 0; i < (byteArray.length - 1); i++) {
    str += byte2hexStr(byteArray[i]);
  }
  str += byte2hexStr(byteArray[i]);
  return str;
}

//从base64字符串中解码出原文，格式为byteArray格式
function base64DecodeFromString(string64) {
  var b = new Base64();
  var decodeBytes = b.decodeToByteArray(string64);
  return decodeBytes;
}

//return baset64 String
//将byteArray格式数据编码为base64字符串
function base64EncodeToString(bytes) {
  // var string = bytesToString(bytes);
  var b = new Base64();
  var string64 = b.encodeIgnoreUtf8(bytes);
  return string64
}

function Base64() {

  // private property
  let _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

  // public method for encoding
  this.encode = function (input) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
//    input = _utf8_encode(input);
    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output = output +
          _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
          _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
    }
    return output;
  }

  // public method for encoding
  this.encodeIgnoreUtf8 = function (inputBytes) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
//    input = _utf8_encode(input);
    while (i < inputBytes.length) {
      chr1 = inputBytes[i++];
      chr2 = inputBytes[i++];
      chr3 = inputBytes[i++];
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output = output +
          _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
          _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
    }
    return output;
  }

  // public method for decoding
  this.decode = function (input) {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (i < input.length) {
      enc1 = _keyStr.indexOf(input.charAt(i++));
      enc2 = _keyStr.indexOf(input.charAt(i++));
      enc3 = _keyStr.indexOf(input.charAt(i++));
      enc4 = _keyStr.indexOf(input.charAt(i++));
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
      output = output + String.fromCharCode(chr1);
      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }
    }
    output = this._utf8_decode(output);
    return output;
  }

  // public method for decoding
  this.decodeToByteArray = function (input) {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (i < input.length) {
      enc1 = _keyStr.indexOf(input.charAt(i++));
      enc2 = _keyStr.indexOf(input.charAt(i++));
      enc3 = _keyStr.indexOf(input.charAt(i++));
      enc4 = _keyStr.indexOf(input.charAt(i++));
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
      output = output + String.fromCharCode(chr1);
      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }
    }
    var outBytes = this._out2ByteArray(output);
    return outBytes;
  };

  // private method for UTF-8 decoding
  this._out2ByteArray = function (utftext) {
    let byteArray = new Array(utftext.length)
    let i = 0;
    let c = 0;
    let c1 = 0;
    let c2 = 0;
    while (i < utftext.length) {
      c = utftext.charCodeAt(i);
      byteArray[i] = c;
      i++;
    }
    return byteArray;
  };

  // private method for UTF-8 encoding
  this._utf8_encode = function (string) {
    string = string.replace(/\r\n/g, "\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }

    }
    return utftext;
  }

  // private method for UTF-8 decoding
  this._utf8_decode = function (utftext) {
    var string = "";
    var i = 0;
    var c = c1 = c2 = 0;
    while (i < utftext.length) {
      c = utftext.charCodeAt(i);
      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      } else if ((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt(i + 1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      } else {
        c2 = utftext.charCodeAt(i + 1);
        c3 = utftext.charCodeAt(i + 2);
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3
            & 63));
        i += 3;
      }
    }
    return string;
  }
}

//yyyy-MM-DD HH-mm-ss
function strToDate(str) {
  var tempStrs = str.split(" ");
  var dateStrs = tempStrs[0].split("-");
  var year = parseInt(dateStrs[0], 10);
  var month = parseInt(dateStrs[1], 10) - 1;
  var day = parseInt(dateStrs[2], 10);
  if (tempStrs.length > 1) {
    var timeStrs = tempStrs[1].split("-");
    var hour = parseInt(timeStrs [0], 10);
    var minute = parseInt(timeStrs[1], 10) - 1;
    var second = parseInt(timeStrs[2], 10);
    return new Date(year, month, day, hour, minute, second);
  }

  return new Date(year, month, day);
}

function isNumber(c) {
  if (c >= '0' && c <= '9') {
    return 1;
  }
  return 0;
}

//return 1: address  --- 20Bytes HexString
//return 2: blockNumber ------ Decimal number
//return 3: assetName ------ String
//return other: error
function getStringType(str) {
  if (null == str) {
    return -1;
  }

  if (typeof(str) != 'string') {
    return -1;
  }

  if (str.length == 0 || str == "") {
    return -1;
  }

  var i = 0;
  if (str.length == 40) {
    for (; i < 40; i++) {
      var c = str.charAt(i);
      if (!isHexChar(c)) {
        break;
      }
    }
  }
  if (i == 40) {
    return 1;  //40 Hex, Address
  }

  for (i = 0; i < str.length; i++) {
    var c = str.charAt(i);
    if (!isNumber(c)) {
      break;
    }
  }
  if (i == str.length) {
    return 2;  //Alll Decimal number, BlockNumber
  }

  for (i = 0; i < str.length; i++) {
    var c = str.charAt(i);
    if (c > ' ') {
      return 3;   //At least one visible character
    }
  }

  return -1;
}

module.exports = {
  base64EncodeToString,
  base64DecodeFromString,
  hexStr2byteArray,
  stringToBytes
};


/***/ }),

/***/ "../src/lib/sha256.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;/*
 A JavaScript implementation of the SHA family of hashes, as
 defined in FIPS PUB 180-4 and FIPS PUB 202, as well as the corresponding
 HMAC implementation as defined in FIPS PUB 198a

 Copyright Brian Turek 2008-2017
 Distributed under the BSD License
 See http://caligatio.github.com/jsSHA/ for more information

 Several functions taken from Paul Johnston
*/

(function (I) {
  function w(c, a, d) {
    var l = 0, b = [], g = 0, f, n, k, e, h, q, y, p, m = !1, t = [], r = [], u,
        z = !1;
    d = d || {};
    f = d.encoding || "UTF8";
    u = d.numRounds || 1;
    if (u !== parseInt(u, 10) || 1 > u) {
      throw Error(
          "numRounds must a integer >= 1");
    }
    if (0 === c.lastIndexOf("SHA-", 0)) {
      if (q = function (b, a) {
            return A(b, a, c)
          }, y = function (b, a, l, f) {
            var g, e;
            if ("SHA-224" === c || "SHA-256" === c) {
              g = (a + 65 >>> 9 << 4)
                  + 15, e = 16;
            } else {
              throw Error(
                  "Unexpected error in SHA-2 implementation");
            }
            for (; b.length <= g;) {
              b.push(0);
            }
            b[a >>> 5] |= 128 << 24 - a % 32;
            a = a + l;
            b[g] = a & 4294967295;
            b[g - 1] = a / 4294967296 | 0;
            l = b.length;
            for (a = 0; a < l; a += e) {
              f = A(b.slice(a, a + e), f, c);
            }
            if ("SHA-224" === c) {
              b = [f[0], f[1], f[2], f[3], f[4], f[5],
                f[6]];
            } else if ("SHA-256" === c) {
              b = f;
            } else {
              throw Error(
                  "Unexpected error in SHA-2 implementation");
            }
            return b
          }, p = function (b) {
            return b.slice()
          }, "SHA-224" === c) {
        h = 512, e = 224;
      } else if ("SHA-256"
          === c) {
        h = 512, e = 256;
      } else {
        throw Error(
            "Chosen SHA variant is not supported");
      }
    } else {
      throw Error(
          "Chosen SHA variant is not supported");
    }
    k = B(a, f);
    n = x(c);
    this.setHMACKey = function (b, a, g) {
      var e;
      if (!0 === m) {
        throw Error("HMAC key already set");
      }
      if (!0 === z) {
        throw Error("Cannot set HMAC key after calling update");
      }
      f = (g || {}).encoding || "UTF8";
      a = B(a, f)(b);
      b = a.binLen;
      a = a.value;
      e = h >>> 3;
      g = e / 4 - 1;
      if (e < b / 8) {
        for (a = y(a, b, 0, x(c)); a.length <= g;) {
          a.push(0);
        }
        a[g] &= 4294967040
      } else if (e > b / 8) {
        for (; a.length <= g;) {
          a.push(0);
        }
        a[g] &= 4294967040
      }
      for (b = 0; b <= g; b += 1) {
        t[b] = a[b] ^ 909522486, r[b] = a[b]
            ^ 1549556828;
      }
      n = q(t, n);
      l = h;
      m = !0
    };
    this.update = function (a) {
      var c, f, e, d = 0, p = h >>> 5;
      c = k(a, b, g);
      a = c.binLen;
      f = c.value;
      c = a >>> 5;
      for (e = 0; e < c; e += p) {
        d + h <= a && (n = q(f.slice(e, e + p),
            n), d += h);
      }
      l += d;
      b = f.slice(d >>>
          5);
      g = a % h;
      z = !0
    };
    this.getHash = function (a, f) {
      var d, h, k, q;
      if (!0 === m) {
        throw Error("Cannot call getHash after setting HMAC key");
      }
      k = C(f);
      switch (a) {
        case "HEX":
          d = function (a) {
            return D(a, e, k)
          };
          break;
        case "B64":
          d = function (a) {
            return E(a, e, k)
          };
          break;
        case "BYTES":
          d = function (a) {
            return F(a, e)
          };
          break;
        case "ARRAYBUFFER":
          try {
            h = new ArrayBuffer(0)
          } catch (v) {
            throw Error("ARRAYBUFFER not supported by this environment");
          }
          d = function (a) {
            return G(a, e)
          };
          break;
        default:
          throw Error("format must be HEX, B64, BYTES, or ARRAYBUFFER");
      }
      q = y(b.slice(), g, l, p(n));
      for (h = 1; h < u; h += 1) {
        q = y(q, e, 0, x(c));
      }
      return d(q)
    };
    this.getHMAC = function (a, f) {
      var d, k, t, u;
      if (!1 === m) {
        throw Error(
            "Cannot call getHMAC without first setting HMAC key");
      }
      t = C(f);
      switch (a) {
        case "HEX":
          d = function (a) {
            return D(a, e, t)
          };
          break;
        case "B64":
          d = function (a) {
            return E(a, e, t)
          };
          break;
        case "BYTES":
          d = function (a) {
            return F(a, e)
          };
          break;
        case "ARRAYBUFFER":
          try {
            d = new ArrayBuffer(0)
          } catch (v) {
            throw Error("ARRAYBUFFER not supported by this environment");
          }
          d = function (a) {
            return G(a, e)
          };
          break;
        default:
          throw Error("outputFormat must be HEX, B64, BYTES, or ARRAYBUFFER");
      }
      k = y(b.slice(), g, l, p(n));
      u = q(r, x(c));
      u = y(k, e, h, u);
      return d(u)
    }
  }

  function m() {
  }

  function D(c, a, d) {
    var l = "";
    a /= 8;
    var b, g;
    for (b = 0; b < a; b += 1) {
      g = c[b >>> 2] >>> 8 * (3 + b % 4
          * -1), l += "0123456789abcdef".charAt(g >>> 4 & 15)
          + "0123456789abcdef".charAt(g & 15);
    }
    return d.outputUpper ? l.toUpperCase() : l
  }

  function E(c, a, d) {
    var l = "", b = a / 8, g, f, n;
    for (g = 0; g < b; g += 3) {
      for (f = g + 1 < b ? c[g + 1 >>> 2] : 0, n = g
      + 2 < b ? c[g + 2 >>> 2] : 0, n = (c[g >>> 2] >>> 8 * (3 + g % 4 * -1)
          & 255) << 16 | (f >>> 8 * (3 + (g + 1) % 4 * -1) & 255) << 8 | n >>> 8
          * (3 + (g + 2) % 4 * -1) & 255, f = 0; 4 > f; f += 1) {
        8 * g + 6 * f <= a
            ? l += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(n
            >>>
            6 * (3 - f) & 63) : l += d.b64Pad;
      }
    }
    return l
  }

  function F(c, a) {
    var d = "", l = a / 8, b, g;
    for (b = 0; b < l; b += 1) {
      g = c[b >>> 2] >>> 8 * (3 + b % 4 * -1)
          & 255, d += String.fromCharCode(g);
    }
    return d
  }

  function G(c, a) {
    var d = a / 8, l, b = new ArrayBuffer(d), g;
    g = new Uint8Array(b);
    for (l = 0; l < d; l += 1) {
      g[l] = c[l >>> 2] >>> 8 * (3 + l % 4 * -1) & 255;
    }
    return b
  }

  function C(c) {
    var a = {outputUpper: !1, b64Pad: "=", shakeLen: -1};
    c = c || {};
    a.outputUpper = c.outputUpper || !1;
    !0 === c.hasOwnProperty("b64Pad") && (a.b64Pad = c.b64Pad);
    if ("boolean" !== typeof a.outputUpper) {
      throw Error(
          "Invalid outputUpper formatting option");
    }
    if ("string" !== typeof a.b64Pad) {
      throw Error(
          "Invalid b64Pad formatting option");
    }
    return a
  }

  function B(c, a) {
    var d;
    switch (a) {
      case "UTF8":
      case "UTF16BE":
      case "UTF16LE":
        break;
      default:
        throw Error("encoding must be UTF8, UTF16BE, or UTF16LE");
    }
    switch (c) {
      case "HEX":
        d = function (a, b, c) {
          var f = a.length, d, k, e, h, q;
          if (0 !== f % 2) {
            throw Error(
                "String of HEX type must be in byte increments");
          }
          b = b || [0];
          c = c || 0;
          q = c >>> 3;
          for (d = 0; d < f; d += 2) {
            k = parseInt(a.substr(d, 2), 16);
            if (isNaN(k)) {
              throw Error(
                  "String of HEX type contains invalid characters");
            }
            h = (d >>> 1) + q;
            for (e = h >>> 2; b.length <= e;) {
              b.push(0);
            }
            b[e] |= k << 8 * (3 + h % 4 * -1)
          }
          return {value: b, binLen: 4 * f + c}
        };
        break;
      case "TEXT":
        d = function (c, b, d) {
          var f, n, k = 0, e, h, q, m, p, r;
          b = b || [0];
          d = d || 0;
          q = d >>> 3;
          if ("UTF8" === a) {
            for (r = 3, e = 0; e < c.length;
                e += 1) {
              for (f = c.charCodeAt(e), n = [], 128 > f ? n.push(f)
                  : 2048 > f ? (n.push(192 | f >>> 6), n.push(128 | f & 63))
                      : 55296 > f || 57344 <= f ? n.push(224 | f >>> 12, 128 | f
                          >>> 6 & 63, 128 | f & 63) : (e += 1, f = 65536 + ((f
                          & 1023) << 10 | c.charCodeAt(e) & 1023), n.push(240
                          | f
                          >>> 18, 128 | f >>> 12 & 63, 128 | f >>> 6 & 63, 128
                          | f
                          & 63)), h = 0; h < n.length; h += 1) {
                p = k +
                    q;
                for (m = p >>> 2; b.length <= m;) {
                  b.push(0);
                }
                b[m] |= n[h] << 8 * (r + p % 4 * -1);
                k += 1
              }
            }
          } else if ("UTF16BE" === a || "UTF16LE"
              === a) {
            for (r = 2, n = "UTF16LE" === a && !0 || "UTF16LE" !== a
                && !1, e = 0; e < c.length; e += 1) {
              f = c.charCodeAt(e);
              !0 === n && (h = f & 255, f = h << 8 | f >>> 8);
              p = k + q;
              for (m = p >>> 2; b.length <= m;) {
                b.push(0);
              }
              b[m] |= f << 8 * (r + p % 4 * -1);
              k += 2
            }
          }
          return {value: b, binLen: 8 * k + d}
        };
        break;
      case "B64":
        d = function (a, b, c) {
          var f = 0, d, k, e, h, q, m, p;
          if (-1 === a.search(/^[a-zA-Z0-9=+\/]+$/)) {
            throw Error(
                "Invalid character in base-64 string");
          }
          k = a.indexOf("=");
          a = a.replace(/\=/g,
              "");
          if (-1 !== k && k < a.length) {
            throw Error(
                "Invalid '=' found in base-64 string");
          }
          b = b || [0];
          c = c || 0;
          m = c >>> 3;
          for (k = 0; k < a.length; k += 4) {
            q = a.substr(k, 4);
            for (e = h = 0; e < q.length;
                e += 1) {
              d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(
                  q[e]), h |= d << 18 - 6 * e;
            }
            for (e = 0; e < q.length - 1; e += 1) {
              p = f + m;
              for (d = p >>> 2; b.length <= d;) {
                b.push(0);
              }
              b[d] |= (h >>> 16 - 8 * e & 255) << 8 * (3 + p % 4 * -1);
              f += 1
            }
          }
          return {value: b, binLen: 8 * f + c}
        };
        break;
      case "BYTES":
        d = function (a, b, c) {
          var d, n, k, e, h;
          b = b || [0];
          c = c || 0;
          k = c >>> 3;
          for (n = 0; n < a.length; n +=
              1) {
            d = a.charCodeAt(n), h = n + k, e = h >>> 2, b.length <= e
            && b.push(0), b[e] |= d << 8 * (3 + h % 4 * -1);
          }
          return {value: b, binLen: 8 * a.length + c}
        };
        break;
      case "ARRAYBUFFER":
        try {
          d = new ArrayBuffer(0)
        } catch (l) {
          throw Error("ARRAYBUFFER not supported by this environment");
        }
        d = function (a, b, c) {
          var d, n, k, e, h;
          b = b || [0];
          c = c || 0;
          n = c >>> 3;
          h = new Uint8Array(a);
          for (d = 0; d < a.byteLength; d += 1) {
            e = d + n, k = e >>> 2, b.length
            <= k && b.push(0), b[k] |= h[d] << 8 * (3 + e % 4 * -1);
          }
          return {value: b, binLen: 8 * a.byteLength + c}
        };
        break;
      default:
        throw Error("format must be HEX, TEXT, B64, BYTES, or ARRAYBUFFER");
    }
    return d
  }

  function r(c, a) {
    return c >>> a | c << 32 - a
  }

  function J(c, a, d) {
    return c & a ^ ~c & d
  }

  function K(c, a, d) {
    return c & a ^ c & d ^ a & d
  }

  function L(c) {
    return r(c, 2) ^ r(c, 13) ^ r(c, 22)
  }

  function M(c) {
    return r(c, 6) ^ r(c, 11) ^ r(c, 25)
  }

  function N(c) {
    return r(c, 7) ^ r(c, 18) ^ c >>> 3
  }

  function O(c) {
    return r(c, 17) ^ r(c, 19) ^ c >>> 10
  }

  function P(c, a) {
    var d = (c & 65535) + (a & 65535);
    return ((c >>> 16) + (a >>> 16) + (d >>> 16) & 65535) << 16 | d & 65535
  }

  function Q(c, a, d, l) {
    var b = (c & 65535) + (a & 65535) + (d & 65535) + (l & 65535);
    return ((c >>> 16) + (a >>> 16) + (d >>> 16) + (l >>> 16) + (b >>>
        16) & 65535) << 16 | b & 65535
  }

  function R(c, a, d, l, b) {
    var g = (c & 65535) + (a & 65535) + (d & 65535) + (l & 65535) + (b & 65535);
    return ((c >>> 16) + (a >>> 16) + (d >>> 16) + (l >>> 16) + (b >>> 16) + (g
        >>> 16) & 65535) << 16 | g & 65535
  }

  function x(c) {
    var a = [], d;
    if (0 === c.lastIndexOf("SHA-", 0)) {
      switch (a = [3238371032, 914150663,
        812702999, 4144912697, 4290775857, 1750603025, 1694076839,
        3204075428], d = [1779033703, 3144134277, 1013904242, 2773480762,
        1359893119, 2600822924, 528734635, 1541459225], c) {
        case "SHA-224":
          break;
        case "SHA-256":
          a = d;
          break;
        case "SHA-384":
          a = [new m, new m,
            new m, new m, new m, new m, new m, new m];
          break;
        case "SHA-512":
          a = [new m, new m, new m, new m, new m, new m, new m, new m];
          break;
        default:
          throw Error("Unknown SHA variant");
      }
    } else {
      throw Error("No SHA variants supported");
    }
    return a
  }

  function A(c, a, d) {
    var l, b, g, f, n, k, e, h, m, r, p, w, t, x, u, z, A, B, C, D, E, F,
        v = [], G;
    if ("SHA-224" === d || "SHA-256"
        === d) {
      r = 64, w = 1, F = Number, t = P, x = Q, u = R, z = N, A = O, B = L, C = M, E = K, D = J, G = H;
    } else {
      throw Error(
          "Unexpected error in SHA-2 implementation");
    }
    d = a[0];
    l = a[1];
    b = a[2];
    g = a[3];
    f = a[4];
    n = a[5];
    k = a[6];
    e = a[7];
    for (p =
        0; p < r; p += 1) {
      16 > p ? (m = p * w, h = c.length <= m ? 0
          : c[m], m = c.length <= m + 1 ? 0 : c[m + 1], v[p] = new F(h, m))
          : v[p] = x(A(v[p - 2]), v[p - 7], z(v[p - 15]), v[p - 16]), h = u(e,
          C(f), D(f, n, k), G[p], v[p]), m = t(B(d),
          E(d, l, b)), e = k, k = n, n = f, f = t(g,
          h), g = b, b = l, l = d, d = t(h, m);
    }
    a[0] = t(d, a[0]);
    a[1] = t(l, a[1]);
    a[2] = t(b, a[2]);
    a[3] = t(g, a[3]);
    a[4] = t(f, a[4]);
    a[5] = t(n, a[5]);
    a[6] = t(k, a[6]);
    a[7] = t(e, a[7]);
    return a
  }

  var H;
  H = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993,
    2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987,
    1925078388, 2162078206,
    2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628,
    770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349,
    2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895,
    666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051,
    2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771,
    3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616,
    659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779,
    1955562222, 2024104815, 2227730452, 2361852424, 2428436474,
    2756734187, 3204031479, 3329325298];
   true ? !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
    return w
  }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "undefined" !== typeof exports ? ("undefined" !== typeof module
  && module.exports && (module.exports = w), exports = w) : I.jsSHA = w
})(this);


/***/ }),

/***/ "../src/private.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = parseAbi;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_crypto__ = __webpack_require__("../src/utils/crypto.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_crypto___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utils_crypto__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ethers__ = __webpack_require__("ethers");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ethers___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ethers__);


async function timeInterval(eventName,ms,fn) {
    let timerName = eventName+'_timer';
    return await new Promise((resolve) => {
        window[timerName] =setInterval(()=>{
           fn.then((result)=>{
               resolve(result);
           })
        }, ms);
    });
}
function parseAbi(abiArray,{owner_address,contract_address}){
    try{
        let _this = this;
        let returnObj = {};
        returnObj.abi = abiArray;
        abiArray.forEach((item)=>{
            if(item.type =='function') {
                returnObj[item.name] = async function () {
                    let arrInputs = item.inputs;
                    let arrOutputs = item.outputs;
                    let params = [];
                    let paramInputTypes = [];
                    let paramInputValues = [];
                    let paramOutputTypes = [];
                    let function_selector = item.name;
                    let otherParams = {};
                    arrInputs.forEach((itemInput) => {
                        paramInputTypes.push(itemInput.type);
                    })
                    arrOutputs.forEach((itemOutput) => {
                        paramOutputTypes.push(itemOutput.type);
                    })
                    function_selector += `(${paramInputTypes.join(',')})`;
                    if(paramInputTypes.length>0){
                        params.push(paramInputTypes, paramInputValues);
                    }
                    for (let i = 0; i < arguments.length; i++) {
                        if (typeof arguments[i] == 'object') {
                            otherParams = arguments[i];
                        } else {
                            paramInputValues.push(arguments[i])
                        }
                    }
                    let triggerCallBackParams = {
                        owner_address,
                        contract_address,
                        function_selector,
                        parameter: params,
                        fee_limit: otherParams.fee_limit,
                        call_value: otherParams.call_value,
                    }
                    if(otherParams.fee_limit>100000000 || otherParams.fee_limit<0){
                        throw new Error("fee_limit should be set between 0 and 1000000000");
                    }
                    let res = await _this.triggerSmartContract(contract_address,function_selector,otherParams.call_value,otherParams.fee_limit,owner_address,params);
                    if (res.constant_result) {
                        let coder = new __WEBPACK_IMPORTED_MODULE_1_ethers__["utils"].AbiCoder();
                        if (res.constant_result.length) {
                            //let value = res.constant_result[0];
                            let constantArr = res.constant_result.map((item) => {
                                return ('0x' + item);
                            })
                            res.constant_result = coder.decode(paramOutputTypes, constantArr[0]);
                        }
                    }
                    return res;

                }
                returnObj[item.name].sendTransaction = async function (transaction, pk) {
                    const sign_Transaction = await Object(__WEBPACK_IMPORTED_MODULE_0__utils_crypto__["signTransaction"])(pk, transaction)
                    const sendResult = await _this.sendRawTransaction(sign_Transaction);
                    return sendResult;
                }
            }
            if(item.type =='event'){
                returnObj[item.name] =  function({contractAddress = contract_address,eventName,blockNum,transactionId}={}) {
                    contractAddress = _this.fromHex(contractAddress);
                    let _self = this;
                    return {
                        async fn(){
                            let {data} =await  _this.getEventResult(
                                contractAddress,
                                eventName,
                                blockNum,
                                transactionId
                            )
                            return data;
                        },
                        watch(callback){
                             this.fn().then((data)=>{
                                 callback('',data)
                             }).catch((e)=>{
                                 callback(e.toString())
                             })
                             _self.timer =setInterval(()=>{
                                 this.fn().then((data)=>{
                                     callback('',data)
                                 }).catch((e)=>{
                                     callback(e.toString())
                                 })
                             }, 3000);

                        },
                        async get(callback){
                            this.fn().then((data)=>{
                                callback('',data)
                            }).catch((e)=>{
                                callback(e.toString())
                            })
                        },
                        stopWatching(){
                             clearInterval(_self.timer)
                        }
                    }
                }
            }
        })
        return returnObj;
    }catch(err){
        console.error(err);
        return false;
    }
    
}

/***/ }),

/***/ "../src/utils/account.js":
/***/ (function(module, exports, __webpack_require__) {

const byteArray2hexStr = __webpack_require__("../src/utils/bytes.js").byteArray2hexStr;
const base64EncodeToString = __webpack_require__("../src/lib/code.js").base64EncodeToString;
const {getBase58CheckAddress, genPriKey, getAddressFromPriKey} = __webpack_require__("../src/utils/crypto.js");

/**
 * Generate a new account
 */
function generateAccount() {
  let priKeyBytes = genPriKey();
  let addressBytes = getAddressFromPriKey(priKeyBytes);
  let address = getBase58CheckAddress(addressBytes);
  let password = base64EncodeToString(priKeyBytes);
  let privateKey = byteArray2hexStr(priKeyBytes);

  return {
    privateKey,
    address,
    password,
  }
}

module.exports = {
  generateAccount,
};


/***/ }),

/***/ "../src/utils/address.js":
/***/ (function(module, exports) {

let isTestNet = process.env.NET === 'testnet';

const ADDRESS_SIZE = isTestNet ? 35 : 34;
const ADDRESS_PREFIX = isTestNet ? "a0" : "41";
const ADDRESS_PREFIX_BYTE = isTestNet ? 0xa0 : 0x41;

module.exports = {
  ADDRESS_SIZE,
  ADDRESS_PREFIX,
  ADDRESS_PREFIX_BYTE,
};


/***/ }),

/***/ "../src/utils/base64.js":
/***/ (function(module, exports) {


exports.Base64 = function() {

  // private property
  _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

  // public method for encoding
  this.encode = function (input) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
//    input = _utf8_encode(input);
    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output = output +
        _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
        _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
    }
    return output;
  }

  // public method for encoding
  this.encodeIgnoreUtf8 = function (inputBytes) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
//    input = _utf8_encode(input);
    while (i < inputBytes.length) {
      chr1 = inputBytes[i++];
      chr2 = inputBytes[i++];
      chr3 = inputBytes[i++];
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output = output +
        _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
        _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
    }
    return output;
  }

  // public method for decoding
  this.decode = function (input) {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (i < input.length) {
      enc1 = _keyStr.indexOf(input.charAt(i++));
      enc2 = _keyStr.indexOf(input.charAt(i++));
      enc3 = _keyStr.indexOf(input.charAt(i++));
      enc4 = _keyStr.indexOf(input.charAt(i++));
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
      output = output + String.fromCharCode(chr1);
      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }
    }
    output = _utf8_decode(output);
    return output;
  }

  // public method for decoding
  this.decodeToByteArray = function (input) {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (i < input.length) {
      enc1 = _keyStr.indexOf(input.charAt(i++));
      enc2 = _keyStr.indexOf(input.charAt(i++));
      enc3 = _keyStr.indexOf(input.charAt(i++));
      enc4 = _keyStr.indexOf(input.charAt(i++));
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
      output = output + String.fromCharCode(chr1);
      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }
    }
    var outBytes = _out2ByteArray(output);
    return outBytes;
  }

  // private method for UTF-8 decoding
  _out2ByteArray = function (utftext) {
    var byteArray = new Array(utftext.length)
    var i = 0;
    var c = c1 = c2 = 0;
    while (i < utftext.length) {
      c = utftext.charCodeAt(i);
      byteArray[i] = c;
      i++;
    }
    return byteArray;
  }

  // private method for UTF-8 encoding
  _utf8_encode = function (string) {
    string = string.replace(/\r\n/g, "\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }

    }
    return utftext;
  }

  // private method for UTF-8 decoding
  _utf8_decode = function (utftext) {
    var string = "";
    var i = 0;
    var c = c1 = c2 = 0;
    while (i < utftext.length) {
      c = utftext.charCodeAt(i);
      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      } else if ((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt(i + 1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      } else {
        c2 = utftext.charCodeAt(i + 1);
        c3 = utftext.charCodeAt(i + 2);
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3
          & 63));
        i += 3;
      }
    }
    return string;
  }
}


/***/ }),

/***/ "../src/utils/bytes.js":
/***/ (function(module, exports, __webpack_require__) {

const {Base64} = __webpack_require__("../src/utils/base64.js");


/* Convert a byte to string */
function byte2hexStr(byte) {
  var hexByteMap = "0123456789ABCDEF";
  var str = "";
  str += hexByteMap.charAt(byte >> 4);
  str += hexByteMap.charAt(byte & 0x0f);
  return str;
}

/**
 * Converts a byte array to string
 *
 * @param {Uint8Array} arr byte array
 * @returns {string}
 */
function bytesToString(arr) {
  if (typeof arr === 'string') {
    return arr;
  }
  let str = '',
    _arr = arr;
  for (let i = 0; i < _arr.length; i++) {
    let one = _arr[i].toString(2), v = one.match(/^1+?(?=0)/);
    if (v && one.length === 8) {
      let bytesLength = v[0].length;
      let store = _arr[i].toString(2).slice(7 - bytesLength);
      for (let st = 1; st < bytesLength; st++) {
        store += _arr[st + i].toString(2).slice(2);
      }
      str += String.fromCharCode(parseInt(store, 2));
      i += bytesLength - 1;
    } else {
      str += String.fromCharCode(_arr[i]);
    }
  }
  return str;
}

/**
 * Converts a hex string to a decoded string
 *
 * @param {string} hex
 * @returns {string}
 */
function hextoString(hex) {
  let arr = hex.split("");
  let out = "";
  for (let i = 0; i < arr.length / 2; i++) {
    let tmp = "0x" + arr[i * 2] + arr[i * 2 + 1];
    out += String.fromCharCode(tmp);
  }
  return out;
}

function base64DecodeFromString(string64) {
  return new Base64().decodeToByteArray(string64);
}


function byteArray2hexStr(byteArray) {
  let str = "";
  for (let i = 0; i < (byteArray.length); i++) {
    str += byte2hexStr(byteArray[i]);
  }
  return str;
}


module.exports = {
  byteArray2hexStr,
  hextoString,
  base64DecodeFromString,
  bytesToString,
  byte2hexStr
};


/***/ }),

/***/ "../src/utils/crypto.js":
/***/ (function(module, exports, __webpack_require__) {

const {ADDRESS_PREFIX, ADDRESS_PREFIX_BYTE} = __webpack_require__("../src/utils/address.js");
const base64EncodeToString = __webpack_require__("../src/lib/code.js").base64EncodeToString;
const {base64DecodeFromString, hexStr2byteArray} = __webpack_require__("../src/lib/code.js");
const {encode58, decode58} = __webpack_require__("../src/lib/base58.js");
const EC = __webpack_require__("elliptic").ec;
const { keccak256 } = __webpack_require__("js-sha3");
const jsSHA = __webpack_require__("../src/lib/sha256.js");
const ADDRESS_SIZE = __webpack_require__("../src/utils/address.js").ADDRESS_SIZE;
const { byte2hexStr, byteArray2hexStr } = __webpack_require__("../src/utils/bytes.js");


//return address by Base58Check String,
function getBase58CheckAddress(addressBytes) {
  var hash0 = SHA256(addressBytes);
  var hash1 = SHA256(hash0);
  var checkSum = hash1.slice(0, 4);
  checkSum = addressBytes.concat(checkSum);
  return encode58(checkSum);
}

function decodeBase58Address(base58Sting) {
    var zeroAddress = hexStr2byteArray(
        "000000000000000000000000000000000000000000");
    if (typeof (base58Sting) != 'string') {
        console.error("Input format error!");
        return;
    }
    if (base58Sting.length <= 4) {
        console.error("Input length error!");
        return;
    }
    var address = decode58(base58Sting);
    if (base58Sting.length <= 4) {
        console.error("Decode58 output length error!");
        return;
    }
    var len = address.length;
    var offset = len - 4;
    var checkSum = address.slice(offset);
    address = address.slice(0, offset);
    var hash0 = SHA256(address);
    var hash1 = SHA256(hash0);
    var checkSum1 = hash1.slice(0, 4);
    if (checkSum[0] == checkSum1[0] && checkSum[1] == checkSum1[1] && checkSum[2]
        == checkSum1[2] && checkSum[3] == checkSum1[3]
    ) {
        return address;
    }
    console.error("Check sum error!");
    return zeroAddress;
}
/**
 * Sign A Transaction by priKey.
 * signature is 65 bytes, r[32] || s[32] || id[1](<27)
 * @returns  a Transaction object signed
 * @param priKeyBytes: privateKey for ECC
 * @param transaction: a Transaction object unSigned
 */
/*function signTransaction(priKeyBytes, transaction) {

    if (typeof priKeyBytes === 'string') {
        priKeyBytes = hexStr2byteArray(priKeyBytes);
    }
    let raw = transaction.getRawData();
    let rawBytes = raw.serializeBinary();
    let hashBytes = SHA256(rawBytes);
    let signBytes = ECKeySign(hashBytes, priKeyBytes);
    let uint8Array = new Uint8Array(signBytes);
    let count = raw.getContractList().length;
    for (let i = 0; i < count; i++) {
        transaction.addSignature(uint8Array);
    }

    return {
        transaction,
        hex: byteArray2hexStr(transaction.serializeBinary()),
    };
}*/
function signTransaction(priKeyBytes, transaction) {

    if (typeof priKeyBytes === 'string') {
        priKeyBytes = hexStr2byteArray(priKeyBytes);
    }
    let txID = transaction.txID;
    let signature = ECKeySign(hexStr2byteArray(txID),priKeyBytes);

    transaction.signature=[signature];
    return transaction;
}


function arrayToBase64String(a) {
    return btoa(String.fromCharCode(...a));
}

function signBytes(privateKey, contents) {

    if (typeof privateKey === 'string') {
        privateKey = hexStr2byteArray(privateKey);
    }

    let hashBytes = SHA256(contents);
    let signBytes = ECKeySign(hashBytes, privateKey);

    return signBytes;
}

//return bytes of rowdata, use to sign.
function getRowBytesFromTransactionBase64(base64Data) {
    let bytesDecode = base64DecodeFromString(base64Data);
    let transaction = proto.protocol.Transaction.deserializeBinary(bytesDecode);
    let raw = transaction.getRawData();
    return raw.serializeBinary();
}

//gen Ecc priKey for bytes
function genPriKey() {
    let ec = new EC('secp256k1');
    let key = ec.genKeyPair();
    let priKey = key.getPrivate();
    let priKeyHex = priKey.toString('hex');
    while (priKeyHex.length < 64) {
        priKeyHex = "0" + priKeyHex;
    }

    return hexStr2byteArray(priKeyHex);
}

//return address by bytes, pubBytes is byte[]
function computeAddress(pubBytes) {
    if (pubBytes.length === 65) {
        pubBytes = pubBytes.slice(1);
    }

    var hash = keccak256(pubBytes).toString();
    var addressHex = hash.substring(24);
    addressHex = ADDRESS_PREFIX + addressHex;
    return hexStr2byteArray(addressHex);
}

//return address by bytes, priKeyBytes is byte[]
function getAddressFromPriKey(priKeyBytes) {
    let pubBytes = getPubKeyFromPriKey(priKeyBytes);
    return computeAddress(pubBytes);
}

//return address by Base58Check String,
function getBase58CheckAddress(addressBytes) {
    var hash0 = SHA256(addressBytes);
    var hash1 = SHA256(hash0);
    var checkSum = hash1.slice(0, 4);
    checkSum = addressBytes.concat(checkSum);
    return encode58(checkSum);
}

function decode58Check(addressStr) {

    var decodeCheck = decode58(addressStr);
    if (decodeCheck.length <= 4) {
        console.error("ERROR CHECK");
        return null;
    }

    var decodeData = decodeCheck.slice(0, decodeCheck.length - 4);
    var hash0 = SHA256(decodeData);
    var hash1 = SHA256(hash0);

    if (hash1[0] === decodeCheck[decodeData.length] &&
        hash1[1] === decodeCheck[decodeData.length + 1] &&
        hash1[2] === decodeCheck[decodeData.length + 2] &&
        hash1[3] === decodeCheck[decodeData.length + 3]) {
        return decodeData;
    }

    return null;
}

function isAddressValid(base58Str) {
    if (typeof(base58Str) !== 'string') {
        return false;
    }
    if (base58Str.length !== ADDRESS_SIZE) {
        return false;
    }
    var address = decode58(base58Str);

    if (address.length !== 25) {
        return false;
    }
    if (address[0] !== ADDRESS_PREFIX_BYTE) {
        return false;
    }
    var checkSum = address.slice(21);
    address = address.slice(0, 21);
    var hash0 = SHA256(address);
    var hash1 = SHA256(hash0);
    var checkSum1 = hash1.slice(0, 4);
    if (checkSum[0] == checkSum1[0] && checkSum[1] == checkSum1[1] && checkSum[2]
        == checkSum1[2] && checkSum[3] == checkSum1[3]
    ) {
        return true
    }
    return false;
}

//return address by Base58Check String, priKeyBytes is base64String
function getBase58CheckAddressFromPriKeyBase64String(priKeyBase64String) {
    var priKeyBytes = base64DecodeFromString(priKeyBase64String);
    var pubBytes = getPubKeyFromPriKey(priKeyBytes);
    var addressBytes = computeAddress(pubBytes);
    return getBase58CheckAddress(addressBytes);
}

//return address by String, priKeyBytes is base64String
function getHexStrAddressFromPriKeyBase64String(priKeyBase64String) {
    let priKeyBytes = base64DecodeFromString(priKeyBase64String);
    let pubBytes = getPubKeyFromPriKey(priKeyBytes);
    let addressBytes = computeAddress(pubBytes);
    let addressHex = byteArray2hexStr(addressBytes);
    return addressHex;
}
//return address by String, priKeyBytes is base64String
function getAddressFromPriKeyBase64String(priKeyBase64String) {
    let priKeyBytes = base64DecodeFromString(priKeyBase64String);
    let pubBytes = getPubKeyFromPriKey(priKeyBytes);
    let addressBytes = computeAddress(pubBytes);
    let addressBase64 = base64EncodeToString(addressBytes);
    return addressBase64;
}

//return pubkey by 65 bytes, priKeyBytes is byte[]
function getPubKeyFromPriKey(priKeyBytes) {
    var ec = new EC('secp256k1');
    var key = ec.keyFromPrivate(priKeyBytes, 'bytes');
    var pubkey = key.getPublic();
    var x = pubkey.x;
    var y = pubkey.y;
    var xHex = x.toString('hex');
    while (xHex.length < 64) {
        xHex = "0" + xHex;
    }
    var yHex = y.toString('hex');
    while (yHex.length < 64) {
        yHex = "0" + yHex;
    }
    var pubkeyHex = "04" + xHex + yHex;
    var pubkeyBytes = hexStr2byteArray(pubkeyHex);
    return pubkeyBytes;
}

//return sign by 65 bytes r s id. id < 27
function ECKeySign(hashBytes, priKeyBytes) {
    let ec = new EC('secp256k1');
    let key = ec.keyFromPrivate(priKeyBytes, 'bytes');
    let signature = key.sign(hashBytes);
    let r = signature.r;
    let s = signature.s;
    let id = signature.recoveryParam;

    let rHex = r.toString('hex');
    while (rHex.length < 64) {
        rHex = "0" + rHex;
    }
    let sHex = s.toString('hex');
    while (sHex.length < 64) {
        sHex = "0" + sHex;
    }
    let idHex = byte2hexStr(id);
    let signHex = rHex + sHex + idHex;
    return signHex;
    //return hexStr2byteArray(signHex);
}

//return 32 bytes
function SHA256(msgBytes) {
    let shaObj = new jsSHA("SHA-256", "HEX");
    let msgHex = byteArray2hexStr(msgBytes);
    shaObj.update(msgHex);
    let hashHex = shaObj.getHash("HEX");
    return hexStr2byteArray(hashHex);
}

function passwordToAddress(password) {
    let com_priKeyBytes = base64DecodeFromString(password);
    let com_addressBytes = getAddressFromPriKey(com_priKeyBytes);
    return getBase58CheckAddress(com_addressBytes);
}

function pkToAddress(privateKey) {
    let com_priKeyBytes = hexStr2byteArray(privateKey);
    let com_addressBytes = getAddressFromPriKey(com_priKeyBytes);
    return getBase58CheckAddress(com_addressBytes);
}





module.exports = {
    decodeBase58Address,
    byteArray2hexStr,
    signTransaction,
    passwordToAddress,
    genPriKey,
    getAddressFromPriKey,
    getPubKeyFromPriKey,
    getBase58CheckAddress,
    isAddressValid,
    getBase58CheckAddressFromPriKeyBase64String,
    pkToAddress,
    decode58Check,
    signBytes,
};


/***/ }),

/***/ "../src/utils/help.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = address2HexString;
/* harmony export (immutable) */ __webpack_exports__["b"] = hexString2Address;
/* harmony export (immutable) */ __webpack_exports__["c"] = hexString2Utf8;
/* harmony export (immutable) */ __webpack_exports__["d"] = stringUtf8toHex;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_code__ = __webpack_require__("../src/lib/code.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_code___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__lib_code__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__crypto__ = __webpack_require__("../src/utils/crypto.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__crypto___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__crypto__);



function hexStringToBase58(sHexString){
    if (sHexString.length < 2 || (sHexString.length & 1) != 0) {
        alert("addressHex error!");
        return;
    }
    var bytes = Object(__WEBPACK_IMPORTED_MODULE_0__lib_code__["hexStr2byteArray"])(sHexString);
    return Object(__WEBPACK_IMPORTED_MODULE_1__crypto__["getBase58CheckAddress"])(bytes);
}
function base58ToHexString(sBase58) {
    var bytes = Object(__WEBPACK_IMPORTED_MODULE_1__crypto__["decodeBase58Address"])(sBase58);
    return Object(__WEBPACK_IMPORTED_MODULE_1__crypto__["byteArray2hexStr"])(bytes);
}
function hexStringToUtf8(hex) {
    var arr = hex.split("")
    var out = ""
    for (var i = 0; i < arr.length / 2; i++) {
        var tmp = "0x" + arr[i * 2] + arr[i * 2 + 1]
        var charValue = String.fromCharCode(tmp);
        out += charValue
    }
    return out
}
function stringUtf8tHex(str) {
    var val = "";
    for (var i = 0; i < str.length; i++) {
        if (val == "")
            val = str.charCodeAt(i).toString(16);
        else
            val += str.charCodeAt(i).toString(16);
    }
    return val
}

function address2HexString(sHexAddress){
    if(sHexAddress.length==42&&sHexAddress.indexOf('41')==0){
        return sHexAddress;
    }
    return base58ToHexString(sHexAddress)
}
function hexString2Address(sAddress){
    return hexStringToBase58(sAddress)
}
function hexString2Utf8(sHexString){
    return hexStringToUtf8(sHexString)
}
function stringUtf8toHex(sUtf8){
    return stringUtf8tHex(sUtf8)
}


/***/ }),

/***/ "./pages/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__ = __webpack_require__("@babel/runtime/regenerator");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_styled_jsx_style__ = __webpack_require__("styled-jsx/style");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_styled_jsx_style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_styled_jsx_style__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_index__ = __webpack_require__("../src/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_json_stringify_pretty_compact__ = __webpack_require__("json-stringify-pretty-compact");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_json_stringify_pretty_compact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_json_stringify_pretty_compact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ethers__ = __webpack_require__("ethers");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ethers___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_ethers__);

var _jsxFileName = "/Users/sullof/Projects/tron/tron-web/examples/pages/index.js";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }





var tronWeb = new __WEBPACK_IMPORTED_MODULE_3__src_index__["a" /* default */]('https://api.trongrid.io');
tronWeb.setEventServer('https://api.trongrid.io');
tronWeb.defaultAccount = 'TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY';
tronWeb.defaultPk = 'da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0';

var Index =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Index, _React$Component);

  function Index() {
    var _ref;

    var _temp, _this;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this), "state", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: {
        resource: 'BANDWIDTH',
        data: {}
      }
    }), _temp));
  }

  _createClass(Index, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var coder = new __WEBPACK_IMPORTED_MODULE_5_ethers__["utils"].AbiCoder();
      window.tronWeb = tronWeb;
    }
  }, {
    key: "triggerChromeWallet",
    value: function triggerChromeWallet() {
      var res = tronWeb.sendTransactionByWallet({
        to: 'TZ3SmkD8qJK3VY8AnqN9XFiYuspEP3cwB5',
        amount: 0.1
      }, function (result) {
        console.log('cbk', result);
      });
      this.setState({
        data: res
      });
    }
  }, {
    key: "toBigNumber",
    value: function () {
      var _toBigNumber = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee() {
        var str, bigNumber, value;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                str = '200000000000000000000001';
                bigNumber = tronWeb.toBigNumber(str);
                console.log(bigNumber.toNumber(), '2.0000000000000002e+23');
                value = bigNumber.toString(10);
                this.setState({
                  data: value
                });

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function toBigNumber() {
        return _toBigNumber.apply(this, arguments);
      };
    }()
  }, {
    key: "getBalance",
    value: function () {
      var _getBalance = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee2() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return tronWeb.getBalance(this.account.value);

              case 2:
                res = _context2.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function getBalance() {
        return _getBalance.apply(this, arguments);
      };
    }()
  }, {
    key: "getBlock",
    value: function () {
      var _getBlock = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee3() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return tronWeb.getBlock(this.idOrHeight.value);

              case 2:
                res = _context3.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function getBlock() {
        return _getBlock.apply(this, arguments);
      };
    }()
  }, {
    key: "getBlockTransactionCount",
    value: function () {
      var _getBlockTransactionCount = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee4() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return tronWeb.getBlockTransactionCount(this.idOrHeight.value);

              case 2:
                res = _context4.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function getBlockTransactionCount() {
        return _getBlockTransactionCount.apply(this, arguments);
      };
    }()
  }, {
    key: "getTransaction",
    value: function () {
      var _getTransaction = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee5() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return tronWeb.getTransaction(this.transactionId.value);

              case 2:
                res = _context5.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function getTransaction() {
        return _getTransaction.apply(this, arguments);
      };
    }() //生成私钥和地址并存储到localStorage中
    //该api有泄漏private key的风险，请确保在安全的环境中调用该api

  }, {
    key: "generateAddress",
    value: function () {
      var _generateAddress = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee6() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return tronWeb.generateAddressOnLine();

              case 2:
                res = _context6.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      return function generateAddress() {
        return _generateAddress.apply(this, arguments);
      };
    }()
  }, {
    key: "generateAddressOnClient",
    value: function () {
      var _generateAddressOnClient = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee7() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return tronWeb.generateAccount();

              case 2:
                res = _context7.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      return function generateAddressOnClient() {
        return _generateAddressOnClient.apply(this, arguments);
      };
    }() //通过密码创建地址

  }, {
    key: "createAddressWithPassWord",
    value: function () {
      var _createAddressWithPassWord = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee8() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return tronWeb.createAddress('123456');

              case 2:
                res = _context8.sent;
                console.log(res); //{base58checkAddress: "TMip2NnRKhy2Wyf1FjKG1D1yn3F1LLGCDV",value:""4180e8816651790d4d6c187eef09f90b7a19408bb8"

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      return function createAddressWithPassWord() {
        return _createAddressWithPassWord.apply(this, arguments);
      };
    }() //转账

  }, {
    key: "sendTransaction",
    value: function () {
      var _sendTransaction = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee9(e) {
        var from, to, amount, pk, res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                e.preventDefault();
                from = this.from.value;
                to = this.to.value;
                amount = parseInt(this.amount.value);
                pk = this.pkForTransaction.value;
                _context9.next = 7;
                return tronWeb.sendTransaction(from, to, amount, pk);

              case 7:
                res = _context9.sent;
                this.setState({
                  data: res
                });

              case 9:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      return function sendTransaction(_x) {
        return _sendTransaction.apply(this, arguments);
      };
    }() //1、更新账户名称

  }, {
    key: "updateAccount",
    value: function () {
      var _updateAccount = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee10() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return tronWeb.updateAccount('wujiaolong1009', 'TT67rPNwgmpeimvHUMVzFfKsjL9GZ1wGw8');

              case 2:
                res = _context10.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      return function updateAccount() {
        return _updateAccount.apply(this, arguments);
      };
    }() //2、Vote for the superrepresentative

  }, {
    key: "voteWitnessAccount",
    value: function () {
      var _voteWitnessAccount = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee11() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return tronWeb.voteWitnessAccount('TBp39yWZhFEG5NdAoFFxepaj2dxCQjNmB9', [{
                  vote_address: 'TQxyQu5d76MaxsEF4nBf9tFa8s93nSHe8M',
                  vote_count: 1
                }]);

              case 2:
                res = _context11.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      return function voteWitnessAccount() {
        return _voteWitnessAccount.apply(this, arguments);
      };
    }() //3、发行token

  }, {
    key: "createAssetIssue",
    value: function () {
      var _createAssetIssue = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee12() {
        var options, res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                options = {
                  owner_address: 'TBp39yWZhFEG5NdAoFFxepaj2dxCQjNmB9',
                  name: 'TestTRX',
                  //名称
                  abbr: 'TTRX',
                  //简称
                  total_supply: 100,
                  //发行总量
                  trx_num: 1,
                  // 和 num 的兑换比例
                  num: 1,
                  start_time: 1530894315158,
                  //开始时间
                  end_time: 1533894312158,
                  //结束时间
                  description: '这是一个测试token',
                  //描述
                  url: 'http://www.baidu.com',
                  //官网地址
                  free_asset_net_limit: 10000,
                  //免费带宽
                  public_free_asset_net_limit: 10000,
                  // 每个token用户能使用本token的免费带宽
                  frozen_supply: {
                    frozen_amount: 1,
                    //发行者在发行的时候指定冻结的token
                    frozen_days: 2 //冻结的天数

                  }
                };
                _context12.next = 3;
                return tronWeb.createToken(options);

              case 3:
                res = _context12.sent;
                this.setState({
                  data: res
                });

              case 5:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      return function createAssetIssue() {
        return _createAssetIssue.apply(this, arguments);
      };
    }() //5、 Apply to be a superrepresentative

  }, {
    key: "createWitness",
    value: function () {
      var _createWitness = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee13() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.next = 2;
                return tronWeb.createWitness('TBp39yWZhFEG5NdAoFFxepaj2dxCQjNmB9', 'http://www.xxx.com');

              case 2:
                res = _context13.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      return function createWitness() {
        return _createWitness.apply(this, arguments);
      };
    }() //6、 Transfer token

  }, {
    key: "transferAsset",
    value: function () {
      var _transferAsset = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee14() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.next = 2;
                return tronWeb.transferAsset({
                  owner_address: 'TBp39yWZhFEG5NdAoFFxepaj2dxCQjNmB9',
                  to_address: 'TRzzMbFDNdFnRgGqKCkqoCuLoHfyRZfuVL',
                  asset_name: 'ZZZ',
                  amount: 1
                });

              case 2:
                res = _context14.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      return function transferAsset() {
        return _transferAsset.apply(this, arguments);
      };
    }() //7、 Participation in token distribution

  }, {
    key: "participateAssetIssue",
    value: function () {
      var _participateAssetIssue = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee15() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _context15.next = 2;
                return tronWeb.transferAsset({
                  owner_address: 'TBp39yWZhFEG5NdAoFFxepaj2dxCQjNmB9',
                  to_address: 'TRzzMbFDNdFnRgGqKCkqoCuLoHfyRZfuVL',
                  asset_name: 'ZZZ',
                  amount: 1
                });

              case 2:
                res = _context15.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      return function participateAssetIssue() {
        return _participateAssetIssue.apply(this, arguments);
      };
    }() // 

  }, {
    key: "freezeBalance",
    value: function () {
      var _freezeBalance = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee16() {
        var frozen_balance, resource, res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                frozen_balance = Number(this.frozen_balance.value);
                resource = this.state.resource;
                _context16.next = 4;
                return tronWeb.freezeBalance(tronWeb.defaultAccount, frozen_balance, 3, resource);

              case 4:
                res = _context16.sent;
                this.setState({
                  data: res
                });

              case 6:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));

      return function freezeBalance() {
        return _freezeBalance.apply(this, arguments);
      };
    }() //8、 解冻已经技术冻结期的 TRX

  }, {
    key: "unfreezeBalance",
    value: function () {
      var _unfreezeBalance = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee17() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                _context17.next = 2;
                return tronWeb.unfreezeBalance('TBp39yWZhFEG5NdAoFFxepaj2dxCQjNmB9');

              case 2:
                res = _context17.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));

      return function unfreezeBalance() {
        return _unfreezeBalance.apply(this, arguments);
      };
    }() //9、解冻已经结束冻结期的 token

  }, {
    key: "unfreezeAsset",
    value: function () {
      var _unfreezeAsset = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee18() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                _context18.next = 2;
                return tronWeb.unfreezeAsset('TBp39yWZhFEG5NdAoFFxepaj2dxCQjNmB9');

              case 2:
                res = _context18.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this);
      }));

      return function unfreezeAsset() {
        return _unfreezeAsset.apply(this, arguments);
      };
    }() //10、超级代表提现奖励到balance,每24小时可提现一次

  }, {
    key: "withdrawBalance",
    value: function () {
      var _withdrawBalance = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee19() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                _context19.next = 2;
                return tronWeb.withdrawBalance('TBp39yWZhFEG5NdAoFFxepaj2dxCQjNmB9');

              case 2:
                res = _context19.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, this);
      }));

      return function withdrawBalance() {
        return _withdrawBalance.apply(this, arguments);
      };
    }() //11、修改token信息

  }, {
    key: "updateAsset",
    value: function () {
      var _updateAsset = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee20() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                _context20.next = 2;
                return tronWeb.updateAsset({
                  owner_address: "TBp39yWZhFEG5NdAoFFxepaj2dxCQjNmB9",
                  description: 'test',
                  url: 'http://www.baidu.com',
                  new_limit: 1000000,
                  new_public_limit: 100
                });

              case 2:
                res = _context20.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20, this);
      }));

      return function updateAsset() {
        return _updateAsset.apply(this, arguments);
      };
    }() //12、查询api所在机器连接的节点

  }, {
    key: "listNodes",
    value: function () {
      var _listNodes = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee21() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                _context21.next = 2;
                return tronWeb.listNodes();

              case 2:
                res = _context21.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21, this);
      }));

      return function listNodes() {
        return _listNodes.apply(this, arguments);
      };
    }() //13、查询账户发行的token

  }, {
    key: "getAssetIssueByAccount",
    value: function () {
      var _getAssetIssueByAccount = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee22() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                _context22.next = 2;
                return tronWeb.getAssetIssueByAccount('TRzzMbFDNdFnRgGqKCkqoCuLoHfyRZfuVL');

              case 2:
                res = _context22.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee22, this);
      }));

      return function getAssetIssueByAccount() {
        return _getAssetIssueByAccount.apply(this, arguments);
      };
    }() //14、根据名称查询token

  }, {
    key: "getAssetIssueByName",
    value: function () {
      var _getAssetIssueByName = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee23() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                _context23.next = 2;
                return tronWeb.getAssetIssueByName('ZZZ');

              case 2:
                res = _context23.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context23.stop();
            }
          }
        }, _callee23, this);
      }));

      return function getAssetIssueByName() {
        return _getAssetIssueByName.apply(this, arguments);
      };
    }() //15、查询最新块

  }, {
    key: "blockNumber",
    value: function () {
      var _blockNumber = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee24() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                _context24.next = 2;
                return tronWeb.blockNumber();

              case 2:
                res = _context24.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context24.stop();
            }
          }
        }, _callee24, this);
      }));

      return function blockNumber() {
        return _blockNumber.apply(this, arguments);
      };
    }() //16、通过高度查询块

  }, {
    key: "getBlockByNum",
    value: function () {
      var _getBlockByNum = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee25() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee25$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                _context25.next = 2;
                return tronWeb.getBlockByNum(869015);

              case 2:
                res = _context25.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context25.stop();
            }
          }
        }, _callee25, this);
      }));

      return function getBlockByNum() {
        return _getBlockByNum.apply(this, arguments);
      };
    }() //17、通过id查询块

  }, {
    key: "getBlockById",
    value: function () {
      var _getBlockById = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee26() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee26$(_context26) {
          while (1) {
            switch (_context26.prev = _context26.next) {
              case 0:
                _context26.next = 2;
                return tronWeb.getBlockById('00000000000d429759175a43cb3e112d0761ecabf06ef0c253affe1420977651');

              case 2:
                res = _context26.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context26.stop();
            }
          }
        }, _callee26, this);
      }));

      return function getBlockById() {
        return _getBlockById.apply(this, arguments);
      };
    }() //18、按照范围查询块

  }, {
    key: "getBlockByLimitNext",
    value: function () {
      var _getBlockByLimitNext = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee27() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee27$(_context27) {
          while (1) {
            switch (_context27.prev = _context27.next) {
              case 0:
                _context27.next = 2;
                return tronWeb.getBlockByLimitNext(869010, 869015);

              case 2:
                res = _context27.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context27.stop();
            }
          }
        }, _callee27, this);
      }));

      return function getBlockByLimitNext() {
        return _getBlockByLimitNext.apply(this, arguments);
      };
    }() //19、﻿查询最新的几个块

  }, {
    key: "getBlockByLatestNum",
    value: function () {
      var _getBlockByLatestNum = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee28() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee28$(_context28) {
          while (1) {
            switch (_context28.prev = _context28.next) {
              case 0:
                _context28.next = 2;
                return tronWeb.getBlockByLatestNum(5);

              case 2:
                res = _context28.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context28.stop();
            }
          }
        }, _callee28, this);
      }));

      return function getBlockByLatestNum() {
        return _getBlockByLatestNum.apply(this, arguments);
      };
    }() //20、通过ID查询交易

  }, {
    key: "getTransactionById",
    value: function () {
      var _getTransactionById = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee29() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee29$(_context29) {
          while (1) {
            switch (_context29.prev = _context29.next) {
              case 0:
                _context29.next = 2;
                return tronWeb.getTransactionById('0689352aff84a0ff3691502bca94b1ded40abb4aa8806b313acb59a34cf10c22');

              case 2:
                res = _context29.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context29.stop();
            }
          }
        }, _callee29, this);
      }));

      return function getTransactionById() {
        return _getTransactionById.apply(this, arguments);
      };
    }() //21、查询所有超级代表列表

  }, {
    key: "listWitNesses",
    value: function () {
      var _listWitNesses = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee30() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee30$(_context30) {
          while (1) {
            switch (_context30.prev = _context30.next) {
              case 0:
                _context30.next = 2;
                return tronWeb.listWitNesses();

              case 2:
                res = _context30.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context30.stop();
            }
          }
        }, _callee30, this);
      }));

      return function listWitNesses() {
        return _listWitNesses.apply(this, arguments);
      };
    }() //22、查询所有token列表

  }, {
    key: "getAssetIssueList",
    value: function () {
      var _getAssetIssueList = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee31() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee31$(_context31) {
          while (1) {
            switch (_context31.prev = _context31.next) {
              case 0:
                _context31.next = 2;
                return tronWeb.getAssetIssueList();

              case 2:
                res = _context31.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context31.stop();
            }
          }
        }, _callee31, this);
      }));

      return function getAssetIssueList() {
        return _getAssetIssueList.apply(this, arguments);
      };
    }() //23、分页查询token列表

  }, {
    key: "getPaginateDassetIssueList",
    value: function () {
      var _getPaginateDassetIssueList = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee32() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee32$(_context32) {
          while (1) {
            switch (_context32.prev = _context32.next) {
              case 0:
                _context32.next = 2;
                return tronWeb.getPaginateDassetIssueList(1, 10);

              case 2:
                res = _context32.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context32.stop();
            }
          }
        }, _callee32, this);
      }));

      return function getPaginateDassetIssueList() {
        return _getPaginateDassetIssueList.apply(this, arguments);
      };
    }() //24、统计所有交易总数

  }, {
    key: "totalTransaction",
    value: function () {
      var _totalTransaction = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee33() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee33$(_context33) {
          while (1) {
            switch (_context33.prev = _context33.next) {
              case 0:
                _context33.next = 2;
                return tronWeb.getTransactionCount();

              case 2:
                res = _context33.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context33.stop();
            }
          }
        }, _callee33, this);
      }));

      return function totalTransaction() {
        return _totalTransaction.apply(this, arguments);
      };
    }() //25、获取下次统计投票时间

  }, {
    key: "getNextMaintenanceTime",
    value: function () {
      var _getNextMaintenanceTime = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee34() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee34$(_context34) {
          while (1) {
            switch (_context34.prev = _context34.next) {
              case 0:
                _context34.next = 2;
                return tronWeb.getNextMainteNanceTime();

              case 2:
                res = _context34.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context34.stop();
            }
          }
        }, _callee34, this);
      }));

      return function getNextMaintenanceTime() {
        return _getNextMaintenanceTime.apply(this, arguments);
      };
    }() //26、检查地址是否正确

  }, {
    key: "validateAddress",
    value: function () {
      var _validateAddress = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee35() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee35$(_context35) {
          while (1) {
            switch (_context35.prev = _context35.next) {
              case 0:
                _context35.next = 2;
                return tronWeb.validateAddress('TZ3SmkD8qJK3VY8AnqN9XFiYuspEP3cwB5');

              case 2:
                res = _context35.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context35.stop();
            }
          }
        }, _callee35, this);
      }));

      return function validateAddress() {
        return _validateAddress.apply(this, arguments);
      };
    }() //27、部署合约

  }, {
    key: "deployContract",
    value: function () {
      var _deployContract = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee36(event) {
        var myContract, contractInstance;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee36$(_context36) {
          while (1) {
            switch (_context36.prev = _context36.next) {
              case 0:
                event.preventDefault();
                myContract = tronWeb.contract(JSON.parse(this.abi.value)); //部署合约

                _context36.next = 4;
                return myContract.new({
                  from: this.owner_address.value,
                  data: this.byteCode.value,
                  fee_limit: this.fee_limit.value,
                  call_value: this.call_value.value,
                  consume_user_resource_percent: this.consume_user_resource_percent.value
                }, this.pk.value);

              case 4:
                contractInstance = _context36.sent;
                this.setState({
                  data: contractInstance
                });

              case 6:
              case "end":
                return _context36.stop();
            }
          }
        }, _callee36, this);
      }));

      return function deployContract(_x2) {
        return _deployContract.apply(this, arguments);
      };
    }() //28、查询合约

  }, {
    key: "getContract",
    value: function () {
      var _getContract = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee37() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee37$(_context37) {
          while (1) {
            switch (_context37.prev = _context37.next) {
              case 0:
                _context37.next = 2;
                return tronWeb.getContract(this.contract_address.value);

              case 2:
                res = _context37.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context37.stop();
            }
          }
        }, _callee37, this);
      }));

      return function getContract() {
        return _getContract.apply(this, arguments);
      };
    }() //29、调用合约

  }, {
    key: "triggerContract",
    value: function () {
      var _triggerContract = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee38() {
        var abi, myContract, contractAddress, contractInstance, _ref2, transaction, result, constant_result, res, myEvent;

        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee38$(_context38) {
          while (1) {
            switch (_context38.prev = _context38.next) {
              case 0:
                abi = [{
                  "constant": false,
                  "inputs": [{
                    "name": "number",
                    "type": "uint256"
                  }],
                  "name": "fibonacciNotify",
                  "outputs": [{
                    "name": "result",
                    "type": "uint256"
                  }],
                  "payable": false,
                  "stateMutability": "nonpayable",
                  "type": "function"
                }, {
                  "constant": true,
                  "inputs": [{
                    "name": "number",
                    "type": "uint256"
                  }],
                  "name": "fibonacci",
                  "outputs": [{
                    "name": "result",
                    "type": "uint256"
                  }],
                  "payable": false,
                  "stateMutability": "view",
                  "type": "function"
                }, {
                  "anonymous": false,
                  "inputs": [{
                    "indexed": false,
                    "name": "input",
                    "type": "uint256"
                  }, {
                    "indexed": false,
                    "name": "result",
                    "type": "uint256"
                  }],
                  "name": "Notify",
                  "type": "event"
                }];
                myContract = tronWeb.contract(abi);
                contractAddress = '416061e95f6e362efc3170fd50ac22197d9119b09e';
                _context38.next = 5;
                return myContract.at(contractAddress);

              case 5:
                contractInstance = _context38.sent;
                _context38.next = 8;
                return contractInstance.fibonacciNotify(7, {
                  fee_limit: 7000000,
                  call_value: 0
                });

              case 8:
                _ref2 = _context38.sent;
                transaction = _ref2.transaction;
                result = _ref2.result;
                constant_result = _ref2.constant_result;

                if (constant_result) {
                  _context38.next = 21;
                  break;
                }

                _context38.next = 15;
                return contractInstance.fibonacciNotify.sendTransaction(transaction, this.pk.value);

              case 15:
                res = _context38.sent;
                this.setState({
                  data: res
                }); //监听事件

                _context38.next = 19;
                return contractInstance.Notify();

              case 19:
                myEvent = _context38.sent;
                //默认根据合约地址查询，可以输入{eventName:'',blockNum:'',transactionId:''}
                myEvent.watch(function (err, result) {
                  var eventResult = '';
                  result.forEach(function (item) {
                    if (item.transaction_id == transaction.txID) {
                      eventResult = item.result;
                      myEvent.stopWatching();
                    }
                  });
                  console.log('eventResult:', eventResult);
                }); // console.log(eventResult)

              case 21:
              case "end":
                return _context38.stop();
            }
          }
        }, _callee38, this);
      }));

      return function triggerContract() {
        return _triggerContract.apply(this, arguments);
      };
    }() //30、login

  }, {
    key: "login",
    value: function login() {
      var account = tronWeb.login(tronWeb.defaultPk);
      this.setState({
        data: account
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var data = this.state.data;
      return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 381
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        style: {
          marginTop: '200px'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 382
        },
        className: "jsx-2187904324" + " " + "box"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("h3", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 383
        },
        className: "jsx-2187904324"
      }, "\u5DE5\u5177\u51FD\u6570 - Tool function"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 384
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "to BigNumber",
        onClick: function onClick() {
          return _this2.toBigNumber();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 385
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("h3", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 387
        },
        className: "jsx-2187904324"
      }, "\u8D26\u53F7\u3001\u8F6C\u8D26 - Account number, transfer"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 388
        },
        className: "jsx-2187904324"
      }, "\u8D26\u53F7 - account number\uFF1A", __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "text",
        style: {
          width: '300px'
        },
        ref: function ref(input) {
          return _this2.account = input;
        },
        defaultValue: tronWeb.defaultAccount,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 389
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        onClick: function onClick() {
          return _this2.getBalance();
        },
        value: "\u67E5\u8BE2\u8D26\u6237\u4F59\u989D - Check account balance",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 390
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 392
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "triggerWallet",
        onClick: function onClick() {
          return _this2.triggerChromeWallet();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 393
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 395
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u751F\u6210\u79C1\u94A5\u5730\u5740 - Generate private key address(onLine)",
        onClick: function onClick() {
          return _this2.generateAddress();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 396
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u751F\u6210\u79C1\u94A5\u5730\u5740 - Generate private key address(onClient)",
        onClick: function onClick() {
          return _this2.generateAddressOnClient();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 397
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 398
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u9A8C\u8BC1\u5730\u5740 - Verify address",
        onClick: function onClick() {
          return _this2.validateAddress();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 399
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u901A\u8FC7\u5BC6\u7801\u521B\u5EFA\u5730\u5740 - Create an address with a password",
        onClick: function onClick() {
          return _this2.createAddressWithPassWord();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 401
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u66F4\u65B0\u8D26\u53F7\u540D\u79F0 - Update account name",
        onClick: function onClick() {
          return _this2.updateAccount();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 403
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("hr", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 404
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("form", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 405
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("p", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 406
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 406
        },
        className: "jsx-2187904324"
      }, "from"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "text",
        style: {
          width: '300px'
        },
        ref: function ref(input) {
          return _this2.from = input;
        },
        defaultValue: tronWeb.defaultAccount,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 406
        },
        className: "jsx-2187904324"
      }), " "), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("p", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 407
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 407
        },
        className: "jsx-2187904324"
      }, "to"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "text",
        style: {
          width: '300px'
        },
        ref: function ref(input) {
          return _this2.to = input;
        },
        defaultValue: "TGhepyLuyML5n5jQBTykKqh9od8hQrBDkS",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 407
        },
        className: "jsx-2187904324"
      }), " "), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("p", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 408
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 408
        },
        className: "jsx-2187904324"
      }, "amount"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "text",
        ref: function ref(input) {
          return _this2.amount = input;
        },
        defaultValue: 1000000,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 408
        },
        className: "jsx-2187904324"
      }), " "), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("p", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 409
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 409
        },
        className: "jsx-2187904324"
      }, "pk"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "text",
        style: {
          width: '500px'
        },
        ref: function ref(input) {
          return _this2.pkForTransaction = input;
        },
        defaultValue: tronWeb.defaultPk,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 409
        },
        className: "jsx-2187904324"
      }), " "), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        onClick: function onClick(e) {
          return _this2.sendTransaction(e);
        },
        value: "\u8F6C\u8D26 - Transfer",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 410
        },
        className: "jsx-2187904324"
      }))), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("h3", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 413
        },
        className: "jsx-2187904324"
      }, "\u8282\u70B9\u67E5\u8BE2 - Node query"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 414
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u67E5\u8BE2API\u6240\u5728\u673A\u5668\u8FDE\u63A5\u7684\u8282\u70B9 - Query the node to which the machine where the API is connected",
        onClick: function onClick() {
          return _this2.listNodes();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 415
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("h3", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 417
        },
        className: "jsx-2187904324"
      }, "\u5757\u67E5\u8BE2 - Block query"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 418
        },
        className: "jsx-2187904324"
      }, "\u5757id\u6216\u9AD8\u5EA6 - Block id or height\uFF1A", __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "text",
        style: {
          width: '600px'
        },
        ref: function ref(input) {
          return _this2.idOrHeight = input;
        },
        defaultValue: "00000000000005ae07f42776b3bfd8e873feaebf2d743aceb716db5f70cb373b",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 419
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        onClick: function onClick() {
          return _this2.getBlock();
        },
        value: "\u67E5\u8BE2\u533A\u5757 - Query block",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 420
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        onClick: function onClick() {
          return _this2.getBlockTransactionCount();
        },
        value: "\u67E5\u8BE2\u533A\u5757\u5185\u4EA4\u6613\u6570\u91CF - Query the number of transactions in the block",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 421
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u67E5\u8BE2\u6700\u65B0\u5757 - Query the latest block",
        onClick: function onClick() {
          return _this2.blockNumber();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 422
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 424
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("h3", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 428
        },
        className: "jsx-2187904324"
      }, "\u4EA4\u6613\u67E5\u8BE2 - Transaction inquiry"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 429
        },
        className: "jsx-2187904324"
      }, "\u4EA4\u6613id - Transaction id\uFF1A", __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "text",
        style: {
          width: '600px'
        },
        ref: function ref(input) {
          return _this2.transactionId = input;
        },
        defaultValue: "c523edd7b4b776aa44e4cd4bbdf925cb4eb6d047e27316e1ff919014cc6a9f54",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 430
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u901A\u8FC7id\u67E5\u8BE2\u4EA4\u6613\u8BB0\u5F55 - Query transaction records by id",
        onClick: function onClick() {
          return _this2.getTransaction();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 431
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u7EDF\u8BA1\u6240\u6709\u7684\u4EA4\u6613\u603B\u6570 - Count all transactions",
        onClick: function onClick() {
          return _this2.totalTransaction();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 432
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("h3", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 434
        },
        className: "jsx-2187904324"
      }, "\u8D85\u7EA7\u4EE3\u8868 - Super Representative (SR)"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 435
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u67E5\u8BE2\u6240\u6709\u8D85\u7EA7\u4EE3\u8868 - Query all SR",
        onClick: function onClick() {
          return _this2.listWitNesses();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 436
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u83B7\u53D6\u4E0B\u6B21\u7EDF\u8BA1\u6295\u7968\u65F6\u95F4 - Get the next maintenance time",
        onClick: function onClick() {
          return _this2.getNextMaintenanceTime();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 437
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u7533\u8BF7\u6210\u4E3A\u8D85\u7EA7\u4EE3\u8868 - Apply to become a SR",
        onClick: function onClick() {
          return _this2.createWitness();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 438
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u4E3A\u8D85\u7EA7\u4EE3\u8868\u6295\u7968 - Vote for the SR",
        onClick: function onClick() {
          return _this2.voteWitnessAccount();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 439
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u89E3\u51BB\u7ED3\u675F\u51BB\u7ED3\u671F\u7684trx - Unfreeze the trx at the end of the freeze period",
        onClick: function onClick() {
          return _this2.unfreezeBalance();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 440
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u8D85\u7EA7\u4EE3\u8868\u63D0\u73B0\u5956\u52B1\u5230balance - SR withdraws the reward to balance",
        onClick: function onClick() {
          return _this2.withdrawBalance();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 441
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("h3", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 443
        },
        className: "jsx-2187904324"
      }, "token\u7BA1\u7406 - Token management"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 444
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 445
        },
        className: "jsx-2187904324"
      }, "BANDWIDTH:", __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        defaultChecked: true,
        ref: "resource",
        name: "resource",
        onChange: function onChange() {
          _this2.setState({
            resource: 'BANDWIDTH'
          });
        },
        type: "radio",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 445
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 445
        },
        className: "jsx-2187904324"
      }, "ENERGY:", __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        ref: "resource",
        name: "resource",
        onChange: function onChange() {
          _this2.setState({
            resource: 'ENERGY'
          });
        },
        type: "radio",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 445
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "text",
        defaultValue: "1000000",
        ref: function ref(input) {
          return _this2.frozen_balance = input;
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 445
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u51BB\u7ED3\u83B7\u53D6\u8D44\u6E90 - freeze gain resource",
        onClick: function onClick() {
          return _this2.freezeBalance();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 445
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 447
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u67E5\u8BE2\u6240\u6709token\u5217\u8868 - Query all token lists",
        onClick: function onClick() {
          return _this2.getAssetIssueList();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 448
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u5206\u9875\u67E5\u8BE2token\u5217\u8868 - Paging query token list",
        onClick: function onClick() {
          return _this2.getPaginateDassetIssueList();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 449
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u67E5\u8BE2\u67D0\u8D26\u6237\u53D1\u884C\u7684token - Query the token issued by an account",
        onClick: function onClick() {
          return _this2.getAssetIssueByAccount();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 450
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u6839\u636E\u540D\u79F0\u67E5\u8BE2token - Query token by name",
        onClick: function onClick() {
          return _this2.getAssetIssueByName();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 451
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u53D1\u884Ctoken - Issue token",
        onClick: function onClick() {
          return _this2.createAssetIssue();
        },
        style: {
          color: 'red'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 452
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u8F6C\u8D26token - Transfer token",
        onClick: function onClick() {
          return _this2.transferAsset();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 453
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u4FEE\u6539token - Modify token",
        onClick: function onClick() {
          return _this2.updateAsset();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 454
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u89E3\u51BBtoken - Unfreeze the token",
        onClick: function onClick() {
          return _this2.unfreezeAsset();
        },
        style: {
          color: 'red'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 455
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u53C2\u4E0Etoken\u53D1\u884C - Participate in token issuance",
        onClick: function onClick() {
          return _this2.participateAssetIssue();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 456
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("h3", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 458
        },
        className: "jsx-2187904324"
      }, "\u667A\u80FD\u5408\u7EA6 - Smart contract"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 459
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 460
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("form", {
        onSubmit: function onSubmit(e) {
          return _this2.deployContract(e);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 461
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 462
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 463
        },
        className: "jsx-2187904324"
      }, "owner_address\uFF1A"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "text",
        style: {
          width: '300px'
        },
        ref: function ref(input) {
          return _this2.owner_address = input;
        },
        defaultValue: tronWeb.defaultAccount,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 464
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 466
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 467
        },
        className: "jsx-2187904324"
      }, "pk:"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "text",
        style: {
          width: '500px'
        },
        ref: function ref(input) {
          return _this2.pk = input;
        },
        defaultValue: tronWeb.defaultPk,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 468
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 470
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 471
        },
        className: "jsx-2187904324"
      }, "Abi"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("textarea", {
        cols: "50",
        rows: "10",
        placeholder: "abi",
        defaultValue: "",
        ref: function ref(input) {
          return _this2.abi = input;
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 471
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 473
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 474
        },
        className: "jsx-2187904324"
      }, "byteCode"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("textarea", {
        cols: "50",
        rows: "10",
        placeholder: "byteCode",
        defaultValue: "",
        ref: function ref(input) {
          return _this2.byteCode = input;
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 474
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 477
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 478
        },
        className: "jsx-2187904324"
      }, "fee_limit\uFF1A"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "text",
        ref: function ref(input) {
          return _this2.fee_limit = input;
        },
        defaultValue: Math.pow(10, 10),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 479
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 481
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 482
        },
        className: "jsx-2187904324"
      }, "call_value\uFF1A"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "text",
        ref: function ref(input) {
          return _this2.call_value = input;
        },
        defaultValue: 0,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 483
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 485
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 486
        },
        className: "jsx-2187904324"
      }, "consume_user_resource_percent\uFF1A"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "text",
        ref: function ref(input) {
          return _this2.consume_user_resource_percent = input;
        },
        defaultValue: 0,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 487
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 489
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "submit",
        value: "\u90E8\u7F72\u5408\u7EA6 - Deploy contract",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 490
        },
        className: "jsx-2187904324"
      }))), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("hr", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 493
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 495
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 496
        },
        className: "jsx-2187904324"
      }, "\u67E5\u8BE2\u5408\u7EA6\u5730\u5740 - Query contract address\uFF1A"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "text",
        style: {
          width: '300px'
        },
        ref: function ref(input) {
          return _this2.contract_address = input;
        },
        defaultValue: "",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 497
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u67E5\u8BE2\u5408\u7EA6 - Query contract",
        onClick: function onClick() {
          return _this2.getContract();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 498
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 500
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u8C03\u7528\u5408\u7EA6 - Call contract",
        onClick: function onClick() {
          _this2.triggerContract();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 501
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 503
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u767B\u5F55 - login",
        onClick: function onClick() {
          return _this2.login();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 504
        },
        className: "jsx-2187904324"
      })))), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        style: {
          position: 'fixed',
          left: 0,
          top: 0
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 511
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("textarea", {
        cols: "100",
        rows: "10",
        value: __WEBPACK_IMPORTED_MODULE_4_json_stringify_pretty_compact___default()(data),
        onChange: function onChange() {},
        __source: {
          fileName: _jsxFileName,
          lineNumber: 512
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_styled_jsx_style___default.a, {
        styleId: "2187904324",
        css: "label.jsx-2187904324{display:inline-block;width:150px;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWlnQjRCLEFBSTZDLHFCQUNULFlBQ2YiLCJmaWxlIjoicGFnZXMvaW5kZXguanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3N1bGxvZi9Qcm9qZWN0cy90cm9uL3Ryb24td2ViL2V4YW1wbGVzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LHtSZWFjdERPTX0gZnJvbSAncmVhY3QnXG5pbXBvcnQgVHJvbldlYiBmcm9tICcuLi8uLi9zcmMvaW5kZXgnXG5pbXBvcnQgc3RyaW5naWZ5IGZyb20gJ2pzb24tc3RyaW5naWZ5LXByZXR0eS1jb21wYWN0J1xuaW1wb3J0IHt1dGlsc30gZnJvbSAnZXRoZXJzJ1xubGV0IHRyb25XZWIgPSBuZXcgVHJvbldlYignaHR0cHM6Ly9hcGkudHJvbmdyaWQuaW8nKTtcbnRyb25XZWIuc2V0RXZlbnRTZXJ2ZXIoJ2h0dHBzOi8vYXBpLnRyb25ncmlkLmlvJyk7XG50cm9uV2ViLmRlZmF1bHRBY2NvdW50ID0gJ1RQTDY2VksyZ0NYTkNEN0VKZzlwZ0pSZnFjUmF6amhVWlknO1xudHJvbldlYi5kZWZhdWx0UGs9J2RhMTQ2Mzc0YTc1MzEwYjk2NjZlODM0ZWU0YWQwODY2ZDZmNDAzNTk2N2JmYzc2MjE3YzVhNDk1ZmZmOWYwZDAnO1xuY2xhc3MgSW5kZXggZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG4gICAgc3RhdGUgPSB7XG4gICAgICAgIHJlc291cmNlOidCQU5EV0lEVEgnLFxuICAgICAgICBkYXRhOnt9XG4gICAgfVxuICAgIGNvbXBvbmVudERpZE1vdW50KCl7XG4gICAgICAgIGxldCBjb2RlciA9IG5ldyB1dGlscy5BYmlDb2RlcigpO1xuICAgICAgICB3aW5kb3cudHJvbldlYiA9IHRyb25XZWI7XG4gICAgfVxuICAgIHRyaWdnZXJDaHJvbWVXYWxsZXQoKXtcbiAgICAgICAgY29uc3QgcmVzID0gdHJvbldlYi5zZW5kVHJhbnNhY3Rpb25CeVdhbGxldCh7dG86J1RaM1Nta0Q4cUpLM1ZZOEFucU45WEZpWXVzcEVQM2N3QjUnLGFtb3VudDowLjF9LGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY2JrJyxyZXN1bHQpO1xuICAgICAgICB9KVxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRhdGE6cmVzXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgYXN5bmMgdG9CaWdOdW1iZXIoKXtcbiAgICAgICAgbGV0IHN0ciA9ICcyMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDEnO1xuICAgICAgICBsZXQgYmlnTnVtYmVyID0gdHJvbldlYi50b0JpZ051bWJlcihzdHIpO1xuICAgICAgICBjb25zb2xlLmxvZyhiaWdOdW1iZXIudG9OdW1iZXIoKSwnMi4wMDAwMDAwMDAwMDAwMDAyZSsyMycpXG4gICAgICAgIGxldCB2YWx1ZSA9IGJpZ051bWJlci50b1N0cmluZygxMCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0YTp2YWx1ZVxuICAgICAgICB9KVxuXG4gICAgfVxuICAgIGFzeW5jIGdldEJhbGFuY2UoKXtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgdHJvbldlYi5nZXRCYWxhbmNlKHRoaXMuYWNjb3VudC52YWx1ZSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0YTpyZXNcbiAgICAgICAgfSlcbiAgICB9XG4gICAgYXN5bmMgZ2V0QmxvY2soKXtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgdHJvbldlYi5nZXRCbG9jayh0aGlzLmlkT3JIZWlnaHQudmFsdWUpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRhdGE6cmVzXG4gICAgICAgIH0pXG4gICAgfSBcbiAgICBhc3luYyBnZXRCbG9ja1RyYW5zYWN0aW9uQ291bnQoKXtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgdHJvbldlYi5nZXRCbG9ja1RyYW5zYWN0aW9uQ291bnQodGhpcy5pZE9ySGVpZ2h0LnZhbHVlKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBkYXRhOnJlc1xuICAgICAgICB9KVxuICAgIH0gXG4gICAgYXN5bmMgZ2V0VHJhbnNhY3Rpb24oKXtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgdHJvbldlYi5nZXRUcmFuc2FjdGlvbih0aGlzLnRyYW5zYWN0aW9uSWQudmFsdWUpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRhdGE6cmVzXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8v55Sf5oiQ56eB6ZKl5ZKM5Zyw5Z2A5bm25a2Y5YKo5YiwbG9jYWxTdG9yYWdl5LitXG4gICAgLy/or6VhcGnmnInms4TmvI9wcml2YXRlIGtleeeahOmjjumZqe+8jOivt+ehruS/neWcqOWuieWFqOeahOeOr+Wig+S4reiwg+eUqOivpWFwaVxuICAgIGFzeW5jIGdlbmVyYXRlQWRkcmVzcygpe1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCB0cm9uV2ViLmdlbmVyYXRlQWRkcmVzc09uTGluZSgpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRhdGE6cmVzXG4gICAgICAgIH0pXG4gICAgfVxuICAgIGFzeW5jIGdlbmVyYXRlQWRkcmVzc09uQ2xpZW50KCl7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRyb25XZWIuZ2VuZXJhdGVBY2NvdW50KCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0YTpyZXNcbiAgICAgICAgfSlcbiAgICB9XG4gICAgLy/pgJrov4flr4bnoIHliJvlu7rlnLDlnYBcbiAgICBhc3luYyBjcmVhdGVBZGRyZXNzV2l0aFBhc3NXb3JkKCl7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRyb25XZWIuY3JlYXRlQWRkcmVzcygnMTIzNDU2Jyk7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcyk7Ly97YmFzZTU4Y2hlY2tBZGRyZXNzOiBcIlRNaXAyTm5SS2h5Mld5ZjFGaktHMUQxeW4zRjFMTEdDRFZcIix2YWx1ZTpcIlwiNDE4MGU4ODE2NjUxNzkwZDRkNmMxODdlZWYwOWY5MGI3YTE5NDA4YmI4XCJcbiAgICB9XG4gICAgLy/ovazotKZcbiAgICBhc3luYyBzZW5kVHJhbnNhY3Rpb24oZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgZnJvbSA9IHRoaXMuZnJvbS52YWx1ZTtcbiAgICAgICAgY29uc3QgdG8gPSB0aGlzLnRvLnZhbHVlO1xuICAgICAgICBjb25zdCBhbW91bnQgPXBhcnNlSW50KHRoaXMuYW1vdW50LnZhbHVlKTtcbiAgICAgICAgY29uc3QgcGsgPSB0aGlzLnBrRm9yVHJhbnNhY3Rpb24udmFsdWU7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRyb25XZWIuc2VuZFRyYW5zYWN0aW9uKGZyb20sdG8sYW1vdW50LHBrKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgIGRhdGE6cmVzXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8vMeOAgeabtOaWsOi0puaIt+WQjeensFxuICAgIGFzeW5jIHVwZGF0ZUFjY291bnQoKXtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgdHJvbldlYi51cGRhdGVBY2NvdW50KCd3dWppYW9sb25nMTAwOScsJ1RUNjdyUE53Z21wZWltdkhVTVZ6RmZLc2pMOUdaMXdHdzgnKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBkYXRhOnJlc1xuICAgICAgICB9KVxuICAgIH1cbiAgICAvLzLjgIFWb3RlIGZvciB0aGUgc3VwZXJyZXByZXNlbnRhdGl2ZVxuICAgIGFzeW5jIHZvdGVXaXRuZXNzQWNjb3VudCgpe1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCB0cm9uV2ViLnZvdGVXaXRuZXNzQWNjb3VudCgnVEJwMzl5V1poRkVHNU5kQW9GRnhlcGFqMmR4Q1FqTm1COScsW3tcbiAgICAgICAgICAgIHZvdGVfYWRkcmVzczonVFF4eVF1NWQ3Nk1heHNFRjRuQmY5dEZhOHM5M25TSGU4TScsXG4gICAgICAgICAgICB2b3RlX2NvdW50OjFcbiAgICAgICAgfV0pO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRhdGE6cmVzXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8vM+OAgeWPkeihjHRva2VuXG4gICAgYXN5bmMgY3JlYXRlQXNzZXRJc3N1ZSgpe1xuICAgICAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIG93bmVyX2FkZHJlc3M6J1RCcDM5eVdaaEZFRzVOZEFvRkZ4ZXBhajJkeENRak5tQjknLFxuICAgICAgICAgICAgbmFtZTonVGVzdFRSWCcsLy/lkI3np7BcbiAgICAgICAgICAgIGFiYnI6J1RUUlgnLC8v566A56ewXG4gICAgICAgICAgICB0b3RhbF9zdXBwbHkgOjEwMCwvL+WPkeihjOaAu+mHj1xuICAgICAgICAgICAgdHJ4X251bToxLC8vIOWSjCBudW0g55qE5YWR5o2i5q+U5L6LXG4gICAgICAgICAgICBudW06MSxcbiAgICAgICAgICAgIHN0YXJ0X3RpbWUgOiAxNTMwODk0MzE1MTU4LC8v5byA5aeL5pe26Ze0XG4gICAgICAgICAgICBlbmRfdGltZToxNTMzODk0MzEyMTU4LC8v57uT5p2f5pe26Ze0XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjon6L+Z5piv5LiA5Liq5rWL6K+VdG9rZW4nLC8v5o+P6L+wXG4gICAgICAgICAgICB1cmw6J2h0dHA6Ly93d3cuYmFpZHUuY29tJywvL+WumOe9keWcsOWdgFxuICAgICAgICAgICAgZnJlZV9hc3NldF9uZXRfbGltaXQ6MTAwMDAsLy/lhY3otLnluKblrr1cbiAgICAgICAgICAgIHB1YmxpY19mcmVlX2Fzc2V0X25ldF9saW1pdDoxMDAwMCwvLyDmr4/kuKp0b2tlbueUqOaIt+iDveS9v+eUqOacrHRva2Vu55qE5YWN6LS55bim5a69XG4gICAgICAgICAgICBmcm96ZW5fc3VwcGx5OntcbiAgICAgICAgICAgICAgICBmcm96ZW5fYW1vdW50OjEsLy/lj5HooYzogIXlnKjlj5HooYznmoTml7blgJnmjIflrprlhrvnu5PnmoR0b2tlblxuICAgICAgICAgICAgICAgIGZyb3plbl9kYXlzOjIgLy/lhrvnu5PnmoTlpKnmlbBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCB0cm9uV2ViLmNyZWF0ZVRva2VuKG9wdGlvbnMpXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0YTpyZXNcbiAgICAgICAgfSlcbiAgICB9XG4gICAgLy8144CBIEFwcGx5IHRvIGJlIGEgc3VwZXJyZXByZXNlbnRhdGl2ZVxuICAgIGFzeW5jIGNyZWF0ZVdpdG5lc3MoKXtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgdHJvbldlYi5jcmVhdGVXaXRuZXNzKCdUQnAzOXlXWmhGRUc1TmRBb0ZGeGVwYWoyZHhDUWpObUI5JywnaHR0cDovL3d3dy54eHguY29tJyk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0YTpyZXNcbiAgICAgICAgfSlcbiAgICB9XG4gICAgLy8244CBIFRyYW5zZmVyIHRva2VuXG4gICAgYXN5bmMgdHJhbnNmZXJBc3NldCgpe1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCB0cm9uV2ViLnRyYW5zZmVyQXNzZXQoe1xuICAgICAgICAgICAgb3duZXJfYWRkcmVzczonVEJwMzl5V1poRkVHNU5kQW9GRnhlcGFqMmR4Q1FqTm1COScsXG4gICAgICAgICAgICB0b19hZGRyZXNzOidUUnp6TWJGRE5kRm5SZ0dxS0NrcW9DdUxvSGZ5UlpmdVZMJyxcbiAgICAgICAgICAgIGFzc2V0X25hbWU6J1paWicsXG4gICAgICAgICAgICBhbW91bnQ6MVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBkYXRhOnJlc1xuICAgICAgICB9KVxuICAgIH1cbiAgICAvLzfjgIEgUGFydGljaXBhdGlvbiBpbiB0b2tlbiBkaXN0cmlidXRpb25cbiAgICBhc3luYyBwYXJ0aWNpcGF0ZUFzc2V0SXNzdWUoKXtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgdHJvbldlYi50cmFuc2ZlckFzc2V0KHtcbiAgICAgICAgICAgIG93bmVyX2FkZHJlc3M6J1RCcDM5eVdaaEZFRzVOZEFvRkZ4ZXBhajJkeENRak5tQjknLFxuICAgICAgICAgICAgdG9fYWRkcmVzczonVFJ6ek1iRkROZEZuUmdHcUtDa3FvQ3VMb0hmeVJaZnVWTCcsXG4gICAgICAgICAgICBhc3NldF9uYW1lOidaWlonLFxuICAgICAgICAgICAgYW1vdW50OjFcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0YTpyZXNcbiAgICAgICAgfSlcbiAgICB9XG4gICAgLy8gXG4gICAgYXN5bmMgZnJlZXplQmFsYW5jZSgpe1xuICAgICAgICBjb25zdCBmcm96ZW5fYmFsYW5jZSA9IE51bWJlcih0aGlzLmZyb3plbl9iYWxhbmNlLnZhbHVlKTtcbiAgICAgICAgY29uc3QgcmVzb3VyY2UgPSB0aGlzLnN0YXRlLnJlc291cmNlO1xuICAgICAgICBsZXQgcmVzID0gYXdhaXQgdHJvbldlYi5mcmVlemVCYWxhbmNlKHRyb25XZWIuZGVmYXVsdEFjY291bnQsZnJvemVuX2JhbGFuY2UsMyxyZXNvdXJjZSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0YTpyZXNcbiAgICAgICAgfSkgICAgXG4gICAgfVxuICAgIC8vOOOAgSDop6Plhrvlt7Lnu4/mioDmnK/lhrvnu5PmnJ/nmoQgVFJYXG4gICAgYXN5bmMgdW5mcmVlemVCYWxhbmNlKCl7XG4gICAgICAgIGxldCByZXMgPSBhd2FpdCB0cm9uV2ViLnVuZnJlZXplQmFsYW5jZSgnVEJwMzl5V1poRkVHNU5kQW9GRnhlcGFqMmR4Q1FqTm1COScpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRhdGE6cmVzXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8vOeOAgeino+WGu+W3sue7j+e7k+adn+WGu+e7k+acn+eahCB0b2tlblxuICAgIGFzeW5jIHVuZnJlZXplQXNzZXQoKXtcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHRyb25XZWIudW5mcmVlemVBc3NldCgnVEJwMzl5V1poRkVHNU5kQW9GRnhlcGFqMmR4Q1FqTm1COScpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRhdGE6cmVzXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8vMTDjgIHotoXnuqfku6Pooajmj5DnjrDlpZblirHliLBiYWxhbmNlLOavjzI05bCP5pe25Y+v5o+Q546w5LiA5qyhXG4gICAgYXN5bmMgd2l0aGRyYXdCYWxhbmNlKCl7XG4gICAgICAgIGxldCByZXMgPSBhd2FpdCB0cm9uV2ViLndpdGhkcmF3QmFsYW5jZSgnVEJwMzl5V1poRkVHNU5kQW9GRnhlcGFqMmR4Q1FqTm1COScpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRhdGE6cmVzXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8vMTHjgIHkv67mlLl0b2tlbuS/oeaBr1xuICAgIGFzeW5jIHVwZGF0ZUFzc2V0KCl7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRyb25XZWIudXBkYXRlQXNzZXQoe1xuICAgICAgICAgICAgb3duZXJfYWRkcmVzczpcIlRCcDM5eVdaaEZFRzVOZEFvRkZ4ZXBhajJkeENRak5tQjlcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAndGVzdCcsXG4gICAgICAgICAgICB1cmw6ICdodHRwOi8vd3d3LmJhaWR1LmNvbScsXG4gICAgICAgICAgICBuZXdfbGltaXQgOiAxMDAwMDAwLFxuICAgICAgICAgICAgbmV3X3B1YmxpY19saW1pdCA6IDEwMFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBkYXRhOnJlc1xuICAgICAgICB9KVxuICAgIH1cbiAgICAvLzEy44CB5p+l6K+iYXBp5omA5Zyo5py65Zmo6L+e5o6l55qE6IqC54K5XG4gICAgYXN5bmMgbGlzdE5vZGVzKCl7XG4gICAgICAgIGxldCByZXMgPSBhd2FpdCB0cm9uV2ViLmxpc3ROb2RlcygpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRhdGE6cmVzXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8vMTPjgIHmn6Xor6LotKbmiLflj5HooYznmoR0b2tlblxuICAgIGFzeW5jIGdldEFzc2V0SXNzdWVCeUFjY291bnQoKXtcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHRyb25XZWIuZ2V0QXNzZXRJc3N1ZUJ5QWNjb3VudCgnVFJ6ek1iRkROZEZuUmdHcUtDa3FvQ3VMb0hmeVJaZnVWTCcpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRhdGE6cmVzXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8vMTTjgIHmoLnmja7lkI3np7Dmn6Xor6J0b2tlblxuICAgIGFzeW5jIGdldEFzc2V0SXNzdWVCeU5hbWUoKXtcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHRyb25XZWIuZ2V0QXNzZXRJc3N1ZUJ5TmFtZSgnWlpaJyk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0YTpyZXNcbiAgICAgICAgfSlcbiAgICB9XG4gICAgLy8xNeOAgeafpeivouacgOaWsOWdl1xuICAgIGFzeW5jIGJsb2NrTnVtYmVyKCl7XG4gICAgICAgIGxldCByZXMgPSBhd2FpdCB0cm9uV2ViLmJsb2NrTnVtYmVyKCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0YTpyZXNcbiAgICAgICAgfSlcbiAgICB9XG4gICAgLy8xNuOAgemAmui/h+mrmOW6puafpeivouWdl1xuICAgIGFzeW5jIGdldEJsb2NrQnlOdW0oKXtcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHRyb25XZWIuZ2V0QmxvY2tCeU51bSg4NjkwMTUpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRhdGE6cmVzXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8vMTfjgIHpgJrov4dpZOafpeivouWdl1xuICAgIGFzeW5jIGdldEJsb2NrQnlJZCgpe1xuICAgICAgICBsZXQgcmVzID0gYXdhaXQgdHJvbldlYi5nZXRCbG9ja0J5SWQoJzAwMDAwMDAwMDAwZDQyOTc1OTE3NWE0M2NiM2UxMTJkMDc2MWVjYWJmMDZlZjBjMjUzYWZmZTE0MjA5Nzc2NTEnKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBkYXRhOnJlc1xuICAgICAgICB9KVxuICAgIH1cbiAgICAvLzE444CB5oyJ54Wn6IyD5Zu05p+l6K+i5Z2XXG4gICAgYXN5bmMgZ2V0QmxvY2tCeUxpbWl0TmV4dCgpe1xuICAgICAgICBsZXQgcmVzID0gYXdhaXQgdHJvbldlYi5nZXRCbG9ja0J5TGltaXROZXh0KDg2OTAxMCw4NjkwMTUpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRhdGE6cmVzXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8vMTnjgIHvu7/mn6Xor6LmnIDmlrDnmoTlh6DkuKrlnZdcbiAgICBhc3luYyBnZXRCbG9ja0J5TGF0ZXN0TnVtKCl7XG4gICAgICAgIGxldCByZXMgPSBhd2FpdCB0cm9uV2ViLmdldEJsb2NrQnlMYXRlc3ROdW0oNSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0YTpyZXNcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvLzIw44CB6YCa6L+HSUTmn6Xor6LkuqTmmJNcbiAgICBhc3luYyBnZXRUcmFuc2FjdGlvbkJ5SWQoKXtcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHRyb25XZWIuZ2V0VHJhbnNhY3Rpb25CeUlkKCcwNjg5MzUyYWZmODRhMGZmMzY5MTUwMmJjYTk0YjFkZWQ0MGFiYjRhYTg4MDZiMzEzYWNiNTlhMzRjZjEwYzIyJylcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBkYXRhOnJlc1xuICAgICAgICB9KVxuICAgIH1cbiAgICAvLzIx44CB5p+l6K+i5omA5pyJ6LaF57qn5Luj6KGo5YiX6KGoXG4gICAgYXN5bmMgbGlzdFdpdE5lc3Nlcygpe1xuICAgICAgICBsZXQgcmVzID0gYXdhaXQgdHJvbldlYi5saXN0V2l0TmVzc2VzKCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0YTpyZXNcbiAgICAgICAgfSlcbiAgICB9XG4gICAgLy8yMuOAgeafpeivouaJgOaciXRva2Vu5YiX6KGoXG4gICAgYXN5bmMgZ2V0QXNzZXRJc3N1ZUxpc3QoKXtcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHRyb25XZWIuZ2V0QXNzZXRJc3N1ZUxpc3QoKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBkYXRhOnJlc1xuICAgICAgICB9KVxuICAgIH1cbiAgICAvLzIz44CB5YiG6aG15p+l6K+idG9rZW7liJfooahcbiAgICBhc3luYyBnZXRQYWdpbmF0ZURhc3NldElzc3VlTGlzdCgpe1xuICAgICAgICBsZXQgcmVzID0gYXdhaXQgdHJvbldlYi5nZXRQYWdpbmF0ZURhc3NldElzc3VlTGlzdCgxLDEwKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBkYXRhOnJlc1xuICAgICAgICB9KVxuICAgIH1cbiAgICAvLzI044CB57uf6K6h5omA5pyJ5Lqk5piT5oC75pWwXG4gICAgYXN5bmMgdG90YWxUcmFuc2FjdGlvbigpe1xuICAgICAgICBsZXQgcmVzID0gYXdhaXQgdHJvbldlYi5nZXRUcmFuc2FjdGlvbkNvdW50KCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0YTpyZXNcbiAgICAgICAgfSlcbiAgICB9XG4gICAgLy8yNeOAgeiOt+WPluS4i+asoee7n+iuoeaKleelqOaXtumXtFxuICAgIGFzeW5jIGdldE5leHRNYWludGVuYW5jZVRpbWUoKXtcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHRyb25XZWIuZ2V0TmV4dE1haW50ZU5hbmNlVGltZSgpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRhdGE6cmVzXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8vMjbjgIHmo4Dmn6XlnLDlnYDmmK/lkKbmraPnoa5cbiAgICBhc3luYyB2YWxpZGF0ZUFkZHJlc3MoKXtcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHRyb25XZWIudmFsaWRhdGVBZGRyZXNzKCdUWjNTbWtEOHFKSzNWWThBbnFOOVhGaVl1c3BFUDNjd0I1Jyk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0YTpyZXNcbiAgICAgICAgfSlcbiAgICB9XG4gICAgLy8yN+OAgemDqOe9suWQiOe6plxuICAgIGFzeW5jIGRlcGxveUNvbnRyYWN0KGV2ZW50KXtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbGV0IG15Q29udHJhY3QgPSB0cm9uV2ViLmNvbnRyYWN0KEpTT04ucGFyc2UodGhpcy5hYmkudmFsdWUpKTtcbiAgICAgICAgLy/pg6jnvbLlkIjnuqZcbiAgICAgICAgbGV0IGNvbnRyYWN0SW5zdGFuY2UgPSBhd2FpdCBteUNvbnRyYWN0Lm5ldyh7XG4gICAgICAgICAgICBmcm9tOnRoaXMub3duZXJfYWRkcmVzcy52YWx1ZSxcbiAgICAgICAgICAgIGRhdGE6dGhpcy5ieXRlQ29kZS52YWx1ZSxcbiAgICAgICAgICAgIGZlZV9saW1pdDp0aGlzLmZlZV9saW1pdC52YWx1ZSxcbiAgICAgICAgICAgIGNhbGxfdmFsdWU6dGhpcy5jYWxsX3ZhbHVlLnZhbHVlLFxuICAgICAgICAgICAgY29uc3VtZV91c2VyX3Jlc291cmNlX3BlcmNlbnQ6dGhpcy5jb25zdW1lX3VzZXJfcmVzb3VyY2VfcGVyY2VudC52YWx1ZVxuICAgICAgICB9LHRoaXMucGsudmFsdWUpXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0YTpjb250cmFjdEluc3RhbmNlXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8vMjjjgIHmn6Xor6LlkIjnuqZcbiAgICBhc3luYyBnZXRDb250cmFjdCgpe1xuICAgICAgICBsZXQgcmVzID0gYXdhaXQgdHJvbldlYi5nZXRDb250cmFjdCh0aGlzLmNvbnRyYWN0X2FkZHJlc3MudmFsdWUpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRhdGE6cmVzXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8vMjnjgIHosIPnlKjlkIjnuqZcbiAgICBhc3luYyB0cmlnZ2VyQ29udHJhY3QoKXtcbiAgICAgICAgbGV0IGFiaSA9IFt7XCJjb25zdGFudFwiOmZhbHNlLFwiaW5wdXRzXCI6W3tcIm5hbWVcIjpcIm51bWJlclwiLFwidHlwZVwiOlwidWludDI1NlwifV0sXCJuYW1lXCI6XCJmaWJvbmFjY2lOb3RpZnlcIixcIm91dHB1dHNcIjpbe1wibmFtZVwiOlwicmVzdWx0XCIsXCJ0eXBlXCI6XCJ1aW50MjU2XCJ9XSxcInBheWFibGVcIjpmYWxzZSxcInN0YXRlTXV0YWJpbGl0eVwiOlwibm9ucGF5YWJsZVwiLFwidHlwZVwiOlwiZnVuY3Rpb25cIn0se1wiY29uc3RhbnRcIjp0cnVlLFwiaW5wdXRzXCI6W3tcIm5hbWVcIjpcIm51bWJlclwiLFwidHlwZVwiOlwidWludDI1NlwifV0sXCJuYW1lXCI6XCJmaWJvbmFjY2lcIixcIm91dHB1dHNcIjpbe1wibmFtZVwiOlwicmVzdWx0XCIsXCJ0eXBlXCI6XCJ1aW50MjU2XCJ9XSxcInBheWFibGVcIjpmYWxzZSxcInN0YXRlTXV0YWJpbGl0eVwiOlwidmlld1wiLFwidHlwZVwiOlwiZnVuY3Rpb25cIn0se1wiYW5vbnltb3VzXCI6ZmFsc2UsXCJpbnB1dHNcIjpbe1wiaW5kZXhlZFwiOmZhbHNlLFwibmFtZVwiOlwiaW5wdXRcIixcInR5cGVcIjpcInVpbnQyNTZcIn0se1wiaW5kZXhlZFwiOmZhbHNlLFwibmFtZVwiOlwicmVzdWx0XCIsXCJ0eXBlXCI6XCJ1aW50MjU2XCJ9XSxcIm5hbWVcIjpcIk5vdGlmeVwiLFwidHlwZVwiOlwiZXZlbnRcIn1dO1xuICAgICAgICBsZXQgbXlDb250cmFjdCA9IHRyb25XZWIuY29udHJhY3QoYWJpKTtcbiAgICAgICAgbGV0IGNvbnRyYWN0QWRkcmVzcyA9ICc0MTYwNjFlOTVmNmUzNjJlZmMzMTcwZmQ1MGFjMjIxOTdkOTExOWIwOWUnO1xuICAgICAgICBsZXQgY29udHJhY3RJbnN0YW5jZSA9IGF3YWl0IG15Q29udHJhY3QuYXQoY29udHJhY3RBZGRyZXNzKTtcbiAgICAgICAgbGV0IHsgdHJhbnNhY3Rpb24scmVzdWx0LGNvbnN0YW50X3Jlc3VsdCB9ID0gYXdhaXQgY29udHJhY3RJbnN0YW5jZS5maWJvbmFjY2lOb3RpZnkoNyx7XG4gICAgICAgICAgICBmZWVfbGltaXQ6NzAwMDAwMCxcbiAgICAgICAgICAgIGNhbGxfdmFsdWU6MFxuICAgICAgICB9KTtcbiAgICAgICAgaWYoIWNvbnN0YW50X3Jlc3VsdCl7XG4gICAgICAgICAgICBsZXQgcmVzID0gYXdhaXQgY29udHJhY3RJbnN0YW5jZS5maWJvbmFjY2lOb3RpZnkuc2VuZFRyYW5zYWN0aW9uKHRyYW5zYWN0aW9uLHRoaXMucGsudmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgZGF0YTpyZXNcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAvL+ebkeWQrOS6i+S7tlxuICAgICAgICAgICAgbGV0IG15RXZlbnQgPSBhd2FpdCBjb250cmFjdEluc3RhbmNlLk5vdGlmeSgpOy8v6buY6K6k5qC55o2u5ZCI57qm5Zyw5Z2A5p+l6K+i77yM5Y+v5Lul6L6T5YWle2V2ZW50TmFtZTonJyxibG9ja051bTonJyx0cmFuc2FjdGlvbklkOicnfVxuICAgICAgICAgICAgIG15RXZlbnQud2F0Y2goZnVuY3Rpb24oZXJyLHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgIGxldCBldmVudFJlc3VsdCA9ICcnO1xuICAgICAgICAgICAgICAgICByZXN1bHQuZm9yRWFjaCgoaXRlbSk9PntcbiAgICAgICAgICAgICAgICAgICAgIGlmKGl0ZW0udHJhbnNhY3Rpb25faWQgPT10cmFuc2FjdGlvbi50eElEKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICBldmVudFJlc3VsdCA9IGl0ZW0ucmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgIG15RXZlbnQuc3RvcFdhdGNoaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdldmVudFJlc3VsdDonLGV2ZW50UmVzdWx0KTtcbiAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgLy8gY29uc29sZS5sb2coZXZlbnRSZXN1bHQpXG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLy8zMOOAgWxvZ2luXG4gICAgbG9naW4oKXtcbiAgICAgICAgbGV0IGFjY291bnQgPSB0cm9uV2ViLmxvZ2luKHRyb25XZWIuZGVmYXVsdFBrKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBkYXRhOmFjY291bnRcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgY29uc3QgeyBkYXRhIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJveFwiIHN0eWxlPXt7bWFyZ2luVG9wOicyMDBweCd9fT5cbiAgICAgICAgICAgICAgICAgICAgPGgzPuW3peWFt+WHveaVsCAtIFRvb2wgZnVuY3Rpb248L2gzPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cInRvIEJpZ051bWJlclwiIG9uQ2xpY2s9eygpPT50aGlzLnRvQmlnTnVtYmVyKCl9Lz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxoMz7otKblj7fjgIHovazotKYgLSBBY2NvdW50IG51bWJlciwgdHJhbnNmZXI8L2gzPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAg6LSm5Y+3IC0gYWNjb3VudCBudW1iZXLvvJo8aW5wdXQgdHlwZT1cInRleHRcIiBzdHlsZT17e3dpZHRoOiczMDBweCd9fSByZWY9eyhpbnB1dCk9PnRoaXMuYWNjb3VudCA9aW5wdXR9IGRlZmF1bHRWYWx1ZT17dHJvbldlYi5kZWZhdWx0QWNjb3VudH0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsoKT0+dGhpcy5nZXRCYWxhbmNlKCl9IHZhbHVlPVwi5p+l6K+i6LSm5oi35L2Z6aKdIC0gQ2hlY2sgYWNjb3VudCBiYWxhbmNlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwidHJpZ2dlcldhbGxldFwiIG9uQ2xpY2s9eygpPT50aGlzLnRyaWdnZXJDaHJvbWVXYWxsZXQoKX0vPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCLnlJ/miJDnp4HpkqXlnLDlnYAgLSBHZW5lcmF0ZSBwcml2YXRlIGtleSBhZGRyZXNzKG9uTGluZSlcIiBvbkNsaWNrPXsoKT0+dGhpcy5nZW5lcmF0ZUFkZHJlc3MoKX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIueUn+aIkOengemSpeWcsOWdgCAtIEdlbmVyYXRlIHByaXZhdGUga2V5IGFkZHJlc3Mob25DbGllbnQpXCIgb25DbGljaz17KCk9PnRoaXMuZ2VuZXJhdGVBZGRyZXNzT25DbGllbnQoKX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwi6aqM6K+B5Zyw5Z2AIC0gVmVyaWZ5IGFkZHJlc3NcIiBvbkNsaWNrPXsoKT0+dGhpcy52YWxpZGF0ZUFkZHJlc3MoKX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwi6YCa6L+H5a+G56CB5Yib5bu65Zyw5Z2AIC0gQ3JlYXRlIGFuIGFkZHJlc3Mgd2l0aCBhIHBhc3N3b3JkXCIgb25DbGljaz17KCk9PnRoaXMuY3JlYXRlQWRkcmVzc1dpdGhQYXNzV29yZCgpfS8+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCLmm7TmlrDotKblj7flkI3np7AgLSBVcGRhdGUgYWNjb3VudCBuYW1lXCIgb25DbGljaz17KCk9PnRoaXMudXBkYXRlQWNjb3VudCgpfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aHIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGZvcm0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+PGxhYmVsPmZyb208L2xhYmVsPjxpbnB1dCB0eXBlPVwidGV4dFwiIHN0eWxlPXt7d2lkdGg6JzMwMHB4J319IHJlZj17KGlucHV0KT0+dGhpcy5mcm9tID1pbnB1dH0gZGVmYXVsdFZhbHVlPXt0cm9uV2ViLmRlZmF1bHRBY2NvdW50fS8+IDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD48bGFiZWw+dG88L2xhYmVsPjxpbnB1dCB0eXBlPVwidGV4dFwiIHN0eWxlPXt7d2lkdGg6JzMwMHB4J319IHJlZj17KGlucHV0KT0+dGhpcy50byA9aW5wdXR9IGRlZmF1bHRWYWx1ZT17YFRHaGVweUx1eU1MNW41alFCVHlrS3FoOW9kOGhRckJEa1NgfS8+IDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD48bGFiZWw+YW1vdW50PC9sYWJlbD48aW5wdXQgdHlwZT1cInRleHRcIiByZWY9eyhpbnB1dCk9PnRoaXMuYW1vdW50ID1pbnB1dH0gIGRlZmF1bHRWYWx1ZT17MTAwMDAwMH0gLz4gPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPjxsYWJlbD5wazwvbGFiZWw+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgIHN0eWxlPXt7d2lkdGg6JzUwMHB4J319cmVmPXsoaW5wdXQpPT50aGlzLnBrRm9yVHJhbnNhY3Rpb24gPWlucHV0fSBkZWZhdWx0VmFsdWU9e3Ryb25XZWIuZGVmYXVsdFBrfSAvPiA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsoZSk9PnRoaXMuc2VuZFRyYW5zYWN0aW9uKGUpfSB2YWx1ZT1cIui9rOi0piAtIFRyYW5zZmVyXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxoMz7oioLngrnmn6Xor6IgLSBOb2RlIHF1ZXJ5PC9oMz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCLmn6Xor6JBUEnmiYDlnKjmnLrlmajov57mjqXnmoToioLngrkgLSBRdWVyeSB0aGUgbm9kZSB0byB3aGljaCB0aGUgbWFjaGluZSB3aGVyZSB0aGUgQVBJIGlzIGNvbm5lY3RlZFwiIG9uQ2xpY2s9eygpPT50aGlzLmxpc3ROb2RlcygpfS8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8aDM+5Z2X5p+l6K+iIC0gQmxvY2sgcXVlcnk8L2gzPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAg5Z2XaWTmiJbpq5jluqYgLSBCbG9jayBpZCBvciBoZWlnaHTvvJo8aW5wdXQgdHlwZT1cInRleHRcIiBzdHlsZT17e3dpZHRoOic2MDBweCd9fSByZWY9eyhpbnB1dCk9PnRoaXMuaWRPckhlaWdodCA9aW5wdXR9IGRlZmF1bHRWYWx1ZT0nMDAwMDAwMDAwMDAwMDVhZTA3ZjQyNzc2YjNiZmQ4ZTg3M2ZlYWViZjJkNzQzYWNlYjcxNmRiNWY3MGNiMzczYicgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17KCk9PnRoaXMuZ2V0QmxvY2soKX0gdmFsdWU9XCLmn6Xor6LljLrlnZcgLSBRdWVyeSBibG9ja1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9eygpPT50aGlzLmdldEJsb2NrVHJhbnNhY3Rpb25Db3VudCgpfSB2YWx1ZT1cIuafpeivouWMuuWdl+WGheS6pOaYk+aVsOmHjyAtIFF1ZXJ5IHRoZSBudW1iZXIgb2YgdHJhbnNhY3Rpb25zIGluIHRoZSBibG9ja1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwi5p+l6K+i5pyA5paw5Z2XIC0gUXVlcnkgdGhlIGxhdGVzdCBibG9ja1wiIG9uQ2xpY2s9eygpPT50aGlzLmJsb2NrTnVtYmVyKCl9Lz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICB7Lyo8aW5wdXQgdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwi6YCa6L+H6auY5bqm6IyD5Zu05p+l6K+i5Z2XIC0gUXVlcnkgYmxvY2sgYnkgaGVpZ2h0IHJhbmdlXCIgb25DbGljaz17KCk9PnRoaXMuZ2V0QmxvY2tCeUxpbWl0TmV4dCgpfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwi5p+l6K+i5pyA6L+R55qE5Yeg5Liq5Z2XIC0gUXVlcnkgdGhlIG1vc3QgcmVjZW50IGJsb2Nrc1wiIG9uQ2xpY2s9eygpPT50aGlzLmdldEJsb2NrQnlMYXRlc3ROdW0oKX0vPiovfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGgzPuS6pOaYk+afpeivoiAtIFRyYW5zYWN0aW9uIGlucXVpcnk8L2gzPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAg5Lqk5piTaWQgLSBUcmFuc2FjdGlvbiBpZO+8mjxpbnB1dCB0eXBlPVwidGV4dFwiIHN0eWxlPXt7d2lkdGg6JzYwMHB4J319IHJlZj17KGlucHV0KT0+dGhpcy50cmFuc2FjdGlvbklkID1pbnB1dH0gZGVmYXVsdFZhbHVlPSdjNTIzZWRkN2I0Yjc3NmFhNDRlNGNkNGJiZGY5MjVjYjRlYjZkMDQ3ZTI3MzE2ZTFmZjkxOTAxNGNjNmE5ZjU0Jy8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwi6YCa6L+HaWTmn6Xor6LkuqTmmJPorrDlvZUgLSBRdWVyeSB0cmFuc2FjdGlvbiByZWNvcmRzIGJ5IGlkXCIgb25DbGljaz17KCk9PnRoaXMuZ2V0VHJhbnNhY3Rpb24oKX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIue7n+iuoeaJgOacieeahOS6pOaYk+aAu+aVsCAtIENvdW50IGFsbCB0cmFuc2FjdGlvbnNcIiBvbkNsaWNrPXsoKT0+dGhpcy50b3RhbFRyYW5zYWN0aW9uKCl9Lz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxoMz7otoXnuqfku6PooaggLSBTdXBlciBSZXByZXNlbnRhdGl2ZSAoU1IpPC9oMz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCLmn6Xor6LmiYDmnInotoXnuqfku6PooaggLSBRdWVyeSBhbGwgU1JcIiBvbkNsaWNrPXsoKT0+dGhpcy5saXN0V2l0TmVzc2VzKCl9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCLojrflj5bkuIvmrKHnu5/orqHmipXnpajml7bpl7QgLSBHZXQgdGhlIG5leHQgbWFpbnRlbmFuY2UgdGltZVwiIG9uQ2xpY2s9eygpPT50aGlzLmdldE5leHRNYWludGVuYW5jZVRpbWUoKX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIueUs+ivt+aIkOS4uui2hee6p+S7o+ihqCAtIEFwcGx5IHRvIGJlY29tZSBhIFNSXCIgb25DbGljaz17KCk9PnRoaXMuY3JlYXRlV2l0bmVzcygpfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwi5Li66LaF57qn5Luj6KGo5oqV56WoIC0gVm90ZSBmb3IgdGhlIFNSXCIgb25DbGljaz17KCk9PnRoaXMudm90ZVdpdG5lc3NBY2NvdW50KCl9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCLop6Plhrvnu5PmnZ/lhrvnu5PmnJ/nmoR0cnggLSBVbmZyZWV6ZSB0aGUgdHJ4IGF0IHRoZSBlbmQgb2YgdGhlIGZyZWV6ZSBwZXJpb2RcIiBvbkNsaWNrPXsoKT0+dGhpcy51bmZyZWV6ZUJhbGFuY2UoKX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIui2hee6p+S7o+ihqOaPkOeOsOWlluWKseWIsGJhbGFuY2UgLSBTUiB3aXRoZHJhd3MgdGhlIHJld2FyZCB0byBiYWxhbmNlXCIgb25DbGljaz17KCk9PnRoaXMud2l0aGRyYXdCYWxhbmNlKCl9Lz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxoMz50b2tlbueuoeeQhiAtIFRva2VuIG1hbmFnZW1lbnQ8L2gzPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPkJBTkRXSURUSDo8aW5wdXQgZGVmYXVsdENoZWNrZWQgcmVmPVwicmVzb3VyY2VcIiBuYW1lPVwicmVzb3VyY2VcIiBvbkNoYW5nZT17KCk9Pnt0aGlzLnNldFN0YXRlKHtyZXNvdXJjZTonQkFORFdJRFRIJ30pfX0gdHlwZT1cInJhZGlvXCIgIC8+PC9sYWJlbD48bGFiZWw+RU5FUkdZOjxpbnB1dCByZWY9XCJyZXNvdXJjZVwiIG5hbWU9XCJyZXNvdXJjZVwiIG9uQ2hhbmdlPXsoKT0+e3RoaXMuc2V0U3RhdGUoe3Jlc291cmNlOidFTkVSR1knfSl9fSB0eXBlPVwicmFkaW9cIiAvPjwvbGFiZWw+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgZGVmYXVsdFZhbHVlPVwiMTAwMDAwMFwiIHJlZj17aW5wdXQ9PnRoaXMuZnJvemVuX2JhbGFuY2UgPSBpbnB1dH0gIC8+PGlucHV0IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIuWGu+e7k+iOt+WPlui1hOa6kCAtIGZyZWV6ZSBnYWluIHJlc291cmNlXCIgb25DbGljaz17KCk9PnRoaXMuZnJlZXplQmFsYW5jZSgpfS8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIuafpeivouaJgOaciXRva2Vu5YiX6KGoIC0gUXVlcnkgYWxsIHRva2VuIGxpc3RzXCIgb25DbGljaz17KCk9PnRoaXMuZ2V0QXNzZXRJc3N1ZUxpc3QoKX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIuWIhumhteafpeivonRva2Vu5YiX6KGoIC0gUGFnaW5nIHF1ZXJ5IHRva2VuIGxpc3RcIiBvbkNsaWNrPXsoKT0+dGhpcy5nZXRQYWdpbmF0ZURhc3NldElzc3VlTGlzdCgpfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwi5p+l6K+i5p+Q6LSm5oi35Y+R6KGM55qEdG9rZW4gLSBRdWVyeSB0aGUgdG9rZW4gaXNzdWVkIGJ5IGFuIGFjY291bnRcIiBvbkNsaWNrPXsoKT0+dGhpcy5nZXRBc3NldElzc3VlQnlBY2NvdW50KCl9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCLmoLnmja7lkI3np7Dmn6Xor6J0b2tlbiAtIFF1ZXJ5IHRva2VuIGJ5IG5hbWVcIiBvbkNsaWNrPXsoKT0+dGhpcy5nZXRBc3NldElzc3VlQnlOYW1lKCl9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCLlj5HooYx0b2tlbiAtIElzc3VlIHRva2VuXCIgb25DbGljaz17KCk9PnRoaXMuY3JlYXRlQXNzZXRJc3N1ZSgpfSBzdHlsZT17e2NvbG9yOidyZWQnfX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIui9rOi0pnRva2VuIC0gVHJhbnNmZXIgdG9rZW5cIiBvbkNsaWNrPXsoKT0+dGhpcy50cmFuc2ZlckFzc2V0KCl9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCLkv67mlLl0b2tlbiAtIE1vZGlmeSB0b2tlblwiIG9uQ2xpY2s9eygpPT50aGlzLnVwZGF0ZUFzc2V0KCl9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCLop6Plhrt0b2tlbiAtIFVuZnJlZXplIHRoZSB0b2tlblwiIG9uQ2xpY2s9eygpPT50aGlzLnVuZnJlZXplQXNzZXQoKX0gc3R5bGU9e3tjb2xvcjoncmVkJ319Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCLlj4LkuI50b2tlbuWPkeihjCAtIFBhcnRpY2lwYXRlIGluIHRva2VuIGlzc3VhbmNlXCIgb25DbGljaz17KCk9PnRoaXMucGFydGljaXBhdGVBc3NldElzc3VlKCl9Lz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxoMz7mmbrog73lkIjnuqYgLSBTbWFydCBjb250cmFjdDwvaDM+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZvcm0gb25TdWJtaXQ9eyhlKT0+dGhpcy5kZXBsb3lDb250cmFjdChlKX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5vd25lcl9hZGRyZXNz77yaPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBzdHlsZT17e3dpZHRoOiczMDBweCd9fSByZWY9eyhpbnB1dCk9PnRoaXMub3duZXJfYWRkcmVzcz1pbnB1dH0gZGVmYXVsdFZhbHVlPXt0cm9uV2ViLmRlZmF1bHRBY2NvdW50fS8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPnBrOjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgc3R5bGU9e3t3aWR0aDonNTAwcHgnfX0gcmVmPXsoaW5wdXQpPT50aGlzLnBrID0gaW5wdXR9IGRlZmF1bHRWYWx1ZT17dHJvbldlYi5kZWZhdWx0UGt9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+QWJpPC9sYWJlbD48dGV4dGFyZWEgY29scz1cIjUwXCIgcm93cz1cIjEwXCIgcGxhY2Vob2xkZXI9XCJhYmlcIiBkZWZhdWx0VmFsdWU9JycgcmVmPXsoaW5wdXQpPT50aGlzLmFiaSA9IGlucHV0fT48L3RleHRhcmVhPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5ieXRlQ29kZTwvbGFiZWw+PHRleHRhcmVhICBjb2xzPVwiNTBcIiByb3dzPVwiMTBcIiBwbGFjZWhvbGRlcj0nYnl0ZUNvZGUnIGRlZmF1bHRWYWx1ZT0nJyByZWY9eyhpbnB1dCk9PnRoaXMuYnl0ZUNvZGUgPSBpbnB1dH0+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCA+ZmVlX2xpbWl077yaPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiByZWY9eyhpbnB1dCk9PnRoaXMuZmVlX2xpbWl0PWlucHV0fSBkZWZhdWx0VmFsdWU9e01hdGgucG93KDEwLDEwKX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCA+Y2FsbF92YWx1Ze+8mjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcmVmPXsoaW5wdXQpPT50aGlzLmNhbGxfdmFsdWU9aW5wdXR9IGRlZmF1bHRWYWx1ZT17MH0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCA+Y29uc3VtZV91c2VyX3Jlc291cmNlX3BlcmNlbnTvvJo8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHJlZj17KGlucHV0KT0+dGhpcy5jb25zdW1lX3VzZXJfcmVzb3VyY2VfcGVyY2VudD1pbnB1dH0gZGVmYXVsdFZhbHVlPXswfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIiB2YWx1ZT1cIumDqOe9suWQiOe6piAtIERlcGxveSBjb250cmFjdFwiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoci8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCA+5p+l6K+i5ZCI57qm5Zyw5Z2AIC0gUXVlcnkgY29udHJhY3QgYWRkcmVzc++8mjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgc3R5bGU9e3t3aWR0aDonMzAwcHgnfX0gcmVmPXsoaW5wdXQpPT50aGlzLmNvbnRyYWN0X2FkZHJlc3M9aW5wdXR9IGRlZmF1bHRWYWx1ZT17YGB9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwi5p+l6K+i5ZCI57qmIC0gUXVlcnkgY29udHJhY3RcIiBvbkNsaWNrPXsoKT0+dGhpcy5nZXRDb250cmFjdCgpfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIuiwg+eUqOWQiOe6piAtIENhbGwgY29udHJhY3RcIiBvbkNsaWNrPXsoKT0+e3RoaXMudHJpZ2dlckNvbnRyYWN0KCl9fS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIueZu+W9lSAtIGxvZ2luXCIgb25DbGljaz17KCk9PnRoaXMubG9naW4oKX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cblxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3twb3NpdGlvbjonZml4ZWQnLGxlZnQ6MCx0b3A6MH19PlxuICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWEgY29scz1cIjEwMFwiIHJvd3M9XCIxMFwiICB2YWx1ZT17c3RyaW5naWZ5KGRhdGEpfSBvbkNoYW5nZT17KCk9Pnt9fT48L3RleHRhcmVhPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxzdHlsZSBqc3g+e2BcblxuICAgICAgICAgICAgICAgICAgICBsYWJlbHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6aW5saW5lLWJsb2NrO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6MTUwcHg7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGB9XG4gICAgICAgICAgICAgICAgPC9zdHlsZT5cblxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgKVxuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEluZGV4Il19 */\n/*@ sourceURL=pages/index.js */"
      }));
    }
  }]);

  return Index;
}(__WEBPACK_IMPORTED_MODULE_2_react___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (Index);

/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./pages/index.js");


/***/ }),

/***/ "@babel/runtime/regenerator":
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/regenerator");

/***/ }),

/***/ "axios":
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "bignumber.js":
/***/ (function(module, exports) {

module.exports = require("bignumber.js");

/***/ }),

/***/ "elliptic":
/***/ (function(module, exports) {

module.exports = require("elliptic");

/***/ }),

/***/ "ethers":
/***/ (function(module, exports) {

module.exports = require("ethers");

/***/ }),

/***/ "js-sha3":
/***/ (function(module, exports) {

module.exports = require("js-sha3");

/***/ }),

/***/ "json-stringify-pretty-compact":
/***/ (function(module, exports) {

module.exports = require("json-stringify-pretty-compact");

/***/ }),

/***/ "react":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "styled-jsx/style":
/***/ (function(module, exports) {

module.exports = require("styled-jsx/style");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map