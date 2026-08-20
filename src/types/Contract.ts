import { Resource } from '../types/TransactionBuilder.js';
import {
    AbiParamsCommon,
    ContractAbiInterface,
    FunctionFragment,
    GetMethodsTypeFromAbi,
    GetOutputsType,
    GetParamsType,
    IsConstAbi,
} from './ABI.js';
import { IsNever, Prettify, UnionToIntersection } from './UtilsTypes.js';
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

export interface WitnessUpdateContract {
    owner_address: string;
    update_url: string;
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
    | WitnessUpdateContract
    | VoteWitnessContract;

// ─── contract.read / contract.write namespaces ──────────────────────────────

type IsReadOnlyFunction<Fragment> = Fragment extends FunctionFragment
    ? Fragment['stateMutability'] extends 'view' | 'pure'
        ? true
        : Fragment['constant'] extends true
          ? true
          : false
    : false;

type IsWriteFunction<Fragment> = Fragment extends FunctionFragment
    ? IsReadOnlyFunction<Fragment> extends true
        ? false
        : true
    : false;

type ReadContractFragments<Abi extends ContractAbiInterface> = Abi[number] extends infer Fragment
    ? Fragment extends FunctionFragment
        ? IsReadOnlyFunction<Fragment> extends true
            ? Fragment
            : never
        : never
    : never;

type WriteContractFragments<Abi extends ContractAbiInterface> = Abi[number] extends infer Fragment
    ? Fragment extends FunctionFragment
        ? IsWriteFunction<Fragment> extends true
            ? Fragment
            : never
        : never
    : never;

export type ReadContractFunctionName<Abi extends ContractAbiInterface> = ReadContractFragments<Abi>['name'];

export type WriteContractFunctionName<Abi extends ContractAbiInterface> = WriteContractFragments<Abi>['name'];

export type CollapseSingleItemTuple<Value> = Value extends readonly [infer Only] ? Only : Value;

type ChangeNeverToString<T> = IsNever<T> extends true ? string : T;

export type ReadContractParameters<
    AbiFrag extends FunctionFragment = FunctionFragment,
> = {
    readonly functionName: ChangeNeverToString<AbiFrag['name']>;
    readonly args?: GetParamsType<AbiFrag['inputs']>;
    /** Caller address for the constant call. */
    readonly from?: string;
    readonly value?: number | bigint;
};

export type ReadContractReturnType<
    AbiFrag extends FunctionFragment = FunctionFragment,
> = CollapseSingleItemTuple<GetOutputsType<AbiFrag['outputs']>>;

export type WriteContractParameters<
    AbiFrag extends FunctionFragment = FunctionFragment,
> = {
    readonly functionName: ChangeNeverToString<AbiFrag['name']>;
    readonly args?: GetParamsType<AbiFrag['inputs']>;
    /**
     * Signer: a private key whose derived address owns and signs the transaction,
     * allowing a non-default signer. When omitted, the instance default key signs.
     */
    readonly account?: string;
    readonly value?: number | bigint;
    readonly feeLimit?: number;
    readonly tokenId?: string;
    readonly tokenValue?: number;
    readonly permissionId?: number;
};

export type WriteContractReturnType = string;

export type ReadOptions<
    AbiFrag extends FunctionFragment
> = Prettify<Omit<ReadContractParameters<AbiFrag>, 'functionName' | 'args'>>;

export type WriteOptions<
    AbiFrag extends FunctionFragment
> = Prettify<Omit<WriteContractParameters<AbiFrag>, 'functionName' | 'args'>>;

type ReadFragmentSignature<
    AbiFrag extends FunctionFragment,
    Parameters = NonNullable<ReadContractParameters<AbiFrag>['args']>,
    Options = ReadOptions<AbiFrag>
> = AbiFrag extends FunctionFragment ? (
    ...parameters: Parameters extends readonly [] ? [
        options?: Options
    ] : [
        args: Parameters,
        options?: Options
    ]
) => Promise<ReadContractReturnType<AbiFrag>> : never;

type ReadSignaturesForName<Abi extends ContractAbiInterface, Name extends ReadContractFunctionName<Abi>> =
    Extract<ReadContractFragments<Abi>, { name: Name }> extends infer F
        ? F extends FunctionFragment ? ReadFragmentSignature<F> : never
        : never;

// Type-level mirror of `canonicalizeIntType`: bare `uint`/`int` (and their array
// forms) canonicalize to `uint256`/`int256`; width-qualified types are untouched.
type CanonicalizeIntType<T extends string> =
    T extends `uint[${infer Rest}` ? `uint256[${Rest}`
        : T extends `int[${infer Rest}` ? `int256[${Rest}`
            : T extends 'uint' ? 'uint256'
                : T extends 'int' ? 'int256'
                    : T;

// Type-level mirror of `buildFullTypeDefinition`: the canonical Solidity type
// string for one ABI parameter, expanding tuples into their component list.
type ParamTypeSignature<Param extends AbiParamsCommon> =
    Param['type'] extends `tuple${infer Suffix}`
        ? Param extends { components: infer Components }
            ? Components extends ReadonlyArray<AbiParamsCommon>
                ? `(${JoinParamTypeSignatures<Components>})${Suffix}`
                : Param['type']
            : Param['type']
        : CanonicalizeIntType<Param['type']>;

// Comma-joined canonical types for a parameter list. A non-tuple array (a
// fragment typed as plain `FunctionFragment` rather than a const ABI literal)
// has unknowable arity and degrades to `string`.
type JoinParamTypeSignatures<Params extends ReadonlyArray<AbiParamsCommon>> =
    Params extends readonly [infer Head, ...infer Rest]
        ? Head extends AbiParamsCommon
            ? Rest extends ReadonlyArray<AbiParamsCommon>
                ? Rest extends readonly []
                    ? ParamTypeSignature<Head>
                    : `${ParamTypeSignature<Head>},${JoinParamTypeSignatures<Rest>}`
                : ParamTypeSignature<Head>
            : ''
        : Params extends readonly []
          ? ''
          : string;

// The fragment's declared inputs. `'inputs' extends keyof` distinguishes a
// literal fragment WITHOUT the key (indexing would fall back to the optional
// constraint member, `ReadonlyArray | undefined`) from one that declares it; a
// missing or undefined `inputs` means a parameterless list, matching the
// runtime's `inputs ?? []`.
type FragmentInputs<Fragment extends FunctionFragment> = 'inputs' extends keyof Fragment
    ? [NonNullable<Fragment['inputs']>] extends [never]
        ? readonly []
        : NonNullable<Fragment['inputs']>
    : readonly [];

/**
 * A fragment's full signature, e.g. `"transfer(address,uint256)"` — the return
 * type of `buildFunctionSelector`. Const ABI fragments produce the literal
 * signature; a plain `FunctionFragment` degrades to `` `${string}(${string})` ``.
 */
export type FunctionSelector<Fragment extends FunctionFragment> =
    `${Fragment['name']}(${JoinParamTypeSignatures<FragmentInputs<Fragment>>})`;

// Names map to the merged overload signatures; full selectors map to their one
// fragment's signature so overloads stay addressable unambiguously — mirrors the
// dual keys (`read[name]` and `read[selector]`) registered at runtime.
type ExtractReadNamespace<Abi extends ContractAbiInterface> = {
    [K in ReadContractFragments<Abi> as K['name']]: UnionToIntersection<ReadSignaturesForName<Abi, K['name']>>;
} & {
    [K in ReadContractFragments<Abi> as FunctionSelector<K>]: ReadFragmentSignature<K>;
};

export type ContractReadNamespace<Abi extends ContractAbiInterface> = IsConstAbi<Abi> extends true
    ? 'read' extends ReadContractFunctionName<Abi> | WriteContractFunctionName<Abi>
        ? GetMethodsTypeFromAbi<Abi>['read']['onMethod'] & Prettify<ExtractReadNamespace<Abi>>
        : Prettify<ExtractReadNamespace<Abi>>
    : any;

type WriteFragmentSignature<
    AbiFrag extends FunctionFragment,
    Parameters = NonNullable<WriteContractParameters<AbiFrag>['args']>,
    Options = WriteOptions<AbiFrag>
> = AbiFrag extends FunctionFragment ? (
    ...parameters: Parameters extends readonly [] ? [
        options?: Options
    ] : [
        args: Parameters,
        options?: Options
    ]
) => Promise<WriteContractReturnType> : never;

type WriteSignaturesForName<Abi extends ContractAbiInterface, Name extends WriteContractFunctionName<Abi>> =
    Extract<WriteContractFragments<Abi>, { name: Name }> extends infer F
        ? F extends FunctionFragment ? WriteFragmentSignature<F> : never
        : never;

// Names map to the merged overload signatures; full selectors map to their one
// fragment's signature so overloads stay addressable unambiguously — mirrors the
// dual keys (`write[name]` and `write[selector]`) registered at runtime.
type ExtractWriteNamespace<Abi extends ContractAbiInterface> = {
    [K in WriteContractFragments<Abi> as K['name']]: UnionToIntersection<WriteSignaturesForName<Abi, K['name']>>;
} & {
    [K in WriteContractFragments<Abi> as FunctionSelector<K>]: WriteFragmentSignature<K>;
};

export type ContractWriteNamespace<Abi extends ContractAbiInterface> = IsConstAbi<Abi> extends true
    ? 'write' extends ReadContractFunctionName<Abi> | WriteContractFunctionName<Abi>
        ? GetMethodsTypeFromAbi<Abi>['write']['onMethod'] & Prettify<ExtractWriteNamespace<Abi>>
        : Prettify<ExtractWriteNamespace<Abi>>
    : any;
