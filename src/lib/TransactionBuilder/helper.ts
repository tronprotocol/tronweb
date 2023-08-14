import TronWeb from '../../index.js';
import { Transaction, TransactionCapsule } from '../../types/Transaction.js';
import { txCheckWithArgs, txJsonToPb, txPbToTxID, txPbToRawDataHex } from '../../utils/transaction.js';
import { keccak256 } from '../../utils/ethersUtils.js';
import { BlockWithoutDetail } from '../../types/APIResponse.js';
import HttpProvider from '../providers/HttpProvider.js';
import { ContractParamter, ContractType } from '../../types/Contract.js';
import { AbiFragment, ContractAbiInterface } from '../../types/ABI.js';

export function fromUtf8(value: string) {
    return TronWeb.fromUtf8(value).replace(/^0x/, '');
}

export function deepCopyJson<T = unknown>(json: object): T {
    return JSON.parse(JSON.stringify(json));
}
export function resultManager(transaction: TransactionCapsule, data: unknown, options: InternalTriggerSmartContractOptions) {
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
    transaction: TransactionCapsule,
    data: unknown,
    options: InternalTriggerSmartContractOptions
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

export interface PermissionId {
    permissionId?: number;
}

export type NumberLike = string | number;

export type Resource = 'BANDWIDTH' | 'ENERGY';

export interface VoteInfo {
    [srAddress: string]: number;
}

export interface CreateSmartContractOptions {
    /**
     * The maximum TRX burns for resource consumption（1TRX = 1,000,000SUN）.
     */
    feeLimit?: number;
    /**
     * The TRX transfer to the contract for each call（1TRX = 1,000,000SUN）
     */
    callValue?: number;
    /**
     * The id of trc10 token transfer to the contract (Optional)
     */
    tokenId?: string;
    /**
     * The amount of trc10 token transfer to the contract for each call (Optional)
     */
    tokenValue?: number;
    /**
     * Consume user's resource percentage. It should be an integer between [0, 100].
     * if 0, means it does not consume user's resource until the developer's resource has been used up.
     */
    userFeePercentage?: number;
    /**
     * The maximum resource consumption of the creator in one execution or creation.
     */
    originEnergyLimit?: number;
    /**
     * Abi string
     */
    abi: string | { entrys: ContractAbiInterface } | ContractAbiInterface;
    /**
     * Bytecode, default hexString.
     */
    bytecode: string;
    /**
     * The list of the parameters of the constructor.
     * It should be converted hexString after encoded according to ABI encoder.
     * If constructor has no parameter, this can be optional
     */
    parameters?: string;
    /**
     * Contract name string.
     */
    name?: string;
    /**
     * Optional, for multi-signature use
     */
    permissionId?: number;
    /**
     * Optional, raw parameters such as 0x0000000000000000000000000000000000000000000000000000000000000001.
     */
    rawParameter?: string;
    funcABIV2?: unknown;
    parametersV2?: unknown;
}

export interface TriggerSmartContractOptions {
    /**
     * The maximum TRX burns for resource consumption（1TRX = 1,000,000SUN）.
     */
    feeLimit?: number;
    /**
     * The TRX transfer to the contract for each call（1TRX = 1,000,000SUN）
     */
    callValue?: number;
    /**
     * The id of trc10 token transfer to the contract (Optional)
     */
    tokenId?: string;
    /**
     * The amount of trc10 token transfer to the contract for each call (Optional)
     */
    tokenValue?: number;
    /**
     * @todo: Create transaction locally instead of send request to server.
     */
    txLocal?: boolean;
    /**
     * Optional, for multi-signature use
     */
    permissionId?: number;
    /**
     * Optional, raw parameters such as 0x0000000000000000000000000000000000000000000000000000000000000001.
     */
    rawParameter?: string;
    funcABIV2?: unknown;
    parametersV2?: unknown;
}
// @todo: confirm
export interface InternalTriggerSmartContractOptions extends TriggerSmartContractOptions {
    funcABIV2?: AbiFragment;
    parametersV2?: unknown[];
    shieldedParameter?: string;
    rawParameter?: string;
    _isConstant?: boolean;
    estimateEnergy?: boolean;
    /**
     * Optional, for multi-signature use
     */
    permissionId?: number;
    /**
     * If use solidity node to trigger smart contract.
     */
    confirmed?: boolean;
}
// @todo: more detailed type
export interface TriggerSmartContractFunctionParameter {
    type: string;
    value: unknown;
}

export interface CreateTokenOptions {
    /**
     * Token name, default string.
     */
    name: string;
    /**
     * Token name abbreviation, default string.
     */
    abbreviation: string;
    /**
     * Token description, default string.
     */
    description?: string;
    /**
     * Token official website url, default string.
     */
    url: string;
    /**
     * Token total supply.
     */
    totalSupply: number;
    /**
     * Define the price by the ratio of trx_num/num.
     * Default is 1.
     */
    trxRatio: number;
    /**
     * Define the price by the ratio of trx_num/num.
     * Default is 1.
     */
    tokenRatio: number;
    /**
     * ICO start time.
     */
    saleStart: number;
    /**
     * ICO end time.
     */
    saleEnd: number;
    /**
     * The creator's "donated" bandwidth for use by token holders.
     * Default is 0.
     */
    freeBandwidth?: number;
    /**
     * Out of `totalFreeBandwidth`, the amount each token holder get.
     * Default is 0.
     */
    freeBandwidthLimit?: number;
    /**
     * Token staked supply.
     * Default is 0.
     */
    frozenAmount?: number;
    /**
     * Token staked duration.
     * Default is 0.
     */
    frozenDuration?: number;
    /**
     * @todo: desc
     */
    voteScore?: number;
    /**
     * Precision of issued tokens.
     */
    precision?: number;
    /**
     * Optional, for multi-signature use.
     */
    permissionId?: number;
}

export interface UpdateTokenOptions extends PermissionId {
    /**
     * The description of token.
     * Optional.
     */
    description?: string;
    /**
     * The token's website url.
     */
    url: string;
    /**
     * Each token holder's free bandwidth.
     * Optional.
     */
    freeBandwidth?: number;
    /**
     * The total free bandwidth of the token.
     * Optional. Default is 0.
     */
    freeBandwidthLimit?: number;
}

export interface AlterTransactionOptions {
    data?: string;
    dataFormat?: string;
    extension?: number;
    txLocal?: boolean;
}

export interface TxLocal {
    txLocal?: boolean;
}
