const {Base64} = require("./base64");


/* Convert a byte to string */
function byte2hexStr(byte) {
  var hexByteMap = "0123456789ABCDEF";
  var str = "";
  str += hexByteMap.charAt(byte >> 4);
  str += hexByteMap.charAt(byte & 0x0f);
  return str;
}

/**
 * Converts a byte array to string
 *
 * @param {Uint8Array} arr byte array
 * @returns {string}
 */
function bytesToString(arr) {
  if (typeof arr === 'string') {
    return arr;
  }
  let str = '',
    _arr = arr;
  for (let i = 0; i < _arr.length; i++) {
    let one = _arr[i].toString(2), v = one.match(/^1+?(?=0)/);
    if (v && one.length === 8) {
      let bytesLength = v[0].length;
      let store = _arr[i].toString(2).slice(7 - bytesLength);
      for (let st = 1; st < bytesLength; st++) {
        store += _arr[st + i].toString(2).slice(2);
      }
      str += String.fromCharCode(parseInt(store, 2));
      i += bytesLength - 1;
    } else {
      str += String.fromCharCode(_arr[i]);
    }
  }
  return str;
}

/**
 * Converts a hex string to a decoded string
 *
 * @param {string} hex
 * @returns {string}
 */
function hextoString(hex) {
  let arr = hex.split("");
  let out = "";
  for (let i = 0; i < arr.length / 2; i++) {
    let tmp = "0x" + arr[i * 2] + arr[i * 2 + 1];
    out += String.fromCharCode(tmp);
  }
  return out;
}

function base64DecodeFromString(string64) {
  return new Base64().decodeToByteArray(string64);
}


function byteArray2hexStr(byteArray) {
  let str = "";
  for (let i = 0; i < (byteArray.length); i++) {
    str += byte2hexStr(byteArray[i]);
  }
  return str;
}


module.exports = {
  byteArray2hexStr,
  hextoString,
  base64DecodeFromString,
  bytesToString,
  byte2hexStr
};
