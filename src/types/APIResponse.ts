import { Permission } from './Contract.js';
import { Transaction, TransactionWrapper } from './Transaction.js';

export interface BlockHeaderRawData {
    number: number;
    txTrieRoot: string;
    witness_address: string;
    parentHash: string;
    version: number;
    timestamp: number;
}
export interface BlockHeader {
    raw_data: BlockHeaderRawData;
    witness_signature: string;
}
export interface BlockWithoutDetail {
    blockID: string;
    block_header: BlockHeader;
}

export interface Block {
    blockID: string;
    /** If a block has 0 transaction, this prop will be undefined */
    transactions?: Transaction[];
    block_header: BlockHeader;
}

export interface GetSignWeightResponse {
    permission: Permission;
    result: {
        code: string;
    };
    transaction: TransactionWrapper;
}
