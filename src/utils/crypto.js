const {ADDRESS_PREFIX, ADDRESS_PREFIX_BYTE} = require("./address");
const base64EncodeToString = require("../lib/code").base64EncodeToString;
const {base64DecodeFromString, hexStr2byteArray} = require("../lib/code");
const {encode58, decode58} = require("../lib/base58");
const EC = require('elliptic').ec;
const { keccak256 } = require('js-sha3');
const jsSHA = require("../lib/sha256");
const ADDRESS_SIZE = require("./address").ADDRESS_SIZE;
const { byte2hexStr, byteArray2hexStr } = require("./bytes");


//return address by Base58Check String,
function getBase58CheckAddress(addressBytes) {
  var hash0 = SHA256(addressBytes);
  var hash1 = SHA256(hash0);
  var checkSum = hash1.slice(0, 4);
  checkSum = addressBytes.concat(checkSum);
  return encode58(checkSum);
}

function decodeBase58Address(base58Sting) {
    var zeroAddress = hexStr2byteArray(
        "000000000000000000000000000000000000000000");
    if (typeof (base58Sting) != 'string') {
        console.error("Input format error!");
        return;
    }
    if (base58Sting.length <= 4) {
        console.error("Input length error!");
        return;
    }
    var address = decode58(base58Sting);
    if (base58Sting.length <= 4) {
        console.error("Decode58 output length error!");
        return;
    }
    var len = address.length;
    var offset = len - 4;
    var checkSum = address.slice(offset);
    address = address.slice(0, offset);
    var hash0 = SHA256(address);
    var hash1 = SHA256(hash0);
    var checkSum1 = hash1.slice(0, 4);
    if (checkSum[0] == checkSum1[0] && checkSum[1] == checkSum1[1] && checkSum[2]
        == checkSum1[2] && checkSum[3] == checkSum1[3]
    ) {
        return address;
    }
    console.error("Check sum error!");
    return zeroAddress;
}
/**
 * Sign A Transaction by priKey.
 * signature is 65 bytes, r[32] || s[32] || id[1](<27)
 * @returns  a Transaction object signed
 * @param priKeyBytes: privateKey for ECC
 * @param transaction: a Transaction object unSigned
 */
/*function signTransaction(priKeyBytes, transaction) {

    if (typeof priKeyBytes === 'string') {
        priKeyBytes = hexStr2byteArray(priKeyBytes);
    }
    let raw = transaction.getRawData();
    let rawBytes = raw.serializeBinary();
    let hashBytes = SHA256(rawBytes);
    let signBytes = ECKeySign(hashBytes, priKeyBytes);
    let uint8Array = new Uint8Array(signBytes);
    let count = raw.getContractList().length;
    for (let i = 0; i < count; i++) {
        transaction.addSignature(uint8Array);
    }

    return {
        transaction,
        hex: byteArray2hexStr(transaction.serializeBinary()),
    };
}*/
function signTransaction(priKeyBytes, transaction) {

    if (typeof priKeyBytes === 'string') {
        priKeyBytes = hexStr2byteArray(priKeyBytes);
    }
    let txID = transaction.txID;
    let signature = ECKeySign(hexStr2byteArray(txID),priKeyBytes);

    transaction.signature=[signature];
    return transaction;
}


function arrayToBase64String(a) {
    return btoa(String.fromCharCode(...a));
}

function signBytes(privateKey, contents) {

    if (typeof privateKey === 'string') {
        privateKey = hexStr2byteArray(privateKey);
    }

    let hashBytes = SHA256(contents);
    let signBytes = ECKeySign(hashBytes, privateKey);

    return signBytes;
}

//return bytes of rowdata, use to sign.
function getRowBytesFromTransactionBase64(base64Data) {
    let bytesDecode = base64DecodeFromString(base64Data);
    let transaction = proto.protocol.Transaction.deserializeBinary(bytesDecode);
    let raw = transaction.getRawData();
    return raw.serializeBinary();
}

//gen Ecc priKey for bytes
function genPriKey() {
    let ec = new EC('secp256k1');
    let key = ec.genKeyPair();
    let priKey = key.getPrivate();
    let priKeyHex = priKey.toString('hex');
    while (priKeyHex.length < 64) {
        priKeyHex = "0" + priKeyHex;
    }

    return hexStr2byteArray(priKeyHex);
}

//return address by bytes, pubBytes is byte[]
function computeAddress(pubBytes) {
    if (pubBytes.length === 65) {
        pubBytes = pubBytes.slice(1);
    }

    var hash = keccak256(pubBytes).toString();
    var addressHex = hash.substring(24);
    addressHex = ADDRESS_PREFIX + addressHex;
    return hexStr2byteArray(addressHex);
}

//return address by bytes, priKeyBytes is byte[]
function getAddressFromPriKey(priKeyBytes) {
    let pubBytes = getPubKeyFromPriKey(priKeyBytes);
    return computeAddress(pubBytes);
}

//return address by Base58Check String,
function getBase58CheckAddress(addressBytes) {
    var hash0 = SHA256(addressBytes);
    var hash1 = SHA256(hash0);
    var checkSum = hash1.slice(0, 4);
    checkSum = addressBytes.concat(checkSum);
    return encode58(checkSum);
}

