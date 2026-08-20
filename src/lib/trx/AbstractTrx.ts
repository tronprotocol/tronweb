import type { TronWeb } from '../../tronweb.js';
import utils from '../../utils/index.js';
import { toHex } from '../../utils/address.js';
import { Validator } from '../../paramValidator/index.js';
import {
    Account,
    AccountResourceMessage,
    Address,
    BaseWitness,
    ChainParameter,
    Exchange,
    Precise64,
    Proposal,
    Token,
    TransactionInfo,
    TransactionSignWeight,
    Witness,
    WitnessList,
} from '../../types/Trx.js';
import { Block, BlockHeaderRef, BlockWithoutDetail, GetTransactionResponse } from '../../types/APIResponse.js';
import { Transaction } from '../../types/Transaction.js';
import { Resource } from '../../types/TransactionBuilder.js';

export interface DelegatedResourceV2Response {
    delegatedResource: {
        from: string;
        to: string;
        frozen_balance_for_bandwidth: number;
        frozen_balance_for_energy: number;
        expire_time_for_bandwidth: number;
        expire_time_for_energy: number;
    }[];
}

/**
 * Chain-reading APIs shared by {@link Trx} (regular reads, numbers) and
 * {@link RawTrx} (GET reads with `int64_as_string=true`, java-tron#6699, strings).
 * Only the routing of the HTTP request differs between the two; the method logic is
 * identical and lives here once.
 *
 * Reads that cannot take the flag are pinned to the regular request in both modes
 * (their int64 values stay numbers even on a `RawTrx`):
 * - `getNodeInfo` — the node does not honor the flag on getnodeinfo (and the response
 *   carries doubles that must stay numbers);
 * - `listNodes`, `getBandwidthPrices`, `getEnergyPrices`,
 *   `getDelegatedResourceAccountIndexV2`, `getBrokerage`/`getUnconfirmedBrokerage` —
 *   no int64 in the response;
 * - `getTransactionsToAddress`/`getTransactionsFromAddress`/`getTransactionsRelated` —
 *   deprecated walletextension APIs (rejected by nodes >= 4.1.1);
 * - `getSignWeight`/`getApprovedList` — consume a transaction object via POST body;
 * - `getCurrentRefBlockParams` — feeds local transaction building and MUST stay on the
 *   regular number path.
 * `getCurrentBlock`/`getConfirmedCurrentBlock` (getnowblock does not honor the flag)
 * are instead rerouted in raw mode to `wallet[solidity]/getblock?detail=true`,
 * which is flag-honoring and returns the same latest block.
 */
export abstract class AbstractTrx<P extends boolean = false> {
    protected tronWeb: TronWeb;
    protected validator: Validator;
    protected cache: { contracts: Record<string, any> };
    /**
     * When true, reads are issued as GET with `int64_as_string=true` so the node
     * serializes int64/uint64 fields as JSON strings (requires java-tron#6699).
     */
    protected abstract readonly int64AsString: P;

    constructor(tronWeb: TronWeb) {
        this.tronWeb = tronWeb;
        this.validator = new Validator();
        this.cache = {
            contracts: {},
        };
    }

