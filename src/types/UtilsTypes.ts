export type BytesLike = number[] | Uint8Array;

export type EventQueryDataType = {
    block_number: number;
    block_timestamp: number;
    contract_address: string;
    event_name: string;
    transaction_id: string;
    result: unknown;
    resource_Node: string;
    _unconfirmed?: boolean;
    _fingerprint?: string | undefined;
};

export type MapEventQueryDataType = {
    block: number;
    timestamp: number;
    contract: string;
    name: string;
    transaction: string;
    result: unknown;
    resourceNode: string;
    unconfirmed?: boolean;
    fingerprint?: string | undefined;
};

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type UnionToIntersection<U> = (
    U extends any ? (k: U) => void : never
) extends (k: infer I) => void ? I : never;

export type IsNever<T> = [T] extends [never] ? true : false;
