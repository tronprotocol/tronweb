import { TronWeb } from '../tronweb.js';
import utils from '../utils/index.js';
import { keccak256, toUtf8Bytes, recoverAddress, SigningKey, Signature } from '../utils/ethersUtils.js';
import { ADDRESS_PREFIX, toHex } from '../utils/address.js';
import { Validator } from '../paramValidator/index.js';
import { txCheck } from '../utils/transaction.js';
import { ecRecover } from '../utils/crypto.js';
import { Block, GetTransactionResponse } from '../types/APIResponse.js';
import {
    Token,
    Account,
    AccountNetMessage,
    Witness,
    TransactionSignWeight,
    BroadcastReturn,
    AddressOptions,
    Proposal,
    ChainParameter,
    BroadcastHexReturn,
    AccountResourceMessage,
    Address,
    Exchange,
    TransactionInfo,
} from '../types/Trx.js';
import { SignedTransaction, Transaction } from '../types/Transaction.js';
import { TypedDataDomain, TypedDataField } from '../utils/typedData.js';
import { Resource } from '../types/TransactionBuilder.js';

const TRX_MESSAGE_HEADER = '\x19TRON Signed Message:\n32';
// it should be: '\x15TRON Signed Message:\n32';
const ETH_MESSAGE_HEADER = '\x19Ethereum Signed Message:\n32';

type SignedStringOrSignedTransaction<T extends string | Transaction | SignedTransaction> = T extends string
    ? string
    : SignedTransaction & T;

export class Trx {
    private tronWeb: TronWeb;
    private cache: { contracts: Record<string, any> };
    private validator: Validator;

    signMessage;
    sendAsset;
    send;
    sendTrx;
    broadcast;
    broadcastHex;
    signTransaction;

    constructor(tronWeb: TronWeb) {
        this.tronWeb = tronWeb;

        this.cache = {
            contracts: {},
        };
        this.validator = new Validator();
        this.signMessage = this.sign;
        this.sendAsset = this.sendToken;
        this.send = this.sendTransaction;
        this.sendTrx = this.sendTransaction;
        this.broadcast = this.sendRawTransaction;
        this.broadcastHex = this.sendHexTransaction;
        this.signTransaction = this.sign;
    }

    _parseToken(token: any): Token {
        return {
            ...token,
            name: this.tronWeb.toUtf8(token.name),
            abbr: token.abbr && this.tronWeb.toUtf8(token.abbr),
            description: token.description && this.tronWeb.toUtf8(token.description),
            url: token.url && this.tronWeb.toUtf8(token.url),
        };
    }

    getCurrentBlock(): Promise<Block> {
        return this.tronWeb.fullNode.request('wallet/getnowblock');
    }

    getConfirmedCurrentBlock(): Promise<Block> {
        return this.tronWeb.solidityNode.request('walletsolidity/getnowblock');
    }

    async getBlock(block: 'earliest' | 'latest' | number | string | false = this.tronWeb.defaultBlock): Promise<Block> {
        if (block === false) {
            throw new Error('No block identifier provided');
        }

        if (block == 'earliest') block = 0;

        if (block == 'latest') return this.getCurrentBlock();

        if (isNaN(+block) && utils.isHex(block.toString())) return this.getBlockByHash(block as string);

        return this.getBlockByNumber(block as number);
    }

    async getBlockByHash(blockHash: string): Promise<Block> {
        const block = await this.tronWeb.fullNode.request<Block>(
            'wallet/getblockbyid',
            {
                value: blockHash,
            },
            'post'
        );
        if (!Object.keys(block).length) {
            throw new Error('Block not found');
        }
        return block;
    }

    async getBlockByNumber(blockID: number): Promise<Block> {
        if (!utils.isInteger(blockID) || blockID < 0) {
            throw new Error('Invalid block number provided');
        }

        return this.tronWeb.fullNode
            .request<Block>(
                'wallet/getblockbynum',
                {
                    num: parseInt(blockID),
                },
                'post'
            )
            .then((block) => {
                if (!Object.keys(block).length) {
                    throw new Error('Block not found');
                }

                return block;
            });
    }

    async getBlockTransactionCount(
        block: 'earliest' | 'latest' | number | string | false = this.tronWeb.defaultBlock
    ): Promise<number> {
        const { transactions = [] } = await this.getBlock(block);
        return transactions.length;
    }

    async getTransactionFromBlock(
        block: 'earliest' | 'latest' | number | string | false = this.tronWeb.defaultBlock,
        index: number
    ): Promise<GetTransactionResponse> {
        const { transactions } = await this.getBlock(block);
        if (!transactions) {
            throw new Error('Transaction not found in block');
        }
        if (index >= 0 && index < transactions.length) return transactions[index];
        else throw new Error('Invalid transaction index provided');
    }

    async getTransactionsFromBlock(
        block: 'earliest' | 'latest' | number | string | false = this.tronWeb.defaultBlock
    ): Promise<GetTransactionResponse[]> {
        const { transactions } = await this.getBlock(block);
        if (!transactions) {
            throw new Error('Transaction not found in block');
        }
        return transactions;
    }

    async getTransaction(transactionID: string): Promise<GetTransactionResponse> {
        const transaction = await this.tronWeb.fullNode.request<GetTransactionResponse>(
            'wallet/gettransactionbyid',
            {
                value: transactionID,
            },
            'post'
        );
        if (!Object.keys(transaction).length) {
            throw new Error('Transaction not found');
        }
        return transaction;
    }

    async getConfirmedTransaction(transactionID: string): Promise<GetTransactionResponse> {
        const transaction = await this.tronWeb.solidityNode.request<GetTransactionResponse>(
            'walletsolidity/gettransactionbyid',
            {
                value: transactionID,
            },
            'post'
        );
        if (!Object.keys(transaction).length) {
            throw new Error('Transaction not found');
        }
        return transaction;
    }

