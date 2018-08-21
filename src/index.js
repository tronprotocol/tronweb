import xhr from 'axios'
import  {address2HexString,stringUtf8toHex,hexString2Address,hexString2Utf8} from './utils/help'
import {parseAbi} from "./private";
import { generateAccount } from './utils/account'
import {signTransaction} from './utils/crypto'
import {utils} from 'ethers'
import {BigNumber} from 'bignumber.js'

class TronWeb {
    constructor(apiUrl,tronInfuraUrl) {
        this.apiUrl = apiUrl;
        this.defaultAccount='';
        this.defaultPk='';
        this.tronInfuraUrl = tronInfuraUrl;
        //xhr.defaults.baseURL = this.apiUrl;
    }
    toHex(str){
        //address
        if(str.length==34&&str.indexOf('T')==0){
            return address2HexString(str)
        }
        return stringUtf8toHex(str)
    }
    fromHex(sHex){
        if(sHex.length==42&&sHex.indexOf('41')==0){
            return hexString2Address(sHex)
        }
        return hexString2Utf8(sHex)
    }
    setFullNodeServer(value){
        this.apiUrl = value;
    }
    setEventServer(value = 'http://52.44.75.99:18889'){
        this.tronInfuraUrl = value;
    }
    /**
     * Obtain account balance
     * @param {string} address
     * @return {object}
     **/
    async getBalance(address){
        let {data} = await xhr.post(`${this.apiUrl}/wallet/getaccount`,{
            address : address2HexString(address)
        })
        return data;
    }

    /**
     * Query the latest block
     * @param null
     * @return {object}
     * */
    async blockNumber(){
        let  { data }= await xhr.post(`${this.apiUrl}/wallet/getnowblock`)
        return data;
    }

    /**
     * Query the block by hashString or blockNumber
     * parms {string or number} 
     * @return {object}
     */
    async getBlock(hashStringOrBlockNumber){
        let data;
        if(isNaN(hashStringOrBlockNumber)){
            data = await xhr.post(`${this.apiUrl}/wallet/getblockbyid`,{value:hashStringOrBlockNumber})
        }else{
            hashStringOrBlockNumber = typeof hashStringOrBlockNumber === 'number' ? hashStringOrBlockNumber : parseInt(hashStringOrBlockNumber);
            data = await xhr.post(`${this.apiUrl}/wallet/getblockbynum`,{num:hashStringOrBlockNumber})
        }
        return data.data;
    }

    /**
     * Query the count of transaction in a block by hashString or blockNumber
     * params {string or number} 
     * @return {object}
     */
    async getBlockTransactionCount(hashStringOrBlockNumber){
        const {data} = await this.getBlock(hashStringOrBlockNumber)
        return {count:data.transactions?data.transactions.length:0};
    }

    /**
     * Query a transactional information by hash string of txId 
     * params {string or number} 
     * @return {object}
     */
    async getTransaction(id){
        const {data} = await xhr.post(`${this.apiUrl}/wallet/gettransactionbyid`,{value:id})
        return data;
    }
    /**
     * Total all transactions
     * @param null
     * @returns {object} {num:11111}
     * */
    async getTransactionCount(){
        let {data} = await xhr.post(`${this.apiUrl}/wallet/totaltransaction`);
        return data.num;
    }
    /**
     * A transaction that sends a transfer
     * @param {string} from ,{string} to ,{int} amount,
     * @return {object} transaction
     * */
    async sendTransaction(from,to,amount,privateKey){
        try{
            if(!privateKey){
                throw "please input privateKey！";
            }
            const transaction = await this.createTransaction(to,from,amount)
            const signTransaction = await this.signTransaction(transaction,privateKey,0);
            return await this.sendRawTransaction(signTransaction);
        }catch(err){
            console.error(err);
        }
    }

