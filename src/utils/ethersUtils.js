import {utils} from 'ethers';
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

export function isHexString(str) {
    return /^0x[0-9a-f]+$/ig.test(str)
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

export function isHexable(val) {
    return !isHexString(val);
}

export function toHexString(arr) {
    var str = ''
    for (let e of arr) {
        let c = e.toString(16);
        str += (c.length === 1 ? '0' : '') + c
    }
    return str
}

export function isArrayish(value) {
    if (!value || parseInt(String(value.length)) !== value.length || typeof value === 'string') {
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

export function hexlify(value) {
    if (isHexable(value)) {
        console.log(value)
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
    }
    else {
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

export function recoverPublicKey(digest, signature) {
    var sig = splitSignature(signature);
    var rs = { r: arrayify(sig.r), s: arrayify(sig.s) };
    return '0x' + getCurve().recoverPubKey(arrayify(digest), rs, sig.recoveryParam).encode('hex', false);
}

var KeyPair = (function () {
    function KeyPair(privateKey) {
        var keyPair = getCurve().keyFromPrivate(arrayify(privateKey));
        properties_1.defineReadOnly(this, 'privateKey', bytes_1.hexlify(keyPair.priv.toArray('be', 32)));
        properties_1.defineReadOnly(this, 'publicKey', '0x' + keyPair.getPublic(false, 'hex'));
        properties_1.defineReadOnly(this, 'compressedPublicKey', '0x' + keyPair.getPublic(true, 'hex'));
        properties_1.defineReadOnly(this, 'publicKeyBytes', keyPair.getPublic().encode(null, true));
    }
    KeyPair.prototype.sign = function (digest) {
        var keyPair = getCurve().keyFromPrivate(arrayify(this.privateKey));
        var signature = keyPair.sign(arrayify(digest), { canonical: true });
        return {
            recoveryParam: signature.recoveryParam,
            r: bytes_1.hexZeroPad('0x' + signature.r.toString(16), 32),
            s: bytes_1.hexZeroPad('0x' + signature.s.toString(16), 32),
            v: 27 + signature.recoveryParam
        };
    };
    KeyPair.prototype.computeSharedSecret = function (otherKey) {
        var keyPair = getCurve().keyFromPrivate(arrayify(this.privateKey));
        var otherKeyPair = getCurve().keyFromPublic(arrayify(computePublicKey(otherKey)));
        return bytes_1.hexZeroPad('0x' + keyPair.derive(otherKeyPair.getPublic()).toString(16), 32);
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
    }
    else if (bytes.length === 33) {
        if (compressed) {
            return bytes_1.hexlify(bytes);
        }
        return '0x' + getCurve().keyFromPublic(bytes).getPublic(false, 'hex');
    }
    else if (bytes.length === 65) {
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
    }
    else if (address.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
        // It is an ICAP address with a bad checksum
        if (address.substring(2, 4) !== ibanChecksum(address)) {
            throw new Error('bad icap checksum');
        }
        result = (new bn_js_1.default.BN(address.substring(4), 36)).toString(16);
        while (result.length < 40) {
            result = '0' + result;
        }
        result = getChecksumAddress('0x' + result);
    }
    else {
        throw new Error('invalid address');
    }
    return result;
}

export function recoverAddress(digest, signature) {
    return computeAddress(recoverPublicKey(arrayify(digest), signature));
}

export function verifyMessage(message, signature) {
    return recoverAddress(hash_1.hashMessage(message), signature);
}

export function arrayify(hexStr, noUint8Array) {
    if (typeof hexStr === 'string' && hexStr.length % 2) {
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

// const recoverAddress = recoverAddress;
const SigningKey = utils.SigningKey;
const AbiCoder = utils.AbiCoder;

export {
    SigningKey,
    AbiCoder
}
