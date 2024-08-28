import { AbiFragment, ContractAbiInterface } from './ABI.js';
import { Transaction } from './Transaction.js';

export interface TransactionCommonOptions {
    /**
     * Permission id for multi-sign.
     */
    permissionId?: number;
    blockHeader?: Partial<Transaction['raw_data']>;
}


export type NumberLike = string | number;

export type Resource = 'BANDWIDTH' | 'ENERGY';

export interface VoteInfo {
    [srAddress: string]: number;
}

export interface CreateSmartContractOptions extends TransactionCommonOptions {
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
    parameters?: unknown[];
    /**
     * Contract name string.
     */
    name?: string;
    /**
     * Optional. raw parameters encoded according to [ABI Specification](https://docs.soliditylang.org/en/latest/abi-spec.html)
     * For example: 0x0000000000000000000000000000000000000000000000000000000000000001.
     */
    rawParameter?: string;
    /**
     * Optional. JSON format for contract function.
     * For example: { "type":"function", "inputs": [{"name":"a","type":"uint256"}], "name":"foo", "outputs": [] }
     */
    funcABIV2?: AbiFragment;
    /**
     * The parameters of the function specified by `funcABIV2`.
     * Required if `funcABIV2` exists.
     */
    parametersV2?: unknown[];
}

export interface TriggerSmartContractOptions extends TransactionCommonOptions {
    /**
     * The maximum TRX burns for resource consumption in SUN（1TRX = 1,000,000SUN）.
     */
    feeLimit?: number;
    /**
     * The TRX transfer to the contract for each call in SUN（1TRX = 1,000,000SUN）
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
     * JSON format for contract function.
     * For example: `{ "type":"function", "inputs": [{"name":"a","type":"uint256"}], "name":"foo", "outputs": [] }`.
     * If exists, the `parameters` will be ignored.
     * Optional.
     */
    funcABIV2?: AbiFragment;
    /**
     * The parameters of the function specified by `funcABIV2`.
     * Required if `funcABIV2` exists.
     */
    parametersV2?: unknown[];
    /**
     * Raw parameters encoded according to [ABI Specification](https://docs.soliditylang.org/en/latest/abi-spec.html).
     * If exists, the `parametersV2` and `parameters` will be ignored.
     * For example: 0x0000000000000000000000000000000000000000000000000000000000000001.
     * Optional.
     */
    shieldedParameter?: string;
    /**
     * Alias of `shieldedParameter`. If exists, the `shieldedParameter`, `parametersV2` and `parameters` will be ignored.
     */
    rawParameter?: string;
    /**
     * If functionSelector is not specified, this parameter will be used as data.
     */
    input?: string;
    /**
     * Create transaction locally.
     */
    txLocal?: boolean;
    _isConstant?: boolean;
    /**
     * If use solidity node to trigger smart contract.
     */
    confirmed?: boolean;
}
export interface TriggerConstantContractOptions extends TriggerSmartContractOptions {
    _isConstant?: boolean;
    /**
     * Whether the request only aims to estimating energy not trigger contract actually.
     */
    estimateEnergy?: boolean;
    /**
     * If use solidity node to trigger smart contract.
     */
    confirmed?: boolean;
}
// @todo: more detailed type
export interface ContractFunctionParameter {
    type: string;
    value: unknown;
}

export interface CreateTokenOptions extends TransactionCommonOptions {
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
}

export interface UpdateTokenOptions extends TransactionCommonOptions {
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

export interface DeployConstantContractOptions {
    /**
     * The bytecode of contract to be deployed.
     */
    input: string;
    /**
     * Owner address of the new contract.
     */
    ownerAddress: string;
    /**
     * The id of token to be transfered to the new contract.
     * Optional.
     */
    tokenId?: string | number;
    /**
     * The amount of token to be transfered to the new contract.
     */
    tokenValue?: string | number;
    /**
     * Amount of TRX transferred with this transaction, measured in SUN (1TRX = 1,000,000 SUN).
     */
    callValue?: number;
    /**
     * Whether send request to solidity node.
     */
    confirmed?: boolean;
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
