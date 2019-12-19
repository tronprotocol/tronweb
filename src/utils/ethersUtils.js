// this code is extracted from ethers.js
// Copyright (c) 2017 Richard Moore
// https://github.com/ethers-io/ethers.js

import jsSha256 from 'js-sha256';
import {keccak_256} from 'js-sha3';
import elliptic from "elliptic";

const HexCharacters = '0123456789abcdef';

let _curve = null;

export function getCurve() {
    if (!_curve) {
        _curve = new elliptic.ec('secp256k1');
    }
    return _curve;
}

export function isSignature(value) {
    return (value && value.r != null && value.s != null);
}

export function isHexString(value, length) {
    if (typeof value !== 'string' || !value.match(/^0x[0-9A-Fa-f]*$/)) {
        return false
    }
    if (length && value.length !== 2 + 2 * length) {
        return false;
    }
    return true;
}

export function isArrayish(value) {
    if (!value || parseInt(String(value.length)) !== value.length || typeof (value) === 'string') {
        return false;
    }
    for (var i = 0; i < value.length; i++) {
        var v = value[i];
        if (v < 0 || v >= 256 || parseInt(String(v)) !== v) {
            return false;
        }
    }
    return true;
}

export function isHexable(value) {
    if (typeof(value) === 'string') {
        if (isHexString(value)) {
            if (value == '0x') { value = '0x0'; }
            return true

        } else if (value[0] === '-' && isHexString(value.substring(1))) {
            return true

        } else if (value.match(/^-?[0-9]*$/)) {
            return true

        } else {
            return false
        }

    } else if (typeof(value) === 'number') {
        if (parseInt(String(value)) !== value) {
            return false
        }
        try {
            return true
        } catch (error) {
            return false
        }

    // } else if (value instanceof BigNumber) {
    //     return true

    } else if (Array.isArray(value)) {
        return true
    } else {
        return false
    }
}

export function hexZeroPad(value, length) {
    if (!isHexString(value)) {
        throw new Error('Invalid hex string');
    }
    while (value.length < 2 * length + 2) {
        value = '0x0' + value.substring(2);
    }
    return value;
}

// export function isHexable(val) {
//     return !!isHexString(val);
// }

export function toHexString(arr) {
    var str = ''
    for (let e of arr) {
        let c = e.toString(16);
        str += (c.length === 1 ? '0' : '') + c
    }
    return str
}

export function hexlify(value) {
    if (isHexable(value)) {
        return toHexString(value);
    }
    if (typeof value === 'number') {
        if (value < 0) {
            throw new Error('Cannot hexlify negative value');
        }
        if (value >= 9007199254740991) {
            throw new Error('Out-of-range');
        }
        var hex = '';
        while (value) {
            hex = HexCharacters[value & 0x0f] + hex;
            value = Math.floor(value / 16);
        }
        if (hex.length) {
            if (hex.length % 2) {
                hex = '0' + hex;
            }
            return '0x' + hex;
        }
        return '0x00';
    }
    if (typeof value === 'string') {
        var match = value.match(/^(0x)?[0-9a-fA-F]*$/);
        if (!match) {
            throw new Error('Invalid hexadecimal string');
        }
        if (match[1] !== '0x') {
            throw new Error('Hex string must have 0x prefix');
        }
        if (value.length % 2) {
            value = '0x0' + value.substring(2);
        }
        return value;
    }
    if (isArrayish(value)) {
        var result = [];
        for (var i = 0; i < value.length; i++) {
            var v = value[i];
            result.push(HexCharacters[(v & 0xf0) >> 4] + HexCharacters[v & 0x0f]);
        }
        return '0x' + result.join('');
    }
    throw new Error('Invalid hexlify value');
}

