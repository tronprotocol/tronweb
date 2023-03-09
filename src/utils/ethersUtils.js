import {
    keccak256,
    sha256,
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
    computeHmac,
    Wallet as ethersWallet,
    HDNodeWallet as ethersHDNodeWallet,
    getBytes,
} from 'ethers';

import { Interface } from './interface.js';

const splitSignature = (sigBytes) => Signature.from(sigBytes);
const joinSignature = (splitSig) => Signature.from(splitSig).serialized;
const arrayify = (value) => getBytes(value);
const FormatTypes = {
    sighash: 'sighash',
    minimal: 'minimal',
    full: 'full',
    json: 'json',
};
const isValidMnemonic = Mnemonic.isValidMnemonic;

export {
    keccak256,
    sha256,
    toUtf8Bytes,
    toUtf8String,
    recoverAddress,
    SigningKey,
    AbiCoder,
    Interface,
    FormatTypes,
    splitSignature,
    joinSignature,
    arrayify,
    ethersWallet,
    ethersHDNodeWallet,
    concat,
    id,
    Mnemonic,
    Wordlist,
    isValidMnemonic,
    computeHmac,
};
