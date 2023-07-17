import {ADDRESS_PREFIX, ADDRESS_PREFIX_BYTE, ADDRESS_SIZE} from './address';
import {base64EncodeToString} from './code';
import {base64DecodeFromString, hexStr2byteArray} from './code';
import {encode58, decode58} from './base58';
import {byte2hexStr, byteArray2hexStr} from './bytes';
import {keccak256, sha256, SigningKey} from './ethersUtils';
import {TypedDataEncoder} from './typedData';
import * as ec from "ethereum-cryptography/secp256k1";

const secp = ec.secp256k1 ?? ec;

function normalizePrivateKeyBytes(priKeyBytes) {
    return hexStr2byteArray(byteArray2hexStr(priKeyBytes).padStart(64, '0'));
}

export function getBase58CheckAddress(addressBytes) {
    const hash0 = SHA256(addressBytes);
    const hash1 = SHA256(hash0);

    let checkSum = hash1.slice(0, 4);
    checkSum = addressBytes.concat(checkSum);

    return encode58(checkSum);
}

export function decodeBase58Address(base58Sting) {
    if (typeof (base58Sting) != 'string')
        return false;

    if (base58Sting.length <= 4)
        return false;

    let address = decode58(base58Sting);

    if (base58Sting.length <= 4)
        return false;

    const len = address.length;
    const offset = len - 4;
    const checkSum = address.slice(offset);

    address = address.slice(0, offset);

    const hash0 = SHA256(address);
    const hash1 = SHA256(hash0);
    const checkSum1 = hash1.slice(0, 4);

    if (checkSum[0] == checkSum1[0] && checkSum[1] == checkSum1[1] && checkSum[2] ==
        checkSum1[2] && checkSum[3] == checkSum1[3]
    ) {
        return address;
    }

    throw new Error('Invalid address provided');
}

export function signTransaction(priKeyBytes, transaction) {
    if (typeof priKeyBytes === 'string')
        priKeyBytes = hexStr2byteArray(priKeyBytes);

    const txID = transaction.txID;
    const signature = ECKeySign(hexStr2byteArray(txID), priKeyBytes);

    if (Array.isArray(transaction.signature)) {
        if (!transaction.signature.includes(signature))
            transaction.signature.push(signature);
    } else
        transaction.signature = [signature];
    return transaction;
}

export function arrayToBase64String(a) {
    return btoa(String.fromCharCode(...a));
}

export function signBytes(privateKey, contents) {
    if (typeof privateKey === 'string')
        privateKey = hexStr2byteArray(privateKey);

    const hashBytes = SHA256(contents);
    const signBytes = ECKeySign(hashBytes, privateKey);

    return signBytes;
}

export function _signTypedData(domain, types, value, privateKey) {
    const key = `0x${privateKey.replace(/^0x/, '')}`;
    const signingKey = new SigningKey(key);

    const messageDigest = TypedDataEncoder.hash(domain, types, value);
    const signature = signingKey.sign(messageDigest);
    const signatureHex = [
        '0x',
        signature.r.substring(2),
        signature.s.substring(2),
        Number(signature.v).toString(16),
    ].join('');
    return signatureHex;
}

export function getRowBytesFromTransactionBase64(base64Data) {
    const bytesDecode = base64DecodeFromString(base64Data);
    const transaction = proto.protocol.Transaction.deserializeBinary(bytesDecode);
    const raw = transaction.getRawData();

    return raw.serializeBinary();
}

export function genPriKey() {
    const priKey = secp.utils.randomPrivateKey();
    let priKeyHex = byteArray2hexStr(priKey);

    priKeyHex = priKeyHex.padStart(64, '0');

    return hexStr2byteArray(priKeyHex);
}

export function computeAddress(pubBytes) {
    if (pubBytes.length === 65)
        pubBytes = pubBytes.slice(1);

    const hash = keccak256(new Uint8Array(pubBytes)).toString().substring(2);
    const addressHex = ADDRESS_PREFIX + hash.substring(24);

    return hexStr2byteArray(addressHex);
}

export function getAddressFromPriKey(priKeyBytes) {
    let pubBytes = getPubKeyFromPriKey(priKeyBytes);
    return computeAddress(pubBytes);
}

