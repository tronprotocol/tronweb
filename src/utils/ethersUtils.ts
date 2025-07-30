import {
    keccak256,
    sha256,
    sha512,
    pbkdf2,
    toUtf8Bytes,
    toUtf8String,
    recoverAddress,
    SigningKey,
    AbiCoder,
    Signature,
    concat,
    id,
    Mnemonic,
    Wordlist,
    wordlists,
    HDNodeWallet as ethersHDNodeWallet,
    getBytes,
    computeHmac,
} from 'ethers';

import type { BytesLike, SignatureLike } from 'ethers';

import { Interface } from './interface.js';

const splitSignature = (sigBytes: SignatureLike) => Signature.from(sigBytes);
const joinSignature = (splitSig: SignatureLike) => Signature.from(splitSig).serialized;
const arrayify = (value: BytesLike) => getBytes(value);
const FormatTypes = {
    sighash: 'sighash',
    minimal: 'minimal',
    full: 'full',
    json: 'json',
};
const isValidMnemonic = Mnemonic.isValidMnemonic;

computeHmac.register((algorithm, key, data) => {
    return computeHmac._(algorithm, Buffer.from(key), Buffer.from(data));
});

export {
    keccak256,
    sha256,
    sha512,
    pbkdf2,
    toUtf8Bytes,
    toUtf8String,
    recoverAddress,
    Signature,
    SigningKey,
    AbiCoder,
    Interface,
    FormatTypes,
    splitSignature,
    joinSignature,
    arrayify,
    ethersHDNodeWallet,
    concat,
    id,
    Mnemonic,
    Wordlist,
    wordlists,
    isValidMnemonic,
};