    getUnconfirmedTransactionInfo(transactionID: string): Promise<TransactionInfo> {
        return this.tronWeb.fullNode.request('wallet/gettransactioninfobyid', { value: transactionID }, 'post');
    }

    getTransactionInfo(transactionID: string): Promise<TransactionInfo> {
        return this.tronWeb.solidityNode.request('walletsolidity/gettransactioninfobyid', { value: transactionID }, 'post');
    }

    getTransactionsToAddress(address = this.tronWeb.defaultAddress.hex, limit = 30, offset = 0): Promise<GetTransactionResponse[]> {
        return this.getTransactionsRelated(toHex(address as string), 'to', limit, offset);
    }

    getTransactionsFromAddress(address = this.tronWeb.defaultAddress.hex, limit = 30, offset = 0): Promise<GetTransactionResponse[]> {
        return this.getTransactionsRelated(toHex(address as string), 'from', limit, offset);
    }

    async getTransactionsRelated(
        address = this.tronWeb.defaultAddress.hex,
        direction = 'all',
        limit = 30,
        offset = 0
    ): Promise<GetTransactionResponse[]> {
        if (this.tronWeb.fullnodeSatisfies('>=4.1.1')) {
            throw new Error('This api is not supported any more');
        }

        if (!['to', 'from', 'all'].includes(direction)) {
            throw new Error('Invalid direction provided: Expected "to", "from" or "all"');
        }

        if (direction == 'all') {
            const [from, to] = await Promise.all([
                this.getTransactionsRelated(address, 'from', limit, offset),
                this.getTransactionsRelated(address, 'to', limit, offset),
            ]);

            return [
                ...from.map((tx) => (((tx as any).direction = 'from'), tx)),
                ...to.map((tx) => (((tx as any).direction = 'to'), tx)),
            ].sort((a, b) => {
                return b.raw_data.timestamp - a.raw_data.timestamp;
            });
        }

        if (!this.tronWeb.isAddress(address as string)) {
            throw new Error('Invalid address provided');
        }

        if (!utils.isInteger(limit) || limit < 0 || (offset && limit < 1)) {
            throw new Error('Invalid limit provided');
        }

        if (!utils.isInteger(offset) || offset < 0) {
            throw new Error('Invalid offset provided');
        }

        address = toHex(address as string);

        return this.tronWeb.solidityNode
            .request<{ transaction: GetTransactionResponse[] }>(
                `walletextension/gettransactions${direction}this`,
                {
                    account: {
                        address,
                    },
                    offset,
                    limit,
                },
                'post'
            )
            .then(({ transaction }) => {
                return transaction;
            });
    }

    async getAccount(address = this.tronWeb.defaultAddress.hex): Promise<Account> {
        if (!this.tronWeb.isAddress(address as Address)) {
            throw new Error('Invalid address provided');
        }

        address = toHex(address as string);

        return this.tronWeb.solidityNode.request(
            'walletsolidity/getaccount',
            {
                address,
            },
            'post'
        );
    }

    getAccountById(id: string): Promise<Account> {
        return this.getAccountInfoById(id, { confirmed: true });
    }

    async getAccountInfoById(id: string, options: { confirmed: boolean }): Promise<Account> {
        this.validator.notValid([
            {
                name: 'accountId',
                type: 'hex',
                value: id,
            },
            {
                name: 'accountId',
                type: 'string',
                lte: 32,
                gte: 8,
                value: id,
            },
        ]);

        if (id.startsWith('0x')) {
            id = id.slice(2);
        }

        return this.tronWeb[options.confirmed ? 'solidityNode' : 'fullNode'].request(
            `wallet${options.confirmed ? 'solidity' : ''}/getaccountbyid`,
            {
                account_id: id,
            },
            'post'
        );
    }

    async getBalance(address = this.tronWeb.defaultAddress.hex): Promise<number> {
        const { balance = 0 } = await this.getAccount(address);
        return balance;
    }

    async getUnconfirmedAccount(address = this.tronWeb.defaultAddress.hex): Promise<Account> {
        if (!this.tronWeb.isAddress(address as Address)) {
            throw new Error('Invalid address provided');
        }

        address = toHex(address as string);

        return this.tronWeb.fullNode.request(
            'wallet/getaccount',
            {
                address,
            },
            'post'
        );
    }

    getUnconfirmedAccountById(id: string): Promise<Account> {
        return this.getAccountInfoById(id, { confirmed: false });
    }

    async getUnconfirmedBalance(address = this.tronWeb.defaultAddress.hex): Promise<number> {
        const { balance = 0 } = await this.getUnconfirmedAccount(address);
        return balance;
    }

    async getBandwidth(address = this.tronWeb.defaultAddress.hex): Promise<number> {
        if (!this.tronWeb.isAddress(address as Address)) {
            throw new Error('Invalid address provided');
        }

        address = toHex(address as string);

        return this.tronWeb.fullNode
            .request<AccountNetMessage>(
                'wallet/getaccountnet',
                {
                    address,
                },
                'post'
            )
            .then(({ freeNetUsed = 0, freeNetLimit = 0, NetUsed = 0, NetLimit = 0 }) => {
                return freeNetLimit - freeNetUsed + (NetLimit - NetUsed);
            });
    }

