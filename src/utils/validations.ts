import { BigNumber } from 'bignumber.js';
import validator from 'validator';
import { ADDRESS_PREFIX } from './address.js';
import { AbiParamsCommon } from '../types/ABI.js';
import { IBigNumber } from '../types/TronWeb.js';

import type { EventQueryDataType, MapEventQueryDataType } from '../types/UtilsTypes.js';

export function isValidURL(url: string): boolean {
    if (typeof url !== 'string') return false;
    return validator.isURL(url.toString(), {
        protocols: ['http', 'https'],
        require_tld: false,
    });
}

export function isObject(obj: unknown): obj is Record<number | string | symbol, unknown> {
    return obj === Object(obj) && Object.prototype.toString.call(obj) !== '[object Array]';
}

export function isArray(array: unknown): array is unknown[] {
    return Array.isArray(array);
}

export function isJson(string: string): boolean {
    try {
        return !!JSON.parse(string);
    } catch (ex) {
        return false;
    }
}

export function isBoolean(bool: unknown): bool is boolean {
    return typeof bool === 'boolean';
}

export function isBigNumber(number: unknown): number is IBigNumber {
    return !!number && (number instanceof BigNumber || (number.constructor && number.constructor.name === 'BigNumber'));
}

export function isString(string: unknown): string is string {
    return typeof string === 'string' || (!!string && string.constructor && string.constructor.name === 'String');
}

export function isFunction(obj: unknown): obj is (...args: unknown[]) => unknown {
    return typeof obj === 'function';
}

export function isHex(string: string): string is string {
    return typeof string === 'string' && !isNaN(parseInt(string, 16)) && /^(0x|)[a-fA-F0-9]+$/.test(string);
}

export function isInteger(number: unknown): number is number {
    if (number === null) return false;
    return Number.isInteger(Number(number));
}

export function hasProperty(obj: object, property: string | number | symbol) {
    return Object.prototype.hasOwnProperty.call(obj, property);
}

export function hasProperties(obj: object, ...properties: (string | number | symbol)[]) {
    return (
        properties.length &&
        !properties
            .map((property) => {
                return hasProperty(obj, property);
            })
            .includes(false)
    );
}

export function mapEvent(event: EventQueryDataType) {
    const data: MapEventQueryDataType = {
        block: event.block_number,
        timestamp: event.block_timestamp,
        contract: event.contract_address,
        name: event.event_name,
        transaction: event.transaction_id,
        result: event.result,
        resourceNode: event.resource_Node || (event._unconfirmed ? 'fullNode' : 'solidityNode'),
    };
    if (event._unconfirmed) {
        data.unconfirmed = event._unconfirmed;
    }
    if (event._fingerprint) {
        data.fingerprint = event._fingerprint;
    }
    return data;
}

export function parseEvent(event: EventQueryDataType, { inputs: abi }: { inputs: ReadonlyArray<AbiParamsCommon> }) {
    if (!event.result) return event;

    if (isObject(event.result)) {
        for (let i = 0; i < abi.length; i++) {
            const obj = abi[i];
            if (obj.type == 'address' && obj.name in event.result)
                event.result[obj.name] = ADDRESS_PREFIX + (event.result[obj.name] as string).substr(2).toLowerCase();
        }
    } else if (isArray(event.result)) {
        event.result = (event.result as string[]).reduce<Record<string, string>>((obj, result, index) => {
            const { name, type } = abi[index];

            if (type == 'address') result = ADDRESS_PREFIX + result.substr(2).toLowerCase();

            obj[name] = result;

            return obj;
        }, {});
    }

    return event;
}

export function padLeft(input: string | number, padding: string, amount: number): string {
    let res = input.toString();

    while (res.length < amount) res = padding + res;

    return res;
}

export function isNotNullOrUndefined(val: unknown): boolean {
    return val !== null && typeof val !== 'undefined';
}

export async function sleep(millis = 1000): Promise<any> {
    return new Promise((resolve) => setTimeout(resolve, millis));
}