function decode58Check(addressStr) {

    var decodeCheck = decode58(addressStr);
    if (decodeCheck.length <= 4) {
        console.error("ERROR CHECK");
        return null;
    }

    var decodeData = decodeCheck.slice(0, decodeCheck.length - 4);
    var hash0 = SHA256(decodeData);
    var hash1 = SHA256(hash0);

    if (hash1[0] === decodeCheck[decodeData.length] &&
        hash1[1] === decodeCheck[decodeData.length + 1] &&
        hash1[2] === decodeCheck[decodeData.length + 2] &&
        hash1[3] === decodeCheck[decodeData.length + 3]) {
        return decodeData;
    }

    return null;
}

function isAddressValid(base58Str) {
    if (typeof(base58Str) !== 'string') {
        return false;
    }
    if (base58Str.length !== ADDRESS_SIZE) {
        return false;
    }
    var address = decode58(base58Str);

    if (address.length !== 25) {
        return false;
    }
    if (address[0] !== ADDRESS_PREFIX_BYTE) {
        return false;
    }
    var checkSum = address.slice(21);
    address = address.slice(0, 21);
    var hash0 = SHA256(address);
    var hash1 = SHA256(hash0);
    var checkSum1 = hash1.slice(0, 4);
    if (checkSum[0] == checkSum1[0] && checkSum[1] == checkSum1[1] && checkSum[2]
        == checkSum1[2] && checkSum[3] == checkSum1[3]
    ) {
        return true
    }
    return false;
}

//return address by Base58Check String, priKeyBytes is base64String
function getBase58CheckAddressFromPriKeyBase64String(priKeyBase64String) {
    var priKeyBytes = base64DecodeFromString(priKeyBase64String);
    var pubBytes = getPubKeyFromPriKey(priKeyBytes);
    var addressBytes = computeAddress(pubBytes);
    return getBase58CheckAddress(addressBytes);
}

//return address by String, priKeyBytes is base64String
function getHexStrAddressFromPriKeyBase64String(priKeyBase64String) {
    let priKeyBytes = base64DecodeFromString(priKeyBase64String);
    let pubBytes = getPubKeyFromPriKey(priKeyBytes);
    let addressBytes = computeAddress(pubBytes);
    let addressHex = byteArray2hexStr(addressBytes);
    return addressHex;
}
//return address by String, priKeyBytes is base64String
function getAddressFromPriKeyBase64String(priKeyBase64String) {
    let priKeyBytes = base64DecodeFromString(priKeyBase64String);
    let pubBytes = getPubKeyFromPriKey(priKeyBytes);
    let addressBytes = computeAddress(pubBytes);
    let addressBase64 = base64EncodeToString(addressBytes);
    return addressBase64;
}

//return pubkey by 65 bytes, priKeyBytes is byte[]
function getPubKeyFromPriKey(priKeyBytes) {
    var ec = new EC('secp256k1');
    var key = ec.keyFromPrivate(priKeyBytes, 'bytes');
    var pubkey = key.getPublic();
    var x = pubkey.x;
    var y = pubkey.y;
    var xHex = x.toString('hex');
    while (xHex.length < 64) {
        xHex = "0" + xHex;
    }
    var yHex = y.toString('hex');
    while (yHex.length < 64) {
        yHex = "0" + yHex;
    }
    var pubkeyHex = "04" + xHex + yHex;
    var pubkeyBytes = hexStr2byteArray(pubkeyHex);
    return pubkeyBytes;
}

//return sign by 65 bytes r s id. id < 27
function ECKeySign(hashBytes, priKeyBytes) {
    let ec = new EC('secp256k1');
    let key = ec.keyFromPrivate(priKeyBytes, 'bytes');
    let signature = key.sign(hashBytes);
    let r = signature.r;
    let s = signature.s;
    let id = signature.recoveryParam;

    let rHex = r.toString('hex');
    while (rHex.length < 64) {
        rHex = "0" + rHex;
    }
    let sHex = s.toString('hex');
    while (sHex.length < 64) {
        sHex = "0" + sHex;
    }
    let idHex = byte2hexStr(id);
    let signHex = rHex + sHex + idHex;
    return signHex;
    //return hexStr2byteArray(signHex);
}

//return 32 bytes
function SHA256(msgBytes) {
    let shaObj = new jsSHA("SHA-256", "HEX");
    let msgHex = byteArray2hexStr(msgBytes);
    shaObj.update(msgHex);
    let hashHex = shaObj.getHash("HEX");
    return hexStr2byteArray(hashHex);
}

function passwordToAddress(password) {
    let com_priKeyBytes = base64DecodeFromString(password);
    let com_addressBytes = getAddressFromPriKey(com_priKeyBytes);
    return getBase58CheckAddress(com_addressBytes);
}

function pkToAddress(privateKey) {
    let com_priKeyBytes = hexStr2byteArray(privateKey);
    let com_addressBytes = getAddressFromPriKey(com_priKeyBytes);
    return getBase58CheckAddress(com_addressBytes);
}





module.exports = {
    decodeBase58Address,
    byteArray2hexStr,
    signTransaction,
    passwordToAddress,
    genPriKey,
    getAddressFromPriKey,
    getPubKeyFromPriKey,
    getBase58CheckAddress,
    isAddressValid,
    getBase58CheckAddressFromPriKeyBase64String,
    pkToAddress,
    decode58Check,
    signBytes,
};
