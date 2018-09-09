module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TronWeb; });
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lib_providers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lib/providers */ "./src/lib/providers/index.js");
/* harmony import */ var utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! utils */ "./src/utils/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! bignumber.js */ "bignumber.js");
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var lib_transactionBuilder__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lib/transactionBuilder */ "./src/lib/transactionBuilder.js");
/* harmony import */ var lib_trx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lib/trx */ "./src/lib/trx.js");
/* harmony import */ var lib_witness__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lib/witness */ "./src/lib/witness.js");


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








class TronWeb {
  constructor(fullNode, solidityNode, eventServer = false) {
    this.setFullNode(fullNode);
    this.setSolidityNode(solidityNode);
    this.setEventServer(eventServer);
    this.providers = lib_providers__WEBPACK_IMPORTED_MODULE_1__["default"];
    this.BigNumber = bignumber_js__WEBPACK_IMPORTED_MODULE_4___default.a;
    this.transactionBuilder = new lib_transactionBuilder__WEBPACK_IMPORTED_MODULE_5__["default"](this);
    this.trx = new lib_trx__WEBPACK_IMPORTED_MODULE_6__["default"](this);
    this.witness = new lib_witness__WEBPACK_IMPORTED_MODULE_7__["default"](this);
    this.injectPromise = utils__WEBPACK_IMPORTED_MODULE_2__["default"].promiseInjector(this);
  }

  isValidProvider(provider) {
    return Object.values(lib_providers__WEBPACK_IMPORTED_MODULE_1__["default"]).some(knownProvider => provider instanceof knownProvider);
  }

  isEventServerConnected() {
    if (!this.eventServer) return false;
    return axios__WEBPACK_IMPORTED_MODULE_3___default.a.get(this.eventServer).then(({
      data
    }) => {
      return utils__WEBPACK_IMPORTED_MODULE_2__["default"].hasProperty(data, '_links');
    }).catch(() => false);
  }

  setFullNode(fullNode) {
    if (!this.isValidProvider(fullNode)) throw new Error('Invalid full node provided');
    this.fullNode = fullNode;
    this.fullNode.setStatusPage('wallet/getnowblock');
  }

  setSolidityNode(solidityNode) {
    if (!this.isValidProvider(solidityNode)) throw new Error('Invalid solidity node provided');
    this.solidityNode = solidityNode;
    this.solidityNode.setStatusPage('walletsolidity/getnowblock');
  }

  setEventServer(eventServer = false) {
    if (eventServer !== false && !utils__WEBPACK_IMPORTED_MODULE_2__["default"].isValidURL(eventServer)) throw new Error('Invalid URL provided for event server');
    this.eventServer = eventServer;
  }

  currentProviders() {
    return {
      fullNode: this.fullNode,
      solidityNode: this.solidityNode,
      eventServer: this.eventServer
    };
  }

  currentProvider() {
    return this.currentProviders();
  } // TODO


  sha3(string, options = {}) {// encoding: hex if string is hex
  }

  toHex(val) {
    if (utils__WEBPACK_IMPORTED_MODULE_2__["default"].isBoolean(val)) return this.fromDecimal(+val);
    if (utils__WEBPACK_IMPORTED_MODULE_2__["default"].isBigNumber(val)) return this.fromDecimal(val);
    if (typeof val === 'object') return this.fromUtf8(JSON.stringify(val));

    if (utils__WEBPACK_IMPORTED_MODULE_2__["default"].isString(val)) {
      if (val.indexOf('-0x') === 0) return this.fromDecimal(val);
      if (val.indexOf('0x') === 0) return val;
      if (!isFinite(val)) return this.fromUtf8(val);
    }

    return this.fromDecimal(val);
  }

  toUtf8(hex) {
    return Buffer.from(hex, 'hex').toString('utf8');
  }

  fromUtf8(string) {
    return Buffer.from(string, 'utf8').toString('hex');
  }

  toAscii(hex) {
    return Buffer.from(hex, 'hex').toString('ascii');
  }

  fromAscii(string, padding) {
    return Buffer.from(string, 'ascii').toString('hex').padEnd(padding, '0');
  }

  toDecimal(value) {
    return this.toBigNumber(value).toNumber();
  }

  fromDecimal(value) {
    const number = this.toBigNumber(value);
    const result = number.toString(16);
    return number.lessThan(0) ? '-0x' + result.substr(1) : '0x' + result;
  }

  fromSun(sun) {
    const trx = this.toBigNumber(trx).div(1000000);
    return utils__WEBPACK_IMPORTED_MODULE_2__["default"].isBigNumber(sun) ? trx : trx.toString(10);
  }

  toSun(trx) {
    const sun = this.toBigNumber(trx).times(1000000);
    return utils__WEBPACK_IMPORTED_MODULE_2__["default"].isBigNumber(trx) ? sun : sun.toString(10);
  }

  toBigNumber(amount = 0) {
    if (utils__WEBPACK_IMPORTED_MODULE_2__["default"].isBigNumber(amount)) return amount;
    if (utils__WEBPACK_IMPORTED_MODULE_2__["default"].isString(amount) && (amount.indexOf('0x') === 0 || amount.indexOf('-0x') === 0)) return new bignumber_js__WEBPACK_IMPORTED_MODULE_4___default.a(amount.replace('0x', ''), 16);
    return new bignumber_js__WEBPACK_IMPORTED_MODULE_4___default.a(amount.toString(10), 10);
  } // TODO


