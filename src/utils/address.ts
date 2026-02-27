import { hexStr2byteArray, byteArray2hexStr } from './code.js';
import { decodeBase58Address, getBase58CheckAddress, isAddressValid, pkToAddress } from './crypto.js';
import { isHex, isString } from './validations.js';
import { concat, keccak256 } from './ethersUtils.js';
import { ADDRESS_PREFIX } from './constants.js';

export function fromHex(address: string) {
    if (!isHex(address)) return address;

    return getBase58CheckAddress(hexStr2byteArray(address.replace(/^0x/, ADDRESS_PREFIX)));
}

export function toHex(address: string) {
    if (isHex(address)) return address.toLowerCase().replace(/^0x/, ADDRESS_PREFIX);

    return byteArray2hexStr(decodeBase58Address(address) as number[]).toLowerCase();
}

function getChecksumAddress(address: string): string {
    address = address.toLowerCase();

    const chars = address.substring(2).split('');

    const expanded = new Uint8Array(40);
    for (let i = 0; i < 40; i++) {
        expanded[i] = chars[i].charCodeAt(0);
    }

    const hashed = hexStr2byteArray(keccak256(expanded).slice(2));

    for (let i = 0; i < 40; i += 2) {
        if ((hashed[i >> 1] >> 4) >= 8) {
            chars[i] = chars[i].toUpperCase();
        }
        if ((hashed[i >> 1] & 0x0f) >= 8) {
            chars[i + 1] = chars[i + 1].toUpperCase();
        }
    }

    return ADDRESS_PREFIX + chars.join('');
}

export function toChecksumAddress(address: string) {
    if (!isAddress(address)) throw new Error(`'${address}' is not a valid address string`);
    return getChecksumAddress(toHex(address));
}

export function isChecksumAddress(address: string) {
    if (!isHex(address) || address.length !== 42) return false;
    try {
        return toChecksumAddress(address) === address;
    } catch {
        return false;
    }
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

export function getCreate2Address({
    from,
    salt,
    initCode,
    addressFormat = 'base58',
}: {
    from: string;
    salt: string | Uint8Array;
    initCode: string | Uint8Array;
    addressFormat?: 'base58' | 'hex';
}) {
    const _from = new Uint8Array(hexStr2byteArray(toHex(from)));

    let _salt: Uint8Array;
    if (typeof salt === 'string') {
        _salt = new Uint8Array(hexStr2byteArray(salt.replace(/^0x/, '')));
    } else {
        _salt = salt;
    }

    let _initCode: Uint8Array;
    if (typeof initCode === 'string') {
        _initCode = new Uint8Array(hexStr2byteArray(initCode.replace(/^0x/, '')));
    } else {
        _initCode = initCode;
    }

    const _initCodeHash = new Uint8Array(hexStr2byteArray(keccak256(_initCode).replace(/^0x/, '')));

    const merged = concat([_from, _salt, _initCodeHash]);
    const addressHex = `41${keccak256(merged).slice(-40)}`;
    if (addressFormat === 'base58') {
        return fromHex(addressHex);
    }
    return addressHex;
}