    async getTokensIssuedByAddress(address = this.tronWeb.defaultAddress.hex): Promise<Record<string, Token>> {
        if (!this.tronWeb.isAddress(address as Address)) {
            throw new Error('Invalid address provided');
        }

        address = toHex(address as string);

        return this.tronWeb.fullNode
            .request<{ assetIssue: Token[] }>(
                'wallet/getassetissuebyaccount',
                {
                    address,
                },
                'post'
            )
            .then(({ assetIssue }) => {
                if (!assetIssue) return {};

                const tokens = assetIssue
                    .map((token) => {
                        return this._parseToken(token);
                    })
                    .reduce((tokens, token) => {
                        return (tokens[token.name] = token), tokens;
                    }, {} as Record<string, Token>);

                return tokens;
            });
    }

    async getTokenFromID(tokenID: string | number): Promise<Token> {
        if (utils.isInteger(tokenID)) tokenID = tokenID.toString();

        if (!utils.isString(tokenID) || !tokenID.length) {
            throw new Error('Invalid token ID provided');
        }

        return this.tronWeb.fullNode
            .request<Token>(
                'wallet/getassetissuebyname',
                {
                    value: this.tronWeb.fromUtf8(tokenID),
                },
                'post'
            )
            .then((token) => {
                if (!token.name) {
                    throw new Error('Token does not exist');
                }

                return this._parseToken(token);
            });
    }

    async listNodes(): Promise<string[]> {
        const { nodes = [] } = await this.tronWeb.fullNode.request<{ nodes: { address: { host: string; port: number } }[] }>(
            'wallet/listnodes'
        );
        return nodes.map(({ address: { host, port } }) => `${this.tronWeb.toUtf8(host)}:${port}`);
    }

    async getBlockRange(start = 0, end = 30): Promise<Block[]> {
        if (!utils.isInteger(start) || start < 0) {
            throw new Error('Invalid start of range provided');
        }

        if (!utils.isInteger(end) || end < start) {
            throw new Error('Invalid end of range provided');
        }

        if (end + 1 - start > 100) {
            throw new Error('Invalid range size, which should be no more than 100.');
        }

        return this.tronWeb.fullNode
            .request<{ block: Block[] }>(
                'wallet/getblockbylimitnext',
                {
                    startNum: parseInt(start),
                    endNum: parseInt(end) + 1,
                },
                'post'
            )
            .then(({ block = [] }) => block);
    }

    async listSuperRepresentatives(): Promise<Witness[]> {
        const { witnesses = [] } = await this.tronWeb.fullNode.request<{ witnesses: Witness[] }>('wallet/listwitnesses');
        return witnesses;
    }

    async listTokens(limit = 0, offset = 0): Promise<Token[]> {
        if (!utils.isInteger(limit) || limit < 0 || (offset && limit < 1)) {
            throw new Error('Invalid limit provided');
        }

        if (!utils.isInteger(offset) || offset < 0) {
            throw new Error('Invalid offset provided');
        }

        if (!limit) {
            return this.tronWeb.fullNode
                .request<{ assetIssue: Token[] }>('wallet/getassetissuelist')
                .then(({ assetIssue = [] }) => assetIssue.map((token) => this._parseToken(token)));
        }

        return this.tronWeb.fullNode
            .request<{ assetIssue: Token[] }>(
                'wallet/getpaginatedassetissuelist',
                {
                    offset: parseInt(offset),
                    limit: parseInt(limit),
                },
                'post'
            )
            .then(({ assetIssue = [] }) => assetIssue.map((token) => this._parseToken(token)));
    }

    async timeUntilNextVoteCycle(): Promise<number> {
        const { num = -1 } = await this.tronWeb.fullNode.request<{ num: number }>('wallet/getnextmaintenancetime');
        if (num == -1) {
            throw new Error('Failed to get time until next vote cycle');
        }
        return Math.floor(num / 1000);
    }

    async getContract(contractAddress: string): Promise<any> {
        if (!this.tronWeb.isAddress(contractAddress)) {
            throw new Error('Invalid contract address provided');
        }

        if (this.cache.contracts[contractAddress]) {
            return this.cache.contracts[contractAddress];
        }

        contractAddress = toHex(contractAddress);

        const contract = await this.tronWeb.fullNode.request<any>('wallet/getcontract', {
            value: contractAddress,
        });
        if (contract.Error) {
            throw new Error('Contract does not exist');
        }
        this.cache.contracts[contractAddress] = contract;
        return contract;
    }

    ecRecover(transaction: SignedTransaction) {
        return Trx.ecRecover(transaction);
    }

    static ecRecover(transaction: SignedTransaction): Address | Address[] {
        if (!txCheck(transaction)) {
            throw new Error('Invalid transaction');
        }
        if (!transaction.signature?.length) {
            throw new Error('Transaction is not signed');
        }
        if (transaction.signature.length === 1) {
            const tronAddress = ecRecover(transaction.txID, transaction.signature[0]);
            return TronWeb.address.fromHex(tronAddress);
        }
        return transaction.signature.map((sig) => {
            const tronAddress = ecRecover(transaction.txID, sig);
            return TronWeb.address.fromHex(tronAddress);
        });
    }

    async verifyMessage(message: string, signature: string, address = this.tronWeb.defaultAddress.base58, useTronHeader = true) {
        if (!utils.isHex(message)) {
            throw new Error('Expected hex message input');
        }

        if (Trx.verifySignature(message, address as string, signature, useTronHeader)) {
            return true;
        }

        throw new Error('Signature does not match');
    }

    static verifySignature(message: string, address: string, signature: string, useTronHeader = true) {
        message = message.replace(/^0x/, '');
        const messageBytes = [
            ...toUtf8Bytes(useTronHeader ? TRX_MESSAGE_HEADER : ETH_MESSAGE_HEADER),
            ...utils.code.hexStr2byteArray(message),
        ];

        const messageDigest = keccak256(new Uint8Array(messageBytes));
        const recovered = recoverAddress(messageDigest, Signature.from(`0x${signature.replace(/^0x/, '')}`));

        const tronAddress = ADDRESS_PREFIX + recovered.substr(2);
        const base58Address = TronWeb.address.fromHex(tronAddress);

        return base58Address == TronWeb.address.fromHex(address);
    }