  isAddress(hex) {} // TODO


  compile(solditySource) {} // TODO


  getEventResult(contractAddress, eventName, blockNumber, callback = false) {
    if (!callback) return this.injectPromise(this.getEventResult, contractAddress, eventName, blockNumber);
  } // TODO


  getEventByTransacionID(transactionID, callback = false) {
    if (!callback) return this.injectPromise(this.getEventByTransacionID, transactionID);
  } // TODO


  createAccount(callback = false) {
    if (!callback) return this.injectPromise(this.createAccount);
    callback(null, utils__WEBPACK_IMPORTED_MODULE_2__["default"].accounts.generateAccount());
  }

  async isConnected(callback = false) {
    if (!callback) return this.injectPromise(this.isConnected);
    callback(null, {
      fullNode: await this.fullNode.isConnected(),
      solidityNode: await this.solidityNode.isConnected(),
      eventServer: await this.isEventServerConnected()
    });
  }

}

_defineProperty(TronWeb, "providers", lib_providers__WEBPACK_IMPORTED_MODULE_1__["default"]);

_defineProperty(TronWeb, "BigNumber", bignumber_js__WEBPACK_IMPORTED_MODULE_4___default.a);

;

/***/ }),

/***/ "./src/lib/providers/HttpProvider.js":
/*!*******************************************!*\
  !*** ./src/lib/providers/HttpProvider.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HttpProvider; });
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! utils */ "./src/utils/index.js");



class HttpProvider {
  constructor(host, timeout = 30000, user = false, password = false, headers = {}, statusPage = '/') {
    if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].isValidURL(host)) throw new Error('Invalid URL provided to HttpProvider');
    if (isNaN(timeout) || timeout < 0) throw new Error('Invalid timeout duration provided');
    if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].isObject(headers)) throw new Error('Invalid headers object provided');
    if (host.charAt(host.length - 1) === '/') host = host.substr(0, host.length - 2);
    this.host = host;
    this.timeout = timeout;
    this.user = user;
    this.password = password;
    this.headers = headers;
    this.statusPage = statusPage;
    this.instance = axios__WEBPACK_IMPORTED_MODULE_1___default.a.create({
      baseURL: host,
      timeout: timeout,
      headers: headers,
      auth: {
        user,
        password
      }
    });
  }

  setStatusPage(statusPage = '/') {
    this.statusPage = statusPage;
  }

  async isConnected(statusPage = this.statusPage) {
    return this.request(statusPage).then(data => {
      return utils__WEBPACK_IMPORTED_MODULE_2__["default"].hasProperties(data, 'blockID', 'block_header');
    }).catch(() => false);
  }

  request(url, payload = {}, method = 'get') {
    method = method.toLowerCase();
    return this.instance.request({
      data: method == 'post' && payload,
      params: method == 'get' && payload,
      url,
      method
    }).then(({
      data
    }) => data);
  }

}
;

/***/ }),

/***/ "./src/lib/providers/index.js":
/*!************************************!*\
  !*** ./src/lib/providers/index.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _HttpProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HttpProvider */ "./src/lib/providers/HttpProvider.js");


/* harmony default export */ __webpack_exports__["default"] = ({
  HttpProvider: _HttpProvider__WEBPACK_IMPORTED_MODULE_1__["default"]
});

/***/ }),

/***/ "./src/lib/transactionBuilder.js":
/*!***************************************!*\
  !*** ./src/lib/transactionBuilder.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TransactionBuilder; });
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);

class TransactionBuilder {}

/***/ }),

/***/ "./src/lib/trx.js":
/*!************************!*\
  !*** ./src/lib/trx.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Trx; });
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);

class Trx {}

/***/ }),

/***/ "./src/lib/witness.js":
/*!****************************!*\
  !*** ./src/lib/witness.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Witness; });
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);

class Witness {}

/***/ }),

/***/ "./src/utils/accounts.js":
/*!*******************************!*\
  !*** ./src/utils/accounts.js ***!
  \*******************************/
/*! exports provided: generateAccount */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateAccount", function() { return generateAccount; });
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _bytes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bytes */ "./src/utils/bytes.js");
/* harmony import */ var _code__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./code */ "./src/utils/code.js");
/* harmony import */ var _crypto__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./crypto */ "./src/utils/crypto.js");




function generateAccount() {
  let priKeyBytes = Object(_crypto__WEBPACK_IMPORTED_MODULE_3__["genPriKey"])();
  let addressBytes = Object(_crypto__WEBPACK_IMPORTED_MODULE_3__["getAddressFromPriKey"])(priKeyBytes);
  let address = Object(_crypto__WEBPACK_IMPORTED_MODULE_3__["getBase58CheckAddress"])(addressBytes);
  let password = Object(_code__WEBPACK_IMPORTED_MODULE_2__["base64EncodeToString"])(priKeyBytes);
  let privateKey = Object(_bytes__WEBPACK_IMPORTED_MODULE_1__["byteArray2hexStr"])(priKeyBytes);
  return {
    privateKey,
    address
  };
}

/***/ }),

/***/ "./src/utils/address.js":
/*!******************************!*\
  !*** ./src/utils/address.js ***!
  \******************************/
