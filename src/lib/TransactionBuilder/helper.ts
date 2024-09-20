import { TronWeb } from '../../tronweb.js';
import { Transaction, TransactionWrapper } from '../../types/Transaction.js';
import { txCheckWithArgs, txJsonToPb, txPbToTxID, txPbToRawDataHex } from '../../utils/transaction.js';
import { keccak256 } from '../../utils/ethersUtils.js';
import { BlockWithoutDetail } from '../../types/APIResponse.js';
import HttpProvider from '../providers/HttpProvider.js';
import { ContractParamter, ContractType } from '../../types/Contract.js';
import { TriggerConstantContractOptions } from '../../types/TransactionBuilder.js';

export function fromUtf8(value: string) {
    return TronWeb.fromUtf8(value).replace(/^0x/, '');
}

export function deepCopyJson<T = unknown>(json: object): T {
    return JSON.parse(JSON.stringify(json));
}
export function resultManager(transaction: TransactionWrapper, data: unknown, options: TriggerConstantContractOptions) {
    if (transaction.Error) throw new Error(transaction.Error);

    if (transaction.result && transaction.result.message) {
        throw new Error(TronWeb.toUtf8(transaction.result.message));
    }
    const authResult = txCheckWithArgs(transaction, data, options);
    if (authResult) {
        return transaction;
    }
    throw new Error('Invalid transaction');
}

export function resultManagerTriggerSmartContract(
    transaction: TransactionWrapper,
    data: unknown,
    options: TriggerConstantContractOptions
) {
    if (transaction.Error) throw new Error(transaction.Error);

    if (transaction.result && transaction.result.message) {
        throw new Error(TronWeb.toUtf8(transaction.result.message));
    }

    if (!(options._isConstant || options.estimateEnergy)) {
        const authResult = txCheckWithArgs(transaction.transaction, data, options);
        if (authResult) {
            return transaction;
        }
        throw new Error('Invalid transaction');
    }
    return transaction;
}

export function genContractAddress(ownerAddress: string, txID: string) {
    return (
        '41' +
        keccak256(Buffer.from(txID + ownerAddress, 'hex'))
            .toString()
            .substring(2)
            .slice(24)
    );
}

export function getHeaderInfo(node: HttpProvider) {
    return node.request<BlockWithoutDetail>('wallet/getblock', { detail: false }, 'post').then((data) => {
        return {
            ref_block_bytes: data.block_header.raw_data.number.toString(16).slice(-4).padStart(4, '0'),
            ref_block_hash: data.blockID.slice(16, 32),
            expiration: data.block_header.raw_data.timestamp + 60 * 1000,
            timestamp: data.block_header.raw_data.timestamp,
        };
    });
}

function checkBlockHeader(options = {} as Partial<Transaction['raw_data']>): boolean {
    if (
        typeof options['ref_block_bytes'] === 'undefined' &&
        typeof options['ref_block_hash'] === 'undefined' &&
        typeof options['expiration'] === 'undefined' &&
        typeof options['timestamp'] === 'undefined'
    ) {
        return false;
    }
    if (typeof options['ref_block_bytes'] !== 'string') {
        throw new Error('Invalid ref_block_bytes provided.');
    }
    if (typeof options['ref_block_hash'] !== 'string') {
        throw new Error('Invalid ref_block_hash provided.');
    }
    if (typeof options['expiration'] !== 'number') {
        throw new Error('Invalid expiration provided.');
    }
    if (typeof options['timestamp'] !== 'number') {
        throw new Error('Invalid timestamp provided.');
    }
    return true;
}

export async function createTransaction<T extends ContractParamter>(
    tronWeb: TronWeb,
    type: ContractType,
    value: T,
    Permission_id?: number,
    options = {} as Partial<Omit<Transaction['raw_data'], 'contract'>>
): Promise<Transaction<T>> {
    const tx: Transaction<T> = {
        visible: false,
        txID: '',
        raw_data_hex: '',
        raw_data: {
            contract: [
                {
                    parameter: {
                        value,
                        type_url: `type.googleapis.com/protocol.${type}`,
                    },
                    type,
                },
            ],
            ...(checkBlockHeader(options) ? ({} as Transaction['raw_data']) : await getHeaderInfo(tronWeb.fullNode)),
            ...options,
        },
    };
    if (Permission_id) {
        tx.raw_data.contract[0].Permission_id = Permission_id;
    }
    const pb = txJsonToPb(tx);
    tx.txID = txPbToTxID(pb).replace(/^0x/, '');
    tx.raw_data_hex = txPbToRawDataHex(pb).toLowerCase();
    return tx;
}

export function getTransactionOptions(options: { blockHeader?: Partial<Transaction['raw_data']> } = {}) {
    const ret = {} as Partial<Transaction['raw_data']>;
    if (checkBlockHeader(options.blockHeader)) {
        ret['ref_block_bytes'] = options.blockHeader!['ref_block_bytes'];
        ret['ref_block_hash'] = options.blockHeader!['ref_block_hash'];
        ret['expiration'] = options.blockHeader!['expiration'];
        ret['timestamp'] = options.blockHeader!['timestamp'];
    }
    return ret;
}
