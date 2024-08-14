import { Resource } from '../types/TransactionBuilder.js';
import { ContractAbiInterface } from './ABI.js';
export enum ContractType {
    AccountCreateContract = 'AccountCreateContract',
    TransferContract = 'TransferContract',
    TransferAssetContract = 'TransferAssetContract',
    VoteAssetContract = 'VoteAssetContract',
    VoteWitnessContract = 'VoteWitnessContract',
    WitnessCreateContract = 'WitnessCreateContract',
    AssetIssueContract = 'AssetIssueContract',
    WitnessUpdateContract = 'WitnessUpdateContract',
    ParticipateAssetIssueContract = 'ParticipateAssetIssueContract',
    AccountUpdateContract = 'AccountUpdateContract',
    FreezeBalanceContract = 'FreezeBalanceContract',
    UnfreezeBalanceContract = 'UnfreezeBalanceContract',
    CancelAllUnfreezeV2Contract = 'CancelAllUnfreezeV2Contract',
    WithdrawBalanceContract = 'WithdrawBalanceContract',
    UnfreezeAssetContract = 'UnfreezeAssetContract',
    UpdateAssetContract = 'UpdateAssetContract',
    ProposalCreateContract = 'ProposalCreateContract',
    ProposalApproveContract = 'ProposalApproveContract',
    ProposalDeleteContract = 'ProposalDeleteContract',
    SetAccountIdContract = 'SetAccountIdContract',
    CustomContract = 'CustomContract',
    CreateSmartContract = 'CreateSmartContract',
    TriggerSmartContract = 'TriggerSmartContract',
    GetContract = 'GetContract',
    UpdateSettingContract = 'UpdateSettingContract',
    ExchangeCreateContract = 'ExchangeCreateContract',
    ExchangeInjectContract = 'ExchangeInjectContract',
    ExchangeWithdrawContract = 'ExchangeWithdrawContract',
    ExchangeTransactionContract = 'ExchangeTransactionContract',
    UpdateEnergyLimitContract = 'UpdateEnergyLimitContract',
    AccountPermissionUpdateContract = 'AccountPermissionUpdateContract',
    ClearABIContract = 'ClearABIContract',
    UpdateBrokerageContract = 'UpdateBrokerageContract',
    ShieldedTransferContract = 'ShieldedTransferContract',
    MarketSellAssetContract = 'MarketSellAssetContract',
    MarketCancelOrderContract = 'MarketCancelOrderContract',
    FreezeBalanceV2Contract = 'FreezeBalanceV2Contract',
    UnfreezeBalanceV2Contract = 'UnfreezeBalanceV2Contract',
    WithdrawExpireUnfreezeContract = 'WithdrawExpireUnfreezeContract',
    DelegateResourceContract = 'DelegateResourceContract',
    UnDelegateResourceContract = 'UnDelegateResourceContract',
    UNRECOGNIZED = 'UNRECOGNIZED',
}
export enum Permission_PermissionType {
    Owner = 0,
    Witness = 1,
    Active = 2,
    UNRECOGNIZED = -1,
}

export interface Key {
    address: Uint8Array;
    weight: number;
}

export enum AccountType {
    Normal = 0,
    AssetIssue = 1,
    Contract = 2,
    UNRECOGNIZED = -1,
}

export interface PermissionKey {
    address: string;
    weight: number;
}
export interface Permission {
    type: number;
    /** Owner id=0, Witness id=1, Active id start by 2 */
    id?: number;
    permission_name: string;
    threshold: number;
    operations?: string;
    keys: PermissionKey[];
}

export interface TransferContract {
    to_address: string;
    owner_address: string;
    amount: number;
}

export interface TransferAssetContract {
    to_address: string;
    owner_address: string;
    amount: number;
    asset_name: string;
}

export interface ParticipateAssetIssueContract {
    to_address: string;
    owner_address: string;
    asset_name: string;
    amount: number;
}

export interface TriggerSmartContract {
    owner_address: string;
    contract_address: string;
    call_value?: number;
    call_token_value?: number;
    token_id?: number;
    data?: string;
}

export interface FreezeBalanceContract {
    owner_address: string;
    frozen_balance: number;
    frozen_duration: number;
    resource?: Resource;
    receiver_address?: string;
}

export interface UnfreezeBalanceContract {
    owner_address: string;
    resource: string;
    receiver_address: string;
}

export interface WithdrawBalanceContract {
    owner_address: string;
}

export interface FreezeBalanceV2Contract {
    owner_address: string;
    frozen_balance: number;
    resource?: Resource;
}

export interface CancelFreezeBalanceV2Contract {
    owner_address: string;
}

export interface UnfreezeBalanceV2Contract {
    owner_address: string;
    unfreeze_balance: number;
    resource?: Resource;
}