/*! exports provided: ADDRESS_SIZE, ADDRESS_PREFIX, ADDRESS_PREFIX_BYTE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADDRESS_SIZE", function() { return ADDRESS_SIZE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADDRESS_PREFIX", function() { return ADDRESS_PREFIX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADDRESS_PREFIX_BYTE", function() { return ADDRESS_PREFIX_BYTE; });
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);

const isTestNet = process.env.NET === 'testnet';
const ADDRESS_SIZE = isTestNet ? 35 : 34;
const ADDRESS_PREFIX = isTestNet ? "a0" : "41";
const ADDRESS_PREFIX_BYTE = isTestNet ? 0xa0 : 0x41;

/***/ }),

/***/ "./src/utils/base58.js":
/*!*****************************!*\
  !*** ./src/utils/base58.js ***!
  \*****************************/
/*! exports provided: encode58, decode58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encode58", function() { return encode58; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decode58", function() { return decode58; });
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);

const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const ALPHABET_MAP = {};

for (let i = 0; i < ALPHABET.length; i++) ALPHABET_MAP[ALPHABET.charAt(i)] = i;

const BASE = 58;
function encode58(buffer) {
  if (buffer.length === 0) return '';
  let i;
  let j;
  const digits = [0];

  for (i = 0; i < buffer.length; i++) {
    for (j = 0; j < digits.length; j++) digits[j] <<= 8;

    digits[0] += buffer[i];
    let carry = 0;

    for (j = 0; j < digits.length; ++j) {
      digits[j] += carry;
      carry = digits[j] / BASE | 0;
      digits[j] %= BASE;
    }

    while (carry) {
      digits.push(carry % BASE);
      carry = carry / BASE | 0;
    }
  }

  for (i = 0; buffer[i] === 0 && i < buffer.length - 1; i++) digits.push(0);

  return digits.reverse().map(digit => ALPHABET[digit]).join('');
}
function decode58(string) {
  if (string.length === 0) return [];
  let i;
  let j;
  const bytes = [0];

  for (i = 0; i < string.length; i++) {
    const c = string[i];
    if (!(c in ALPHABET_MAP)) throw new Error('Non-base58 character');

    for (j = 0; j < bytes.length; j++) bytes[j] *= BASE;

    bytes[0] += ALPHABET_MAP[c];
    let carry = 0;

    for (j = 0; j < bytes.length; ++j) {
      bytes[j] += carry;
      carry = bytes[j] >> 8;
      bytes[j] &= 0xff;
    }

    while (carry) {
      bytes.push(carry & 0xff);
      carry >>= 8;
    }
  }

  for (i = 0; string[i] === '1' && i < string.length - 1; i++) bytes.push(0);

  return bytes.reverse();
}

/***/ }),

/***/ "./src/utils/base64.js":
/*!*****************************!*\
  !*** ./src/utils/base64.js ***!
  \*****************************/
/*! exports provided: Base64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Base64", function() { return Base64; });
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);

function Base64() {
  this._keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

  this.encode = input => {
    let output = "";
    let chr1;
    let chr2;
    let chr3;
    let enc1;
    let enc2;
    let enc3;
    let enc4;
    let i = 0;

    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      enc1 = chr1 >> 2;
      enc2 = (chr1 & 3) << 4 | chr2 >> 4;
      enc3 = (chr2 & 15) << 2 | chr3 >> 6;
      enc4 = chr3 & 63;
      if (isNaN(chr2)) enc3 = enc4 = 64;else if (isNaN(chr3)) enc4 = 64;
      output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
    }

    return output;
  };

  this.encodeIgnoreUtf8 = inputBytes => {
    let output = "";
    let chr1;
    let chr2;
    let chr3;
    let enc1;
    let enc2;
    let enc3;
    let enc4;
    let i = 0;

    while (i < inputBytes.length) {
      chr1 = inputBytes[i++];
      chr2 = inputBytes[i++];
      chr3 = inputBytes[i++];
      enc1 = chr1 >> 2;
      enc2 = (chr1 & 3) << 4 | chr2 >> 4;
      enc3 = (chr2 & 15) << 2 | chr3 >> 6;
      enc4 = chr3 & 63;
      if (isNaN(chr2)) enc3 = enc4 = 64;else if (isNaN(chr3)) enc4 = 64;
      output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
    }

    return output;
  };

  this.decode = input => {
    let output = "";
    let chr1;
    let chr2;
    let chr3;
    let enc1;
    let enc2;
    let enc3;
    let enc4;
    let i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    while (i < input.length) {
      enc1 = _keyStr.indexOf(input.charAt(i++));
      enc2 = _keyStr.indexOf(input.charAt(i++));
      enc3 = _keyStr.indexOf(input.charAt(i++));
      enc4 = _keyStr.indexOf(input.charAt(i++));
      chr1 = enc1 << 2 | enc2 >> 4;
      chr2 = (enc2 & 15) << 4 | enc3 >> 2;
      chr3 = (enc3 & 3) << 6 | enc4;
      output = output + String.fromCharCode(chr1);
      if (enc3 != 64) output = output + String.fromCharCode(chr2);
      if (enc4 != 64) output = output + String.fromCharCode(chr3);
    }

    return this._utf8_decode(output);
  };

  this.decodeToByteArray = input => {
    let output = "";
    let chr1;
    let chr2;
    let chr3;
    let enc1;
    let enc2;
    let enc3;
    let enc4;
    let i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    while (i < input.length) {
      enc1 = _keyStr.indexOf(input.charAt(i++));
      enc2 = _keyStr.indexOf(input.charAt(i++));
      enc3 = _keyStr.indexOf(input.charAt(i++));
      enc4 = _keyStr.indexOf(input.charAt(i++));
      chr1 = enc1 << 2 | enc2 >> 4;
      chr2 = (enc2 & 15) << 4 | enc3 >> 2;
      chr3 = (enc3 & 3) << 6 | enc4;
      output = output + String.fromCharCode(chr1);
      if (enc3 != 64) output = output + String.fromCharCode(chr2);
      if (enc4 != 64) output = output + String.fromCharCode(chr3);
    }

    return this._out2ByteArray(output);
  };

  this._out2ByteArray = utftext => {
    const byteArray = new Array(utftext.length);
    let i = 0;
    let c = c1 = c2 = 0;

    while (i < utftext.length) {
      c = utftext.charCodeAt(i);
      byteArray[i] = c;
      i++;
    }

    return byteArray;
  };

  this._utf8_encode = string => {
    string = string.replace(/\r\n/g, "\n");
    let utftext = "";

    for (let n = 0; n < string.length; n++) {
      const c = string.charCodeAt(n);

      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if (c > 127 && c < 2048) {
        utftext += String.fromCharCode(c >> 6 | 192);
        utftext += String.fromCharCode(c & 63 | 128);
      } else {
        utftext += String.fromCharCode(c >> 12 | 224);
        utftext += String.fromCharCode(c >> 6 & 63 | 128);
        utftext += String.fromCharCode(c & 63 | 128);
      }
    }

    return utftext;
  };

  this._utf8_decode = utftext => {
    let string = "";
    let i = 0;
    let c = c1 = c2 = 0;

    while (i < utftext.length) {
      c = utftext.charCodeAt(i);

      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      } else if (c > 191 && c < 224) {
        c2 = utftext.charCodeAt(i + 1);
        string += String.fromCharCode((c & 31) << 6 | c2 & 63);
        i += 2;
      } else {
        c2 = utftext.charCodeAt(i + 1);
        c3 = utftext.charCodeAt(i + 2);
        string += String.fromCharCode((c & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
        i += 3;
      }
    }

    return string;
  };
}

/***/ }),