export function decode58Check(addressStr) {
    const decodeCheck = decode58(addressStr);

    if (decodeCheck.length <= 4)
        return false;

    const decodeData = decodeCheck.slice(0, decodeCheck.length - 4);
    const hash0 = SHA256(decodeData);
    const hash1 = SHA256(hash0);

    if (hash1[0] === decodeCheck[decodeData.length] &&
        hash1[1] === decodeCheck[decodeData.length + 1] &&
        hash1[2] === decodeCheck[decodeData.length + 2] &&
        hash1[3] === decodeCheck[decodeData.length + 3]) {
        return decodeData;
    }

    return false;
}

export function isAddressValid(base58Str) {
    if (typeof (base58Str) !== 'string')
        return false;

    if (base58Str.length !== ADDRESS_SIZE)
        return false;

    let address = decode58(base58Str);

    if (address.length !== 25)
        return false;

    if (address[0] !== ADDRESS_PREFIX_BYTE)
        return false;

    const checkSum = address.slice(21);
    address = address.slice(0, 21);

    const hash0 = SHA256(address);
    const hash1 = SHA256(hash0);
    const checkSum1 = hash1.slice(0, 4);

    if (checkSum[0] == checkSum1[0] && checkSum[1] == checkSum1[1] && checkSum[2] ==
        checkSum1[2] && checkSum[3] == checkSum1[3]
    ) {
        return true
    }

    return false;
}

export function getBase58CheckAddressFromPriKeyBase64String(priKeyBase64String) {
    const priKeyBytes = base64DecodeFromString(priKeyBase64String);
    const pubBytes = getPubKeyFromPriKey(priKeyBytes);
    const addressBytes = computeAddress(pubBytes);

    return getBase58CheckAddress(addressBytes);
}

export function getHexStrAddressFromPriKeyBase64String(priKeyBase64String) {
    const priKeyBytes = base64DecodeFromString(priKeyBase64String);
    const pubBytes = getPubKeyFromPriKey(priKeyBytes);
    const addressBytes = computeAddress(pubBytes);
    const addressHex = byteArray2hexStr(addressBytes);

    return addressHex;
}

export function getAddressFromPriKeyBase64String(priKeyBase64String) {
    const priKeyBytes = base64DecodeFromString(priKeyBase64String);
    const pubBytes = getPubKeyFromPriKey(priKeyBytes);
    const addressBytes = computeAddress(pubBytes);
    const addressBase64 = base64EncodeToString(addressBytes);

    return addressBase64;
}

export function getPubKeyFromPriKey(priKeyBytes) {
    const pubkey = secp.ProjectivePoint.fromPrivateKey(new Uint8Array(normalizePrivateKeyBytes(priKeyBytes)));
    const x = pubkey.x;
    const y = pubkey.y;

    let xHex = x.toString(16).padStart(64, '0');
    let yHex = y.toString(16).padStart(64, '0');

    const pubkeyHex = `04${xHex}${yHex}`;
    const pubkeyBytes = hexStr2byteArray(pubkeyHex);

    return pubkeyBytes;
}

export function ECKeySign(hashBytes, priKeyBytes) {
    const signature = secp.sign(byteArray2hexStr(hashBytes), byteArray2hexStr(priKeyBytes))

    const r = signature.r.toString(16);
    const s = signature.s.toString(16);
    const v = signature.recovery + 27;

    return r.padStart(64, '0') + s.padStart(64, '0') + byte2hexStr(v);
}

export function SHA256(msgBytes) {
    const msgHex = byteArray2hexStr(msgBytes);
    const hashHex = sha256('0x' + msgHex).replace(/^0x/, '')
    return hexStr2byteArray(hashHex);
}

export function passwordToAddress(password) {
    const com_priKeyBytes = base64DecodeFromString(password);
    const com_addressBytes = getAddressFromPriKey(com_priKeyBytes);

    return getBase58CheckAddress(com_addressBytes);
}

export function pkToAddress(privateKey, strict = false) {
    const com_priKeyBytes = hexStr2byteArray(privateKey, strict);
    const com_addressBytes = getAddressFromPriKey(com_priKeyBytes);

    return getBase58CheckAddress(com_addressBytes);
}