    async verifyMessageV2(message: string | Uint8Array | Array<number>, signature: string) {
        return Trx.verifyMessageV2(message, signature);
    }

    static verifyMessageV2(message: string | Uint8Array | Array<number>, signature: string) {
        return utils.message.verifyMessage(message, signature);
    }

    verifyTypedData(
        domain: TypedDataDomain,
        types: Record<string, TypedDataField[]>,
        value: Record<string, any>,
        signature: string,
        address = this.tronWeb.defaultAddress.base58
    ) {
        if (Trx.verifyTypedData(domain, types, value, signature, address as string)) return true;

        throw new Error('Signature does not match');
    }

    static verifyTypedData(
        domain: TypedDataDomain,
        types: Record<string, TypedDataField[]>,
        value: Record<string, any>,
        signature: string,
        address: string
    ) {
        const messageDigest = utils._TypedDataEncoder.hash(domain, types, value);
        const recovered = recoverAddress(messageDigest, Signature.from(`0x${signature.replace(/^0x/, '')}`));

        const tronAddress = ADDRESS_PREFIX + recovered.substr(2);
        const base58Address = TronWeb.address.fromHex(tronAddress);

        return base58Address == TronWeb.address.fromHex(address);
    }

    async sign<T extends SignedTransaction | Transaction | string>(
        transaction: T,
        privateKey = this.tronWeb.defaultPrivateKey,
        useTronHeader = true,
        multisig = false
    ): Promise<SignedStringOrSignedTransaction<T>> {
        // Message signing
        if (utils.isString(transaction)) {
            if (!utils.isHex(transaction)) {
                throw new Error('Expected hex message input');
            }

            return Trx.signString(transaction, privateKey as string, useTronHeader) as SignedStringOrSignedTransaction<T>;
        }

        if (!utils.isObject(transaction)) {
            throw new Error('Invalid transaction provided');
        }

        if (!multisig && (transaction as SignedTransaction).signature) {
            throw new Error('Transaction is already signed');
        }

        if (!multisig) {
            const address = toHex(this.tronWeb.address.fromPrivateKey(privateKey as string) as string).toLowerCase();

            if (address !== toHex(transaction.raw_data.contract[0].parameter.value.owner_address)) {
                throw new Error('Private key does not match address in transaction');
            }

            if (!txCheck(transaction)) {
                throw new Error('Invalid transaction');
            }
        }
        return utils.crypto.signTransaction(privateKey as string, transaction) as SignedStringOrSignedTransaction<T>;
    }

    static signString(message: string, privateKey: string, useTronHeader = true) {
        message = message.replace(/^0x/, '');
        const value = `0x${privateKey.replace(/^0x/, '')}`;
        const signingKey = new SigningKey(value);
        const messageBytes = [
            ...toUtf8Bytes(useTronHeader ? TRX_MESSAGE_HEADER : ETH_MESSAGE_HEADER),
            ...utils.code.hexStr2byteArray(message),
        ];
        const messageDigest = keccak256(new Uint8Array(messageBytes));
        const signature = signingKey.sign(messageDigest);
        const signatureHex = ['0x', signature.r.substring(2), signature.s.substring(2), Number(signature.v).toString(16)].join(
            ''
        );
        return signatureHex;
    }

    /**
     * sign message v2 for verified header length
     *
     * @param {message to be signed, should be Bytes or string} message
     * @param {privateKey for signature} privateKey
     * @param {reserved} options
     */
    signMessageV2(message: string | Uint8Array | Array<number>, privateKey = this.tronWeb.defaultPrivateKey) {
        return Trx.signMessageV2(message, privateKey as string);
    }

    static signMessageV2(message: string | Uint8Array | Array<number>, privateKey: string) {
        return utils.message.signMessage(message, privateKey);
    }

    _signTypedData(
        domain: TypedDataDomain,
        types: Record<string, TypedDataField[]>,
        value: Record<string, any>,
        privateKey = this.tronWeb.defaultPrivateKey
    ) {
        return Trx._signTypedData(domain, types, value, privateKey as string);
    }

    static _signTypedData(
        domain: TypedDataDomain,
        types: Record<string, TypedDataField[]>,
        value: Record<string, any>,
        privateKey: string
    ) {
        return utils.crypto._signTypedData(domain, types, value, privateKey);
    }

    async multiSign(transaction: Transaction, privateKey = this.tronWeb.defaultPrivateKey, permissionId = 0) {
        if (!utils.isObject(transaction) || !transaction.raw_data || !transaction.raw_data.contract) {
            throw new Error('Invalid transaction provided');
        }

        // If owner permission or permission id exists in transaction, do sign directly
        // If no permission id inside transaction or user passes permission id, use old way to reset permission id
        if (!transaction.raw_data.contract[0].Permission_id && permissionId > 0) {
            // set permission id
            transaction.raw_data.contract[0].Permission_id = permissionId;

            // check if private key insides permission list
            const address = toHex(this.tronWeb.address.fromPrivateKey(privateKey as string) as string).toLowerCase();
            const signWeight = await this.getSignWeight(transaction, permissionId);

            if (signWeight.result.code === 'PERMISSION_ERROR') {
                throw new Error(signWeight.result.message);
            }

            let foundKey = false;
            signWeight.permission.keys.map((key) => {
                if (key.address === address) foundKey = true;
            });

            if (!foundKey) {
                throw new Error(privateKey + ' has no permission to sign');
            }

            if (signWeight.approved_list && signWeight.approved_list.indexOf(address) != -1) {
                throw new Error(privateKey + ' already sign transaction');
            }

            // reset transaction
            if (signWeight.transaction && signWeight.transaction.transaction) {
                transaction = signWeight.transaction.transaction;
                if (permissionId > 0) {
                    transaction.raw_data.contract[0].Permission_id = permissionId;
                }
            } else {
                throw new Error('Invalid transaction provided');
            }
        }

        // sign
        if (!txCheck(transaction)) {
            throw new Error('Invalid transaction');
        }
        return utils.crypto.signTransaction(privateKey as string, transaction);
    }