export function splitSignature(signature) {
    var v = 0;
    var r = '0x', s = '0x';
    if (isSignature(signature)) {
        if (signature.v == null && signature.recoveryParam == null) {
            throw new Error('At least one of recoveryParam or v must be specified');
        }
        r = hexZeroPad(signature.r, 32);
        s = hexZeroPad(signature.s, 32);
        v = signature.v;
        if (typeof (v) === 'string') {
            v = parseInt(v, 16);
        }
        var recoveryParam = signature.recoveryParam;
        if (recoveryParam == null && signature.v != null) {
            recoveryParam = 1 - (v % 2);
        }
        v = 27 + recoveryParam;
    } else {
        var bytes = arrayify(signature);
        if (bytes.length !== 65) {
            throw new Error('invalid signature');
        }
        r = hexlify(bytes.slice(0, 32));
        s = hexlify(bytes.slice(32, 64));
        v = bytes[64];
        if (v !== 27 && v !== 28) {
            v = 27 + (v % 2);
        }
    }
    return {
        r: r,
        s: s,
        recoveryParam: (v - 27),
        v: v
    };
}

export function defineReadOnly(object, name, value) {
    Object.defineProperty(object, name, {
        enumerable: true,
        value: value,
        writable: false,
    });
}

export function setType(object, type) {
    Object.defineProperty(object, '_ethersType', {configurable: false, value: type, writable: false});
}

export function recoverPublicKey(digest, signature) {
    var sig = splitSignature(signature);
    var rs = {r: arrayify(sig.r), s: arrayify(sig.s)};
    return '0x' + getCurve().recoverPubKey(arrayify(digest), rs, sig.recoveryParam).encode('hex', false);
}

var KeyPair = (function () {
    function KeyPair(privateKey) {
        var keyPair = getCurve().keyFromPrivate(arrayify(privateKey));
        defineReadOnly(this, 'privateKey', hexlify(keyPair.priv.toArray('be', 32)));
        defineReadOnly(this, 'publicKey', '0x' + keyPair.getPublic(false, 'hex'));
        defineReadOnly(this, 'compressedPublicKey', '0x' + keyPair.getPublic(true, 'hex'));
        defineReadOnly(this, 'publicKeyBytes', keyPair.getPublic().encode(null, true));
    }

    KeyPair.prototype.sign = function (digest) {
        var keyPair = getCurve().keyFromPrivate(arrayify(this.privateKey));
        var signature = keyPair.sign(arrayify(digest), {canonical: true});
        return {
            recoveryParam: signature.recoveryParam,
            r: hexZeroPad('0x' + signature.r.toString(16), 32),
            s: hexZeroPad('0x' + signature.s.toString(16), 32),
            v: 27 + signature.recoveryParam
        };
    };
    KeyPair.prototype.computeSharedSecret = function (otherKey) {
        var keyPair = getCurve().keyFromPrivate(arrayify(this.privateKey));
        var otherKeyPair = getCurve().keyFromPublic(arrayify(computePublicKey(otherKey)));
        return hexZeroPad('0x' + keyPair.derive(otherKeyPair.getPublic()).toString(16), 32);
    };
    KeyPair.prototype._addPoint = function (other) {
        var p0 = getCurve().keyFromPublic(arrayify(this.publicKey));
        var p1 = getCurve().keyFromPublic(arrayify(other));
        return "0x" + p0.pub.add(p1.pub).encodeCompressed("hex");
    };
    return KeyPair;
}());

export function computePublicKey(key, compressed) {
    var bytes = arrayify(key.substring(2));
    if (bytes.length === 32) {
        var keyPair = new KeyPair(bytes);
        if (compressed) {
            return keyPair.compressedPublicKey;
        }
        return keyPair.publicKey;
    } else if (bytes.length === 33) {
        if (compressed) {
            return hexlify(bytes);
        }
        return '0x' + getCurve().keyFromPublic(bytes).getPublic(false, 'hex');
    } else if (bytes.length === 65) {
        if (!compressed) {
            return hexlify(bytes);
        }
        return '0x' + getCurve().keyFromPublic(bytes).getPublic(true, 'hex');
    }
    throw new Error('Invalid public or private key');
    return null;
}

export function computeAddress(key) {
    var publicKey = '0x' + computePublicKey(key).slice(4);
    return getAddress('0x' + keccak256(publicKey).substring(26));
}

