import { Permission } from './Contract.js';
import { SignedTransaction, TransactionWrapper } from './Transaction.js';

export interface APIReturnedPermission extends Omit<Permission, 'type'> {
    type?: string;
}
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

export interface GetTransactionResponse extends Omit<SignedTransaction, 'visible'> {
    visible?: boolean;
    ret: [
        {
            contractRet: string;
        }
    ];
}

export interface Block {
    blockID: string;
    /** If a block has 0 transaction, this prop will be undefined */
    transactions?: GetTransactionResponse[];
    block_header: BlockHeader;
}

export interface GetSignWeightResponse {
    permission: APIReturnedPermission;
    result: {
        code: string;
    };
    transaction: TransactionWrapper;
}