    async getApprovedList(transaction: Transaction): Promise<{ approved_list: string[] }> {
        if (!utils.isObject(transaction)) {
            throw new Error('Invalid transaction provided');
        }

        return this.tronWeb.fullNode.request('wallet/getapprovedlist', transaction, 'post');
    }

    async getSignWeight(transaction: Transaction, permissionId?: number): Promise<TransactionSignWeight> {
        if (!utils.isObject(transaction) || !transaction.raw_data || !transaction.raw_data.contract)
            throw new Error('Invalid transaction provided');

        if (utils.isInteger(permissionId)) {
            transaction.raw_data.contract[0].Permission_id = parseInt(permissionId);
        } else if (typeof transaction.raw_data.contract[0].Permission_id !== 'number') {
            transaction.raw_data.contract[0].Permission_id = 0;
        }

        return this.tronWeb.fullNode.request('wallet/getsignweight', transaction, 'post');
    }

    async sendRawTransaction<T extends SignedTransaction>(signedTransaction: T): Promise<BroadcastReturn<T>> {
        if (!utils.isObject(signedTransaction)) {
            throw new Error('Invalid transaction provided');
        }

        if (!signedTransaction.signature || !utils.isArray(signedTransaction.signature)) {
            throw new Error('Transaction is not signed');
        }

        const result = await this.tronWeb.fullNode.request<Omit<BroadcastReturn<T>, 'transaction'>>(
            'wallet/broadcasttransaction',
            signedTransaction,
            'post'
        );
        return {
            ...result,
            transaction: signedTransaction,
        };
    }

    async sendHexTransaction(signedHexTransaction: string) {
        if (!utils.isHex(signedHexTransaction)) {
            throw new Error('Invalid hex transaction provided');
        }

        const params = {
            transaction: signedHexTransaction,
        };

        const result = await this.tronWeb.fullNode.request<BroadcastHexReturn>('wallet/broadcasthex', params, 'post');
        if (result.result) {
            return {
                ...result,
                transaction: JSON.parse(result.transaction) as Transaction,
                hexTransaction: signedHexTransaction,
            };
        }
        return result;
    }

    async sendTransaction(to: string, amount: number, options: AddressOptions = {}): Promise<BroadcastReturn<SignedTransaction>> {
        if (typeof options === 'string') options = { privateKey: options };

        if (!this.tronWeb.isAddress(to)) {
            throw new Error('Invalid recipient provided');
        }

        if (!utils.isInteger(amount) || amount <= 0) {
            throw new Error('Invalid amount provided');
        }

        options = {
            privateKey: this.tronWeb.defaultPrivateKey as string,
            address: this.tronWeb.defaultAddress.hex as string,
            ...options,
        };

        if (!options.privateKey && !options.address) {
            throw new Error('Function requires either a private key or address to be set');
        }

        const address = options.privateKey ? this.tronWeb.address.fromPrivateKey(options.privateKey) : options.address;
        const transaction = await this.tronWeb.transactionBuilder.sendTrx(to, amount, address as Address);
        const signedTransaction = await this.sign(transaction, options.privateKey);
        const result = await this.sendRawTransaction(signedTransaction);
        return result;
    }

    async sendToken(
        to: string,
        amount: number,
        tokenID: string | number,
        options: AddressOptions = {}
    ): Promise<BroadcastReturn<SignedTransaction>> {
        if (typeof options === 'string') options = { privateKey: options };

        if (!this.tronWeb.isAddress(to)) {
            throw new Error('Invalid recipient provided');
        }

        if (!utils.isInteger(amount) || amount <= 0) {
            throw new Error('Invalid amount provided');
        }

        if (utils.isInteger(tokenID)) tokenID = tokenID.toString();

        if (!utils.isString(tokenID)) {
            throw new Error('Invalid token ID provided');
        }

        options = {
            privateKey: this.tronWeb.defaultPrivateKey as string,
            address: this.tronWeb.defaultAddress.hex as string,
            ...options,
        };

        if (!options.privateKey && !options.address) {
            throw new Error('Function requires either a private key or address to be set');
        }

        const address = options.privateKey ? this.tronWeb.address.fromPrivateKey(options.privateKey) : options.address;
        const transaction = await this.tronWeb.transactionBuilder.sendToken(to, amount, tokenID, address as Address);
        const signedTransaction = await this.sign(transaction, options.privateKey);
        const result = await this.sendRawTransaction(signedTransaction);
        return result;
    }