export function getChecksumAddress(address) {
    if (typeof (address) !== 'string' || !address.match(/^0x[0-9A-Fa-f]{40}$/)) {
        throw new Error('invalid address');
    }
    address = address.toLowerCase();
    var chars = address.substring(2).split('');
    var hashed = new Uint8Array(40);
    for (var i_1 = 0; i_1 < 40; i_1++) {
        hashed[i_1] = chars[i_1].charCodeAt(0);
    }
    hashed = arrayify(keccak256(hashed));
    for (var i = 0; i < 40; i += 2) {
        if ((hashed[i >> 1] >> 4) >= 8) {
            chars[i] = chars[i].toUpperCase();
        }
        if ((hashed[i >> 1] & 0x0f) >= 8) {
            chars[i + 1] = chars[i + 1].toUpperCase();
        }
    }
    return '0x' + chars.join('');
}

export function getAddress(address) {
    var result = null;
    if (typeof (address) !== 'string') {
        throw new Error('invalid address');
    }
    if (address.match(/^(0x)?[0-9a-fA-F]{40}$/)) {
        // Missing the 0x prefix
        if (address.substring(0, 2) !== '0x') {
            address = '0x' + address;
        }
        result = getChecksumAddress(address);
        // It is a checksummed address with a bad checksum
        if (address.match(/([A-F].*[a-f])|([a-f].*[A-F])/) && result !== address) {
            throw new Error('bad address checksum');
        }
        // Maybe ICAP? (we only support direct mode)
    } else if (address.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
        // It is an ICAP address with a bad checksum
        if (address.substring(2, 4) !== ibanChecksum(address)) {
            throw new Error('bad icap checksum');
        }
        result = (new bn_js_1.default.BN(address.substring(4), 36)).toString(16);
        while (result.length < 40) {
            result = '0' + result;
        }
        result = getChecksumAddress('0x' + result);
    } else {
        throw new Error('invalid address');
    }
    return result;
}

export function addSlice(array) {
    if (array.slice) {
        return array;
    }
    array.slice = function () {
        var args = Array.prototype.slice.call(arguments);
        return addSlice(new Uint8Array(Array.prototype.slice.apply(array, args)));
    };
    return array;
}

export function concat(objects) {
    var arrays = [];
    var length = 0;
    for (var i = 0; i < objects.length; i++) {
        var object = arrayify(objects[i]);
        arrays.push(object);
        length += object.length;
    }
    var result = new Uint8Array(length);
    var offset = 0;
    for (var i = 0; i < arrays.length; i++) {
        result.set(arrays[i], offset);
        offset += arrays[i].length;
    }
    return addSlice(result);
}

export function hashMessage(message) {
    return keccak256(concat([
        toUtf8Bytes('\x19Ethereum Signed Message:\n'),
        toUtf8Bytes(String(message.length)),
        ((typeof (message) === 'string') ? toUtf8Bytes(message) : message)
    ]));
}

export function recoverAddress(digest, signature) {
    return computeAddress(recoverPublicKey(arrayify(digest), signature));
}

export function verifyMessage(message, signature) {
    return recoverAddress(hashMessage(message), signature);
}

export function padZeros(value, length) {
    value = arrayify(value);
    if (length < value.length) {
        throw new Error('cannot pad');
    }
    var result = new Uint8Array(length);
    result.set(value, length - value.length);
    return addSlice(result);
}

export function arrayify(hexStr, noUint8Array) {
    if (typeof hexStr === 'string') {
        if (/0x/.test(hexStr))
            hexStr = hexStr.substring(2);
        if (hexStr.length % 2)
            hexStr = '0' + hexStr;
    } else if (Buffer.isBuffer(hexStr)) {
        let arr = [];
        for (let i = 0; i < hexStr.length; i++) {
            arr.push(hexStr[i]);
        }
        hexStr = arr;
    }
    let arr = Array.isArray(hexStr) || /Uint8Array/.test(hexStr.constructor)
        ? hexStr
        : hexStr.match(/.{1,2}/g).map(byte => parseInt(byte, 16));
    if (noUint8Array)
        return arr;
    else
        return new Uint8Array(arr);
}

export function keccak256(data) {
    return '0x' + keccak_256(arrayify(data));
}

export function shallowCopy(object) {
    var result = {};
    for (var key in object) {
        result[key] = object[key];
    }
    return result;
}

export function isType(object, type) {
    return (object && object._ethersType === type);
}


var opaque = { boolean: true, number: true, string: true };

