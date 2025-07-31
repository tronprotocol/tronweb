import type { Address } from "./Trx";
import type { Method } from "../lib/contract/method";
import type { Contract } from "../lib/contract/index";
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
    ? Readonly<Arr>
    : _GrowArr<Length, T, [...Arr, T]>;

type _RangeFrom0ToN<N extends number, Step extends number, Arr extends any[] = []> = Arr['length'] extends N
    ? Arr['length']
    : Arr['length'] | _RangeFrom0ToN<N, Step, [...Arr, ..._GrowArr<Step>]>;

type Range<Min extends number, Max extends number, Step extends number = 1> = Exclude<_RangeFrom0ToN<Max, Step>, _RangeFrom0ToN<Min, Step>> | Min;

export type BytesRange = Range<1, 32>;

export type BitsRange = Range<8, 256, 8>;

export type Numbers = bigint | number;

type ConvertToNumber<T extends string> = T extends `${infer Num extends number}` ? Num : never;

type FixedSizeArray<T, Length extends number> = _GrowArr<Length, T>;

type SolidityTypedArray<T, Length extends string> = Length extends ''
    ? ReadonlyArray<T>
    : FixedSizeArray<T, ConvertToNumber<Length>>;

type ReverseArray<T extends string> = T extends `[${infer P}]${infer L}` ? `${ReverseArray<L>}[${P}]` : '';

type _SolidityAddressType<Type extends string> = Type extends `address[${infer Length}]${infer Loop}`
    ? SolidityTypedArray<_SolidityAddressType<`address${Loop}`>, Length>
    : Type extends 'address'
        ? Address
        : never;

export type SolidityAddressType<Type extends string> = Type extends `address${infer Loop}`
    ? _SolidityAddressType<`address${ReverseArray<Loop>}`>
    : never;

type _SolidityStringType<Type extends string> = Type extends `string${infer Size extends number | ''}[${infer Length}]${infer Loop}`
    ? SolidityTypedArray<_SolidityStringType<`string${Size}${Loop}`>, Length>
    : Type extends `string${number | ''}`
        ? string
        : never;

export type SolidityStringType<Type> = Type extends `string${infer Loop}`
    ? _SolidityStringType<`string${ReverseArray<Loop>}`>
    : never;

type _SolidityBooleanType<Type extends string> = Type extends `bool[${infer Length}]${infer Loop}`
    ? SolidityTypedArray<_SolidityBooleanType<`bool${Loop}`>, Length>
    : Type extends 'bool'
        ? boolean
        : never;

export type SolidityBooleanType<Type extends string> = Type extends `bool${infer Loop}`
    ? _SolidityBooleanType<`bool${ReverseArray<Loop>}`>
    : never;

type _SolidityUIntegerType<Type extends string> = Type extends `uint${infer Bits extends BitsRange | ''}[${infer Length}]${infer Loop}`
    ? SolidityTypedArray<_SolidityUIntegerType<`uint${Bits}${Loop}`>, Length>
    : Type extends `uint${BitsRange | ''}`
        ? Numbers
        : never;

export type SolidityUIntegerType<Type extends string> = Type extends `uint${infer Bits extends BitsRange | ''}[${infer Length}]${infer Loop}`
    ? _SolidityUIntegerType<`uint${Bits}${ReverseArray<`[${Length}]${Loop}`>}`>
    : Type extends `uint${BitsRange | ''}`
        ? Numbers
        : never;

type _SolidityIntegerType<Type extends string> = Type extends `int${infer Bits extends BitsRange | ''}[${infer Length}]${infer Loop}`
    ? SolidityTypedArray<_SolidityIntegerType<`int${Bits}${Loop}`>, Length>
    : Type extends `int${BitsRange | ''}`
        ? Numbers
        : never;

export type SolidityIntegerType<Type extends string> = Type extends `int${infer Bits extends BitsRange | ''}[${infer Length}]${infer Loop}`
    ? _SolidityIntegerType<`int${Bits}${ReverseArray<`[${Length}]${Loop}`>}`>
    : Type extends `int${BitsRange | ''}`
        ? Numbers
        : never;

type _SolidityTrcTokenType<Type extends string> = Type extends `trcToken[${infer Length}]${infer Loop}`
    ? SolidityTypedArray<_SolidityTrcTokenType<`trcToken${Loop}`>, Length>
    : Type extends 'trcToken'
        ? Numbers
        : never;

export type SolidityTrcTokenType<Type extends string> = Type extends `trcToken${infer Loop}`
    ? _SolidityTrcTokenType<`trcToken${ReverseArray<Loop>}`>
    : never;