    /**
     * Freezes an amount of TRX.
     * Will give bandwidth OR Energy and TRON Power(voting rights)
     * to the owner of the frozen tokens.
     *
     * @param amount - is the number of frozen trx
     * @param duration - is the duration in days to be frozen
     * @param resource - is the type, must be either "ENERGY" or "BANDWIDTH"
     * @param options
     */
    async freezeBalance(
        amount = 0,
        duration = 3,
        resource: Resource = 'BANDWIDTH',
        options: AddressOptions = {},
        receiverAddress?: string
    ): Promise<BroadcastReturn<SignedTransaction>> {
        if (typeof options === 'string') options = { privateKey: options };

        if (!['BANDWIDTH', 'ENERGY'].includes(resource)) {
            throw new Error('Invalid resource provided: Expected "BANDWIDTH" or "ENERGY"');
        }

        if (!utils.isInteger(amount) || amount <= 0) {
            throw new Error('Invalid amount provided');
        }

        if (!utils.isInteger(duration) || duration < 3) {
            throw new Error('Invalid duration provided, minimum of 3 days');
        }

        options = {
            privateKey: this.tronWeb.defaultPrivateKey as string,
            address: this.tronWeb.defaultAddress.hex as string,
            ...options,
        };

        if (!options.privateKey && !options.address) {
            throw new Error('Function requires either a private key or address to be set');
        }

        const address = options.privateKey ? this.tronWeb.address.fromPrivateKey(options.privateKey) : options.address;
        const freezeBalance = await this.tronWeb.transactionBuilder.freezeBalance(
            amount,
            duration,
            resource,
            address as Address,
            receiverAddress
        );
        const signedTransaction = await this.sign(freezeBalance, options.privateKey);
        const result = await this.sendRawTransaction(signedTransaction);
        return result;
    }

    /**
     * Unfreeze TRX that has passed the minimum freeze duration.
     * Unfreezing will remove bandwidth and TRON Power.
     *
     * @param resource - is the type, must be either "ENERGY" or "BANDWIDTH"
     * @param options
     */
    async unfreezeBalance(
        resource: Resource = 'BANDWIDTH',
        options: AddressOptions = {},
        receiverAddress: string
    ): Promise<BroadcastReturn<SignedTransaction>> {
        if (typeof options === 'string') options = { privateKey: options };

        if (!['BANDWIDTH', 'ENERGY'].includes(resource)) {
            throw new Error('Invalid resource provided: Expected "BANDWIDTH" or "ENERGY"');
        }

        options = {
            privateKey: this.tronWeb.defaultPrivateKey as string,
            address: this.tronWeb.defaultAddress.hex as string,
            ...options,
        };

        if (!options.privateKey && !options.address) {
            throw new Error('Function requires either a private key or address to be set');
        }

        const address = options.privateKey ? this.tronWeb.address.fromPrivateKey(options.privateKey) : options.address;
        const unfreezeBalance = await this.tronWeb.transactionBuilder.unfreezeBalance(
            resource,
            address as Address,
            receiverAddress
        );
        const signedTransaction = await this.sign(unfreezeBalance, options.privateKey);
        const result = await this.sendRawTransaction(signedTransaction);
        return result;
    }

    /**
     * Modify account name
     * Note: Username is allowed to edit only once.
     *
     * @param privateKey - Account private Key
     * @param accountName - name of the account
     *
     * @return modified Transaction Object
     */
    async updateAccount(accountName: string, options: AddressOptions = {}): Promise<BroadcastReturn<SignedTransaction>> {
        if (typeof options === 'string') options = { privateKey: options };

        if (!utils.isString(accountName) || !accountName.length) {
            throw new Error('Name must be a string');
        }

        options = {
            privateKey: this.tronWeb.defaultPrivateKey as string,
            address: this.tronWeb.defaultAddress.hex as string,
            ...options,
        };

        if (!options.privateKey && !options.address) throw Error('Function requires either a private key or address to be set');

        const address = options.privateKey ? this.tronWeb.address.fromPrivateKey(options.privateKey) : options.address;
        const updateAccount = await this.tronWeb.transactionBuilder.updateAccount(accountName, address as Address);
        const signedTransaction = await this.sign(updateAccount, options.privateKey);
        const result = await this.sendRawTransaction(signedTransaction);
        return result;
    }

    /**
     * Gets a network modification proposal by ID.
     */
    async getProposal(proposalID: number): Promise<Proposal> {
        if (!utils.isInteger(proposalID) || proposalID < 0) {
            throw new Error('Invalid proposalID provided');
        }

        return this.tronWeb.fullNode.request(
            'wallet/getproposalbyid',
            {
                id: parseInt(proposalID),
            },
            'post'
        );
    }

    /**
     * Lists all network modification proposals.
     */
    async listProposals(): Promise<Proposal[]> {
        const { proposals = [] } = await this.tronWeb.fullNode.request<{ proposals: Proposal[] }>(
            'wallet/listproposals',
            {},
            'post'
        );
        return proposals;
    }

    /**
     * Lists all parameters available for network modification proposals.
     */
    async getChainParameters(): Promise<ChainParameter[]> {
        const { chainParameter = [] } = await this.tronWeb.fullNode.request<{ chainParameter: ChainParameter[] }>(
            'wallet/getchainparameters',
            {},
            'post'
        );
        return chainParameter;
    }

    /**
     * Get the account resources
     */
    async getAccountResources(address = this.tronWeb.defaultAddress.hex): Promise<AccountResourceMessage> {
        if (!this.tronWeb.isAddress(address as Address)) {
            throw new Error('Invalid address provided');
        }

        return this.tronWeb.fullNode.request(
            'wallet/getaccountresource',
            {
                address: toHex(address as string),
            },
            'post'
        );
    }

