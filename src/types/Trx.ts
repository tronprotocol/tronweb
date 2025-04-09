import { AccountType } from './Contract.js';
import { SignedTransaction, Transaction } from './Transaction.js';
import { Resource } from './TransactionBuilder.js';
import { APIReturnedPermission } from './APIResponse.js';

type HTTPMap<T extends string | number | symbol, U> = Record<T, U>[];

export interface FrozenSupply {
    frozen_amount: number;
    frozen_days: number;
}

export interface Token {
    id: string;
    owner_address: string;
    name: string;
    abbr: string;
    total_supply: number;
    frozen_supply: FrozenSupply[];
    trx_num: number;
    precision: number;
    num: number;
    start_time: number;
    end_time: number;
    order: number; // useless
    vote_score: number;
    description: string;
    url: string;
    free_asset_net_limit: number;
    public_free_asset_net_limit: number;
    public_free_asset_net_usage: number;
    public_latest_free_net_time: number;
}

export interface Frozen {
    frozen_balance: number;
    expire_time: number;
}

export interface Vote {
    vote_address: string;
    vote_count: number;
}

export interface AccountResource {
    energy_usage: number;
    frozen_balance_for_energy: Frozen;
    latest_consume_time_for_energy: number;
    acquired_delegated_frozen_balance_for_energy: number;
    delegated_frozen_balance_for_energy: number;
    storage_limit: number;
    storage_usage: number;
    latest_exchange_storage_time: number;
    energy_window_size: number;
    delegated_frozenV2_balance_for_energy: number;
    acquired_delegated_frozenV2_balance_for_energy: number;
    energy_window_optimized: boolean;
}

export enum ResourceCode {
    BANDWIDTH = 0x00,
    ENERGY = 0x01,
    TRON_POWER = 0x02,
}

export interface FreezeV2 {
    type: Resource;
    amount: number;
}
export interface UnFreezeV2 {
    type: Resource;
    unfreeze_amount: number;
    unfreeze_expire_time: number;
}

export interface Account {
    account_name: string;
    type: AccountType;
    address: string;
    balance: number;
    votes: Vote[];
    asset: HTTPMap<string, number>;
    assetV2: HTTPMap<string, number>;
    frozen: Frozen[];
    net_usage: number;
    acquired_delegated_frozen_balance_for_bandwidth: number;
    delegated_frozen_balance_for_bandwidth: number;
    old_tron_power: number;
    tron_power: Frozen;
    asset_optimized: boolean;
    create_time: number;
    latest_opration_time: number;
    allowance: number;
    latest_withdraw_time: number;
    code: string;
    is_witness: boolean;
    is_committee: boolean;
    frozen_supply: Frozen;
    asset_issued_name: string;
    asset_issued_ID: string;
    latest_asset_operation_time: HTTPMap<string, number>;
    latest_asset_operation_timeV2: HTTPMap<string, number>;
    free_net_usage: number;
    free_asset_net_usage: HTTPMap<string, number>;
    free_asset_net_usageV2: HTTPMap<string, number>;
    latest_consume_time: number;
    latest_consume_free_time: number;
    account_id: string;
    net_window_size: number;
    net_window_optimized: boolean;
    account_resource: AccountResource;
    codeHash: string;
    owner_permission: APIReturnedPermission;
    witness_permission: APIReturnedPermission;
    active_permission: APIReturnedPermission[];
    frozenV2: FreezeV2[];
    unfrozenV2: UnFreezeV2[];
    delegated_frozenV2_balance_for_bandwidth: number;
    acquired_delegated_frozenV2_balance_for_bandwidth: number;
}

export interface AccountNetMessage {
    freeNetUsed: number;
    freeNetLimit: number;
    NetUsed: number;
    NetLimit: number;
    assetNetUsed: HTTPMap<string, number>;
    assetNetLimit: HTTPMap<string, number>;
    TotalNetLimit: number;
    TotalNetWeight: number;
}

export interface Witness {
    address: string;
    voteCount: number;
    pubKey: string;
    url: string;
    totalProduced: number;
    totalMissed: number;
    latestBlockNum: number;
    latestSlotNum: number;
    isJobs: boolean;
}

