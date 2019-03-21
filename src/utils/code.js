import {
    byte2hexStr,
    bytesToString,
    hextoString,
    byteArray2hexStr,
    base64DecodeFromString,
    base64EncodeToString
} from './bytes';

export function bin2String(array) {
    // TODO Do we need this alias?
    return bytesToString(array);
}

export function arrayEquals(array1, array2, strict) {
    if (array1.length != array2.length)
        return false;

    let i;

    for (i = 0; i < array1.length; i++) {
        if (strict) {
            if (array1[i] != array2[i])
                return false;
        } else if (JSON.stringify(array1[i]) != JSON.stringify(array2[i]))
            return false;
    }

    return true;
}

export function stringToBytes(str) {

    if (typeof str !== 'string')
        throw new Error('The passed string is not a string')

    const bytes = new Array();
    let len;
    let c;

    len = str.length;

    for (let i = 0; i < len; i++) {
        c = str.charCodeAt(i);

        if (c >= 0x010000 && c <= 0x10FFFF) {
            bytes.push(((c >> 18) & 0x07) | 0xF0);
            bytes.push(((c >> 12) & 0x3F) | 0x80);
            bytes.push(((c >> 6) & 0x3F) | 0x80);
            bytes.push((c & 0x3F) | 0x80);
        } else if (c >= 0x000800 && c <= 0x00FFFF) {
            bytes.push(((c >> 12) & 0x0F) | 0xE0);
            bytes.push(((c >> 6) & 0x3F) | 0x80);
            bytes.push((c & 0x3F) | 0x80);
        } else if (c >= 0x000080 && c <= 0x0007FF) {
            bytes.push(((c >> 6) & 0x1F) | 0xC0);
            bytes.push((c & 0x3F) | 0x80);
        } else bytes.push(c & 0xFF);
    }

    return bytes;
}

export {byte2hexStr, bytesToString, hextoString, byteArray2hexStr, base64DecodeFromString, base64EncodeToString}

export function hexChar2byte(c) {
    let d;

    if (c >= 'A' && c <= 'F')
        d = c.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
    else if (c >= 'a' && c <= 'f')
        d = c.charCodeAt(0) - 'a'.charCodeAt(0) + 10;
    else if (c >= '0' && c <= '9')
        d = c.charCodeAt(0) - '0'.charCodeAt(0);

    if (typeof d === 'number')
        return d;
    else
        throw new Error('The passed hex char is not a valid hex char');
}

export function isHexChar(c) {
    if ((c >= 'A' && c <= 'F') ||
        (c >= 'a' && c <= 'f') ||
        (c >= '0' && c <= '9')) {
        return 1;
    }

    return 0;
}

export function hexStr2byteArray(str) {
    if (typeof str !== 'string')
        throw new Error('The passed string is not a string')

    const byteArray = Array();
    let d = 0;
    let j = 0;
    let k = 0;

    for (let i = 0; i < str.length; i++) {
        const c = str.charAt(i);

        if (isHexChar(c)) {
            d <<= 4;
            d += hexChar2byte(c);
            j++;

            if (0 === (j % 2)) {
                byteArray[k++] = d;
                d = 0;
            }
        } else
            throw new Error('The passed hex char is not a valid hex string')
    }

    return byteArray;
}

//yyyy-MM-DD HH-mm-ss
export function strToDate(str) {

    if (!/^\d{4}-\d{2}-\d{2}( \d{2}-\d{2}-\d{2}|)/.test(str))
        throw new Error('The passed date string is not valid')

    const tempStrs = str.split(" ");
    const dateStrs = tempStrs[0].split("-");
    const year = parseInt(dateStrs[0], 10);
    const month = parseInt(dateStrs[1], 10) - 1;
    const day = parseInt(dateStrs[2], 10);

    if (tempStrs.length > 1) {
        const timeStrs = tempStrs[1].split("-");
        const hour = parseInt(timeStrs[0], 10);
        const minute = parseInt(timeStrs[1], 10);
        const second = parseInt(timeStrs[2], 10);

        return new Date(year, month, day, hour, minute, second);
    }

    return new Date(year, month, day);
}

export function isNumber(c) {
    if (c >= '0' && c <= '9')
        return 1;

    return 0;
}

//return 1: address  --- 20Bytes HexString
//return 2: blockNumber ------ Decimal number
//return 3: assetName ------ String
//return other: error
export function getStringType(str) {
    if (null == str)
        return -1;

    if (typeof (str) != 'string')
        return -1;

    if (str.length == 0 || str == "")
        return -1;

    let i = 0;

    // TODO Should we return 1 if someone passes a full, 42-chars long address?
    // if (str.length == 42 && /^41/.test(str)) {
    //     for (; i < 40; i++) {
    //         var c = str.charAt(i+2);
    //
    //         if (!isHexChar(c))
    //             break;
    //     }
    // } else
    if (str.length == 40) {
        for (; i < 40; i++) {
            var c = str.charAt(i);

            if (!isHexChar(c))
                break;
        }
    }

    if (i == 40)
        return 1; //40 Hex, Address

    for (i = 0; i < str.length; i++) {
        var c = str.charAt(i);

        if (!isNumber(c))
            break;
    }

    if (i == str.length)
        return 2; // All Decimal number, BlockNumber

    for (i = 0; i < str.length; i++) {
        var c = str.charAt(i);

        if (c > ' ')
            return 3; // At least one visible character
    }

    return -1;
}