export function deepCopy(object, frozen) {
    // Opaque objects are not mutable, so safe to copy by assignment
    if (object === undefined || object === null || opaque[typeof (object)]) {
        return object;
    }
    // Arrays are mutable, so we need to create a copy
    if (Array.isArray(object)) {
        var result = object.map(function (item) { return deepCopy(item, frozen); });
        if (frozen) {
            Object.freeze(result);
        }
        return result;
    }
    if (typeof (object) === 'object') {
        // Some internal objects, which are already immutable
        if (isType(object, 'BigNumber')) {
            return object;
        }
        if (isType(object, 'Description')) {
            return object;
        }
        if (isType(object, 'Indexed')) {
            return object;
        }
        var result = {};
        for (var key in object) {
            var value = object[key];
            if (value === undefined) {
                continue;
            }
            defineReadOnly(result, key, deepCopy(value, frozen));
        }
        if (frozen) {
            Object.freeze(result);
        }
        return result;
    }
    // The function type is also immutable, so safe to copy by assignment
    if (typeof (object) === 'function') {
        return object;
    }
    throw new Error('Cannot deepCopy ' + typeof (object));
}

export function sha256(val, format = 'array') {
    if (typeof val === 'string' && /^0x/.test(val)) {
        val = val.substring(2)
    }
    val = arrayify(val)
    var hash = jsSha256.create();
    hash.update(val);
    if (format === 'hex')
        return '0x' + hash.hex()
    else
        return hash.array()
}

export function toUtf8Bytes(str) {

    var result = [];
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);

        if (c < 0x80) {
            result.push(c);

        } else if (c < 0x800) {
            result.push((c >> 6) | 0xc0);
            result.push((c & 0x3f) | 0x80);

        } else if ((c & 0xfc00) == 0xd800) {
            i++;
            let c2 = str.charCodeAt(i);

            if (i >= str.length || (c2 & 0xfc00) !== 0xdc00) {
                throw new Error('invalid utf-8 string');
            }

            // Surrogate Pair
            c = 0x10000 + ((c & 0x03ff) << 10) + (c2 & 0x03ff);
            result.push((c >> 18) | 0xf0);
            result.push(((c >> 12) & 0x3f) | 0x80);
            result.push(((c >> 6) & 0x3f) | 0x80);
            result.push((c & 0x3f) | 0x80);

        } else {
            result.push((c >> 12) | 0xe0);
            result.push(((c >> 6) & 0x3f) | 0x80);
            result.push((c & 0x3f) | 0x80);
        }
    }

    return arrayify(result);
}

export function toUtf8String(bytes, ignoreErrors) {
    bytes = arrayify(bytes);
    var result = '';
    var i = 0;
    // Invalid bytes are ignored
    while (i < bytes.length) {
        var c = bytes[i++];
        // 0xxx xxxx
        if (c >> 7 === 0) {
            result += String.fromCharCode(c);
            continue;
        }
        // Multibyte; how many bytes left for this character?
        var extraLength = null;
        var overlongMask = null;
        // 110x xxxx 10xx xxxx
        if ((c & 0xe0) === 0xc0) {
            extraLength = 1;
            overlongMask = 0x7f;
            // 1110 xxxx 10xx xxxx 10xx xxxx
        }
        else if ((c & 0xf0) === 0xe0) {
            extraLength = 2;
            overlongMask = 0x7ff;
            // 1111 0xxx 10xx xxxx 10xx xxxx 10xx xxxx
        }
        else if ((c & 0xf8) === 0xf0) {
            extraLength = 3;
            overlongMask = 0xffff;
        }
        else {
            if (!ignoreErrors) {
                if ((c & 0xc0) === 0x80) {
                    throw new Error('invalid utf8 byte sequence; unexpected continuation byte');
                }
                throw new Error('invalid utf8 byte sequence; invalid prefix');
            }
            continue;
        }
        // Do we have enough bytes in our data?
        if (i + extraLength > bytes.length) {
            if (!ignoreErrors) {
                throw new Error('invalid utf8 byte sequence; too short');
            }
            // If there is an invalid unprocessed byte, skip continuation bytes
            for (; i < bytes.length; i++) {
                if (bytes[i] >> 6 !== 0x02) {
                    break;
                }
            }
            continue;
        }
        // Remove the length prefix from the char
        var res = c & ((1 << (8 - extraLength - 1)) - 1);
        for (var j = 0; j < extraLength; j++) {
            var nextChar = bytes[i];
            // Invalid continuation byte
            if ((nextChar & 0xc0) != 0x80) {
                res = null;
                break;
            }
            res = (res << 6) | (nextChar & 0x3f);
            i++;
        }
        if (res === null) {
            if (!ignoreErrors) {
                throw new Error('invalid utf8 byte sequence; invalid continuation byte');
            }
            continue;
        }
        // Check for overlong seuences (more bytes than needed)
        if (res <= overlongMask) {
            if (!ignoreErrors) {
                throw new Error('invalid utf8 byte sequence; overlong');
            }
            continue;
        }
        // Maximum code point
        if (res > 0x10ffff) {
            if (!ignoreErrors) {
                throw new Error('invalid utf8 byte sequence; out-of-range');
            }
            continue;
        }
        // Reserved for UTF-16 surrogate halves
        if (res >= 0xd800 && res <= 0xdfff) {
            if (!ignoreErrors) {
                throw new Error('invalid utf8 byte sequence; utf-16 surrogate');
            }
            continue;
        }
        if (res <= 0xffff) {
            result += String.fromCharCode(res);
            continue;
        }
        res -= 0x10000;
        result += String.fromCharCode(((res >> 10) & 0x3ff) + 0xd800, (res & 0x3ff) + 0xdc00);
    }
    return result;
}