export interface DelegateResourceContract {
    owner_address: string;
    receiver_address: string;
    balance: number;
    resource?: Resource;
    lock?: boolean;
    lock_period?: number;
}

export interface UnDelegateResourceContract {
    owner_address: string;
    receiver_address: string;
    balance: number;
    resource?: Resource;
}

export interface WithdrawExpireUnfreezeContract {
    owner_address: string;
}

export interface CreateSmartContract {
    owner_address: string;
    call_token_value: number;
    token_id: string;
    new_contract: {
        name: string;
        origin_address: string;
        contract_address: string;
        abi: { entrys?: ContractAbiInterface };
        bytecode: string;
        call_value: number;
        consume_user_resource_percent: number;
        origin_energy_limit: number;
    };
}

export interface DeployConstantContract {
    data: string;
    owner_address: string;
    call_value?: number;
    token_id?: number | string;
    call_token_value?: number | string;
}

export interface ClearABIContract {
    contract_address: string;
    owner_address: string;
}

export interface UpdateBrokerageContract {
    brokerage: number;
    owner_address: string;
}

interface FrozenSupply {
    frozen_amount: number;
    frozen_days: number;
}
export interface AssetIssueContract {
    owner_address: string;
    name: string;
    abbr: string;
    description: string;
    url: string;
    total_supply: number;
    trx_num: number;
    num: number;
    start_time: number;
    end_time: number;
    precision: number;
    free_asset_net_limit: number;
    public_free_asset_net_limit: number;
    public_free_asset_net_usage: number;
    public_latest_free_net_time: number;
    vote_score: number;
    frozen_supply: FrozenSupply[];
}

export interface AccountCreateContract {
    account_address: string;
    owner_address: string;
}

export interface AccountUpdateContract {
    account_name: string;
    owner_address: string;
}

export interface SetAccountIdContract {
    account_id: string;
    owner_address: string;
}

export interface ProposalCreateContract {
    owner_address: string;
    parameters: Record<string, string | number>[];
}

export interface ProposalDeleteContract {
    owner_address: string;
    proposal_id: number;
}

export interface VoteProposalContract {
    owner_address: string;
    proposal_id: number;
    is_add_approval: boolean;
}

export interface ExchangeCreateContract {
    owner_address: string;
    first_token_id: string;
    first_token_balance: number;
    second_token_id: string;
    second_token_balance: number;
}

export interface ExchangeInjectContract {
    owner_address: string;
    exchange_id: number;
    token_id: string;
    quant: number;
}

export interface ExchangeWithdrawContract {
    owner_address: string;
    exchange_id: number;
    token_id: string;
    quant: number;
}

export interface ExchangeTransactionContract {
    owner_address: string;
    exchange_id: number;
    token_id: string;
    quant: number;
    expected: number;
}

export interface UpdateSettingContract {
    owner_address: string;
    contract_address: string;
    consume_user_resource_percent: number;
}

export interface UpdateEnergyLimitContract {
    owner_address: string;
    contract_address: string;
    origin_energy_limit: number;
}

export interface AccountPermissionUpdateContract {
    owner_address: string;
    owner?: Permission;
    witness?: Permission;
    actives?: Permission[];
}

export interface UpdateAssetContract {
    owner_address: string;
    description: string;
    url: string;
    new_limit?: number;
    new_public_limit?: number;
}

export interface WitnessCreateContract {
    owner_address: string;
    url: string;
}

export interface VoteWitnessContract {
    owner_address: string;
    votes: { vote_address: string; vote_count: number }[];
}

export type ContractParamter =
    | TransferContract
    | TransferAssetContract
    | ParticipateAssetIssueContract
    | TriggerSmartContract
    | FreezeBalanceContract
    | UnfreezeBalanceContract
    | WithdrawBalanceContract
    | FreezeBalanceV2Contract
    | CancelFreezeBalanceV2Contract
    | UnfreezeBalanceV2Contract
    | DelegateResourceContract
    | UnDelegateResourceContract
    | WithdrawExpireUnfreezeContract
    | CreateSmartContract
    | ClearABIContract
    | UpdateBrokerageContract
    | AssetIssueContract
    | AccountCreateContract
    | AccountUpdateContract
    | SetAccountIdContract
    | ProposalCreateContract
    | ProposalDeleteContract
    | VoteProposalContract
    | ExchangeCreateContract
    | ExchangeInjectContract
    | ExchangeWithdrawContract
    | ExchangeTransactionContract
    | UpdateSettingContract
    | UpdateEnergyLimitContract
    | AccountPermissionUpdateContract
    | UpdateAssetContract
    | WitnessCreateContract
    | VoteWitnessContract;