    /**
     * Query the amount of resources of a specific resourceType delegated by fromAddress to toAddress
     */
    async getDelegatedResourceV2(
        fromAddress = this.tronWeb.defaultAddress.hex,
        toAddress = this.tronWeb.defaultAddress.hex,
        options = { confirmed: true }
    ): Promise<{
        delegatedResource: {
            from: string;
            to: string;
            frozen_balance_for_bandwidth: number;
            frozen_balance_for_energy: number;
            expire_time_for_bandwidth: number;
            expire_time_for_energy: number;
        };
    }> {
        if (!this.tronWeb.isAddress(fromAddress as Address)) {
            throw new Error('Invalid address provided');
        }

        if (!this.tronWeb.isAddress(toAddress as Address)) {
            throw new Error('Invalid address provided');
        }

        return this.tronWeb[options.confirmed ? 'solidityNode' : 'fullNode'].request(
            `wallet${options.confirmed ? 'solidity' : ''}/getdelegatedresourcev2`,
            {
                fromAddress: toHex(fromAddress as string),
                toAddress: toHex(toAddress as string),
            },
            'post'
        );
    }

    /**
     * Query the resource delegation index by an account
     */
    async getDelegatedResourceAccountIndexV2(
        address = this.tronWeb.defaultAddress.hex,
        options = { confirmed: true }
    ): Promise<{
        account: Address;
        fromAccounts: Address[];
        toAccounts: Address[];
    }> {
        if (!this.tronWeb.isAddress(address as Address)) {
            throw new Error('Invalid address provided');
        }

        return this.tronWeb[options.confirmed ? 'solidityNode' : 'fullNode'].request(
            `wallet${options.confirmed ? 'solidity' : ''}/getdelegatedresourceaccountindexv2`,
            {
                value: toHex(address as Address),
            },
            'post'
        );
    }

    /**
     * Query the amount of delegatable resources of the specified resource Type for target address, unit is sun.
     */
    async getCanDelegatedMaxSize(
        address = this.tronWeb.defaultAddress.hex,
        resource: Resource = 'BANDWIDTH',
        options = { confirmed: true }
    ): Promise<{
        max_size: number;
    }> {
        if (!this.tronWeb.isAddress(address as Address)) {
            throw new Error('Invalid address provided');
        }

        this.validator.notValid([
            {
                name: 'resource',
                type: 'resource',
                value: resource,
                msg: 'Invalid resource provided: Expected "BANDWIDTH" or "ENERGY"',
            },
        ]);

        return this.tronWeb[options.confirmed ? 'solidityNode' : 'fullNode'].request(
            `wallet${options.confirmed ? 'solidity' : ''}/getcandelegatedmaxsize`,
            {
                owner_address: toHex(address as Address),
                type: resource === 'ENERGY' ? 1 : 0,
            },
            'post'
        );
    }

    /**
     * Remaining times of available unstaking API
     */
    async getAvailableUnfreezeCount(
        address = this.tronWeb.defaultAddress.hex,
        options = { confirmed: true }
    ): Promise<{
        count: number;
    }> {
        if (!this.tronWeb.isAddress(address as Address)) {
            throw new Error('Invalid address provided');
        }

        return this.tronWeb[options.confirmed ? 'solidityNode' : 'fullNode'].request(
            `wallet${options.confirmed ? 'solidity' : ''}/getavailableunfreezecount`,
            {
                owner_address: toHex(address as Address),
            },
            'post'
        );
    }

    /**
     * Query the withdrawable balance at the specified timestamp
     */
    async getCanWithdrawUnfreezeAmount(
        address = this.tronWeb.defaultAddress.hex,
        timestamp = Date.now(),
        options = { confirmed: true }
    ): Promise<{
        amount: number;
    }> {
        if (!this.tronWeb.isAddress(address as Address)) {
            throw new Error('Invalid address provided');
        }

        if (!utils.isInteger(timestamp) || timestamp < 0) {
            throw new Error('Invalid timestamp provided');
        }

        return this.tronWeb[options.confirmed ? 'solidityNode' : 'fullNode'].request(
            `wallet${options.confirmed ? 'solidity' : ''}/getcanwithdrawunfreezeamount`,
            {
                owner_address: toHex(address as Address),
                timestamp: timestamp,
            },
            'post'
        );
    }

    /**
     * Get the exchange ID.
     */
    async getExchangeByID(exchangeID: number): Promise<Exchange> {
        if (!utils.isInteger(exchangeID) || exchangeID < 0) {
            throw new Error('Invalid exchangeID provided');
        }

        return this.tronWeb.fullNode.request(
            'wallet/getexchangebyid',
            {
                id: exchangeID,
            },
            'post'
        );
    }

    /**
     * Lists the exchanges
     */
    async listExchanges() {
        return this.tronWeb.fullNode
            .request<{ exchanges: Exchange[] }>('wallet/listexchanges', {}, 'post')
            .then(({ exchanges = [] }) => exchanges);
    }

    /**
     * Lists all network modification proposals.
     */
    async listExchangesPaginated(limit = 10, offset = 0) {
        return this.tronWeb.fullNode
            .request<{ exchanges: Exchange[] }>(
                'wallet/getpaginatedexchangelist',
                {
                    limit,
                    offset,
                },
                'post'
            )
            .then(({ exchanges = [] }) => exchanges);
    }