    /**
     * Create a transfer transaction,If the to address for the transfer does not exist, create the account on the blockchain  
     * @param {string} to_address,{string} owner_address,{int} amount
     * @return {object} transaction
     * */
    async createTransaction(to_address,owner_address,amount){
        let {data} = await xhr.post(`${this.apiUrl}/wallet/createtransaction`,{
            to_address:address2HexString(to_address),
            owner_address:address2HexString(owner_address),
            amount
        })
        return data;
    }
    /**
     * Sign a transaction，this api maybe leak the private key,so apply this api in a safe environment please.
     * @param {object} transaction，{string} privateKey,{int} teriminal 0: client, 1: service
     * @return {object} transaction
     *
     * */

    async signTransaction(transaction,privateKey,teriminal=0){
        if(teriminal==0){
            return signTransaction(privateKey,transaction);
        } else {
            let {data} = await xhr.post(`${this.apiUrl}/wallet/gettransactionsign`,{
                transaction : transaction,
                privateKey : privateKey
            })
            return data;
        }
    }
    /**
     * Broadcast signed transactions。
     * @param {object} signTransaction
     * @return {object} {result:true}
     * */
    async sendRawTransaction(signTransaction){
        let {data} = await xhr.post(`${this.apiUrl}/wallet/broadcasttransaction`,signTransaction)
        return data;
    }
    /**
     * Change the account name (only once)
     * @param {string} account_name,{string} owner_address
     * @return {object}
     * */
    async updateAccount(account_name,owner_address){
        let {data} = await xhr.post(`${this.apiUrl}/wallet/updateaccount`,{
            account_name:stringUtf8toHex(account_name),
            owner_address:address2HexString(owner_address)
        })
        return data;
    }
    /**
     * Vote on superdelegates
     * @param {string} owner_address, {object} votes example:
     * [{"vote_address": "41e552f6487585c2b58bc2c9bb4492bc1f17132cd0", "vote_count": 5}]
     *
     * */
    async voteWitnessAccount(owner_address,votes){
        let newVotes = votes.map((item)=>{
            return {
                vote_count:item.vote_count,
                vote_address:address2HexString(item.vote_address)
            }
        })
        let {data} = await xhr.post(`${this.apiUrl}/wallet/votewitnessaccount`,{
            owner_address:address2HexString(owner_address),
            votes:newVotes
        })
        return data;
    }

