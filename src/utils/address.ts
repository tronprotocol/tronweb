import { hexStr2byteArray, byteArray2hexStr } from './code.js';
import { decodeBase58Address, getBase58CheckAddress, isAddressValid, pkToAddress } from './crypto.js';
import { isHex, isString } from './validations.js';

export const ADDRESS_SIZE = 34;
export const ADDRESS_PREFIX = '41';
export const ADDRESS_PREFIX_BYTE = 0x41;
export const ADDRESS_PREFIX_REGEX = /^(41)/;

export const TRON_BIP39_PATH_PREFIX = "m/44'/195'";
export const TRON_BIP39_PATH_INDEX_0 = TRON_BIP39_PATH_PREFIX + "/0'/0/0";

export function fromHex(address: string) {
    if (!isHex(address)) return address;

    return getBase58CheckAddress(hexStr2byteArray(address.replace(/^0x/, ADDRESS_PREFIX)));
}

export function toHex(address: string) {
    if (isHex(address)) return address.toLowerCase().replace(/^0x/, ADDRESS_PREFIX);

    return byteArray2hexStr(decodeBase58Address(address) as number[]).toLowerCase();
}

export function fromPrivateKey(privateKey: string, strict = false) {
    try {
        return pkToAddress(privateKey, strict);
    } catch {
        return false;
    }
}

export function isAddress(address: unknown): boolean {
    if (!address || !isString(address)) return false;

    // Convert HEX to Base58
    if (address.length === 42) {
        try {
            // it throws an error if the address starts with 0x
            return isAddress(getBase58CheckAddress(hexStr2byteArray(address)));
        } catch (err) {
            return false;
        }
    }
    try {
        return isAddressValid(address);
    } catch (err) {
        return false;
    }
}
