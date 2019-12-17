import {utils} from 'ethers';
import jsSha256 from 'js-sha256';
import {keccak_256} from 'js-sha3';

// export function keccak256(data) {
//     console.log(arrayify(data))
//     console.log(keccak_256(arrayify(data)))
//
//
//     return '0x' + keccak_256(arrayify(data));
// }


export function sha256(val) {
    var hash = jsSha256.create();
    hash.update(val);
    return hash.array();
}

function arrayify(hexStr) {
    if (hexStr.length % 2) {
        hexStr = '0' + hexStr;
    }
    return new Uint8Array(hexStr.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
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

const keccak256 = utils.keccak256; // from js-sha3
const recoverAddress = utils.recoverAddress;
const SigningKey = utils.SigningKey;
const AbiCoder = utils.AbiCoder;

export {
    keccak256,
    recoverAddress,
    SigningKey,
    AbiCoder
}
