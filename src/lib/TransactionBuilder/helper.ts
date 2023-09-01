import TronWeb from '../../tronweb.js';
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

export async function createTransaction(
    tronWeb: TronWeb,
    type: ContractType,
    value: ContractParamter,
    Permission_id?: number,
    options = {}
): Promise<Transaction> {
    const metaData = await getHeaderInfo(tronWeb.fullNode);
    const tx: Transaction = {
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
            ...metaData,
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
