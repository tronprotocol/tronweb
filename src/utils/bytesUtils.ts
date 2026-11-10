/**
 *  Byte and UTF-8 helpers ported from ethers v6 (MIT License,
 *  https://github.com/ethers-io/ethers.js) so TronWeb does not depend on
 *  ethers for them. Signatures, results and thrown errors match ethers.
 */

import { keccak256, assertArgument, assertNormalize } from 'ethers';
import type { BytesLike, UnicodeNormalizationForm, Utf8ErrorFunc, Utf8ErrorReason } from 'ethers';

/**
 *  Get a typed Uint8Array for %%value%%. If already a Uint8Array
 *  the original %%value%% is returned.
 */
export function getBytes(value: BytesLike, name?: string): Uint8Array {
    if (value instanceof Uint8Array) {
        return value;
    }

    if (typeof value === 'string' && value.length % 2 === 0 && value.match(/^0x[0-9a-f]*$/i)) {
        const result = new Uint8Array((value.length - 2) / 2);
        let offset = 2;
        for (let i = 0; i < result.length; i++) {
            result[i] = parseInt(value.substring(offset, offset + 2), 16);
            offset += 2;
        }
        return result;
    }

    assertArgument(false, 'invalid BytesLike value', name || 'value', value);
}

const HexCharacters = '0123456789abcdef';

/**
 *  Returns a DataHexString containing all members of %%datas%% concatenated.
 */
export function concat(datas: ReadonlyArray<BytesLike>): string {
    let result = '0x';
    for (const data of datas) {
        const bytes = getBytes(data);
        for (let i = 0; i < bytes.length; i++) {
            const v = bytes[i];
            result += HexCharacters[(v & 0xf0) >> 4] + HexCharacters[v & 0x0f];
        }
    }
    return result;
}

function errorFunc(
    reason: Utf8ErrorReason,
    offset: number,
    bytes: Uint8Array,
    output: Array<number>,
    badCodepoint?: number
): number {
    assertArgument(false, `invalid codepoint at offset ${offset}; ${reason}`, 'bytes', bytes);
}

function getUtf8CodePoints(_bytes: BytesLike, onError?: Utf8ErrorFunc): Array<number> {
    if (onError == null) {
        onError = errorFunc;
    }

    const bytes = getBytes(_bytes, 'bytes');

    const result: Array<number> = [];
    let i = 0;

    // Invalid bytes are ignored
    while (i < bytes.length) {
        const c = bytes[i++];

        // 0xxx xxxx
        if (c >> 7 === 0) {
            result.push(c);
            continue;
        }

        // Multibyte; how many bytes left for this character?
        let extraLength: number;
        let overlongMask: number;

        if ((c & 0xe0) === 0xc0) {
            // 110x xxxx 10xx xxxx
            extraLength = 1;
            overlongMask = 0x7f;
        } else if ((c & 0xf0) === 0xe0) {
            // 1110 xxxx 10xx xxxx 10xx xxxx
            extraLength = 2;
            overlongMask = 0x7ff;
        } else if ((c & 0xf8) === 0xf0) {
            // 1111 0xxx 10xx xxxx 10xx xxxx 10xx xxxx
            extraLength = 3;
            overlongMask = 0xffff;
        } else {
            if ((c & 0xc0) === 0x80) {
                i += onError('UNEXPECTED_CONTINUE', i - 1, bytes, result);
            } else {
                i += onError('BAD_PREFIX', i - 1, bytes, result);
            }
            continue;
        }

        // Do we have enough bytes in our data?
        if (i - 1 + extraLength >= bytes.length) {
            i += onError('OVERRUN', i - 1, bytes, result);
            continue;
        }

        // Remove the length prefix from the char
        let res: null | number = c & ((1 << (8 - extraLength - 1)) - 1);

        for (let j = 0; j < extraLength; j++) {
            const nextChar = bytes[i];

            // Invalid continuation byte
            if ((nextChar & 0xc0) != 0x80) {
                i += onError('MISSING_CONTINUE', i, bytes, result);
                res = null;
                break;
            }

            res = (res << 6) | (nextChar & 0x3f);
            i++;
        }

        // See above loop for invalid continuation byte
        if (res === null) {
            continue;
        }

        // Maximum code point
        if (res > 0x10ffff) {
            i += onError('OUT_OF_RANGE', i - 1 - extraLength, bytes, result, res);
            continue;
        }

        // Reserved for UTF-16 surrogate halves
        if (res >= 0xd800 && res <= 0xdfff) {
            i += onError('UTF16_SURROGATE', i - 1 - extraLength, bytes, result, res);
            continue;
        }

        // Check for overlong sequences (more bytes than needed)
        if (res <= overlongMask) {
            i += onError('OVERLONG', i - 1 - extraLength, bytes, result, res);
            continue;
        }

        result.push(res);
    }

    return result;
}

/**
 *  Returns the UTF-8 byte representation of %%str%%.
 *
 *  If %%form%% is specified, the string is normalized.
 */
export function toUtf8Bytes(str: string, form?: UnicodeNormalizationForm): Uint8Array {
    assertArgument(typeof str === 'string', 'invalid string value', 'str', str);

    if (form != null) {
        assertNormalize(form);
        str = str.normalize(form);
    }

    const result: Array<number> = [];
    for (let i = 0; i < str.length; i++) {
        const c = str.charCodeAt(i);

        if (c < 0x80) {
            result.push(c);
        } else if (c < 0x800) {
            result.push((c >> 6) | 0xc0);
            result.push((c & 0x3f) | 0x80);
        } else if ((c & 0xfc00) == 0xd800) {
            i++;
            const c2 = str.charCodeAt(i);

            assertArgument(i < str.length && (c2 & 0xfc00) === 0xdc00, 'invalid surrogate pair', 'str', str);

            // Surrogate Pair
            const pair = 0x10000 + ((c & 0x03ff) << 10) + (c2 & 0x03ff);
            result.push((pair >> 18) | 0xf0);
            result.push(((pair >> 12) & 0x3f) | 0x80);
            result.push(((pair >> 6) & 0x3f) | 0x80);
            result.push((pair & 0x3f) | 0x80);
        } else {
            result.push((c >> 12) | 0xe0);
            result.push(((c >> 6) & 0x3f) | 0x80);
            result.push((c & 0x3f) | 0x80);
        }
    }

    return new Uint8Array(result);
}

/**
 *  Returns the string represented by the UTF-8 data %%bytes%%.
 *
 *  When %%onError%% function is specified, it is called on UTF-8
 *  errors allowing recovery using the Utf8ErrorFunc API.
 *  (default: throw on any invalid sequence)
 */
export function toUtf8String(bytes: BytesLike, onError?: Utf8ErrorFunc): string {
    return getUtf8CodePoints(bytes, onError)
        .map((codePoint) => {
            if (codePoint <= 0xffff) {
                return String.fromCharCode(codePoint);
            }
            codePoint -= 0x10000;
            return String.fromCharCode(((codePoint >> 10) & 0x3ff) + 0xd800, (codePoint & 0x3ff) + 0xdc00);
        })
        .join('');
}

/**
 *  Computes the keccak256 of the UTF-8 bytes of %%value%%.
 */
export function id(value: string): string {
    return keccak256(toUtf8Bytes(value));
}