/***/ "./src/utils/bytes.js":
/*!****************************!*\
  !*** ./src/utils/bytes.js ***!
  \****************************/
/*! exports provided: byte2hexStr, bytesToString, hextoString, base64DecodeFromString, byteArray2hexStr */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "byte2hexStr", function() { return byte2hexStr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bytesToString", function() { return bytesToString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hextoString", function() { return hextoString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "base64DecodeFromString", function() { return base64DecodeFromString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "byteArray2hexStr", function() { return byteArray2hexStr; });
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _base64__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base64 */ "./src/utils/base64.js");


function byte2hexStr(byte) {
  const hexByteMap = '0123456789ABCDEF';
  let str = '';
  str += hexByteMap.charAt(byte >> 4);
  str += hexByteMap.charAt(byte & 0x0f);
  return str;
}
function bytesToString(arr) {
  if (typeof arr === 'string') return arr;
  let str = '';

  for (let i = 0; i < arr.length; i++) {
    const one = arr[i].toString(2);
    const v = one.match(/^1+?(?=0)/);

    if (v && one.length === 8) {
      const bytesLength = v[0].length;
      let store = arr[i].toString(2).slice(7 - bytesLength);

      for (let st = 1; st < bytesLength; st++) store += arr[st + i].toString(2).slice(2);

      str += String.fromCharCode(parseInt(store, 2));
      i += bytesLength - 1;
    } else {
      str += String.fromCharCode(arr[i]);
    }
  }

  return str;
}
function hextoString(hex) {
  const arr = hex.split('');
  let out = '';

  for (let i = 0; i < arr.length / 2; i++) {
    let tmp = `0x${arr[i * 2]}${arr[i * 2 + 1]}`;
    out += String.fromCharCode(tmp);
  }

  return out;
}
function base64DecodeFromString(string64) {
  return new _base64__WEBPACK_IMPORTED_MODULE_1__["Base64"]().decodeToByteArray(string64);
}
function byteArray2hexStr(byteArray) {
  let str = '';

  for (let i = 0; i < byteArray.length; i++) str += byte2hexStr(byteArray[i]);

  return str;
}

/***/ }),

/***/ "./src/utils/code.js":
/*!***************************!*\
  !*** ./src/utils/code.js ***!
  \***************************/
/*! exports provided: bin2String, arrayEquals, stringToBytes, bytesToString, hextoString, hexChar2byte, isHexChar, hexStr2byteArray, byte2hexStr, byteArray2hexStr, base64DecodeFromString, base64EncodeToString, strToDate, isNumber, getStringType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bin2String", function() { return bin2String; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arrayEquals", function() { return arrayEquals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stringToBytes", function() { return stringToBytes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bytesToString", function() { return bytesToString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hextoString", function() { return hextoString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hexChar2byte", function() { return hexChar2byte; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isHexChar", function() { return isHexChar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hexStr2byteArray", function() { return hexStr2byteArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "byte2hexStr", function() { return byte2hexStr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "byteArray2hexStr", function() { return byteArray2hexStr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "base64DecodeFromString", function() { return base64DecodeFromString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "base64EncodeToString", function() { return base64EncodeToString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "strToDate", function() { return strToDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNumber", function() { return isNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStringType", function() { return getStringType; });
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _base64__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base64 */ "./src/utils/base64.js");


