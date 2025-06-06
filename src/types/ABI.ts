import type { Address } from "./Trx";
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


type _GrowArr<Length extends number, T = any, Arr extends T[] = []> = Arr['length'] extends Length
    ? Arr
    : _GrowArr<Length, T, [...Arr, T]>;

type _RangeFrom0ToN<N extends number, Step extends number, Arr extends any[] = []> = Arr['length'] extends N
    ? Arr['length']
    : Arr['length'] | _RangeFrom0ToN<N, Step, [...Arr, ..._GrowArr<Step>]>;

type Range<Min extends number, Max extends number, Step extends number = 1> = Exclude<_RangeFrom0ToN<Max, Step>, _RangeFrom0ToN<Min, Step>> | Min;

export type BytesRange = Range<1, 32>;

export type BitsRange = Range<8, 256, 8>;

type Numbers = bigint | number;

type ConvertToNumber<T extends string> = T extends `${infer Num extends number}` ? Num : never;

type FixedSizeArray<T, Length extends number> = _GrowArr<Length, T>;

type SolidityTypedArray<T, Length extends string> = Length extends ''
    ? T[]
    : FixedSizeArray<T, ConvertToNumber<Length>>;

type SolidityAddressType<Type> = Type extends `address[${infer Length}]${infer Loop}`
    ? SolidityTypedArray<SolidityAddressType<`address${Loop}`>, Length>
    : Type extends 'address'
        ? Address
        : never;

type SolidityStringType<Type extends string> = Type extends `string${infer Size extends number | ''}[${infer Length}]${infer Loop}`
    ? SolidityTypedArray<SolidityStringType<`string${Size}${Loop}`>, Length>
    : Type extends `string${number | ''}`
        ? string
        : never;

type SolidityBooleanType<Type extends string> = Type extends `bool[${infer Length}]${infer Loop}`
    ? SolidityTypedArray<SolidityBooleanType<`bool${Loop}`>, Length>
    : Type extends 'bool'
        ? boolean
        : never;

type SolidityUIntegerType<Type extends string> = Type extends `uint${infer Bits extends BitsRange | ''}[${infer Length}]${infer Loop}`
    ? SolidityTypedArray<SolidityUIntegerType<`uint${Bits}${Loop}`>, Length>
    : Type extends `uint${BitsRange | ''}`
        ? Numbers
        : never;

type SolidityIntegerType<Type extends string> = Type extends `int${infer Bits extends BitsRange | ''}[${infer Length}]${infer Loop}`
    ? SolidityTypedArray<SolidityUIntegerType<`int${Bits}${Loop}`>, Length>
    : Type extends `int${BitsRange | ''}`
        ? Numbers
        : never;

type SolidityTrcTokenType<Type extends string> = Type extends `trcToken[${infer Length}]${infer Loop}`
    ? SolidityTypedArray<SolidityTrcTokenType<`trcToken${Loop}`>, Length>
    : Type extends 'trcToken'
        ? Numbers
        : never;

type SolidityBytesType<Type extends string> = Type extends `bytes${infer Size extends BytesRange | ''}[${infer Length}]${infer Loop}`
    ? SolidityTypedArray<SolidityBytesType<`bytes${Size}${Loop}`>, Length>
    : Type extends `bytes${BytesRange | ''}`
        ? string | Uint8Array<ArrayBuffer>
        : never;

type SolidityTupleType<
    Type extends string,
    TypeComponents extends ReadonlyArray<AbiParamsCommon> | undefined,
> = TypeComponents extends ReadonlyArray<AbiParamsCommon>
    ? Type extends 'tuple'
        ? GetParamsType<TypeComponents>
        : Type extends `tuple[${infer Length}]${infer Loop}`
            ? Loop extends ''
                ? SolidityTypedArray<GetParamsType<TypeComponents>, Length>
                : SolidityTypedArray<SolidityTupleType<`tuple${Loop}`, TypeComponents>, Length>
            : never
    : never;

type SolidityValueType<T extends string, C extends ReadonlyArray<AbiParamsCommon> | undefined> = 
    | SolidityAddressType<T>
    | SolidityStringType<T>
    | SolidityBooleanType<T>
    | SolidityUIntegerType<T>
    | SolidityIntegerType<T>
    | SolidityTrcTokenType<T>
    | SolidityBytesType<T>
    | SolidityTupleType<T, C>;

export type GetParamsType<ParamsType extends ReadonlyArray<AbiParamsCommon> | undefined> = ParamsType extends readonly [infer T, ...infer P] 
    ? T extends AbiParamsCommon
        ? P extends readonly []
            ? [SolidityValueType<T['type'], T['components']>]
            : P extends ReadonlyArray<AbiParamsCommon>
                ? [SolidityValueType<T['type'], T['components']>, ...GetParamsType<P>]
                : [SolidityValueType<T['type'], T['components']>]
        : []
    : any[];

type GetTupleOutputType<T extends `tuple${string}`, Shape extends ReadonlyArray<AbiParamsCommon> | undefined> = T extends 'tuple'
    ? Shape extends ReadonlyArray<AbiParamsCommon>
        ? _GetOutputsType<Shape> & {
            [Item in Shape[number] as Item['name']]: Item['type'] extends `tuple${string}` 
                ? GetTupleOutputType<Item['type'], Item['components']>
                : SolidityValueType<Item['type'], undefined>
        }
        : never
    : T extends `tuple[${infer Length}]${infer Loop}`
        ? Loop extends ''
            ? SolidityTypedArray<GetTupleOutputType<`tuple`, Shape>, Length>
            : SolidityTypedArray<GetTupleOutputType<`tuple${Loop}`, Shape>, Length>
        : never;

type _GetOutputsType<Outputs extends ReadonlyArray<AbiParamsCommon> | undefined> = Outputs extends readonly [infer T,...infer P]
    ? T extends AbiParamsCommon
        ? P extends readonly []
            ? T['type'] extends `tuple${string}`
                ? [GetTupleOutputType<T['type'], T['components']>]
                : [SolidityValueType<T['type'], undefined>]
            : P extends ReadonlyArray<AbiParamsCommon>
                ? T['type'] extends `tuple${string}`
                    ? [GetTupleOutputType<T['type'], T['components']>, ..._GetOutputsType<P>]
                    : [SolidityValueType<T['type'], undefined>, ..._GetOutputsType<P>] 
                : []
        : []
    : [];

export type GetOutputsType<Outputs extends ReadonlyArray<AbiParamsCommon> | undefined> = GetTupleOutputType<'tuple', Outputs>;
