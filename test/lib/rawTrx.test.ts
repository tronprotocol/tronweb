import { assert } from 'vitest';
import wait from '../helpers/wait.js';
import broadcaster from '../helpers/broadcaster.js';
import tronWebBuilder from '../helpers/tronWebBuilder.js';
import waitChainData from '../helpers/waitChainData.js';
import { createEmptyBlock } from '../helpers/createEmptyBlock.js';
import config from '../helpers/config.js';
import contracts from '../fixtures/contracts.js';
import { TronWeb, Trx, utils, Types } from '../setup/TronWeb.js';
import { RawTrx } from '../../src/lib/trx/RawTrx.js';
import { AbstractTrx } from '../../src/lib/trx/AbstractTrx.js';
import { Account, Token } from '../../src/types/Trx.js';
import { Block, GetTransactionResponse } from '../../src/types/APIResponse.js';
import { Transaction } from '../../src/types/Transaction.js';

// This suite runs against the local TRE node (which must run a java-tron build
// that honors `int64_as_string`, java-tron#6699): the usual convention applies —
// TRE up on :9090 and PRIVATE_KEY (the genesis witness key) passed inline. The
// file is excluded from the browser suite (vitest.browser.config.ts).
//
// All chain objects (blocks, transactions, accounts, tokens, delegations,
// proposals, exchanges, ...) are CREATED on-chain in the top-level beforeAll —
// a fresh TRE chain is empty, so nothing can be discovered or hardcoded. The
// TRE image mines a block as soon as a transaction is broadcast (plus `tre_mine`
// for empty blocks), and its single witness makes every block solid immediately,
// so confirmed (walletsolidity) reads only need short polling.
// Assertion philosophy: only the TYPE of int64/uint64 fields is asserted
// (string under the raw reads, number for the exempt int32/enum fields and the
// non-adapted number-path reads). Fields subject to proto3 default-value
// omission are guarded on presence.
const { PRIVATE_KEY, ADDRESS_BASE58 } = config;

// provisioned test-account indices, kept clear of the ranges other suites use
const ISSUER_A_IDX = 90;
const ISSUER_B_IDX = 91;
const EXCHANGER_IDX = 92;
const DEPLOYER_IDX = 93;
const RECEIVER_IDX = 94;

