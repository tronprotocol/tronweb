import { ContractParamter, ContractType } from './Contract.js';

export interface ContractParamterCapsule<T = ContractParamter> {
    value: T;
    type_url: string;
}
export interface TransactionContract {
    type: ContractType;
    parameter: ContractParamterCapsule;
    Permission_id?: number;
}

export interface Transaction {
    visible: boolean;
    txID: string;
    raw_data: {
        contract: TransactionContract[];
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

export interface CreateSmartContractTransaction extends Transaction {
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
}

export interface SignedTransaction extends Transaction {
    signature: string[];
}
