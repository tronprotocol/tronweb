export type AbiParamsCommon = {
    readonly name: string;
    readonly type: string;
    readonly baseType?: string;
    readonly indexed?: boolean;
    readonly components?: ReadonlyArray<AbiParamsCommon>;
    readonly arrayLength?: number;
    readonly arrayChildren?: ReadonlyArray<AbiParamsCommon>;
    readonly internalType?: string;
};

export type StateMutabilityTypes = string | 'nonpayable' | 'payable' | 'pure' | 'view';

export type FragmentTypes = string | 'constructor' | 'event' | 'function' | 'fallback' | 'receive';

export type AbiInputsType = ReadonlyArray<AbiParamsCommon> | Record<any, any> | [];

export type AbiOutputsType = AbiInputsType;

export type ConstructorFragment = {
    readonly type: string | 'constructor';
    readonly stateMutability: StateMutabilityTypes & (string | 'nonpayable' | 'payable');
    readonly inputs?: ReadonlyArray<AbiParamsCommon>;
};

export type FunctionFragment = {
    readonly name: string;
    readonly type: string | 'function';
    readonly stateMutability?: StateMutabilityTypes;
    readonly inputs?: ReadonlyArray<AbiParamsCommon>;
    readonly outputs?: ReadonlyArray<AbiParamsCommon>;

    readonly constant?: boolean;
    readonly payable?: boolean;
};

export type FallbackFragment = {
    readonly name: never;
    readonly type: string | 'fallback';
    readonly stateMutability: StateMutabilityTypes;
    readonly inputs: never;
    readonly outputs: never;

    // legacy properties
    readonly constant?: boolean;
    readonly payable?: boolean;
};

export type ReceiveFragment = {
    readonly name: never;
    readonly type: string | 'receive';
    readonly stateMutability: StateMutabilityTypes;
    readonly inputs: never;
    readonly outputs: never;

    // legacy properties
    readonly constant?: boolean;
    readonly payable?: boolean;
};

export type EventFragment = {
    readonly name: string;
    readonly type: string | 'event';
    readonly inputs?: ReadonlyArray<AbiParamsCommon>;
    readonly anonymous?: boolean;
};

export type ErrorFragment = {
    readonly name: string;
    readonly type: string | 'error';
    readonly inputs?: ReadonlyArray<AbiParamsCommon>;
};

export type AbiFragment =
    | ConstructorFragment
    | FunctionFragment
    | EventFragment
    | ErrorFragment
    | FallbackFragment
    | ReceiveFragment;

export type ContractAbiInterface = ReadonlyArray<AbiFragment>;
