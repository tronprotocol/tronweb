import { Base64 } from './base64';

export function bin2String(array) {
    return String.fromCharCode(...array);
}

export function arrayEquals(array1, array2) {
    if (array1.length != array2.length)
        return false;
        
    let i;

    for (i = 0; i < array1.length; i++) {
        if (array1[i] != array2[i])
            return false;
    }

    return true;
}

export function stringToBytes(str) {
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

export function bytesToString(arr) {
    if (typeof arr === 'string')
        return arr;
        
    let str = '';

    for (let i = 0; i < arr.length; i++) {
        const one = arr[i].toString(2);
        const v = one.match(/^1+?(?=0)/);

        if (v && one.length == 8) {
            const bytesLength = v[0].length;
            let store = arr[i].toString(2).slice(7 - bytesLength);

            for (let st = 1; st < bytesLength; st++)
                store += arr[st + i].toString(2).slice(2);

            str += String.fromCharCode(parseInt(store, 2));
            i += bytesLength - 1;
        } else str += String.fromCharCode(arr[i]);
    }

    return str;
}

export function hextoString(hex) {
    const arr = hex.split("");
    let out = "";

    for (let i = 0; i < arr.length / 2; i++) {
        const tmp = `0x${arr[i * 2]}${arr[i * 2 + 1]}`;
        const charValue = String.fromCharCode(tmp);

        out += charValue;
    }

    return out
}

export function hexChar2byte(c) {
    let d = 0;

    if (c >= 'A' && c <= 'F')
        d = c.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
    else if (c >= 'a' && c <= 'f')
        d = c.charCodeAt(0) - 'a'.charCodeAt(0) + 10;
    else if (c >= '0' && c <= '9')
        d = c.charCodeAt(0) - '0'.charCodeAt(0);
        
    return d;
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
        }
    }

    return byteArray;
}

export function byte2hexStr(byte) {
    const hexByteMap = "0123456789ABCDEF";
    let str = "";

    str += hexByteMap.charAt(byte >> 4);
    str += hexByteMap.charAt(byte & 0x0f);

    return str;
}

export function byteArray2hexStr(byteArray) {
    return byteArray.reduce((string, byte) => {
        return string + byte2hexStr(byte);
    }, '');
}

export function base64DecodeFromString(string64) {
    const b = new Base64();
    const decodeBytes = b.decodeToByteArray(string64);

    return decodeBytes;
}

export function base64EncodeToString(bytes) {
    const b = new Base64();
    const string64 = b.encodeIgnoreUtf8(bytes);

    return string64
}

//yyyy-MM-DD HH-mm-ss
export function strToDate(str) {
    const tempStrs = str.split(" ");
    const dateStrs = tempStrs[0].split("-");
    const year = parseInt(dateStrs[0], 10);
    const month = parseInt(dateStrs[1], 10) - 1;
    const day = parseInt(dateStrs[2], 10);

    if (tempStrs.length > 1) {
        const timeStrs = tempStrs[1].split("-");
        const hour = parseInt(timeStrs[0], 10);
        const minute = parseInt(timeStrs[1], 10) - 1;
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
        return 2; //Alll Decimal number, BlockNumber

    for (i = 0; i < str.length; i++) {
        var c = str.charAt(i);

        if (c > ' ')
            return 3; //At least one visible character
    }

    return -1;
}