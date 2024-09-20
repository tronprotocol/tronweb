import { ADDRESS_PREFIX, ADDRESS_PREFIX_BYTE, ADDRESS_SIZE } from './address.js';
import { base64EncodeToString, base64DecodeFromString, hexStr2byteArray } from './code.js';
import { encode58, decode58 } from './base58.js';
import { byte2hexStr, byteArray2hexStr } from './bytes.js';
import { keccak256, sha256, SigningKey, recoverAddress, arrayify, Signature } from './ethersUtils.js';
import { TypedDataEncoder } from './typedData.js';
import { secp256k1 as secp } from 'ethereum-cryptography/secp256k1';
import type { TypedDataDomain, TypedDataField } from 'ethers';
import { SignedTransaction } from '../types/Transaction.js';

import type { BytesLike } from '../types/UtilsTypes.js';

function normalizePrivateKeyBytes(priKeyBytes: BytesLike) {
    return hexStr2byteArray(byteArray2hexStr(priKeyBytes).padStart(64, '0'));
}

export function getBase58CheckAddress(addressBytes: number[]) {
    const hash0 = SHA256(addressBytes);
    const hash1 = SHA256(hash0);

    let checkSum = hash1.slice(0, 4);
    checkSum = addressBytes.concat(checkSum);

    return encode58(checkSum);
}

export function decodeBase58Address(base58Sting: string) {
    if (typeof base58Sting != 'string') return false;

    if (base58Sting.length <= 4) return false;

    let address = decode58(base58Sting);

    if (base58Sting.length <= 4) return false;

    const len = address.length;
    const offset = len - 4;
    const checkSum = address.slice(offset);

    address = address.slice(0, offset);

    const hash0 = SHA256(address);
    const hash1 = SHA256(hash0);
    const checkSum1 = hash1.slice(0, 4);

    if (
        checkSum[0] == checkSum1[0] &&
        checkSum[1] == checkSum1[1] &&
        checkSum[2] == checkSum1[2] &&
        checkSum[3] == checkSum1[3]
    ) {
        return address;
    }

    throw new Error('Invalid address provided');
}

// @TODO transaction type should be determined.
export function signTransaction(priKeyBytes: string | BytesLike, transaction: any): SignedTransaction {
    if (typeof priKeyBytes === 'string') priKeyBytes = hexStr2byteArray(priKeyBytes);

    const txID = transaction.txID;
    const signature = ECKeySign(hexStr2byteArray(txID), priKeyBytes);

    if (Array.isArray(transaction.signature)) {
        if (!transaction.signature.includes(signature)) transaction.signature.push(signature);
    } else transaction.signature = [signature];
    return transaction;
}

export function ecRecover(signedData: string, signature: string) {
    signedData = '0x' + signedData.replace(/^0x/, '');
    signature = '0x' + signature.replace(/^0x/, '');

    const recovered = recoverAddress(arrayify(signedData), Signature.from(signature));
    const tronAddress = ADDRESS_PREFIX + recovered.substring(2);
    return tronAddress;
}

export function arrayToBase64String(a: number[]) {
    return btoa(String.fromCharCode(...a));
}

export function signBytes(privateKey: string | BytesLike, contents: BytesLike) {
    if (typeof privateKey === 'string') privateKey = hexStr2byteArray(privateKey);

    const hashBytes = SHA256(contents);
    const signBytes = ECKeySign(hashBytes, privateKey);

    return signBytes;
}

export function _signTypedData(
    domain: TypedDataDomain,
    types: Record<string, Array<TypedDataField>>,
    value: Record<string, any>,
    privateKey: string
) {
    const key = `0x${privateKey.replace(/^0x/, '')}`;
    const signingKey = new SigningKey(key);

    const messageDigest = TypedDataEncoder.hash(domain, types, value);
    const signature = signingKey.sign(messageDigest);
    const signatureHex = ['0x', signature.r.substring(2), signature.s.substring(2), Number(signature.v).toString(16)].join('');
    return signatureHex;
}

export function getRowBytesFromTransactionBase64(base64Data: string): Uint8Array {
    const bytesDecode = base64DecodeFromString(base64Data);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const transaction = globalThis.proto.protocol.Transaction.deserializeBinary(bytesDecode);
    const raw = transaction.getRawData();

    return raw.serializeBinary();
}

export function genPriKey() {
    const priKey = secp.utils.randomPrivateKey();
    let priKeyHex = byteArray2hexStr(priKey);

    priKeyHex = priKeyHex.padStart(64, '0');

    return hexStr2byteArray(priKeyHex);
}

export function computeAddress(pubBytes: BytesLike) {
    if (pubBytes.length === 65) pubBytes = pubBytes.slice(1);

    const hash = keccak256(new Uint8Array(pubBytes)).toString().substring(2);
    const addressHex = ADDRESS_PREFIX + hash.substring(24);

    return hexStr2byteArray(addressHex);
}