describe('TronWeb.trx.raw (RawTrx) — local TRE', function () {
    let tronWeb: TronWeb;
    let trx: Trx;
    let raw: RawTrx;

    // chain fixtures created on-chain in beforeAll
    let accounts: { b58: string[]; hex: string[]; pks: string[] };
    let blockNum: number;
    let blockId: string;
    let txId: string;
    let infoTxId: string;
    let contractAddress: string;
    let srAddress: string;
    let tokenId: string;
    let tokenName: string;
    let tokenOwner: string;
    let delegationFrom: string;
    let delegationTo: string;
    let unfreezerAddress: string;
    let accountAddress: string;
    let accountId: string;

    // sign + broadcast a fixture transaction, failing loudly instead of letting a
    // rejected fixture surface later as an opaque polling timeout
    async function broadcastFixture<T extends Transaction>(transaction: T, privateKey: string): Promise<T> {
        const { receipt } = await broadcaster(null, privateKey, transaction);
        assert.isTrue(receipt.result, `fixture broadcast failed: ${JSON.stringify(receipt)}`);
        return transaction;
    }

    // poll a confirmed (walletsolidity) read until it returns data, nudging the
    // chain forward with empty blocks in case no other transaction lands
    async function pollConfirmed<T>(read: () => Promise<T>, isFound: (data: T) => boolean, subject: string): Promise<T> {
        for (let attempt = 0; attempt < 30; attempt++) {
            const data = await read();
            if (isFound(data)) return data;
            await createEmptyBlock(tronWeb);
            await wait(1);
        }
        throw new Error(`${subject} was not confirmed in time`);
    }

    beforeAll(async function () {
        tronWeb = tronWebBuilder.createInstance();
        trx = tronWeb.trx;
        raw = tronWeb.trx.raw;
        accounts = await tronWebBuilder.getTestAccounts(-1);

        // account fixture: a freshly funded account has a guaranteed create_time
        // (provisioned accounts may be injected without an on-chain creation)
        const staker = utils.accounts.generateAccount();
        accountAddress = staker.address.base58;
        await broadcastFixture(await tronWeb.transactionBuilder.sendTrx(accountAddress, 5000e6), PRIVATE_KEY);
        await waitChainData('account', accountAddress);

        // contract fixture: deploy, then trigger, so the transaction-info read
        // has receipt fields (energy) to type-check
        const deployTx = await broadcastFixture(
            await tronWeb.transactionBuilder.createSmartContract(
                {
                    abi: contracts.testSetVal.abi,
                    bytecode: contracts.testSetVal.bytecode,
                },
                accounts.hex[DEPLOYER_IDX]
            ),
            accounts.pks[DEPLOYER_IDX]
        );
        await waitChainData('contract', deployTx.contract_address);
        contractAddress = deployTx.contract_address;

        const trigger = await tronWeb.transactionBuilder.triggerSmartContract(
            contractAddress,
            'set(uint256)',
            {},
            [{ type: 'uint256', value: 371 }],
            accounts.hex[DEPLOYER_IDX]
        );
        await broadcastFixture(trigger.transaction, accounts.pks[DEPLOYER_IDX]);
        infoTxId = trigger.transaction.txID;
        txId = infoTxId;
        const triggerInfo = await pollConfirmed(
            () => trx.getTransactionInfo(infoTxId),
            (info) => !!Object.keys(info).length,
            `transaction info ${infoTxId}`
        );
        blockNum = triggerInfo.blockNumber;
        blockId = (await trx.getBlockByNumber(blockNum)).blockID;

        // TRC10 fixtures: two issuers create a token each and send both to the
        // exchanger, which then backs the exchange fixture with the pair
        const tokenIds: string[] = [];
        for (const idx of [ISSUER_A_IDX, ISSUER_B_IDX]) {
            // the default saleStart (Date.now() + 100ms) loses the race against
            // head-block time once parallel suites are instamining blocks; the
            // node rejects start_time <= headBlockTimestamp. A wide margin is
            // safe — nothing here needs the sale to be active.
            const tokenOptions = {
                ...config.getTokenOptions(),
                saleStart: Date.now() + 60_000,
                saleEnd: Date.now() + 3_600_000,
            };
            await broadcastFixture(
                await tronWeb.transactionBuilder.createToken(tokenOptions, accounts.hex[idx]),
                accounts.pks[idx]
            );
            await waitChainData('token', accounts.hex[idx]);
            const issued = await trx.getTokensIssuedByAddress(accounts.hex[idx]);
            const token = Object.values(issued)[0];
            await waitChainData('tokenById', String(token.id));
            await broadcastFixture(
                await tronWeb.transactionBuilder.sendToken(accounts.hex[EXCHANGER_IDX], 10e4, String(token.id), accounts.hex[idx]),
                accounts.pks[idx]
            );
            tokenIds.push(String(token.id));
            if (idx === ISSUER_A_IDX) {
                tokenId = String(token.id);
                tokenName = token.name;
                tokenOwner = token.owner_address;
            }
        }
        // the exchange creation is validated against the exchanger's balances, so
        // both transfers must have landed before it is broadcast
        await pollConfirmed(
            () => trx.getUnconfirmedAccount(accounts.hex[EXCHANGER_IDX]),
            (account) => {
                const held = new Set((account.assetV2 ?? []).map((asset) => asset.key));
                return tokenIds.every((id) => held.has(id));
            },
            'exchanger TRC10 balances'
        );
        await broadcastFixture(
            await tronWeb.transactionBuilder.createTokenExchange(tokenIds[0], 10e3, tokenIds[1], 10e3, accounts.hex[EXCHANGER_IDX]),
            accounts.pks[EXCHANGER_IDX]
        );
        await pollConfirmed(() => trx.listExchanges(), (exchanges) => exchanges.length > 0, 'exchange fixture');

        // staking fixtures: freeze, delegate to a provisioned account, unfreeze
        await broadcastFixture(await tronWeb.transactionBuilder.freezeBalanceV2(200e6, 'ENERGY', accountAddress), staker.privateKey);
        await broadcastFixture(
            await tronWeb.transactionBuilder.delegateResource(10e6, accounts.b58[RECEIVER_IDX], 'ENERGY', accountAddress),
            staker.privateKey
        );
        await broadcastFixture(await tronWeb.transactionBuilder.unfreezeBalanceV2(10e6, 'ENERGY', accountAddress), staker.privateKey);
        delegationFrom = accountAddress;
        delegationTo = accounts.b58[RECEIVER_IDX];
        unfreezerAddress = accountAddress;

        // account-id fixture for the by-id reads
        accountId = TronWeb.toHex(`rawtest${Math.ceil(Math.random() * 1e6)}`);
        await broadcastFixture(await tronWeb.transactionBuilder.setAccountId(accountId, staker.address.hex), staker.privateKey);

        // governance fixture: only the genesis witness can create proposals. The
        // value is randomized (within the accepted maintenance-interval range) so
        // the locally built transaction can never be byte-identical — same txID —
        // to the fixed {key: 0, value: 100000} proposal other suites broadcast
        // from the same genesis account against the same head block.
        await broadcastFixture(
            await tronWeb.transactionBuilder.createProposal({ key: 0, value: 100001 + Math.floor(Math.random() * 9999) }, ADDRESS_BASE58),
            PRIVATE_KEY
        );

        // the genesis witness doubles as the SR fixture
        const witnesses = await trx.listSuperRepresentatives();
        assert.isNotEmpty(witnesses);
        srAddress = witnesses[0].address;

        // barrier: once the last fixture is visible on the solidity node, every
        // earlier one is too (single-witness TRE solidifies instantly, in order)
        await pollConfirmed(
            () => trx.getAccountById(accountId),
            (account) => !!Object.keys(account).length,
            `account id ${accountId}`
        );
    });

    describe('#structure', function () {
        it('should expose trx.raw as a RawTrx extending AbstractTrx', function () {
            assert.instanceOf(raw, RawTrx);
            // chai's instanceOf typing rejects abstract constructors: use the operator
            assert.isTrue(raw instanceof AbstractTrx);
            assert.isTrue(trx instanceof AbstractTrx);
        });

        it('should not expose signing or broadcasting methods on trx.raw', function () {
            for (const method of ['sign', 'multiSign', 'sendRawTransaction', 'sendTransaction', 'sendToken', 'sendHexTransaction']) {
                assert.isUndefined((raw as any)[method], `raw.${method} should not exist`);
            }
        });

        it('should protect the raw sub-module from plugin overrides', function () {
            assert.include(trx.pluginNoOverride, 'raw');
        });
    });

    describe('#blocks', function () {
        let rawBlock: Types.Int64AsString<Block>;

        beforeAll(async function () {
            rawBlock = await raw.getBlockByNumber(blockNum);
        });

        it('should return int64 header fields as strings', function () {
            assert.typeOf(rawBlock.block_header.raw_data.number, 'string');
            assert.typeOf(rawBlock.block_header.raw_data.timestamp, 'string');
        });

        it('should keep the int32 header field `version` as a number', function () {
            assert.typeOf(rawBlock.block_header.raw_data.version, 'number');
        });

        it('should return transaction int64 fields inside the block as strings', function () {
            assert.isNotEmpty(rawBlock.transactions);
            for (const tx of rawBlock.transactions!) {
                assert.typeOf(tx.raw_data.expiration, 'string');
                assert.typeOf(tx.raw_data.timestamp, 'string');
            }
        });

        it('should return string int64 fields from getBlockByHash', async function () {
            const byHash = await raw.getBlockByHash(blockId);
            assert.typeOf(byHash.block_header.raw_data.number, 'string');
        });

        it('should reroute getCurrentBlock to the flag-honoring wallet/getblock endpoint', async function () {
            const latest = await raw.getCurrentBlock();
            assert.typeOf(latest.block_header.raw_data.number, 'string');
            assert.typeOf(latest.block_header.raw_data.timestamp, 'string');
        });

        it('should reroute getConfirmedCurrentBlock to walletsolidity/getblock', async function () {
            const latest = await raw.getConfirmedCurrentBlock();
            assert.typeOf(latest.block_header.raw_data.number, 'string');
            assert.typeOf(latest.block_header.raw_data.timestamp, 'string');
        });

        it('should reroute getBlock("latest") the same way', async function () {
            const latest = await raw.getBlock('latest');
            assert.typeOf(latest.block_header.raw_data.timestamp, 'string');
        });

        it('should return string int64 fields for getBlockRange', async function () {
            const range = await raw.getBlockRange(blockNum, blockNum + 1);
            assert.isNotEmpty(range);
            assert.typeOf(range[0].block_header.raw_data.timestamp, 'string');
        });

        it('should keep getBlockTransactionCount a locally computed number', async function () {
            const count = await raw.getBlockTransactionCount(blockNum);
            assert.typeOf(count, 'number');
        });

        it('should return string int64 fields from getTransactionFromBlock', async function () {
            const tx = await raw.getTransactionFromBlock(blockNum, 0);
            assert.typeOf(tx.raw_data.expiration, 'string');
        });

        it('should return string int64 fields from getTransactionsFromBlock', async function () {
            const transactions = await raw.getTransactionsFromBlock(blockNum);
            assert.isNotEmpty(transactions);
            for (const tx of transactions) assert.typeOf(tx.raw_data.expiration, 'string');
        });
    });

    describe('#transactions', function () {
        let rawTx: Types.Int64AsString<GetTransactionResponse>;

        beforeAll(async function () {
            rawTx = await raw.getTransaction(txId);
        });

        it('should return int64 transaction fields as strings', function () {
            assert.typeOf(rawTx.raw_data.expiration, 'string');
            assert.typeOf(rawTx.raw_data.timestamp, 'string');
        });

        it('should return string int64 fields from the confirmed read', async function () {
            const confirmed = await raw.getConfirmedTransaction(txId);
            assert.typeOf(confirmed.raw_data.expiration, 'string');
        });

        it('should return string int64 fields in transaction info and receipt', async function () {
            const info = await raw.getTransactionInfo(infoTxId);
            if (info.fee !== undefined) assert.typeOf(info.fee, 'string');
            assert.typeOf(info.blockNumber, 'string');
            assert.typeOf(info.blockTimeStamp, 'string');
            if (info.receipt.energy_usage_total !== undefined) assert.typeOf(info.receipt.energy_usage_total, 'string');
        });

        it('should return string int64 fields from the unconfirmed info read', async function () {
            const info = await raw.getUnconfirmedTransactionInfo(infoTxId);
            assert.typeOf(info.blockNumber, 'string');
        });
    });

    describe('#accounts and resources', function () {
        let rawAccount: Types.Int64AsString<Account>;

        beforeAll(async function () {
            rawAccount = await raw.getAccount(accountAddress);
        });

        it('should return the balance and timestamps as strings', function () {
            assert.typeOf(rawAccount.balance, 'string');
            assert.typeOf(rawAccount.create_time, 'string');
        });

        it('should keep the int32 permission id a number while thresholds become strings', function () {
            assert.typeOf(rawAccount.owner_permission.threshold, 'string');
            assert.typeOf(rawAccount.owner_permission.keys[0].weight, 'string');
            if (rawAccount.active_permission?.[0]?.id !== undefined) {
                assert.typeOf(rawAccount.active_permission[0].id, 'number');
            }
        });

        it('should return the balance as a string from getBalance', async function () {
            const balance = await raw.getBalance(accountAddress);
            assert.typeOf(balance, 'string');
        });

        it('should return a string balance for a never-funded account', async function () {
            const account = utils.accounts.generateAccount();
            const balance = await raw.getBalance(account.address.base58);
            assert.typeOf(balance, 'string');
        });

        it('should return string balances from the unconfirmed reads', async function () {
            const account = await raw.getUnconfirmedAccount(accountAddress);
            assert.typeOf(account.balance, 'string');
            const balance = await raw.getUnconfirmedBalance(accountAddress);
            assert.typeOf(balance, 'string');
        });

        it('should compute the bandwidth as a string', async function () {
            const bandwidth = await raw.getBandwidth(accountAddress);
            assert.typeOf(bandwidth, 'string');
        });

        it('should return string int64 fields for account resources', async function () {
            const resources = await raw.getAccountResources(accountAddress);
            assert.typeOf(resources.TotalNetLimit, 'string');
            assert.typeOf(resources.TotalEnergyLimit, 'string');
        });

        it('should route the by-id reads through GET', async function () {
            const confirmed = await raw.getAccountById(accountId);
            assert.equal(confirmed.account_id, accountId.slice(2));
            assert.typeOf(confirmed.create_time, 'string');
            const unconfirmed = await raw.getUnconfirmedAccountById(accountId);
            assert.typeOf(unconfirmed.create_time, 'string');
        });

        it('should return staking amounts as strings', async function () {
            const unfreezeCount = await raw.getAvailableUnfreezeCount(unfreezerAddress);
            assert.typeOf(unfreezeCount.count, 'string');
            const maxSize = await raw.getCanDelegatedMaxSize(unfreezerAddress, 'ENERGY');
            assert.typeOf(maxSize.max_size, 'string');
            const withdrawable = await raw.getCanWithdrawUnfreezeAmount(unfreezerAddress, Date.now() + 100 * 24 * 3600 * 1000);
            assert.typeOf(withdrawable.amount, 'string');
        });

        it('should return delegated resource amounts as strings', async function () {
            const result = await raw.getDelegatedResourceV2(delegationFrom, delegationTo);
            assert.isNotEmpty(result.delegatedResource);
            for (const delegation of result.delegatedResource!) {
                if (delegation.frozen_balance_for_energy !== undefined) {
                    assert.typeOf(delegation.frozen_balance_for_energy, 'string');
                }
                if (delegation.frozen_balance_for_bandwidth !== undefined) {
                    assert.typeOf(delegation.frozen_balance_for_bandwidth, 'string');
                }
            }
        });
    });

    describe('#TRC10 tokens', function () {
        let rawToken: Types.Int64AsString<Token>;

        beforeAll(async function () {
            rawToken = await raw.getTokenByID(tokenId);
        });

        it('should return int64 asset issue fields as strings', function () {
            assert.typeOf(rawToken.total_supply, 'string');
            assert.typeOf(rawToken.start_time, 'string');
            assert.typeOf(rawToken.end_time, 'string');
        });

        it('should still decode the utf8 name fields', function () {
            assert.equal(rawToken.name, tokenName);
        });

        it('should list tokens with string int64 fields and int32 fields untouched', async function () {
            const tokens = await raw.listTokens(5, 0);
            assert.isNotEmpty(tokens);
            for (const token of tokens) {
                assert.typeOf(token.total_supply, 'string');
                if (token.precision !== undefined) assert.typeOf(token.precision, 'number');
            }
        });

        it('should return string int64 fields from the by-name list', async function () {
            const byName = await raw.getTokenListByName(tokenName);
            const list = Array.isArray(byName) ? byName : [byName];
            assert.isNotEmpty(list);
            // TRC10 names are not unique on-chain: prefer the created token
            const token = list.find((candidate) => String(candidate.id) === tokenId) ?? list[0];
            assert.typeOf(token.total_supply, 'string');
            assert.typeOf(token.end_time, 'string');
        });

        it('should return string int64 fields from getTokenFromID', async function () {
            // the randomly generated fixture name is unique, so the by-name
            // lookup (which rejects ambiguous names) is deterministic here
            const token = await raw.getTokenFromID(tokenName);
            assert.typeOf(token.total_supply, 'string');
        });

        it('should return string int64 fields from getTokensIssuedByAddress', async function () {
            const tokens = await raw.getTokensIssuedByAddress(tokenOwner);
            const issued = Object.values(tokens)[0];
            assert.isDefined(issued);
            assert.typeOf(issued.total_supply, 'string');
        });
    });

    describe('#witnesses, governance and exchanges', function () {
        it('should return witness tallies as strings', async function () {
            const witnesses = await raw.listSuperRepresentatives();
            const withVotes = witnesses.filter((witness) => witness.voteCount !== undefined);
            assert.isNotEmpty(withVotes);
            for (const witness of withVotes) assert.typeOf(witness.voteCount, 'string');
        });

        it('should return string tallies from getNowWitnessList', async function () {
            const witnesses = await raw.getNowWitnessList({ limit: 3 });
            const withVotes = witnesses.find((witness) => witness.voteCount !== undefined);
            assert.isDefined(withVotes);
            assert.typeOf(withVotes!.voteCount, 'string');
        });

        it('should return proposal int64 fields as strings', async function () {
            const proposals = await raw.listProposals();
            assert.isNotEmpty(proposals);
            assert.typeOf(proposals[0].proposal_id, 'string');
            assert.typeOf(proposals[0].expiration_time, 'string');
            const proposal = await raw.getProposal(Number(proposals[0].proposal_id));
            assert.typeOf(proposal.proposal_id, 'string');
            assert.typeOf(proposal.create_time, 'string');
        });

        it('should return chain parameter values as strings', async function () {
            const parameters = await raw.getChainParameters();
            assert.isNotEmpty(parameters);
            const withValue = parameters.find((parameter) => parameter.value !== undefined);
            assert.isDefined(withValue);
            assert.typeOf(withValue!.value, 'string');
        });

        it('should return string int64 fields for exchanges', async function () {
            const paginated = await raw.listExchangesPaginated(3, 0);
            assert.isNotEmpty(paginated);
            assert.typeOf(paginated[0].exchange_id, 'string');
            assert.typeOf(paginated[0].create_time, 'string');
            const exchange = await raw.getExchangeByID(Number(paginated[0].exchange_id));
            assert.typeOf(exchange.create_time, 'string');
            // balances are live and omitted once withdrawn to zero
            if (exchange.first_token_balance !== undefined) assert.typeOf(exchange.first_token_balance, 'string');
            const all = await raw.listExchanges();
            assert.isNotEmpty(all);
            assert.typeOf(all[0].exchange_id, 'string');
        });

        it('should return the reward as a string', async function () {
            const reward = await raw.getReward(srAddress);
            assert.typeOf(reward, 'string');
            const unconfirmedReward = await raw.getUnconfirmedReward(srAddress);
            assert.typeOf(unconfirmedReward, 'string');
        });

        it('should return the next maintenance timestamp as a string', async function () {
            const seconds = await raw.timeUntilNextVoteCycle();
            assert.typeOf(seconds, 'string');
        });
    });

    describe('#contracts', function () {
        it('should return contract int64 settings as strings', async function () {
            const contract = await raw.getContract(contractAddress);
            // settings are owner-mutable and omitted when zero
            if (contract.consume_user_resource_percent !== undefined) {
                assert.typeOf(contract.consume_user_resource_percent, 'string');
            }
            if (contract.origin_energy_limit !== undefined) {
                assert.typeOf(contract.origin_energy_limit, 'string');
            }
        });

        it('should keep the trx and raw contract caches isolated', async function () {
            // prime both caches, then re-read: each instance must keep its own shape
            await trx.getContract(contractAddress);
            await raw.getContract(contractAddress);
            const plainContract = await trx.getContract(contractAddress);
            const rawContract = await raw.getContract(contractAddress);
            if (plainContract.consume_user_resource_percent !== undefined) {
                assert.typeOf(plainContract.consume_user_resource_percent, 'number');
                assert.typeOf(rawContract.consume_user_resource_percent, 'string');
            }
        });

        it('should return string int64 fields from getContractInfo', async function () {
            const info = await raw.getContractInfo(contractAddress);
            if (info.smart_contract.origin_energy_limit !== undefined) {
                assert.typeOf(info.smart_contract.origin_energy_limit, 'string');
            }
            if (info.contract_state?.update_cycle !== undefined) {
                assert.typeOf(info.contract_state.update_cycle, 'string');
            }
        });
    });

    describe('#reads that stay on the regular number path', function () {
        it('should keep getCurrentRefBlockParams numeric on the raw instance', async function () {
            const params = await raw.getCurrentRefBlockParams();
            assert.match(params.ref_block_bytes, /^[0-9a-f]{4}$/);
            assert.typeOf(params.timestamp, 'number');
            assert.typeOf(params.expiration, 'number');
        });

        it('should keep the int32 brokerage a number', async function () {
            const brokerage = await raw.getBrokerage(srAddress);
            assert.typeOf(brokerage, 'number');
        });

        it('should keep the price strings untouched', async function () {
            const prices = await raw.getBandwidthPrices();
            assert.typeOf(prices, 'string');
        });

        it('should keep getNodeInfo numbers untouched', async function () {
            const info = await raw.getNodeInfo();
            assert.typeOf(info.beginSyncNum, 'number');
        });
    });
});