enum TransactionSignWeight_response_code {
    ENOUGH_PERMISSION = 'ENOUGH_PERMISSION',
    NOT_ENOUGH_PERMISSION = 'NOT_ENOUGH_PERMISSION', // error in
    SIGNATURE_FORMAT_ERROR = 'SIGNATURE_FORMAT_ERROR',
    COMPUTE_ADDRESS_ERROR = 'COMPUTE_ADDRESS_ERROR',
    PERMISSION_ERROR = 'PERMISSION_ERROR', //The key is not in permission
    OTHER_ERROR = 'OTHER_ERROR',
}

interface TransactionSignWeightResult {
    code: TransactionSignWeight_response_code;
    message: string;
}

export interface TransactionSignWeight {
    permission: APIReturnedPermission;
    approved_list: string[];
    current_weight: number;
    result: TransactionSignWeightResult;
    transaction: { transaction: Transaction };
}

enum BroadcastReturn_response_code {
    SUCCESS = 0,
    SIGERROR = 1, // error in signature
    CONTRACT_VALIDATE_ERROR = 2,
    CONTRACT_EXE_ERROR = 3,
    BANDWITH_ERROR = 4,
    DUP_TRANSACTION_ERROR = 5,
    TAPOS_ERROR = 6,
    TOO_BIG_TRANSACTION_ERROR = 7,
    TRANSACTION_EXPIRATION_ERROR = 8,
    SERVER_BUSY = 9,
    NO_CONNECTION = 10,
    NOT_ENOUGH_EFFECTIVE_CONNECTION = 11,
    OTHER_ERROR = 20,
}

export interface BroadcastReturn<T extends SignedTransaction> {
    result: boolean;
    txid: string;
    code: BroadcastReturn_response_code;
    message: string;
    transaction: T;
}

export interface BroadcastHexReturn {
    result: boolean;
    txid: string;
    code: string;
    message: string;
    transaction: string;
}

export interface AddressOptions {
    privateKey?: string;
    address?: string;
}

enum ProposalState {
    PENDING = 0,
    DISAPPROVED = 1,
    APPROVED = 2,
    CANCELED = 3,
}

export interface Proposal {
    proposal_id: number;
    proposer_address: string;
    parameters: HTTPMap<number, number>;
    expiration_time: number;
    create_time: number;
    approvals: string[];
    state: ProposalState;
}

export interface ChainParameter {
    key: string;
    value: number;
}

export interface AccountResourceMessage {
    freeNetUsed: number;
    freeNetLimit: number;
    NetUsed: number;
    NetLimit: number;
    assetNetUsed: HTTPMap<string, number>;
    assetNetLimit: HTTPMap<string, number>;
    TotalNetLimit: number;
    TotalNetWeight: number;
    TotalTronPowerWeight: number;
    tronPowerUsed: number;
    tronPowerLimit: number;
    EnergyUsed: number;
    EnergyLimit: number;
    TotalEnergyLimit: number;
    TotalEnergyWeight: number;
    storageUsed: number;
    storageLimit: number;
}

export type Address = string;

export interface Exchange {
    exchange_id: number;
    creator_address: Address;
    create_time: number;
    first_token_id: string;
    first_token_balance: number;
    second_token_id: string;
    second_token_balance: number;
}

export interface TransactionInfo {
    id: string;
    fee: number;
    blockNumber: number;
    blockTimeStamp: number;
    contractResult: string[];
    contract_address: string;
    receipt: {
        energy_usage: number;
        energy_fee: number;
        origin_energy_usage: number;
        energy_usage_total: number;
        net_usage: number;
        net_fee: number;
        result: string;
        energy_penalty_total: number;
    };
    log: {
        address: Address;
        topics: string[];
        data: string;
    }[];
    result?: 'FAILED';
    resMessage: string;
    assetIssueID: string;
    withdraw_amount: number;
    unfreeze_amount: number;
    internal_transactions: {
        hash: string;
        caller_address: string;
        transferTo_address: string;
        callValueInfo: {
            callValue: number;
            tokenId: string;
        }[];
        note: string;
        rejected: boolean;
        extra: string;
    }[];
    exchange_received_amount: number;
    exchange_inject_another_amount: number;
    exchange_withdraw_another_amount: number;
    shielded_transaction_fee: number;
    withdraw_expire_amount: number;
    cancel_unfreezeV2_amount: HTTPMap<string, number>;
    exchange_id: string;
    orderId: string;
    orderDetails: {
        makerOrderId: string;
        takerOrderId: string;
        fillSellQuantity: number;
        fillBuyQuantity: number;
    }[];
    packingFee: number;
}
