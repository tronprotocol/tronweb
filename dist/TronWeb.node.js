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
    return this.instance.get(statusPage).then(({
      data
    }) => {
      return utils__WEBPACK_IMPORTED_MODULE_2__["default"].hasProperties(data, 'blockID', 'block_header');
    }).catch(err => false);
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
/* harmony import */ var validator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator */ "validator");
/* harmony import */ var validator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bignumber.js */ "bignumber.js");
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_2__);

// import here, export them all as property of default
// i.e. utils.accounts.generateAccount()
// or utils.isValidURL()


const utils = {
  isValidURL(url) {
    return validator__WEBPACK_IMPORTED_MODULE_1___default.a.isURL(url, {
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
    return number && (number instanceof bignumber_js__WEBPACK_IMPORTED_MODULE_2___default.a || number.constructor && number.constructor.name === 'BigNumber');
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
/* harmony default export */ __webpack_exports__["default"] = ({ ...utils
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