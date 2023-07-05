import BigNumber from "bignumber.js";
import validator from "validator";

import { ADDRESS_PREFIX } from "./address";

export function isValidURL(url: string): boolean {
    if (typeof url !== "string") return false;
    return validator.isURL(url.toString(), {
        protocols: ["http", "https"],
        require_tld: false,
    });
}

export function isObject(obj: object): boolean {
    return (
        obj === Object(obj) &&
        Object.prototype.toString.call(obj) !== "[object Array]"
    );
}

export function isArray(array: []): boolean {
    return Array.isArray(array);
}

export function isJson(string: string): boolean {
    try {
        return !!JSON.parse(string);
    } catch (ex) {
        return false;
    }
}

export function isBoolean(bool: boolean): boolean {
    return typeof bool === "boolean";
}

export function isBigNumber(number: BigNumber | object) {
    return (
        number &&
        (number instanceof BigNumber ||
            (number.constructor && number.constructor.name === "BigNumber"))
    );
}

export function isString(string: String) {
    return (
        typeof string === "string" ||
        (string && string.constructor && string.constructor.name === "String")
    );
}

export function isFunction(obj: Function) {
    return typeof obj === "function";
}

export function isHex(string: string) {
    return (
        typeof string === "string" &&
        !isNaN(parseInt(string, 16)) &&
        /^(0x|)[a-fA-F0-9]+$/.test(string)
    );
}

export function isInteger(number: number) {
    if (number === null) return false;
    return Number.isInteger(Number(number));
}

export function hasProperty(obj: object, property: string) {
    return Object.prototype.hasOwnProperty.call(obj, property);
}

export function hasProperties(obj: object, ...properties: []) {
    return (
        properties.length &&
        !properties
            .map((property) => {
                return this.hasProperty(obj, property);
            })
            .includes(false)
    );
}

export type EventQueryDataType = {
    block_number: number;
    block_timestamp: number;
    contract_address: string;
    event_name: string;
    transaction_id: string;
    result: any;
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
    result: any;
    resourceNode: string;
    unconfirmed?: boolean;
    fingerprint?: string | undefined;
};

export function mapEvent(event: EventQueryDataType) {
    let data: MapEventQueryDataType = {
        block: event.block_number,
        timestamp: event.block_timestamp,
        contract: event.contract_address,
        name: event.event_name,
        transaction: event.transaction_id,
        result: event.result,
        resourceNode:
            event.resource_Node ||
            (event._unconfirmed ? "fullNode" : "solidityNode"),
    };
    if (event._unconfirmed) {
        data.unconfirmed = event._unconfirmed;
    }
    if (event._fingerprint) {
        data.fingerprint = event._fingerprint;
    }
    return data;
}

export function parseEvent(event, { inputs: abi }) {
    if (!event.result) return event;

    if (this.isObject(event.result)) {
        for (var i = 0; i < abi.length; i++) {
            let obj = abi[i];
            if (obj.type == "address" && obj.name in event.result)
                event.result[obj.name] =
                    ADDRESS_PREFIX +
                    event.result[obj.name].substr(2).toLowerCase();
        }
    } else if (this.isArray(event.result)) {
        event.result = event.result.reduce((obj, result, index) => {
            const { name, type } = abi[index];

            if (type == "address")
                result = ADDRESS_PREFIX + result.substr(2).toLowerCase();

            obj[name] = result;

            return obj;
        }, {});
    }

    return event;
}

export function padLeft(input, padding: string, amount: number): string {
    let res = input.toString();

    while (res.length < amount) res = padding + res;

    return res;
}

export function isNotNullOrUndefined(val: any): boolean {
    return val !== null && typeof val !== "undefined";
}

export async function sleep(millis: number = 1000): Promise<any> {
    return new Promise((resolve) => setTimeout(resolve, millis));
}