export function checkNew(self, kind) {
    if (!(self instanceof kind)) {
        throw new Error('missing new');
    }
}

export function errorInfo() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    console.info("info", args);
}

export function hexDataSlice(data, offset, endOffset) {
    if (!isHexString(data)) {
        throw new Error('invalid hex data');
    }
    if ((data.length % 2) !== 0) {
        throw new Error('hex data length must be even');
    }
    offset = 2 + 2 * offset;
    if (endOffset != null) {
        return '0x' + data.substring(offset, 2 + 2 * endOffset);
    }
    return '0x' + data.substring(offset);
}

export function checkArgumentCount(count, expectedCount, suffix) {
    if (!suffix) {
        suffix = '';
    }
    if (count < expectedCount) {
        throw new Error('missing argument' + suffix);
    }
    if (count > expectedCount) {
        throw new Error('too many arguments' + suffix);
    }
}

var SigningKey = /** @class */ (function () {
    function SigningKey(privateKey) {
        checkNew(this, SigningKey);
        var privateKeyBytes = null;
        if (typeof (privateKey) === 'string' && privateKey.match(/^[0-9a-f]*$/i) && privateKey.length === 64) {
            privateKey = '0x' + privateKey;
        }
        privateKeyBytes = arrayify(privateKey);
        try {
            if (privateKeyBytes.length !== 32) {
                throw new Error('exactly 32 bytes required', errors.INVALID_ARGUMENT, {
                    arg: 'privateKey',
                    value: '[REDACTED]'
                });
            }
        } catch (error) {
            var params = {arg: 'privateKey', reason: error.reason, value: '[REDACTED]'};
            if (error.value) {
                if (typeof (error.value.length) === 'number') {
                    params.length = error.value.length;
                }
                params.type = typeof (error.value);
            }
            throw new Error('invalid private key', error.code, params);
        }
        defineReadOnly(this, 'privateKey', hexlify(privateKeyBytes));
        defineReadOnly(this, 'keyPair', new KeyPair(privateKeyBytes));
        defineReadOnly(this, 'publicKey', this.keyPair.publicKey);
        defineReadOnly(this, 'address', computeAddress(this.keyPair.publicKey));
        setType(this, 'SigningKey');
    }

    SigningKey.prototype.signDigest = function (digest) {
        return this.keyPair.sign(digest);
    };
    SigningKey.prototype.computeSharedSecret = function (key) {
        return this.keyPair.computeSharedSecret(arrayify(key));
    };
    SigningKey.isSigningKey = function (value) {
        return isType(value, 'SigningKey');
    };
    return SigningKey;
}());

export {
    SigningKey
}