function bin2String(array) {
  return String.fromCharCode(...array);
}
function arrayEquals(array1, array2) {
  if (array1.length != array2.length) return false;
  let i;

  for (i = 0; i < array1.length; i++) {
    if (array1[i] != array2[i]) return false;
  }

  return true;
}
function stringToBytes(str) {
  const bytes = new Array();
  let len;
  let c;
  len = str.length;

  for (let i = 0; i < len; i++) {
    c = str.charCodeAt(i);

    if (c >= 0x010000 && c <= 0x10FFFF) {
      bytes.push(c >> 18 & 0x07 | 0xF0);
      bytes.push(c >> 12 & 0x3F | 0x80);
      bytes.push(c >> 6 & 0x3F | 0x80);
      bytes.push(c & 0x3F | 0x80);
    } else if (c >= 0x000800 && c <= 0x00FFFF) {
      bytes.push(c >> 12 & 0x0F | 0xE0);
      bytes.push(c >> 6 & 0x3F | 0x80);
      bytes.push(c & 0x3F | 0x80);
    } else if (c >= 0x000080 && c <= 0x0007FF) {
      bytes.push(c >> 6 & 0x1F | 0xC0);
      bytes.push(c & 0x3F | 0x80);
    } else bytes.push(c & 0xFF);
  }

  return bytes;
}
function bytesToString(arr) {
  if (typeof arr === 'string') return arr;
  let str = '';

  for (let i = 0; i < arr.length; i++) {
    const one = arr[i].toString(2);
    const v = one.match(/^1+?(?=0)/);

    if (v && one.length == 8) {
      const bytesLength = v[0].length;
      let store = arr[i].toString(2).slice(7 - bytesLength);

      for (let st = 1; st < bytesLength; st++) store += arr[st + i].toString(2).slice(2);

      str += String.fromCharCode(parseInt(store, 2));
      i += bytesLength - 1;
    } else str += String.fromCharCode(arr[i]);
  }

  return str;
}
function hextoString(hex) {
  const arr = hex.split("");
  let out = "";

  for (let i = 0; i < arr.length / 2; i++) {
    const tmp = `0x${arr[i * 2]}${arr[i * 2 + 1]}`;
    const charValue = String.fromCharCode(tmp);
    out += charValue;
  }

  return out;
}
function hexChar2byte(c) {
  let d = 0;
  if (c >= 'A' && c <= 'F') d = c.charCodeAt(0) - 'A'.charCodeAt(0) + 10;else if (c >= 'a' && c <= 'f') d = c.charCodeAt(0) - 'a'.charCodeAt(0) + 10;else if (c >= '0' && c <= '9') d = c.charCodeAt(0) - '0'.charCodeAt(0);
  return d;
}
function isHexChar(c) {
  if (c >= 'A' && c <= 'F' || c >= 'a' && c <= 'f' || c >= '0' && c <= '9') {
    return 1;
  }

  return 0;
}
function hexStr2byteArray(str) {
  const byteArray = Array();
  let d = 0;
  let j = 0;
  let k = 0;

  for (let i = 0; i < str.length; i++) {
    const c = str.charAt(i);

    if (isHexChar(c)) {
      d <<= 4;
      d += hexChar2byte(c);
      j++;

      if (0 === j % 2) {
        byteArray[k++] = d;
        d = 0;
      }
    }
  }

  return byteArray;
}
function byte2hexStr(byte) {
  const hexByteMap = "0123456789ABCDEF";
  let str = "";
  str += hexByteMap.charAt(byte >> 4);
  str += hexByteMap.charAt(byte & 0x0f);
  return str;
}
function byteArray2hexStr(byteArray) {
  let str = "";

  for (let i = 0; i < byteArray.length - 1; i++) str += byte2hexStr(byteArray[i]);

  str += byte2hexStr(byteArray[i]);
  return str;
}
function base64DecodeFromString(string64) {
  const b = new _base64__WEBPACK_IMPORTED_MODULE_1__["Base64"]();
  const decodeBytes = b.decodeToByteArray(string64);
  return decodeBytes;
}
function base64EncodeToString(bytes) {
  const b = new _base64__WEBPACK_IMPORTED_MODULE_1__["Base64"]();
  const string64 = b.encodeIgnoreUtf8(bytes);
  return string64;
} //yyyy-MM-DD HH-mm-ss

function strToDate(str) {
  const tempStrs = str.split(" ");
  const dateStrs = tempStrs[0].split("-");
  const year = parseInt(dateStrs[0], 10);
  const month = parseInt(dateStrs[1], 10) - 1;
  const day = parseInt(dateStrs[2], 10);

  if (tempStrs.length > 1) {
    const timeStrs = tempStrs[1].split("-");
    const hour = parseInt(timeStrs[0], 10);
    const minute = parseInt(timeStrs[1], 10) - 1;
    const second = parseInt(timeStrs[2], 10);
    return new Date(year, month, day, hour, minute, second);
  }

  return new Date(year, month, day);
}
function isNumber(c) {
  if (c >= '0' && c <= '9') return 1;
  return 0;
} //return 1: address  --- 20Bytes HexString
//return 2: blockNumber ------ Decimal number
//return 3: assetName ------ String
//return other: error

