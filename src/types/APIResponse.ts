import { Permission } from './Contract';
import { Transaction, TransactionWrapper } from './Transaction';

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
    transactions: Transaction[];
    block_header: BlockHeader;
}

export interface GetSignWeightResponse {
    permission: Permission;
    result: {
        code: string;
    };
    transaction: TransactionWrapper;
}