    /**
     * Publish the Token
     * @param {object} oToken: {
        "owner_address":"41e552f6487585c2b58bc2c9bb4492bc1f17132cd0",
        "name":"0x6173736574497373756531353330383934333132313538",
        "abbr": "0x6162627231353330383934333132313538",
        "total_supply" :4321,
        "trx_num":1,
        "num":1,
        "start_time" : 1530894315158,
        "end_time":1533894312158,
        "description":"007570646174654e616d6531353330363038383733343633",
        "url":"007570646174654e616d6531353330363038383733343633",
        "free_asset_net_limit":10000,
        "public_free_asset_net_limit":10000,
        "frozen_supply":{"frozen_amount":1, "frozen_days":2}
        }
     *
     * */
    async createToken(oToken){
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
        } = oToken;
        owner_address = address2HexString(owner_address);
        name = stringUtf8toHex(name);
        abbr=stringUtf8toHex(abbr);
        description=stringUtf8toHex(description);
        url = stringUtf8toHex(url);
        let {data} = await xhr.post(`${this.apiUrl}/createassetissue`,{
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
        })
        return data;

    }

    /**
     * Create account
     * @param {string} owner_address,{string} account_address
     * */
    async createAccount(owner_address,account_address){
        let {data} = await xhr.post(`${this.apiUrl}/wallet/createaccount`,{
            owner_address:address2HexString(owner_address),
            account_address:address2HexString(account_address)
        })
        return data;
    }

    /**
     * Apply to be a super delegate
     * @param {string} owner_address,{string} url
     * @return {object} transaction
     * */
    async createWitness(owner_address,url){
        let {data}=await xhr.post(`${this.apiUrl}/wallet/createwitness`,{
            owner_address:address2HexString(owner_address),
            url:stringUtf8toHex(url)
        })
        return data;
    }
    /**Transfer the Token
     * @param {object} options {{"owner_address":"Txxxxxxx...", "to_address": "Txxxxxxx...", "asset_name": "a token", "amount": 100}}
     * @return {object} transaction
     *
     * */
    async transferAsset(options){
        let {owner_address,to_address,asset_name,amount} = options;
        owner_address = address2HexString(owner_address);
        to_address = address2HexString(to_address);
        asset_name = stringUtf8toHex(asset_name);

        let {data} = await xhr.post(`${this.apiUrl}/wallet/transferasset`,{
            owner_address,to_address,asset_name,amount
        })
        return data;
    }
    /**
     * Quick transfer,this api maybe leak the private key,so call this api in a safe environment please.(before call this api,please call createAddress api to generate the address)
     * @param {string} passPhrase,{string} toAddress, {int} amount
     * @return {object}
     * */
    async easytransfer(passPhrase,toAddress,amount) {
        let { data } = await xhr.post(`${this.apiUrl}/wallet/easytransfer`,{
            passPhrase:stringUtf8toHex(passPhrase),
            toAddress:address2HexString(toAddress),
            amount
        })
        return data;
    }

    /**
     * Create an address with a password,this api maybe leak the password,so call this api in a safe environment please.
     * @param {string} password
     * @return {object}
     * */
    async createAddress(password){
        let {data} = await xhr.post(`${this.apiUrl}/wallet/createaddress`,{
            value: stringUtf8toHex(password)
        })
        return data;
    }

    /**
     * Participate in token issuance
     * @param {object} {
                "to_address": "41e552f6487585c2b58bc2c9bb4492bc1f17132cd0",
                "owner_address":"41e472f387585c2b58bc2c9bb4492bc1f17342cd1",
                "amount":100,
                "asset_name":"3230313271756265696a696e67"
               }
     * @return {object} transaction
     * */
    async participateAssetIssue(options){
        let {to_address,owner_address,amount,asset_name} = options;
        to_address = address2HexString(to_address);
        owner_address = address2HexString(owner_address);
        asset_name = stringUtf8toHex(asset_name);

        let {data} = await xhr.post(`${this.apiUrl}/wallet/participateassetissue`,{
            to_address,
            owner_address,
            amount,
            asset_name
        });
        return data;
    }
    /**
     * Freeze TRX, gain bandwidth, gain voting rights
     * @param {string} owner_address,{float} frozen_balance,{int} frozen_duration
     * @return {object} transaction
     * */
    async freezeBalance(owner_address,frozen_balance,frozen_duration){
        owner_address = address2HexString(owner_address);
        let {data} = await xhr.post(`${this.apiUrl}/wallet/freezebalance`,{
            owner_address,
            frozen_balance,
            frozen_duration
        })
        return data;
    }

    /**
     * The thawing of TRX that has ended the freeze will also lose the bandwidth and voting power that this part of TRX brings
     * @param {string} owner_address
     * @return {object} transaction
     * */
    async unfreezeBalance(owner_address){
        owner_address = address2HexString(owner_address);
        let {data} = xhr.post(`${this.apiUrl}/wallet/unfreezebalance`,{
            owner_address
        })
        return data;
    }

    /**
     * Thawing has ended the Token freeze
     * @param {string} owner_address
     * @return {object} transaction
     * */
    async unfreezeAsset(owner_address){
        owner_address = address2HexString(owner_address);
        let {data} = await xhr.post(`${this.apiUrl}/wallet/unfreezeasset`,{
            owner_address
        })
        return data;
    }
    /**
     * Superdelegates represent rewards to balance, which can be withdrawn every 24 hours
     * @param {string} owner_address
     * @return {object} transaction
     */
    async withdrawBalance(owner_address){
        owner_address = address2HexString(owner_address);
        let {data} = await xhr.post(`${this.apiUrl}/wallet/withdrawbalance`,{
            owner_address
        })
        return data;
    }
    /**
     * Modify token information
     * @param {string} owner_address,{string} description,{string} url,{int} new_limit,{int} new_public_limit
     * @return {object} transaction
     * */
    async updateAsset(options){
        let {owner_address,description,url,new_limit,new_public_limit} = options;
        owner_address = address2HexString(owner_address);
        description = stringUtf8toHex(description);
        url = stringUtf8toHex(url);
        let {data} = await xhr.post(`${this.apiUrl}/wallet/updateasset`,{
            owner_address,description,url,new_limit,new_public_limit
        })
        return data;
    }
    /**
     * Query the node on which the API is connected
     * @param null
     * @return {object Array}
     * */
    async listNodes(){
        let {data} = await xhr.post(`${this.apiUrl}/wallet/listnodes`);
        return data;
    }
    /**
     * Check the token issued by the account
     * @param {string} address
     * @return {object}
     * */
    async getAssetIssueByAccount(address){
        address = address2HexString(address);
        let {data} = await xhr.post(`${this.apiUrl}/wallet/getassetissuebyaccount`,{address})
        return data;
    }
    /**
     * Query bandwidth information
     * @param {string} address
     * @return {object}
     * */
    async getAccountNet(address){
        address = address2HexString(address);
        let {data} = await xhr.post(`${this.apiUrl}/wallet/getaccountnet`,{address})
        return data;
    }
    /**
     * Query token by name
     * @param {string} value
     * @return {object}
     * */
    async getAssetIssueByName(value){
        value = stringUtf8toHex(value);
        let {data} = await xhr.post(`${this.apiUrl}/wallet/getassetissuebyname`,{value})
        return data;
    }
   
    /**
     * Query blocks by scope
     * @param {int} startNum,{int} endNum
     * @return {object}
     * */
    async getBlockByLimitNext(startNum,endNum){
        let {data} = await xhr.post(`${this.apiUrl}/wallet/getblockbylimitnext`,{startNum,endNum});
        return data;
    }

    /**
     * Query the latest blocks
     * @param {int} num
     * @return {object}
     * */
    async getBlockByLatestNum(num){
        let {data} = await xhr.post(`${this.apiUrl}/wallet/getblockbylatestnum`,{num});
        return data;
    }
   

    /**
     * query all withnesses list
     * @param null
     * @returns {Array}
     * */
    async listWitNesses(){
        let {data} = await xhr.post(`${this.apiUrl}/wallet/listwitnesses`)
        return data;
    }
    /**
     * query all token list
     * @returns {Array}
     * */
    async getAssetIssueList(){
        let {data} = await xhr.post(`${this.apiUrl}/wallet/getassetissuelist`)
        return data;
    }
    /**
     * query token list by page
     * @param {int} offset {int} limit
     * @returns {Array} 
     * */
    async getPaginateDassetIssueList(offset,limit){
        let {data} = await xhr.post(`${this.apiUrl}/wallet/getpaginatedassetissuelist`,{offset,limit})
        return data;
    }
    
    /**
     * Get the time for the next count
     * @param null
     * @returns {object} {num:time stamp}
     * */
    async getNextMainteNanceTime(){
        let {data} = await xhr.post(`${this.apiUrl}/wallet/getnextmaintenancetime`);
        return data;
    }

    /**
     * Quick transfer
     * @param {string}privateKey,{string} toAddress,{int} amount
     * @return {object}
     * */
    async easyTransferByPrivate(privateKey,toAddress,amount){
        privateKey = stringUtf8toHex(privateKey);
        toAddress = address2HexString(toAddress);
        let {data} = await xhr.post(`${this.apiUrl}/wallet/easytransferbyprivate`,{
            privateKey,toAddress,amount
        })
        return data;
    }
    /**
     * Generate private keys and addresses online
     * @param null
     * @return {object}
     * */
    async generateAddressOnLine(){
        let {data} = await xhr.post(`${this.apiUrl}/wallet/generateaddress`)
        return data;
    }
    /**
     * Generate private keys and addresses locally
     * @param null
     * @return {object}
     * */
    async generateAddressOnClient(){
        let data = await generateAccount();
        return data;
    }


    /**
     * Check that the address is correct
     * @param {string hexString} address
     * @return {object}
     * */
    async validateAddress(address){
        address = address2HexString(address);
        let {data} = await xhr.post(`${this.apiUrl}/wallet/validateaddress`,{address})
        return data;
    }
    /**
     * Deploy contract
     * @param
     * {string} abi,
     * {string} bytecode,
     * {int} bandwidth_limit 字节数,
     * {int} cpu_limit 微秒,
     * {int} storage_limit 字节数
     * {int} drop_limit 最大消耗的Drop (1trx = 1000000drop)
     * {int} call_value 本次调用网合约转账的Drop (1trx = 1000000drop)
     * {string hexString} owner_address 发起部署合约的账户地址
     * @return {object transction}
     * */
    async deployContract(options){
        let {abi,bytecode,fee_limit,call_value,owner_address,consume_user_resource_percent} = options;
        owner_address = address2HexString(owner_address);
        let {data} = await xhr.post(`${this.apiUrl}/wallet/deploycontract`,{
            abi,
            bytecode,
            fee_limit,
            call_value,
            owner_address,
            consume_user_resource_percent
        })
        return data;
    }

    async getContract(contractAddress){
        let {data} = await xhr.post(`${this.apiUrl}/wallet/getcontract`,{
            value:address2HexString(contractAddress)
        })
        return data;
    }

    async triggerSmartContract(options){
        let coder = new utils.AbiCoder()
        let {
            contract_address,
            function_selector,
            parameter,
            fee_limit,
            call_value,
            owner_address
        } = options
        contract_address = address2HexString(contract_address);
        function_selector = function_selector.replace(/\s*/g,'');
        if(parameter||parameter.length){
            let paramTypes = parameter[0];
            let paramValues = parameter[1];
            paramTypes.forEach((itemType,index)=>{
                if(itemType =='address'){
                    paramValues[index] = address2HexString(paramValues[index]).replace(/^(41)/,'0x');
                }
            })
            parameter = coder.encode(paramTypes,paramValues).replace(/^(0x)/,'');
        }

        owner_address = address2HexString(owner_address);

        let { data } = await xhr.post(`${this.apiUrl}/wallet/triggersmartcontract`,{
            contract_address,
            function_selector,
            parameter,
            fee_limit,
            call_value,
            owner_address
        })

        return data;
    }

    async getEventResult({contractAddress,eventName,blockNum,transactionId}) {
        let requestUrl = `${this.tronInfuraUrl}/event/contract`;
        if(contractAddress){
            requestUrl+=`/${contractAddress}`
        }
        if(eventName){
            requestUrl+=`/${eventName}`
        }
        if(blockNum){
            requestUrl+=`/${blockNum}`
        }
        if(transactionId){
            requestUrl = `${this.tronInfuraUrl}/event/transaction/${transactionId}`
        }
        let result = await xhr.get(requestUrl);
        return result;
    }

    contract(abiArray){
        let _this = this;
        return {
            abi: abiArray,
            at: async function(address) {
                if (address) {
                    let { contract_address,origin_address } = await _this.getContract(address);
                    let abiObj = parseAbi.call(_this,abiArray,{contract_address,owner_address:origin_address|| _this.defaultAccount})
                    let contractInstance = Object.assign({address:contract_address},abiObj);
                    console.log('contractInstance:',contractInstance);
                    return contractInstance;
                }
                return new Object();
            },
            new: async function(options,pk) {
                let _self = this;
                let bytecode = options.data;
                let owner_address = options.from;
                let fee_limit = options.fee_limit;
                let call_value = options.call_value;
                let consume_user_resource_percent = options.consume_user_resource_percent;
                let abi =JSON.stringify(abiArray);
                let res = await _this.deployContract({
                    abi,
                    bytecode,
                    fee_limit,
                    call_value,
                    owner_address,
                    consume_user_resource_percent
                })
                let returnRes ={transactionHash:res.txID,address:res.contract_address}
                if(Object.keys(res).indexOf('txID')>-1){
                    const signTransaction = await _this.signTransaction(res,pk)
                    //广播交易
                    const result = await _this.sendRawTransaction(signTransaction);
                    if(result){
                        returnRes.broadCast = true;
                    }

                }
                let contractInstance = await _self.at(returnRes.address);
                return Object.assign(contractInstance,returnRes);
            }
        }
    }

    toBigNumber(str){
        console.log(this.defaultAccount)
        return BigNumber(str)
    }

}
export default TronWeb;