    /**
     * Get info about thre node
     */
    async getNodeInfo(): Promise<{
        beginSyncNum: number;
        block: string;
        solidityBlock: string;
        currentConnectCount: number;
        activeConnectCount: number;
        passiveConnectCount: number;
        totalFlow: number;
        peerInfoList: {
            lastSyncBlock: string;
            remainNum: number;
            lastBlockUpdateTime: number;
            syncFlag: boolean;
            headBlockTimeWeBothHave: number;
            needSyncFromPeer: boolean;
            needSyncFromUs: boolean;
            host: string;
            port: number;
            nodeId: string;
            connectTime: number;
            avgLatency: number;
            syncToFetchSize: number;
            syncToFetchSizePeekNum: number;
            syncBlockRequestedSize: number;
            unFetchSynNum: number;
            blockInPorcSize: number;
            headBlockWeBothHave: string;
            isActive: boolean;
            score: number;
            nodeCount: number;
            inFlow: number;
            disconnectTimes: number;
            localDisconnectReason: string;
            remoteDisconnectReason: string;
        };
        configNodeInfo: {
            codeVersion: string;
            p2pVersion: string;
            listenPort: number;
            discoverEnable: boolean;
            activeNodeSize: number;
            passiveNodeSize: number;
            sendNodeSize: number;
            maxConnectCount: number;
            sameIpMaxConnectCount: number;
            backupListenPort: number;
            backupMemberSize: number;
            backupPriority: number;
            dbVersion: number;
            minParticipationRate: number;
            supportConstant: boolean;
            minTimeRatio: number;
            maxTimeRatio: number;
            allowCreationOfContracts: number;
            allowAdaptiveEnergy: number;
        };
        machineInfo: {
            threadCount: number;
            deadLockThreadCount: number;
            cpuCount: number;
            totalMemory: number;
            freeMemory: number;
            cpuRate: number;
            javaVersion: string;
            osName: string;
            jvmTotalMemory: number;
            jvmFreeMemory: number;
            processCpuRate: number;
            memoryDescInfoList: {
                name: string;
                initSize: number;
                useSize: number;
                maxSize: number;
                useRate: number;
            };
            deadLockThreadInfoList: {
                name: string;
                lockName: string;
                lockOwner: string;
                state: string;
                blockTime: number;
                waitTime: number;
                stackTrace: string;
            };
        };
        cheatWitnessInfoMap: Map<string, string>;
    }> {
        return this.tronWeb.fullNode.request('wallet/getnodeinfo', {}, 'post');
    }

    async getTokenListByName(tokenID: string | number): Promise<Token | Token[]> {
        if (utils.isInteger(tokenID)) tokenID = tokenID.toString();

        if (!utils.isString(tokenID) || !tokenID.length) {
            throw new Error('Invalid token ID provided');
        }

        return this.tronWeb.fullNode
            .request<({ assetIssue: Token[] } & { name: undefined }) | (Token & { assetIssue: undefined })>(
                'wallet/getassetissuelistbyname',
                {
                    value: this.tronWeb.fromUtf8(tokenID),
                },
                'post'
            )
            .then((token) => {
                if (Array.isArray(token.assetIssue)) {
                    return token.assetIssue.map((t) => this._parseToken(t));
                } else if (!token.name) {
                    throw new Error('Token does not exist');
                }

                return this._parseToken(token);
            });
    }

    getTokenByID(tokenID: number | string): Promise<Token> {
        if (utils.isInteger(tokenID)) tokenID = tokenID.toString();

        if (!utils.isString(tokenID) || !tokenID.length) {
            throw new Error('Invalid token ID provided');
        }

        return this.tronWeb.fullNode
            .request<Token>(
                'wallet/getassetissuebyid',
                {
                    value: tokenID,
                },
                'post'
            )
            .then((token) => {
                if (!token.name) {
                    throw new Error('Token does not exist');
                }

                return this._parseToken(token);
            });
    }

    async getReward(address: Address, options: { confirmed?: boolean } = {}) {
        options.confirmed = true;
        return this._getReward(address, options);
    }

    async getUnconfirmedReward(address: Address, options: { confirmed?: boolean } = {}) {
        options.confirmed = false;
        return this._getReward(address, options);
    }

    async getBrokerage(address: Address, options: { confirmed?: boolean } = {}) {
        options.confirmed = true;
        return this._getBrokerage(address, options);
    }

    async getUnconfirmedBrokerage(address: Address, options: { confirmed?: boolean } = {}) {
        options.confirmed = false;
        return this._getBrokerage(address, options);
    }

    async _getReward(address = this.tronWeb.defaultAddress.hex, options: { confirmed?: boolean }): Promise<number> {
        this.validator.notValid([
            {
                name: 'origin',
                type: 'address',
                value: address,
            },
        ]);

        const data = {
            address: toHex(address as Address),
        };

        return this.tronWeb[options.confirmed ? 'solidityNode' : 'fullNode']
            .request<{ reward?: number }>(`wallet${options.confirmed ? 'solidity' : ''}/getReward`, data, 'post')
            .then((result = { reward: undefined }) => {
                if (typeof result.reward === 'undefined') {
                    throw new Error('Not found.');
                }

                return result.reward;
            });
    }

    private async _getBrokerage(address = this.tronWeb.defaultAddress.hex, options: { confirmed?: boolean }): Promise<number> {
        this.validator.notValid([
            {
                name: 'origin',
                type: 'address',
                value: address,
            },
        ]);

        const data = {
            address: toHex(address as Address),
        };

        return this.tronWeb[options.confirmed ? 'solidityNode' : 'fullNode']
            .request<{ brokerage?: number }>(`wallet${options.confirmed ? 'solidity' : ''}/getBrokerage`, data, 'post')
            .then((result = {}) => {
                if (typeof result.brokerage === 'undefined') {
                    throw new Error('Not found.');
                }

                return result.brokerage;
            });
    }

    async getBandwidthPrices(): Promise<string> {
        return this.tronWeb.fullNode.request<{ prices?: string }>('wallet/getbandwidthprices', {}, 'post')
            .then((result = {}) => {
                if (typeof result.prices === 'undefined') {
                    throw new Error('Not found.');
                }

                return result.prices;
            });
    }

    async getEnergyPrices(): Promise<string> {
        return this.tronWeb.fullNode.request<{ prices?: string }>('wallet/getenergyprices', {}, 'post')
            .then((result = {}) => {
                if (typeof result.prices === 'undefined') {
                    throw new Error('Not found.');
                }

                return result.prices;
            });
    }
}