function getStringType(str) {
  if (null == str) return -1;
  if (typeof str != 'string') return -1;
  if (str.length == 0 || str == "") return -1;
  let i = 0;

  if (str.length == 40) {
    for (; i < 40; i++) {
      var c = str.charAt(i);
      if (!isHexChar(c)) break;
    }
  }

  if (i == 40) return 1; //40 Hex, Address

  for (i = 0; i < str.length; i++) {
    var c = str.charAt(i);
    if (!isNumber(c)) break;
  }

  if (i == str.length) return 2; //Alll Decimal number, BlockNumber

  for (i = 0; i < str.length; i++) {
    var c = str.charAt(i);
    if (c > ' ') return 3; //At least one visible character
  }

  return -1;
}

/***/ }),

/***/ "./src/utils/crypto.js":
/*!*****************************!*\
  !*** ./src/utils/crypto.js ***!
  \*****************************/
/*! exports provided: getBase58CheckAddress, decodeBase58Address, signTransaction, arrayToBase64String, signBytes, getRowBytesFromTransactionBase64, genPriKey, computeAddress, getAddressFromPriKey, decode58Check, isAddressValid, getBase58CheckAddressFromPriKeyBase64String, getHexStrAddressFromPriKeyBase64String, getAddressFromPriKeyBase64String, getPubKeyFromPriKey, ECKeySign, SHA256, passwordToAddress, pkToAddress */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBase58CheckAddress", function() { return getBase58CheckAddress; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decodeBase58Address", function() { return decodeBase58Address; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "signTransaction", function() { return signTransaction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arrayToBase64String", function() { return arrayToBase64String; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "signBytes", function() { return signBytes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRowBytesFromTransactionBase64", function() { return getRowBytesFromTransactionBase64; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "genPriKey", function() { return genPriKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "computeAddress", function() { return computeAddress; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAddressFromPriKey", function() { return getAddressFromPriKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decode58Check", function() { return decode58Check; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isAddressValid", function() { return isAddressValid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBase58CheckAddressFromPriKeyBase64String", function() { return getBase58CheckAddressFromPriKeyBase64String; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getHexStrAddressFromPriKeyBase64String", function() { return getHexStrAddressFromPriKeyBase64String; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAddressFromPriKeyBase64String", function() { return getAddressFromPriKeyBase64String; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPubKeyFromPriKey", function() { return getPubKeyFromPriKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ECKeySign", function() { return ECKeySign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHA256", function() { return SHA256; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "passwordToAddress", function() { return passwordToAddress; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pkToAddress", function() { return pkToAddress; });
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jssha__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jssha */ "jssha");
/* harmony import */ var jssha__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jssha__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _address__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./address */ "./src/utils/address.js");
/* harmony import */ var _code__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./code */ "./src/utils/code.js");
/* harmony import */ var _base58__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./base58 */ "./src/utils/base58.js");
/* harmony import */ var js_sha3__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! js-sha3 */ "js-sha3");
/* harmony import */ var js_sha3__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(js_sha3__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _bytes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./bytes */ "./src/utils/bytes.js");
/* harmony import */ var elliptic__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! elliptic */ "elliptic");
/* harmony import */ var elliptic__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(elliptic__WEBPACK_IMPORTED_MODULE_7__);










function getBase58CheckAddress(addressBytes) {
  const hash0 = SHA256(addressBytes);
  const hash1 = SHA256(hash0);
  let checkSum = hash1.slice(0, 4);
  checkSum = addressBytes.concat(checkSum);
  return Object(_base58__WEBPACK_IMPORTED_MODULE_4__["encode58"])(checkSum);
}
function decodeBase58Address(base58Sting) {
  if (typeof base58Sting != 'string') return false;
  if (base58Sting.length <= 4) return false;
  let address = Object(_base58__WEBPACK_IMPORTED_MODULE_4__["decode58"])(base58Sting);
  if (base58Sting.length <= 4) return false;
  const len = address.length;
  const offset = len - 4;
  const checkSum = address.slice(offset);
  address = address.slice(0, offset);
  const hash0 = SHA256(address);
  const hash1 = SHA256(hash0);
  const checkSum1 = hash1.slice(0, 4);

  if (checkSum[0] == checkSum1[0] && checkSum[1] == checkSum1[1] && checkSum[2] == checkSum1[2] && checkSum[3] == checkSum1[3]) {
    return address;
  }

  return Object(_code__WEBPACK_IMPORTED_MODULE_3__["hexStr2byteArray"])('000000000000000000000000000000000000000000');
}
function signTransaction(priKeyBytes, transaction) {
  if (typeof priKeyBytes === 'string') priKeyBytes = Object(_code__WEBPACK_IMPORTED_MODULE_3__["hexStr2byteArray"])(priKeyBytes);
  const txID = transaction.txID;
  const signature = ECKeySign(Object(_code__WEBPACK_IMPORTED_MODULE_3__["hexStr2byteArray"])(txID), priKeyBytes);
  transaction.signature = [signature];
  return transaction;
}
function arrayToBase64String(a) {
  return btoa(String.fromCharCode(...a));
}
function signBytes(privateKey, contents) {
  if (typeof privateKey === 'string') privateKey = Object(_code__WEBPACK_IMPORTED_MODULE_3__["hexStr2byteArray"])(privateKey);
  const hashBytes = SHA256(contents);
  const signBytes = ECKeySign(hashBytes, privateKey);
  return signBytes;
}
function getRowBytesFromTransactionBase64(base64Data) {
  const bytesDecode = Object(_code__WEBPACK_IMPORTED_MODULE_3__["base64DecodeFromString"])(base64Data);
  const transaction = proto.protocol.Transaction.deserializeBinary(bytesDecode);
  const raw = transaction.getRawData();
  return raw.serializeBinary();
}
function genPriKey() {
  const ec = new elliptic__WEBPACK_IMPORTED_MODULE_7__["ec"]('secp256k1');
  const key = ec.genKeyPair();
  const priKey = key.getPrivate();
  let priKeyHex = priKey.toString('hex');

  while (priKeyHex.length < 64) {
    priKeyHex = `0${priKeyHex}`;
  }

  return Object(_code__WEBPACK_IMPORTED_MODULE_3__["hexStr2byteArray"])(priKeyHex);
}
function computeAddress(pubBytes) {
  if (pubBytes.length === 65) pubBytes = pubBytes.slice(1);
  const hash = Object(js_sha3__WEBPACK_IMPORTED_MODULE_5__["keccak256"])(pubBytes).toString();
  const addressHex = _address__WEBPACK_IMPORTED_MODULE_2__["ADDRESS_PREFIX"] + hash.substring(24);
  return Object(_code__WEBPACK_IMPORTED_MODULE_3__["hexStr2byteArray"])(addressHex);
}
function getAddressFromPriKey(priKeyBytes) {
  let pubBytes = getPubKeyFromPriKey(priKeyBytes);
  return computeAddress(pubBytes);
}
function decode58Check(addressStr) {
  const decodeCheck = Object(_base58__WEBPACK_IMPORTED_MODULE_4__["decode58"])(addressStr);
  if (decodeCheck.length <= 4) return false;
  const decodeData = decodeCheck.slice(0, decodeCheck.length - 4);
  const hash0 = SHA256(decodeData);
  const hash1 = SHA256(hash0);

  if (hash1[0] === decodeCheck[decodeData.length] && hash1[1] === decodeCheck[decodeData.length + 1] && hash1[2] === decodeCheck[decodeData.length + 2] && hash1[3] === decodeCheck[decodeData.length + 3]) {
    return decodeData;
  }

  return false;
}
function isAddressValid(base58Str) {
  if (typeof base58Str !== 'string') return false;
  if (base58Str.length !== _address__WEBPACK_IMPORTED_MODULE_2__["ADDRESS_SIZE"]) return false;
  let address = Object(_base58__WEBPACK_IMPORTED_MODULE_4__["decode58"])(base58Str);
  if (address.length !== 25) return false;
  if (address[0] !== _address__WEBPACK_IMPORTED_MODULE_2__["ADDRESS_PREFIX_BYTE"]) return false;
  const checkSum = address.slice(21);
  address = address.slice(0, 21);
  const hash0 = SHA256(address);
  const hash1 = SHA256(hash0);
  const checkSum1 = hash1.slice(0, 4);

  if (checkSum[0] == checkSum1[0] && checkSum[1] == checkSum1[1] && checkSum[2] == checkSum1[2] && checkSum[3] == checkSum1[3]) {
    return true;
  }

  return false;
}
function getBase58CheckAddressFromPriKeyBase64String(priKeyBase64String) {
  const priKeyBytes = Object(_code__WEBPACK_IMPORTED_MODULE_3__["base64DecodeFromString"])(priKeyBase64String);
  const pubBytes = getPubKeyFromPriKey(priKeyBytes);
  const addressBytes = computeAddress(pubBytes);
  return getBase58CheckAddress(addressBytes);
}
function getHexStrAddressFromPriKeyBase64String(priKeyBase64String) {
  const priKeyBytes = Object(_code__WEBPACK_IMPORTED_MODULE_3__["base64DecodeFromString"])(priKeyBase64String);
  const pubBytes = getPubKeyFromPriKey(priKeyBytes);
  const addressBytes = computeAddress(pubBytes);
  const addressHex = Object(_bytes__WEBPACK_IMPORTED_MODULE_6__["byteArray2hexStr"])(addressBytes);
  return addressHex;
}
function getAddressFromPriKeyBase64String(priKeyBase64String) {
  const priKeyBytes = Object(_code__WEBPACK_IMPORTED_MODULE_3__["base64DecodeFromString"])(priKeyBase64String);
  const pubBytes = getPubKeyFromPriKey(priKeyBytes);
  const addressBytes = computeAddress(pubBytes);
  const addressBase64 = Object(_code__WEBPACK_IMPORTED_MODULE_3__["base64EncodeToString"])(addressBytes);
  return addressBase64;
}
function getPubKeyFromPriKey(priKeyBytes) {
  const ec = new elliptic__WEBPACK_IMPORTED_MODULE_7__["ec"]('secp256k1');
  const key = ec.keyFromPrivate(priKeyBytes, 'bytes');
  const pubkey = key.getPublic();
  const x = pubkey.x;
  const y = pubkey.y;
  let xHex = x.toString('hex');

  while (xHex.length < 64) {
    xHex = `0${xHex}`;
  }

  let yHex = y.toString('hex');

  while (yHex.length < 64) {
    yHex = `0${yHex}`;
  }

  const pubkeyHex = `04${xHex}${yHex}`;
  const pubkeyBytes = Object(_code__WEBPACK_IMPORTED_MODULE_3__["hexStr2byteArray"])(pubkeyHex);
  return pubkeyBytes;
}
function ECKeySign(hashBytes, priKeyBytes) {
  const ec = new elliptic__WEBPACK_IMPORTED_MODULE_7__["ec"]('secp256k1');
  const key = ec.keyFromPrivate(priKeyBytes, 'bytes');
  const signature = key.sign(hashBytes);
  const r = signature.r;
  const s = signature.s;
  const id = signature.recoveryParam;
  let rHex = r.toString('hex');

  while (rHex.length < 64) {
    rHex = `0${rHex}`;
  }

  let sHex = s.toString('hex');

  while (sHex.length < 64) {
    sHex = `0${sHex}`;
  }

  const idHex = Object(_bytes__WEBPACK_IMPORTED_MODULE_6__["byte2hexStr"])(id);
  const signHex = rHex + sHex + idHex;
  return signHex;
}
function SHA256(msgBytes) {
  const shaObj = new jssha__WEBPACK_IMPORTED_MODULE_1___default.a('SHA-256', 'HEX');
  const msgHex = Object(_bytes__WEBPACK_IMPORTED_MODULE_6__["byteArray2hexStr"])(msgBytes);
  shaObj.update(msgHex);
  const hashHex = shaObj.getHash('HEX');
  return Object(_code__WEBPACK_IMPORTED_MODULE_3__["hexStr2byteArray"])(hashHex);
}
function passwordToAddress(password) {
  const com_priKeyBytes = Object(_code__WEBPACK_IMPORTED_MODULE_3__["base64DecodeFromString"])(password);
  const com_addressBytes = getAddressFromPriKey(com_priKeyBytes);
  return getBase58CheckAddress(com_addressBytes);
}
function pkToAddress(privateKey) {
  const com_priKeyBytes = Object(_code__WEBPACK_IMPORTED_MODULE_3__["hexStr2byteArray"])(privateKey);
  const com_addressBytes = getAddressFromPriKey(com_priKeyBytes);
  return getBase58CheckAddress(com_addressBytes);
}

/***/ }),

