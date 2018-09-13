import xhr from 'axios'
import { address2HexString, stringUtf8toHex, hexString2Address, hexString2Utf8 } from './utils/help'
import { parseAbi } from "./private";
import { generateAccount } from './utils/account'
import { signTransaction, pkToAddress } from './utils/crypto'
import { utils } from 'ethers'
import { BigNumber } from 'bignumber.js'

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
            return address2HexString(str);

        return stringUtf8toHex(str);
    }

    fromHex(hex) {
        // For converting addresses
        if(hex.length == 42 && hex.substr(0, 2) === '41')
            return hexString2Address(sHex);

        return hexString2Utf8(sHex);
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
        return pkToAddress(privateKey);
    }

    /**
     * Queries the node to fetch an account's balance
     * @param {string} address
     * @return {object}
     **/
    async getBalance(address) {
        const { data } = await xhr.post(`${this.apiUrl}/wallet/getaccount`, {
            address: address2HexString(address)
        });

        return data;
    }

    /**
     * Query the latest block
     * @return {object}
     **/
    async latestBlockNumber() {
        const { data } = await xhr.post(`${this.apiUrl}/wallet/getnowblock`);
        return data;
    }

    /**
     * Query the block by hashString or blockNumber
     * @param {string|number} blockIdentifier Either a block hash or block number 
     * @return {object}
     **/
    async getBlock(blockIdentifier) {
        if(isNaN(blockIdentifier)) {
            const { data } = await xhr.post(`${this.apiUrl}/wallet/getblockbyid`, { value: blockIdentifier });
            return data;
        }

        const { data } = await xhr.post(`${this.apiUrl}/wallet/getblockbynum`, { num: parseInt(blockIdentifier) });
        return data;
    }

    async getBlockByHash(blockHash) {
        const { data } = await xhr.post(`${this.apiUrl}/wallet/getblockbyid`, { value: blockHash });
        return data;
    }

    async getBlockByNumber(blockNumber) {
        const { data } = await xhr.post(`${this.apiUrl}/wallet/getblockbynum`, { num: parseInt(blockNumber) });
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
        const { data } = await xhr.post(`${this.apiUrl}/wallet/gettransactionbyid`, { value: transactionID });
        return data;
    }
    /**
     * Fetch total amount of transactions on the blockchain
     * @returns {number} Total amount of transactions found
     **/
    async getTransactionCount() {
        let {data} = await xhr.post(`${this.apiUrl}/wallet/totaltransaction`);
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
        
        return { ...response, signedTransaction };
    }

    /**
     * Creates an unsigned TRX transfer transaction
     * @param {string} from The address of the sender
     * @param {string} to The address of the recipient
     * @param {number} amount The amount of TRX to send (in SUN)
     * @return {object} transaction
     **/
    async createTransaction(from, to, amount) {
        const { data } = await xhr.post(`${this.apiUrl}/wallet/createtransaction`,{
            to_address: address2HexString(to),
            owner_address: address2HexString(from),
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

        return signTransaction(privateKey, transaction);
    }

    /**
     * Broadcasts a signed transaction
     * @param {object} signedTransaction Signed transaction object
     * @return {object}
     **/
    async sendRawTransaction(signedTransaction) {
        const { data } = await xhr.post(`${this.apiUrl}/wallet/broadcasttransaction`, signedTransaction);
        return data;
    }

    /**
     * Change the account name (only once)
     * @param {string} address The address of the name to change
     * @param {string} newName The new name for the account
     * @return {object}
     **/
    async changeAccountName(address, newName) {
        const { data } = await xhr.post(`${this.apiUrl}/wallet/updateaccount`, {
            account_name: stringUtf8toHex(newName),
            owner_address: address2HexString(address)
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
            vote_address: address2HexString(srAddress),
            vote_count: voteCount
        }));
        
        const { data } = await xhr.post(`${this.apiUrl}/wallet/votewitnessaccount`, {
            owner_address: address2HexString(address),
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

        const { data } = await xhr.post(`${this.apiUrl}/wallet/createassetissue`, {
            owner_address: address2HexString(owner_address),
            name: stringUtf8toHex(name),
            abbr: stringUtf8toHex(abbr),
            description: stringUtf8toHex(description),
            url: stringUtf8toHex(url),
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
        const { data } = await xhr.post(`${this.apiUrl}/wallet/createaccount`,{
            owner_address: address2HexString(address),
            account_address: address2HexString(newAccountAddress)
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
        const { data } = await xhr.post(`${this.apiUrl}/wallet/createwitness`,{
            owner_address: address2HexString(address),
            url: stringUtf8toHex(url)
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
        const { data } = await xhr.post(`${this.apiUrl}/wallet/transferasset`, {
            owner_address: address2HexString(from),
            to_address: address2HexString(to),
            asset_name: stringUtf8toHex(assetID),
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
        const { data } = await xhr.post(`${this.apiUrl}/wallet/easytransfer`, {
            passPhrase: stringUtf8toHex(password),
            toAddress: address2HexString(to),
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
        const { data } = await xhr.post(`${this.apiUrl}/wallet/createaddress`, {
            value: stringUtf8toHex(password)
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
        const { data } = await xhr.post(`${this.apiUrl}/wallet/participateassetissue`, {
            to_address: address2HexString(tokenIssuer),
            owner_address: address2HexString(address),
            asset_name: stringUtf8toHex(assetID),
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
        const { data } = await xhr.post(`${this.apiUrl}/wallet/freezebalance`, {
            owner_address: address2HexString(address),
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
        const { data } = xhr.post(`${this.apiUrl}/wallet/unfreezebalance`, {
            owner_address: address2HexString(address)
        });

        return data;
    }

    /**
     * Creates an unfreeze asset transaction (used for accounts that have created a frozen asset)
     * @param {string} address The address of the account requesting the unfreeze
     * @return {object} transaction
     **/
    async createUnfreezeAssetTransaction(address) {
        const { data } = await xhr.post(`${this.apiUrl}/wallet/unfreezeasset`, {
            owner_address: address2HexString(address)
        });

        return data;
    }

    /**
     * Creates a transaction for SRs to withdraw their block rewards
     * @param {string} address Address of the account requesting the withdraw
     * @return {object} transaction
     **/
    async createWithdrawBlockRewardTransaction(address) {
        const { data } = await xhr.post(`${this.apiUrl}/wallet/withdrawbalance`, {
            owner_address: address2HexString(address)
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
        const { data } = await xhr.post(`${this.apiUrl}/wallet/updateasset`,{
            owner_address: address2HexString(address),
            description: stringUtf8toHex(description),
            url: stringUtf8toHex(url),
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
        const { data } = await xhr.post(`${this.apiUrl}/wallet/listnodes`);
        return data;
    }

    /**
     * Attempts to find a token given the account address that issued it
     * @param {string} address Address of the account to check
     * @return {object}
     **/
    async getTokenFromAddress(address) {
        const { data } = await xhr.post(`${this.apiUrl}/wallet/getassetissuebyaccount`, {
            address: address2HexString(address)
        });

        return data;
    }

    /**
     * Fetches the available bandwidth amount for a specific account
     * @param {string} address
     * @return {object}
     **/
    async getAccountBandwidth(address) {
        const { data } = await xhr.post(`${this.apiUrl}/wallet/getaccountnet`, { 
            address: address2HexString(address)
        });

        return data;
    }

    /**
     * Attempts to find a token given its name
     * @param {string} name The name of the token
     * @return {object}
     **/
    async getAssetIssueFromName(name) {
        const { data } = await xhr.post(`${this.apiUrl}/wallet/getassetissuebyname`, {
            value: stringUtf8toHex(name)
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
        const { data } = await xhr.post(`${this.apiUrl}/wallet/getblockbylimitnext`, {
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
        const { data } = await xhr.post(`${this.apiUrl}/wallet/getblockbylatestnum`, {
            num: limit 
        });

        return data;
    }
   

    /**
     * Fetches a list of Super Representatives
     * @returns {Array}
     **/
    async listSuperRepresentatives() {
        const { data } = await xhr.post(`${this.apiUrl}/wallet/listwitnesses`);
        return data;
    }

    /**
     * Fetches a list of issued tokens
     * @returns {Array}
     **/
    async listAssets() {
        const { data } = await xhr.post(`${this.apiUrl}/wallet/getassetissuelist`);
        return data;
    }

    /**
     * Fetches a paginated list of issued tokens
     * @param {number} limit The amount of tokens to return
     * @param {number} [offset=0] The offset of the pagination
     * @returns {Array} 
     **/
    async listAssetsPaginated(limit, offset = 0) {
        const { data } = await xhr.post(`${this.apiUrl}/wallet/getpaginatedassetissuelist`, {
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
        const { data } = await xhr.post(`${this.apiUrl}/wallet/getnextmaintenancetime`);
        return data;
    }

    /**
     * Generates an account locally, giving it's private key and address.
     * @return {object}
     **/
    async generateAccount() {
        return generateAccount();
    }

    /**
     * Validates an address
     * @param {string} address
     * @return {object}
     **/
    async validateAddress(address) {
        const { data } = await xhr.post(`${this.apiUrl}/wallet/validateaddress`, { address });
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
    async createDeployContractTransaction(abi, bytecode, feeLimit, address, callValue = 0, bandwidthLimit = 0) {
        const payable = JSON.parse(abi).some(v => v.payable);

        if(feeLimit > 1000000000)
            throw new Error('fee_limit must not be greater than 1000000000');

        if(payable && callValue <= 0)
            throw new Error('call_value must be greater than 0 if contract is type payable');
        
        if(payable && callValue)
            throw new Error('call_value can only be greater than 0 if contract is type payable');

        const { data } = await xhr.post(`${this.apiUrl}/wallet/deploycontract`, {
            owner_address: address2HexString(address),            
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
        const { data } = await xhr.post(`${this.apiUrl}/wallet/getcontract`, {
            value: address2HexString(contractAddress)
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
    async createTriggerContractTransaction(contractAddress, functionSelector, callValue, feeLimit, address, parameters = []) {
        functionSelector = functionSelector.replace(/\s*/g, '');

        if(parameters || parameters.length) {
            const encoder = new utils.AbiCoder();
            const [ types, values ] = parameters;

            types.forEach((itemType, index ) => {
                if(itemType == 'address')
                    values[index] = address2HexString(values[index]).replace(/^(41)/, '0x');
            });

            parameter = encoder.encode(paramTypes, paramValues).replace(/^(0x)/, '');
        }

        const { data } = await xhr.post(`${this.apiUrl}/wallet/triggersmartcontract`,{
            contract_address: address2HexString(contractAddress),
            owner_address: address2HexString(address),
            function_selector: functionSelector,
            parameter: parameters,
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

        return xhr.get(requestUrl);
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

                const abiObj = parseAbi.call(_this, abiArray, {
                    owner_address: _this.defaultAccount,
                    contract_address                        
                });

                return { address: contract_address, ...abiObj };
            },
            new: async function(options, pk) {
                const bytecode = options.data;
                const owner_address = options.from || _this.defaultAccount;
                const fee_limit = options.fee_limit;
                const call_value = options.call_value;
                const consume_user_resource_percent = options.consume_user_resource_percent;
                const abi =JSON.stringify(abiArray);

                const res = await _this.deployContract({
                    abi,
                    bytecode,
                    fee_limit,
                    call_value,
                    owner_address,
                    consume_user_resource_percent
                });

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

                    return { ...(await this.at(returnRes.address)), ...returnRes }; 
                }
                
                return res;             
            }
        }
    }

    toBigNumber(str) {
        return BigNumber(str);
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

    trxToSun(trxCount) {
        return Math.abs(trxCount) * Math.pow(10, 6);
    }

    sunToTrx(sunCount) {
        return Math.abs(sunCount) / Math.pow(10, 6);
    }

}
export default TronWeb;