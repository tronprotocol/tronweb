import { hexStr2byteArray } from './code.js';
import { ADDRESS_PREFIX } from './address.js';
import { getBase58CheckAddress, decodeBase58Address } from './crypto.js';
import { byteArray2hexStr } from './bytes.js';

export function hexStringToBase58(sHexString: string) {
    if (sHexString.length < 2 || (sHexString.length & 1) != 0) return '';

    const bytes = hexStr2byteArray(sHexString);
    return getBase58CheckAddress(bytes);
}

export function base58ToHexString(sBase58: string) {
    const bytes = decodeBase58Address(sBase58);
    if (!bytes) return '';
    return byteArray2hexStr(bytes);
}

export function hexStringToUtf8(hex: string) {
    const arr = hex.split('');
    let out = '';

    for (let i = 0; i < arr.length / 2; i++) {
        const tmp = `0x${arr[i * 2]}${arr[i * 2 + 1]}`;
        const charValue = String.fromCharCode(parseInt(tmp));
        out += charValue;
    }

    return out;
}

export function stringUtf8tHex(str: string) {
    let val = '';

    for (let i = 0; i < str.length; i++) {
        if (val == '') val = str.charCodeAt(i).toString(16);
        else val += str.charCodeAt(i).toString(16);
    }

    return val;
}

export function address2HexString(sHexAddress: string) {
    if (sHexAddress.length == 42 && sHexAddress.indexOf(ADDRESS_PREFIX) == 0) return sHexAddress;

    return base58ToHexString(sHexAddress);
}

export function hexString2Address(sAddress: string) {
    return hexStringToBase58(sAddress);
}

export function hexString2Utf8(sHexString: string) {
    return hexStringToUtf8(sHexString);
}

export function stringUtf8toHex(sUtf8: string) {
    return stringUtf8tHex(sUtf8);
}
