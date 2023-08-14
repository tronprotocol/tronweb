import { ContractParamter, ContractType, CreateSmartContract } from './Contract.js';

export interface ContractParamterCapsule<T = ContractParamter> {
    value: T;
    type_url: string;
}
export interface TransactionContract<T = ContractParamter> {
    type: ContractType;
    parameter: ContractParamterCapsule<T>;
    Permission_id?: number;
}

export interface Transaction<T = ContractParamter> {
    visible: boolean;
    txID: string;
    raw_data: {
        contract: TransactionContract<T>[];
        ref_block_bytes: string;
        ref_block_hash: string;
        expiration: number;
        timestamp: number;
        // @todo: confirm these exist
        data?: unknown;
        fee_limit?: unknown;
    };
    raw_data_hex: string;
}

export interface CreateSmartContractTransaction extends Transaction<CreateSmartContract> {
    /**
     * Address of smart contract.
     */
    contract_address: string;
}
// @todo: to be confirm
export interface TransactionCapsule {
    Error?: string;
    result: {
        result: boolean;
        message?: string;
    };
    transaction: Transaction;
    energy_required?: number;
    constant_result?: string;
}

export interface SignedTransaction extends Transaction {
    signature: string[];
}