/***/ "./src/utils/index.js":
/*!****************************!*\
  !*** ./src/utils/index.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _accounts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./accounts */ "./src/utils/accounts.js");
/* harmony import */ var _base58__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./base58 */ "./src/utils/base58.js");
/* harmony import */ var _bytes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bytes */ "./src/utils/bytes.js");
/* harmony import */ var _crypto__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./crypto */ "./src/utils/crypto.js");
/* harmony import */ var validator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! validator */ "validator");
/* harmony import */ var validator__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(validator__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! bignumber.js */ "bignumber.js");
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_6__);







const utils = {
  isValidURL(url) {
    return validator__WEBPACK_IMPORTED_MODULE_5___default.a.isURL(url, {
      protocols: ['http', 'https']
    });
  },

  isObject(obj) {
    return obj === Object(obj) && Object.prototype.toString.call(obj) !== '[object Array]';
  },

  isArray(array) {
    return Array.isArray(array);
  },

  isJson(string) {
    try {
      return !!JSON.parse(string);
    } catch (ex) {
      return false;
    }
  },

  isBoolean(bool) {
    return typeof bool === 'boolean';
  },

  isBigNumber(number) {
    return number && (number instanceof bignumber_js__WEBPACK_IMPORTED_MODULE_6___default.a || number.constructor && number.constructor.name === 'BigNumber');
  },

  isString(string) {
    return typeof string === 'string' || string && string.constructor && string.constructor.name === 'String';
  },

  isFunction(obj) {
    return typeof obj === 'function';
  },

  hasProperty(obj, property) {
    return Object.prototype.hasOwnProperty.call(obj, property);
  },

  hasProperties(obj, ...properties) {
    return properties.length && !properties.map(property => {
      return this.hasProperty(obj, property);
    }).includes(false);
  },

  injectPromise(func, ...args) {
    return new Promise((resolve, reject) => {
      func(...args, (err, res) => {
        if (err) reject(err);else resolve(res);
      });
    });
  },

  promiseInjector(scope) {
    return (func, ...args) => {
      return this.injectPromise(func.bind(scope), ...args);
    };
  }

};
/* harmony default export */ __webpack_exports__["default"] = ({ ...utils,
  accounts: _accounts__WEBPACK_IMPORTED_MODULE_1__,
  base58: _base58__WEBPACK_IMPORTED_MODULE_2__,
  bytes: _bytes__WEBPACK_IMPORTED_MODULE_3__,
  crypto: _crypto__WEBPACK_IMPORTED_MODULE_4__
});

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "bignumber.js":
/*!*******************************!*\
  !*** external "bignumber.js" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bignumber.js");

/***/ }),

/***/ "elliptic":
/*!***************************!*\
  !*** external "elliptic" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("elliptic");

/***/ }),

/***/ "js-sha3":
/*!**************************!*\
  !*** external "js-sha3" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("js-sha3");

/***/ }),

/***/ "jssha":
/*!************************!*\
  !*** external "jssha" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("jssha");

/***/ }),

/***/ "source-map-support/register":
/*!**********************************************!*\
  !*** external "source-map-support/register" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("source-map-support/register");

/***/ }),

/***/ "validator":
/*!****************************!*\
  !*** external "validator" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("validator");

/***/ })

/******/ })["default"];
//# sourceMappingURL=TronWeb.node.js.map