export function getAddressFromPriKey(priKeyBytes: BytesLike) {
    const pubBytes = getPubKeyFromPriKey(priKeyBytes);
    return computeAddress(pubBytes);
}

export function decode58Check(addressStr: string) {
    const decodeCheck = decode58(addressStr);

    if (decodeCheck.length <= 4) return false;

    const decodeData = decodeCheck.slice(0, decodeCheck.length - 4);
    const hash0 = SHA256(decodeData);
    const hash1 = SHA256(hash0);

    if (
        hash1[0] === decodeCheck[decodeData.length] &&
        hash1[1] === decodeCheck[decodeData.length + 1] &&
        hash1[2] === decodeCheck[decodeData.length + 2] &&
        hash1[3] === decodeCheck[decodeData.length + 3]
    ) {
        return decodeData;
    }

    return false;
}

export function isAddressValid(base58Str: string) {
    if (typeof base58Str !== 'string') return false;

    if (base58Str.length !== ADDRESS_SIZE) return false;

    let address = decode58(base58Str);

    if (address.length !== 25) return false;

    if (address[0] !== ADDRESS_PREFIX_BYTE) return false;

    const checkSum = address.slice(21);
    address = address.slice(0, 21);

    const hash0 = SHA256(address);
    const hash1 = SHA256(hash0);
    const checkSum1 = hash1.slice(0, 4);

    if (
        checkSum[0] == checkSum1[0] &&
        checkSum[1] == checkSum1[1] &&
        checkSum[2] == checkSum1[2] &&
        checkSum[3] == checkSum1[3]
    ) {
        return true;
    }

    return false;
}

export function getBase58CheckAddressFromPriKeyBase64String(priKeyBase64String: string) {
    const priKeyBytes = base64DecodeFromString(priKeyBase64String);
    const pubBytes = getPubKeyFromPriKey(priKeyBytes);
    const addressBytes = computeAddress(pubBytes);

    return getBase58CheckAddress(addressBytes);
}

export function getHexStrAddressFromPriKeyBase64String(priKeyBase64String: string) {
    const priKeyBytes = base64DecodeFromString(priKeyBase64String);
    const pubBytes = getPubKeyFromPriKey(priKeyBytes);
    const addressBytes = computeAddress(pubBytes);
    const addressHex = byteArray2hexStr(addressBytes);

    return addressHex;
}

export function getAddressFromPriKeyBase64String(priKeyBase64String: string) {
    const priKeyBytes = base64DecodeFromString(priKeyBase64String);
    const pubBytes = getPubKeyFromPriKey(priKeyBytes);
    const addressBytes = computeAddress(pubBytes);
    const addressBase64 = base64EncodeToString(addressBytes);

    return addressBase64;
}

export function getPubKeyFromPriKey(priKeyBytes: BytesLike) {
    const pubkey = secp.ProjectivePoint.fromPrivateKey(new Uint8Array(normalizePrivateKeyBytes(priKeyBytes)));
    const x = pubkey.x;
    const y = pubkey.y;

    const xHex = x.toString(16).padStart(64, '0');
    const yHex = y.toString(16).padStart(64, '0');

    const pubkeyHex = `04${xHex}${yHex}`;
    const pubkeyBytes = hexStr2byteArray(pubkeyHex);

    return pubkeyBytes;
}

export function ECKeySign(hashBytes: BytesLike, priKeyBytes: BytesLike) {
    const signature = secp.sign(byteArray2hexStr(hashBytes), byteArray2hexStr(priKeyBytes));

    const r = signature.r.toString(16);
    const s = signature.s.toString(16);
    const v = signature.recovery! + 27;

    return r.padStart(64, '0') + s.padStart(64, '0') + byte2hexStr(v);
}

export function SHA256(msgBytes: BytesLike) {
    const msgHex = byteArray2hexStr(msgBytes);
    const hashHex = sha256('0x' + msgHex).replace(/^0x/, '');
    return hexStr2byteArray(hashHex);
}

export function passwordToAddress(password: string) {
    const com_priKeyBytes = base64DecodeFromString(password);
    const com_addressBytes = getAddressFromPriKey(com_priKeyBytes);

    return getBase58CheckAddress(com_addressBytes);
}

export function pkToAddress(privateKey: string, strict = false) {
    const com_priKeyBytes = hexStr2byteArray(privateKey, strict);
    const com_addressBytes = getAddressFromPriKey(com_priKeyBytes);

    return getBase58CheckAddress(com_addressBytes);
}

export function sha3(string: string, prefix = true) {
    return (prefix ? '0x' : '') + keccak256(Buffer.from(string, 'utf-8')).toString().substring(2);
}
