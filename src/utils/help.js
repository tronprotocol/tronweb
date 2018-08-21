import { hexStr2byteArray } from '../lib/code'
import { getBase58CheckAddress,decodeBase58Address,byteArray2hexStr } from './crypto'

function hexStringToBase58(sHexString){
    if (sHexString.length < 2 || (sHexString.length & 1) != 0) {
        alert("addressHex error!");
        return;
    }
    var bytes = hexStr2byteArray(sHexString);
    return getBase58CheckAddress(bytes);
}
function base58ToHexString(sBase58) {
    var bytes = decodeBase58Address(sBase58);
    return byteArray2hexStr(bytes);
}
function hexStringToUtf8(hex) {
    var arr = hex.split("")
    var out = ""
    for (var i = 0; i < arr.length / 2; i++) {
        var tmp = "0x" + arr[i * 2] + arr[i * 2 + 1]
        var charValue = String.fromCharCode(tmp);
        out += charValue
    }
    return out
}
function stringUtf8tHex(str) {
    var val = "";
    for (var i = 0; i < str.length; i++) {
        if (val == "")
            val = str.charCodeAt(i).toString(16);
        else
            val += str.charCodeAt(i).toString(16);
    }
    return val
}

export function address2HexString(sHexAddress){
    if(sHexAddress.length==42&&sHexAddress.indexOf('41')==0){
        return sHexAddress;
    }
    return base58ToHexString(sHexAddress)
}
export function hexString2Address(sAddress){
    return hexStringToBase58(sAddress)
}
export function hexString2Utf8(sHexString){
    return hexStringToUtf8(sHexString)
}
export function stringUtf8toHex(sUtf8){
    return stringUtf8tHex(sUtf8)
}