    /**
     * Routes a read request: regular mode sends it exactly as the historical
     * implementation did (`method`, POST body or GET query); raw mode re-issues it
     * as GET carrying the payload in the query string plus the `int64_as_string` flag
     * (the node only honors the flag on GET).
     */
    protected readRequest<T>(
        node: 'fullNode' | 'solidityNode',
        endpoint: string,
        payload: Record<string, unknown> = {},
        method: 'get' | 'post' = 'post'
    ): Promise<T> {
        if (this.int64AsString) {
            return this.tronWeb[node].request<T>(endpoint, { ...payload, int64_as_string: true }, 'get');
        }
        return this.tronWeb[node].request<T>(endpoint, payload, method);
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

    // ─── Blocks ──────────────────────────────────────────────────────────────

    getCurrentBlock(): Promise<Precise64<Block, P>> {
        if (this.int64AsString) {
            // getnowblock does not honor int64_as_string; wallet/getblock (flag-honoring,
            // verified on Nile) returns the same latest block when queried without an id
            return this.tronWeb.fullNode.request('wallet/getblock', { detail: true, int64_as_string: true }, 'get');
        }
        return this.tronWeb.fullNode.request('wallet/getnowblock');
    }

    getConfirmedCurrentBlock(): Promise<Precise64<Block, P>> {
        if (this.int64AsString) {
            return this.tronWeb.solidityNode.request('walletsolidity/getblock', { detail: true, int64_as_string: true }, 'get');
        }
        return this.tronWeb.solidityNode.request('walletsolidity/getnowblock');
    }

    async getBlock(
        block: 'earliest' | 'latest' | number | string | false = this.tronWeb.defaultBlock
    ): Promise<Precise64<Block, P>> {
        if (block === false) {
            throw new Error('No block identifier provided');
        }

        if (block == 'earliest') block = 0;

        if (block == 'latest') return this.getCurrentBlock();

        if (isNaN(+block) && utils.isHex(block.toString())) return this.getBlockByHash(block as string);

        return this.getBlockByNumber(block as number);
    }

    async getBlockByHash(blockHash: string): Promise<Precise64<Block, P>> {
        const block = await this.readRequest<Precise64<Block, P>>('fullNode', 'wallet/getblockbyid', {
            value: blockHash,
        });
        if (!Object.keys(block).length) {
            throw new Error('Block not found');
        }
        return block;
    }

    async getBlockByNumber(blockID: number): Promise<Precise64<Block, P>> {
        if (!utils.isInteger(blockID) || blockID < 0) {
            throw new Error('Invalid block number provided');
        }

        const block = await this.readRequest<Precise64<Block, P>>('fullNode', 'wallet/getblockbynum', {
            num: parseInt(blockID),
        });
        if (!Object.keys(block).length) {
            throw new Error('Block not found');
        }
        return block;
    }

    async getBlockTransactionCount(
        block: 'earliest' | 'latest' | number | string | false = this.tronWeb.defaultBlock
    ): Promise<number> {
        const { transactions = [] } = (await this.getBlock(block)) as unknown as { transactions?: unknown[] };
        return transactions.length;
    }

    async getTransactionFromBlock(
        block: 'earliest' | 'latest' | number | string | false = this.tronWeb.defaultBlock,
        index: number
    ): Promise<Precise64<GetTransactionResponse, P>> {
        const { transactions } = (await this.getBlock(block)) as unknown as {
            transactions?: Precise64<GetTransactionResponse, P>[];
        };
        if (!transactions) {
            throw new Error('Transaction not found in block');
        }
        if (index >= 0 && index < transactions.length) return transactions[index];
        else throw new Error('Invalid transaction index provided');
    }

    async getTransactionsFromBlock(
        block: 'earliest' | 'latest' | number | string | false = this.tronWeb.defaultBlock
    ): Promise<Precise64<GetTransactionResponse, P>[]> {
        const { transactions } = (await this.getBlock(block)) as unknown as {
            transactions?: Precise64<GetTransactionResponse, P>[];
        };
        if (!transactions) {
            throw new Error('Transaction not found in block');
        }
        return transactions;
    }

    async getBlockRange(start = 0, end = 30): Promise<Precise64<Block, P>[]> {
        if (!utils.isInteger(start) || start < 0) {
            throw new Error('Invalid start of range provided');
        }

        if (!utils.isInteger(end) || end < start) {
            throw new Error('Invalid end of range provided');
        }

        if (end + 1 - start > 100) {
            throw new Error('Invalid range size, which should be no more than 100.');
        }

        return this.readRequest<{ block: Precise64<Block, P>[] }>('fullNode', 'wallet/getblockbylimitnext', {
            startNum: parseInt(start),
            endNum: parseInt(end) + 1,
        }).then(({ block = [] }) => block);
    }

    // ─── Transactions ────────────────────────────────────────────────────────

    async getTransaction(transactionID: string): Promise<Precise64<GetTransactionResponse, P>> {
        const transaction = await this.readRequest<Precise64<GetTransactionResponse, P>>(
            'fullNode',
            'wallet/gettransactionbyid',
            {
                value: transactionID,
            }
        );
        if (!Object.keys(transaction).length) {
            throw new Error('Transaction not found');
        }
        return transaction;
    }

    async getConfirmedTransaction(transactionID: string): Promise<Precise64<GetTransactionResponse, P>> {
        const transaction = await this.readRequest<Precise64<GetTransactionResponse, P>>(
            'solidityNode',
            'walletsolidity/gettransactionbyid',
            {
                value: transactionID,
            }
        );
        if (!Object.keys(transaction).length) {
            throw new Error('Transaction not found');
        }
        return transaction;
    }

    getUnconfirmedTransactionInfo(transactionID: string): Promise<Precise64<TransactionInfo, P>> {
        return this.readRequest('fullNode', 'wallet/gettransactioninfobyid', { value: transactionID });
    }

    getTransactionInfo(transactionID: string): Promise<Precise64<TransactionInfo, P>> {
        return this.readRequest('solidityNode', 'walletsolidity/gettransactioninfobyid', { value: transactionID });
    }

    getTransactionsToAddress(
        address = this.tronWeb.defaultAddress.hex,
        limit = 30,
        offset = 0
    ): Promise<GetTransactionResponse[]> {
        return this.getTransactionsRelated(toHex(address as string), 'to', limit, offset);
    }

    getTransactionsFromAddress(
        address = this.tronWeb.defaultAddress.hex,
        limit = 30,
        offset = 0
    ): Promise<GetTransactionResponse[]> {
        return this.getTransactionsRelated(toHex(address as string), 'from', limit, offset);
    }

    /** Deprecated walletextension API — rejected by nodes >= 4.1.1; not flag-adapted. */
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

    // ─── Accounts / balances ─────────────────────────────────────────────────

    async getAccount(address = this.tronWeb.defaultAddress.hex): Promise<Precise64<Account, P>> {
        if (!this.tronWeb.isAddress(address as Address)) {
            throw new Error('Invalid address provided');
        }

        address = toHex(address as string);

        return this.readRequest('solidityNode', 'walletsolidity/getaccount', {
            address,
        });
    }

    getAccountById(id: string): Promise<Precise64<Account, P>> {
        return this.getAccountInfoById(id, { confirmed: true });
    }

    async getAccountInfoById(id: string, options: { confirmed: boolean }): Promise<Precise64<Account, P>> {
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

        return this.readRequest(
            options.confirmed ? 'solidityNode' : 'fullNode',
            `wallet${options.confirmed ? 'solidity' : ''}/getaccountbyid`,
            {
                account_id: id,
            }
        );
    }

    async getBalance(address = this.tronWeb.defaultAddress.hex): Promise<Precise64<number, P>> {
        const { balance } = await this.getAccount(address);
        return (balance ?? (this.int64AsString ? '0' : 0)) as Precise64<number, P>;
    }

    async getUnconfirmedAccount(address = this.tronWeb.defaultAddress.hex): Promise<Precise64<Account, P>> {
        if (!this.tronWeb.isAddress(address as Address)) {
            throw new Error('Invalid address provided');
        }

        address = toHex(address as string);

        return this.readRequest('fullNode', 'wallet/getaccount', {
            address,
        });
    }

    getUnconfirmedAccountById(id: string): Promise<Precise64<Account, P>> {
        return this.getAccountInfoById(id, { confirmed: false });
    }

    async getUnconfirmedBalance(address = this.tronWeb.defaultAddress.hex): Promise<Precise64<number, P>> {
        const { balance } = await this.getUnconfirmedAccount(address);
        return (balance ?? (this.int64AsString ? '0' : 0)) as Precise64<number, P>;
    }

    async getBandwidth(address = this.tronWeb.defaultAddress.hex): Promise<Precise64<number, P>> {
        if (!this.tronWeb.isAddress(address as Address)) {
            throw new Error('Invalid address provided');
        }

        address = toHex(address as string);

        // string|number typing keeps the raw-mode wire format visible in the code
        const {
            freeNetUsed = 0,
            freeNetLimit = 0,
            NetUsed = 0,
            NetLimit = 0,
        } = await this.readRequest<Partial<Record<'freeNetUsed' | 'freeNetLimit' | 'NetUsed' | 'NetLimit', number | string>>>(
            'fullNode',
            'wallet/getaccountnet',
            {
                address,
            }
        );

        if (this.int64AsString) {
            // fields arrive as strings; BigInt keeps the arithmetic exact and the
            // result goes back out as a string
            return (BigInt(freeNetLimit) - BigInt(freeNetUsed) + (BigInt(NetLimit) - BigInt(NetUsed))).toString() as Precise64<
                number,
                P
            >;
        }
        // Number() is an identity on the regular (number) responses
        return (Number(freeNetLimit) - Number(freeNetUsed) + (Number(NetLimit) - Number(NetUsed))) as Precise64<number, P>;
    }

    async getAccountResources(address = this.tronWeb.defaultAddress.hex): Promise<Precise64<AccountResourceMessage, P>> {
        if (!this.tronWeb.isAddress(address as Address)) {
            throw new Error('Invalid address provided');
        }

        return this.readRequest('fullNode', 'wallet/getaccountresource', {
            address: toHex(address as string),
        });
    }

    /**
     * Query the amount of resources of a specific resourceType delegated by fromAddress to toAddress
     */
    async getDelegatedResourceV2(
        fromAddress = this.tronWeb.defaultAddress.hex,
        toAddress = this.tronWeb.defaultAddress.hex,
        options = { confirmed: true }
    ): Promise<Precise64<DelegatedResourceV2Response, P>> {
        if (!this.tronWeb.isAddress(fromAddress as Address)) {
            throw new Error('Invalid address provided');
        }

        if (!this.tronWeb.isAddress(toAddress as Address)) {
            throw new Error('Invalid address provided');
        }

        return this.readRequest(
            options.confirmed ? 'solidityNode' : 'fullNode',
            `wallet${options.confirmed ? 'solidity' : ''}/getdelegatedresourcev2`,
            {
                fromAddress: toHex(fromAddress as string),
                toAddress: toHex(toAddress as string),
            }
        );
    }

    /**
     * Query the resource delegation index by an account. Not flag-adapted: the
     * response carries only addresses, no int64 values.
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
     * Remaining times of available unstaking API
     */
    async getAvailableUnfreezeCount(
        address = this.tronWeb.defaultAddress.hex,
        options = { confirmed: true }
    ): Promise<
        Precise64<
            {
                count: number;
            },
            P
        >
    > {
        if (!this.tronWeb.isAddress(address as Address)) {
            throw new Error('Invalid address provided');
        }

        return this.readRequest(
            options.confirmed ? 'solidityNode' : 'fullNode',
            `wallet${options.confirmed ? 'solidity' : ''}/getavailableunfreezecount`,
            {
                owner_address: toHex(address as Address),
            }
        );
    }

    /**
     * Query the amount of delegatable resources of the specified resource Type for target address, unit is sun.
     */
    async getCanDelegatedMaxSize(
        address = this.tronWeb.defaultAddress.hex,
        resource: Resource = 'BANDWIDTH',
        options = { confirmed: true }
    ): Promise<
        Precise64<
            {
                max_size: number;
            },
            P
        >
    > {
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

        return this.readRequest(
            options.confirmed ? 'solidityNode' : 'fullNode',
            `wallet${options.confirmed ? 'solidity' : ''}/getcandelegatedmaxsize`,
            {
                owner_address: toHex(address as Address),
                type: resource === 'ENERGY' ? 1 : 0,
            }
        );
    }

    /**
     * Query the withdrawable balance at the specified timestamp
     */
    async getCanWithdrawUnfreezeAmount(
        address = this.tronWeb.defaultAddress.hex,
        timestamp = Date.now(),
        options = { confirmed: true }
    ): Promise<
        Precise64<
            {
                amount: number;
            },
            P
        >
    > {
        if (!this.tronWeb.isAddress(address as Address)) {
            throw new Error('Invalid address provided');
        }

        if (!utils.isInteger(timestamp) || timestamp < 0) {
            throw new Error('Invalid timestamp provided');
        }

        return this.readRequest(
            options.confirmed ? 'solidityNode' : 'fullNode',
            `wallet${options.confirmed ? 'solidity' : ''}/getcanwithdrawunfreezeamount`,
            {
                owner_address: toHex(address as Address),
                timestamp: timestamp,
            }
        );
    }

    // ─── TRC10 tokens ────────────────────────────────────────────────────────

    async getTokensIssuedByAddress(address = this.tronWeb.defaultAddress.hex): Promise<Record<string, Precise64<Token, P>>> {
        if (!this.tronWeb.isAddress(address as Address)) {
            throw new Error('Invalid address provided');
        }

        address = toHex(address as string);

        return this.readRequest<{ assetIssue: Token[] }>('fullNode', 'wallet/getassetissuebyaccount', {
            address,
        }).then(({ assetIssue }) => {
            if (!assetIssue) return {};

            const tokens = assetIssue
                .map((token) => {
                    return this._parseToken(token);
                })
                .reduce(
                    (tokens, token) => {
                        return (tokens[token.name] = token), tokens;
                    },
                    {} as Record<string, Token>
                );

            return tokens as Record<string, Precise64<Token, P>>;
        });
    }

    async getTokenFromID(tokenID: string | number): Promise<Precise64<Token, P>> {
        if (utils.isInteger(tokenID)) tokenID = tokenID.toString();

        if (!utils.isString(tokenID) || !tokenID.length) {
            throw new Error('Invalid token ID provided');
        }

        return this.readRequest<Token>('fullNode', 'wallet/getassetissuebyname', {
            value: this.tronWeb.fromUtf8(tokenID),
        }).then((token) => {
            if (!token.name) {
                throw new Error('Token does not exist');
            }

            return this._parseToken(token) as Precise64<Token, P>;
        });
    }

    async listTokens(limit = 0, offset = 0): Promise<Precise64<Token, P>[]> {
        if (!utils.isInteger(limit) || limit < 0 || (offset && limit < 1)) {
            throw new Error('Invalid limit provided');
        }

        if (!utils.isInteger(offset) || offset < 0) {
            throw new Error('Invalid offset provided');
        }

        if (!limit) {
            return this.readRequest<{ assetIssue: Token[] }>('fullNode', 'wallet/getassetissuelist', {}, 'get').then(
                ({ assetIssue = [] }) => assetIssue.map((token) => this._parseToken(token)) as Precise64<Token, P>[]
            );
        }

        return this.readRequest<{ assetIssue: Token[] }>('fullNode', 'wallet/getpaginatedassetissuelist', {
            offset: parseInt(offset),
            limit: parseInt(limit),
        }).then(({ assetIssue = [] }) => assetIssue.map((token) => this._parseToken(token)) as Precise64<Token, P>[]);
    }

    async getTokenListByName(tokenID: string | number): Promise<Precise64<Token, P> | Precise64<Token, P>[]> {
        if (utils.isInteger(tokenID)) tokenID = tokenID.toString();

        if (!utils.isString(tokenID) || !tokenID.length) {
            throw new Error('Invalid token ID provided');
        }

        return this.readRequest<({ assetIssue: Token[] } & { name: undefined }) | (Token & { assetIssue: undefined })>(
            'fullNode',
            'wallet/getassetissuelistbyname',
            {
                value: this.tronWeb.fromUtf8(tokenID),
            }
        ).then((token) => {
            if (Array.isArray(token.assetIssue)) {
                return token.assetIssue.map((t) => this._parseToken(t)) as Precise64<Token, P>[];
            } else if (!token.name) {
                throw new Error('Token does not exist');
            }

            return this._parseToken(token) as Precise64<Token, P>;
        });
    }

    getTokenByID(tokenID: number | string): Promise<Precise64<Token, P>> {
        if (utils.isInteger(tokenID)) tokenID = tokenID.toString();

        if (!utils.isString(tokenID) || !tokenID.length) {
            throw new Error('Invalid token ID provided');
        }

        return this.readRequest<Token>('fullNode', 'wallet/getassetissuebyid', {
            value: tokenID,
        }).then((token) => {
            if (!token.name) {
                throw new Error('Token does not exist');
            }

            return this._parseToken(token) as Precise64<Token, P>;
        });
    }

    // ─── Nodes / witnesses ───────────────────────────────────────────────────

    /** Not flag-adapted: the response carries no int64 values. */
    async listNodes(): Promise<string[]> {
        const { nodes = [] } = await this.tronWeb.fullNode.request<{ nodes: { address: { host: string; port: number } }[] }>(
            'wallet/listnodes'
        );
        return nodes.map(({ address: { host, port } }) => `${this.tronWeb.toUtf8(host)}:${port}`);
    }

    async listSuperRepresentatives(): Promise<Precise64<Witness, P>[]> {
        const { witnesses = [] } = await this.readRequest<{ witnesses: Precise64<Witness, P>[] }>(
            'fullNode',
            'wallet/listwitnesses',
            {},
            'get'
        );
        return witnesses;
    }

    async getNowWitnessList(
        options: {
            offset?: number;
            limit?: number;
            visible?: boolean;
            confirmed?: boolean;
        } = {}
    ): Promise<Precise64<BaseWitness, P>[]> {
        const { offset = 0, limit = 10, visible = false, confirmed = true } = options;

        this.validator.notValid([
            {
                name: 'offset',
                type: 'integer',
                gte: 0,
                value: offset,
                msg: 'Invalid offset: must be an integer >= 0',
            },
            {
                name: 'limit',
                type: 'integer',
                gt: 0,
                value: limit,
                msg: 'Invalid limit: must be an integer > 0',
            },
            {
                name: 'visible',
                type: 'boolean',
                value: visible,
                msg: 'Invalid visible: must be a boolean',
            },
        ]);

        const data = { offset: Number(offset), limit: Number(limit), visible };

        const node = confirmed ? 'solidityNode' : 'fullNode';
        const endpoint = `wallet${confirmed ? 'solidity' : ''}/getpaginatednowwitnesslist`;

        const result = await this.readRequest<WitnessList | Record<string, any>>(node, endpoint, data);

        if ((result as Record<string, any>)?.Error) {
            throw new Error((result as Record<string, any>).Error);
        }

        return Array.isArray(result?.witnesses) ? (result.witnesses as Precise64<BaseWitness, P>[]) : [];
    }

    async timeUntilNextVoteCycle(): Promise<Precise64<number, P>> {
        const { num = -1 } = await this.readRequest<{ num: number | string }>(
            'fullNode',
            'wallet/getnextmaintenancetime',
            {},
            'get'
        );
        if (num == -1) {
            throw new Error('Failed to get time until next vote cycle');
        }
        if (this.int64AsString) {
            // bigint division truncates like Math.floor does for the positive values here
            return (BigInt(num) / 1000n).toString() as Precise64<number, P>;
        }
        return Math.floor(Number(num) / 1000) as Precise64<number, P>;
    }

    /**
     * Get info about the node. Not flag-adapted: getnodeinfo does not honor
     * `int64_as_string`, and the response carries doubles (cpuRate, minTimeRatio, ...)
     * that must stay numbers.
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

    // ─── Contracts ───────────────────────────────────────────────────────────

    async getContract(contractAddress: string): Promise<any> {
        if (!this.tronWeb.isAddress(contractAddress)) {
            throw new Error('Invalid contract address provided');
        }

        if (this.cache.contracts[contractAddress]) {
            return this.cache.contracts[contractAddress];
        }

        contractAddress = toHex(contractAddress);

        const contract = await this.readRequest<any>(
            'fullNode',
            'wallet/getcontract',
            {
                value: contractAddress,
            },
            'get'
        );
        if (contract.Error) {
            throw new Error('Contract does not exist');
        }
        this.cache.contracts[contractAddress] = contract;
        return contract;
    }

    async getContractInfo(contractAddress: string): Promise<any> {
        if (!this.tronWeb.isAddress(contractAddress)) {
            throw new Error('Invalid contract address provided');
        }

        contractAddress = toHex(contractAddress);

        const contractInfo = await this.readRequest<any>(
            'fullNode',
            'wallet/getcontractinfo',
            {
                value: contractAddress,
            },
            'get'
        );
        if (contractInfo.Error) {
            throw new Error('Contract does not exist');
        }
        return contractInfo;
    }

    // ─── Governance / chain parameters ───────────────────────────────────────

    /**
     * Gets a network modification proposal by ID.
     */
    async getProposal(proposalID: number): Promise<Precise64<Proposal, P>> {
        if (!utils.isInteger(proposalID) || proposalID < 0) {
            throw new Error('Invalid proposalID provided');
        }

        return this.readRequest('fullNode', 'wallet/getproposalbyid', {
            id: parseInt(proposalID),
        });
    }

    /**
     * Lists all network modification proposals.
     */
    async listProposals(): Promise<Precise64<Proposal, P>[]> {
        const { proposals = [] } = await this.readRequest<{ proposals: Precise64<Proposal, P>[] }>(
            'fullNode',
            'wallet/listproposals',
            {}
        );
        return proposals;
    }

    /**
     * Lists all parameters available for network modification proposals.
     */
    async getChainParameters(): Promise<Precise64<ChainParameter, P>[]> {
        const { chainParameter = [] } = await this.readRequest<{ chainParameter: Precise64<ChainParameter, P>[] }>(
            'fullNode',
            'wallet/getchainparameters',
            {}
        );
        return chainParameter;
    }

    // ─── Exchanges ───────────────────────────────────────────────────────────

    /**
     * Get the exchange ID.
     */
    async getExchangeByID(exchangeID: number): Promise<Precise64<Exchange, P>> {
        if (!utils.isInteger(exchangeID) || exchangeID < 0) {
            throw new Error('Invalid exchangeID provided');
        }

        return this.readRequest('fullNode', 'wallet/getexchangebyid', {
            id: exchangeID,
        });
    }

    /**
     * Lists the exchanges
     */
    async listExchanges(): Promise<Precise64<Exchange, P>[]> {
        return this.readRequest<{ exchanges: Precise64<Exchange, P>[] }>('fullNode', 'wallet/listexchanges', {}).then(
            ({ exchanges = [] }) => exchanges
        );
    }

    /**
     * Lists all network modification proposals.
     */
    async listExchangesPaginated(limit = 10, offset = 0): Promise<Precise64<Exchange, P>[]> {
        return this.readRequest<{ exchanges: Precise64<Exchange, P>[] }>('fullNode', 'wallet/getpaginatedexchangelist', {
            limit,
            offset,
        }).then(({ exchanges = [] }) => exchanges);
    }

    // ─── Rewards / brokerage / prices ────────────────────────────────────────

    async getReward(address: Address, options: { confirmed?: boolean } = {}): Promise<Precise64<number, P>> {
        options.confirmed = true;
        return this._getReward(address, options);
    }

    async getUnconfirmedReward(address: Address, options: { confirmed?: boolean } = {}): Promise<Precise64<number, P>> {
        options.confirmed = false;
        return this._getReward(address, options);
    }

    async _getReward(address = this.tronWeb.defaultAddress.hex, options: { confirmed?: boolean }): Promise<Precise64<number, P>> {
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

        return this.readRequest<{ reward?: number | string }>(
            options.confirmed ? 'solidityNode' : 'fullNode',
            `wallet${options.confirmed ? 'solidity' : ''}/getReward`,
            data
        ).then((result = { reward: undefined }) => {
            if (typeof result.reward === 'undefined') {
                throw new Error('Not found.');
            }

            return result.reward as Precise64<number, P>;
        });
    }

    /** Not flag-adapted: brokerage is a proto int32 percentage, no int64 involved. */
    async getBrokerage(address: Address, options: { confirmed?: boolean } = {}): Promise<number> {
        options.confirmed = true;
        return this._getBrokerage(address, options);
    }

    /** Not flag-adapted: brokerage is a proto int32 percentage, no int64 involved. */
    async getUnconfirmedBrokerage(address: Address, options: { confirmed?: boolean } = {}): Promise<number> {
        options.confirmed = false;
        return this._getBrokerage(address, options);
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

    /** Not flag-adapted: the response is already a string. */
    async getBandwidthPrices(): Promise<string> {
        return this.tronWeb.fullNode.request<{ prices?: string }>('wallet/getbandwidthprices', {}, 'post').then((result = {}) => {
            if (typeof result.prices === 'undefined') {
                throw new Error('Not found.');
            }

            return result.prices;
        });
    }

    /** Not flag-adapted: the response is already a string. */
    async getEnergyPrices(): Promise<string> {
        return this.tronWeb.fullNode.request<{ prices?: string }>('wallet/getenergyprices', {}, 'post').then((result = {}) => {
            if (typeof result.prices === 'undefined') {
                throw new Error('Not found.');
            }

            return result.prices;
        });
    }

    // ─── Transaction-adjacent reads (pinned to the regular number path) ──────

    /**
     * MUST stay on the regular (number) path in both modes: it performs local hex
     * conversion and arithmetic on the header fields to build TAPOS references, which
     * string values would silently corrupt.
     */
    async getCurrentRefBlockParams(): Promise<BlockHeaderRef> {
        try {
            const { block_header, blockID } = await this.tronWeb.fullNode.request<BlockWithoutDetail>(
                'wallet/getblock',
                { detail: false },
                'post'
            );
            const { number, timestamp } = block_header.raw_data;
            return {
                ref_block_bytes: number.toString(16).slice(-4).padStart(4, '0'),
                ref_block_hash: blockID.slice(16, 32),
                expiration: timestamp + 60 * 1000,
                timestamp,
            };
        } catch (e) {
            throw new Error(`Unable to get params: ${(e as Error).message || e}`);
        }
    }

    /** Not flag-adapted: consumes a transaction object via POST body. */
    async getApprovedList(transaction: Transaction): Promise<{ approved_list: string[] }> {
        if (!utils.isObject(transaction)) {
            throw new Error('Invalid transaction provided');
        }

        return this.tronWeb.fullNode.request('wallet/getapprovedlist', transaction, 'post');
    }

    /** Not flag-adapted: consumes a transaction object via POST body. */
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
}
