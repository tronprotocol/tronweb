import { keccak256, toUtf8Bytes, concat, recoverAddress, SigningKey, joinSignature } from './ethersUtils.js';
import { ADDRESS_PREFIX } from './address.js';
import { getBase58CheckAddress } from './crypto.js';
import { hexStr2byteArray } from './code.js';

export const TRON_MESSAGE_PREFIX = '\x19TRON Signed Message:\n';

export function hashMessage(message: string | Uint8Array | Array<number>) {
    if (typeof message === 'string') {
        message = toUtf8Bytes(message);
    } else if (Array.isArray(message)) {
        message = new Uint8Array(message);
    }

    return keccak256(concat([toUtf8Bytes(TRON_MESSAGE_PREFIX), toUtf8Bytes(String(message.length)), message]));
}

export function signMessage(message: string | Uint8Array | Array<number>, privateKey: string) {
    if (!privateKey.match(/^0x/)) {
        privateKey = '0x' + privateKey;
    }

    const signingKey = new SigningKey(privateKey);
    const messageDigest = hashMessage(message);
    const signature = signingKey.sign(messageDigest);

    return joinSignature(signature);
}

export function verifyMessage(message: string | Uint8Array | Array<number>, signature: string) {
    if (!signature.match(/^0x/)) {
        signature = '0x' + signature;
    }
    const recovered = recoverAddress(hashMessage(message), signature);
    const base58Address = getBase58CheckAddress(hexStr2byteArray(recovered.replace(/^0x/, ADDRESS_PREFIX)));

    return base58Address;
}