type _SolidityBytesType<Type extends string> = Type extends `bytes${infer Size extends BytesRange | ''}[${infer Length}]${infer Loop}`
    ? SolidityTypedArray<_SolidityBytesType<`bytes${Size}${Loop}`>, Length>
    : Type extends `bytes${BytesRange | ''}`
        ? string | Uint8Array<ArrayBuffer>
        : never;

export type SolidityBytesType<Type extends string> = Type extends `bytes${infer Size extends BytesRange | ''}[${infer Length}]${infer Loop}`
    ? _SolidityBytesType<`bytes${Size}${ReverseArray<`[${Length}]${Loop}`>}`>
    : Type extends `bytes${BytesRange | ''}`
        ? string | Uint8Array<ArrayBuffer>
        : never;

type _SolidityTupleType<
    Type extends string,
    TypeComponents extends ReadonlyArray<AbiParamsCommon> | undefined,
> = TypeComponents extends ReadonlyArray<AbiParamsCommon>
    ? Type extends 'tuple'
        ? GetParamsType<TypeComponents>
        : Type extends `tuple[${infer Length}]${infer Loop}`
            ? Loop extends ''
                ? SolidityTypedArray<GetParamsType<TypeComponents>, Length>
                : SolidityTypedArray<_SolidityTupleType<`tuple${Loop}`, TypeComponents>, Length>
            : never
    : never;

export type SolidityTupleType<
    Type extends string,
    TypeComponents extends ReadonlyArray<AbiParamsCommon> | undefined,
> = Type extends `tuple${infer Loop}`
    ? _SolidityTupleType<`tuple${ReverseArray<Loop>}`, TypeComponents>
    : never;

export type SolidityValueType<T extends string, C extends ReadonlyArray<AbiParamsCommon> | undefined> = 
    | SolidityAddressType<T>
    | SolidityStringType<T>
    | SolidityBooleanType<T>
    | SolidityUIntegerType<T>
    | SolidityIntegerType<T>
    | SolidityTrcTokenType<T>
    | SolidityBytesType<T>
    | SolidityTupleType<T, C>;

type SimplifySolidityType<T> = T extends infer U ? U : never;
type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type GetParamsType<ParamsType extends ReadonlyArray<AbiParamsCommon> | undefined> = ParamsType extends readonly [infer T, ...infer P] 
    ? T extends AbiParamsCommon
        ? P extends readonly []
            ? [SimplifySolidityType<SolidityValueType<T['type'], T['components']>>]
            : P extends ReadonlyArray<AbiParamsCommon>
                ? [SimplifySolidityType<SolidityValueType<T['type'], T['components']>>, ...GetParamsType<P>]
                : [SimplifySolidityType<SolidityValueType<T['type'], T['components']>>]
        : []
    : any[];

type GetTupleOutputType<T extends `tuple${string}`, Shape extends ReadonlyArray<AbiParamsCommon> | undefined> = T extends 'tuple'
    ? Shape extends ReadonlyArray<AbiParamsCommon>
        ? _GetOutputsType<Shape> & Prettify<Omit<{
            [Item in Shape[number] as Item['name']]: Item['type'] extends `tuple${string}` 
                ? GetTupleOutputType<Item['type'], Item['components']>
                : SimplifySolidityType<SolidityValueType<Item['type'], undefined>>
        }, 'length'>>
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
                : [SimplifySolidityType<SolidityValueType<T['type'], undefined>>]
            : P extends ReadonlyArray<AbiParamsCommon>
                ? T['type'] extends `tuple${string}`
                    ? [GetTupleOutputType<T['type'], T['components']>, ..._GetOutputsType<P>]
                    : [SimplifySolidityType<SolidityValueType<T['type'], undefined>>, ..._GetOutputsType<P>]
                : []
        : []
    : [];

export type GetOutputsType<Outputs extends ReadonlyArray<AbiParamsCommon> | undefined> = GetTupleOutputType<'tuple', Outputs>;


export type GetMethodsTypeFromAbi<Abi extends ContractAbiInterface> = Abi extends readonly [infer T, ...infer P]
    ? T extends { type: 'function', name: string } 
        ? {
            [key in T['name']]: Method<T>;
        } & (P extends ContractAbiInterface ? GetMethodsTypeFromAbi<P> : never )
        : (P extends ContractAbiInterface ? GetMethodsTypeFromAbi<P> : never )
    : { [key: string]: Method<any>; };

export type GetOnMethodTypeFromAbi<Abi extends ContractAbiInterface> = {
    [key in keyof GetMethodsTypeFromAbi<Abi>]: GetMethodsTypeFromAbi<Abi>[key]['onMethod'];
};

export type AnyOnMethodType = {
    [key: string]: Method<any>['onMethod'];
};

export type ContractInstance<Abi extends ContractAbiInterface> = Contract<Abi> & GetOnMethodTypeFromAbi<Abi>;
